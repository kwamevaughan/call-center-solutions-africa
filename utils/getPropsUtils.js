import { createSupabaseServerClient } from "@/lib/supabaseServer";

// Common error handler for database operations
const handleDBError = (error, context) => {
  console.error(`[${context}] Error:`, error.message);
  return {
    redirect: {
      destination: "/hr/login",
      permanent: false,
    },
  };
};

// Common props structure with breadcrumbs
const createProps = (data, breadcrumbs) => ({
  props: {
    ...data,
    breadcrumbs: breadcrumbs || [
      { label: "Dashboard", href: "/admin" },
      { label: "Overview" },
    ],
  },
});

// Common function to fetch HR user data
const fetchHRUser = async (supabaseServer, userId) => {
  const { data: hrUser, error: hrUserError } = await supabaseServer
    .from("admin_users")
    .select("id, name")
    .eq("id", userId)
    .single();

  if (hrUserError || !hrUser) {
    throw new Error(hrUserError?.message || "User not in admin_users");
  }

  return hrUser;
};

// Common function to fetch candidates map
const fetchCandidatesMap = async (supabaseServer) => {
  const { data: candidatesData, error: candidatesError } = await supabaseServer
    .from("candidates")
    .select("id, auth_user_id, primaryContactName");

  if (candidatesError) {
    throw new Error(`Failed to fetch candidates: ${candidatesError.message}`);
  }

  return candidatesData.reduce((acc, candidate) => {
    if (candidate.auth_user_id) {
      acc[candidate.auth_user_id] = candidate.primaryContactName || "Unknown";
    }
    return acc;
  }, {});
};



export async function withAuth(req, res, options = {}) {
  const { redirectTo = "/hr/login" } = options;
  console.log(
    `[withAuth] Starting session check at ${new Date().toISOString()}`
  );

  try {
    const supabaseServer = createSupabaseServerClient(req, res);

    const {
      data: { session },
      error: sessionError,
    } = await supabaseServer.auth.getSession();

    if (sessionError || !session) {
      return {
        redirect: {
          destination: redirectTo,
          permanent: false,
        },
      };
    }

    const hrUser = await fetchHRUser(supabaseServer, session.user.id);
    return { session, supabaseServer, hrUser };
  } catch (error) {
    console.error("[withAuth] Error:", error.message);
    return {
      redirect: {
        destination: redirectTo,
        permanent: false,
      },
    };
  }
}


export async function getAdminBlogProps({ req, res }) {
  console.log("[getAdminBlogProps] Starting at", new Date().toISOString());

  try {
    const authResult = await withAuth(req, res);
    if (authResult.redirect) return authResult;

    const { supabaseServer, hrUser } = authResult;

    const { data: blogs, error: blogsError } = await supabaseServer
      .from("blogs")
      .select(
        `
        *,
        author_details:admin_users(name, username),
        category:blog_categories(name),
        tags:blog_post_tags(
          tag:blog_tags(name)
        )
      `
      )
      .order("created_at", { ascending: false });

    if (blogsError) throw blogsError;

    const transformedBlogs = blogs.map((blog) => ({
      ...blog,
      article_category: blog.category?.name || null,
      article_tags: blog.tags?.map((t) => t.tag.name) || [],
      author:
        blog.author_details?.name ||
        blog.author_details?.username ||
        "PAAN Admin",
    }));

    const { data: categoriesData, error: categoriesError } =
      await supabaseServer
        .from("blog_categories")
        .select("id, name, slug")
        .order("name");

    if (categoriesError) throw categoriesError;

    const { data: tagsData, error: tagsError } = await supabaseServer
      .from("blog_tags")
      .select("id, name, slug")
      .order("name");

    if (tagsError) throw tagsError;

    return createProps(
      {
        initialBlogs: transformedBlogs || [],
        categories: categoriesData || [],
        tags: tagsData || [],
        hrUser,
      },
      [{ label: "Dashboard", href: "/admin" }, { label: "Blog" }]
    );
  } catch (error) {
    return handleDBError(error, "getAdminBlogProps");
  }
}
