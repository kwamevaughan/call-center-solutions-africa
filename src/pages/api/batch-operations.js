// pages/api/batch-operations.js - Optimized batch API endpoint
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Authenticate user
    const supabaseServer = createSupabaseServerClient(req, res);
    const {
      data: { user },
      error: userError,
    } = await supabaseServer.auth.getUser();

    if (userError || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { operations } = req.body;

    if (!operations || !Array.isArray(operations)) {
      return res.status(400).json({ error: "Invalid operations array" });
    }

    // Process operations in parallel
    const results = await Promise.allSettled(
      operations.map(async (operation) => {
        try {
          return await processOperation(supabaseServer, operation);
        } catch (error) {
          return {
            success: false,
            error: error.message,
            operation: operation.type
          };
        }
      })
    );

    // Format results
    const formattedResults = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return {
          success: true,
          data: result.value,
          operation: operations[index].type
        };
      } else {
        return {
          success: false,
          error: result.reason.message,
          operation: operations[index].type
        };
      }
    });

    res.status(200).json({
      success: true,
      results: formattedResults,
      total: operations.length,
      successful: formattedResults.filter(r => r.success).length
    });

  } catch (error) {
    console.error("Batch operations error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
}

async function processOperation(supabaseServer, operation) {
  const { type, data, options = {} } = operation;

  switch (type) {
    case 'getBlogs':
      return await getBlogs(supabaseServer, options);
    
    case 'getCategories':
      return await getCategories(supabaseServer);
    
    case 'getTags':
      return await getTags(supabaseServer);
    
    case 'getUser':
      return await getUser(supabaseServer, data.userId);
    
    case 'createBlog':
      return await createBlog(supabaseServer, data);
    
    case 'updateBlog':
      return await updateBlog(supabaseServer, data);
    
    case 'deleteBlog':
      return await deleteBlog(supabaseServer, data.id);
    
    case 'bulkDelete':
      return await bulkDelete(supabaseServer, data.ids);
    
    default:
      throw new Error(`Unknown operation type: ${type}`);
  }
}

async function getBlogs(supabaseServer, options = {}) {
  const {
    page = 1,
    limit = 12,
    category = null,
    search = null,
    status = 'all'
  } = options;

  let query = supabaseServer
    .from("blogs")
    .select(`
      *,
      author_details:admin_users(name, username),
      category:blog_categories(name),
      tags:blog_post_tags(
        tag:blog_tags(name)
      )
    `);

  // Apply filters
  if (category && category !== 'all') {
    query = query.eq('article_category', category);
  }

  if (status !== 'all') {
    if (status === 'published') {
      query = query.eq('is_published', true).eq('is_draft', false);
    } else if (status === 'draft') {
      query = query.eq('is_draft', true);
    }
  }

  if (search) {
    query = query.or(`article_name.ilike.%${search}%,article_body.ilike.%${search}%`);
  }

  // Apply pagination
  const offset = (page - 1) * limit;
  query = query.order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, error } = await query;
  if (error) throw error;

  return data.map((blog) => ({
    ...blog,
    article_category: blog.category?.name || null,
    article_tags: blog.tags?.map((t) => t.tag.name) || [],
    author_name: blog.author_details?.name || blog.author_details?.username || 'Unknown'
  }));
}

async function getCategories(supabaseServer) {
  const { data, error } = await supabaseServer
    .from("blog_categories")
    .select("id, name, slug")
    .order("name");

  if (error) throw error;
  return data;
}

async function getTags(supabaseServer) {
  const { data, error } = await supabaseServer
    .from("blog_tags")
    .select("id, name, slug")
    .order("name");

  if (error) throw error;
  return data;
}

async function getUser(supabaseServer, userId) {
  const { data, error } = await supabaseServer
    .from("admin_users")
    .select("id, name, username")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

async function createBlog(supabaseServer, blogData) {
  const { data, error } = await supabaseServer
    .from("blogs")
    .insert(blogData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function updateBlog(supabaseServer, blogData) {
  const { id, ...updateData } = blogData;
  
  const { data, error } = await supabaseServer
    .from("blogs")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function deleteBlog(supabaseServer, id) {
  // Delete related tags first
  await supabaseServer
    .from("blog_post_tags")
    .delete()
    .eq("blog_id", id);

  // Delete blog
  const { error } = await supabaseServer
    .from("blogs")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return { success: true };
}

async function bulkDelete(supabaseServer, ids) {
  // Delete related tags first
  await supabaseServer
    .from("blog_post_tags")
    .delete()
    .in("blog_id", ids);

  // Delete blogs
  const { error } = await supabaseServer
    .from("blogs")
    .delete()
    .in("id", ids);

  if (error) throw error;
  return { success: true, deleted: ids.length };
}
