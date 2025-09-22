// hooks/useBlogOptimized.js - Optimized blog hook with better API communication
import { useState, useEffect, useMemo, useCallback } from "react";
import apiClient from "@/lib/apiClient";
import toast from "react-hot-toast";
import { calculateSEOScore } from '@/utils/seo';

export const useBlogOptimized = (blogId) => {
  const [blogs, setBlogs] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    article_name: "",
    article_body: "",
    category_id: null,
    tag_ids: [],
    article_image: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    slug: "",
    is_published: false,
    is_draft: true,
    publish_date: null,
    author: "",
    title: "",
    description: "",
    keywords: [],
    featured_image_url: "",
    featured_image_upload: null,
    featured_image_library: null,
    content: "",
    publish_option: "draft",
    scheduled_date: null,
    focus_keyword: "",
  });
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    category: "All",
    tags: [],
    search: "",
    status: "",
    sort: "newest"
  });

  // Batch fetch all initial data
  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      
      const operations = [
        { type: 'getBlogs', options: { limit: 100 } },
        { type: 'getCategories' },
        { type: 'getTags' }
      ];

      const results = await apiClient.batchBlogOperations(operations);
      
      // Process results
      const [blogsResult, categoriesResult, tagsResult] = results;
      
      if (blogsResult.status === 'fulfilled') {
        const transformedData = blogsResult.value.map((blog) => ({
          ...blog,
          article_category: blog.category?.name || null,
          article_tags: blog.tags?.map((t) => t.tag.name) || [],
          author_name: blog.author_details?.name || blog.author_details?.username || 'Unknown'
        }));
        setBlogs(transformedData);
      }

      if (categoriesResult.status === 'fulfilled') {
        setCategories(categoriesResult.value || []);
      }

      if (tagsResult.status === 'fulfilled') {
        setTags(tagsResult.value || []);
      }

      // Fetch admin user separately (cached)
      const userResult = await apiClient.optimizedQuery('admin_users', {
        filters: { id: 'current_user' }, // This would need to be replaced with actual user ID
        cache: true
      });
      
      if (userResult && userResult.length > 0) {
        setAdminUser(userResult[0]);
        setFormData((prev) => ({
          ...prev,
          author: userResult[0].name || userResult[0].username,
        }));
      }

    } catch (error) {
      console.error("Error fetching initial data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Optimized fetch blogs with caching
  const fetchBlogs = useCallback(async (options = {}) => {
    try {
      setLoading(true);
      const data = await apiClient.getBlogsOptimized(options);
      
      const transformedData = data.map((blog) => ({
        ...blog,
        article_category: blog.category?.name || null,
        article_tags: blog.tags?.map((t) => t.tag.name) || [],
        author_name: blog.author_details?.name || blog.author_details?.username || 'Unknown'
      }));

      setBlogs(transformedData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized filtered blogs
  const filteredBlogs = useMemo(() => {
    let filtered = [...blogs];

    if (filters.category !== "All") {
      filtered = filtered.filter(
        (blog) => blog.article_category === filters.category
      );
    }

    if (filters.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
      filtered = filtered.filter((blog) =>
        blog.article_tags && 
        Array.isArray(blog.article_tags) && 
        filters.tags.some((tag) => blog.article_tags.includes(tag))
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.article_name.toLowerCase().includes(searchTerm) ||
          blog.article_body.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.status) {
      filtered = filtered.filter((blog) => {
        if (filters.status === "published") return blog.is_published;
        if (filters.status === "draft") return blog.is_draft;
        if (filters.status === "scheduled") return blog.publish_date && !blog.is_published;
        return true;
      });
    }

    // Apply sorting
    const sortValue = filters.sort || "newest";
    const sortedBlogs = [...filtered].sort((a, b) => {
      switch (sortValue) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "az":
          return (a.article_name || "").toLowerCase().localeCompare((b.article_name || "").toLowerCase());
        case "za":
          return (b.article_name || "").toLowerCase().localeCompare((a.article_name || "").toLowerCase());
        case "category":
          return (a.article_category || "").toLowerCase().localeCompare((b.article_category || "").toLowerCase());
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

    return sortedBlogs;
  }, [blogs, filters]);

  // Optimized input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "multiple") {
      setFormData((prev) => ({
        ...prev,
        ...value,
      }));
    } else if (name === "article_name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: slug,
      }));
    } else if (name === "featured_image_url") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        article_image: value,
        featured_image_upload: "",
        featured_image_library: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }, []);

  // Optimized submit with optimistic updates
  const handleSubmit = useCallback(async (e, updatedFormData = null) => {
    e.preventDefault();
    const loadingToast = toast.loading(updatedFormData?.id ? "Updating blog post..." : "Creating blog post...");
    
    try {
      setLoading(true);
      const dataToUse = updatedFormData || formData;

      // Optimistic update
      const tempId = dataToUse.id || `temp_${Date.now()}`;
      const optimisticBlog = {
        ...dataToUse,
        id: tempId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Add to local state immediately
      if (!dataToUse.id) {
        setBlogs(prev => [optimisticBlog, ...prev]);
      }

      // Prepare data for API
      const {
        id,
        article_name,
        article_body,
        article_image,
        meta_title,
        meta_description,
        meta_keywords,
        slug,
        author,
        category_id,
        tag_ids,
        publish_option,
        scheduled_date,
        title,
        description,
        keywords,
        featured_image_url,
        featured_image_upload,
        featured_image_library,
        content,
        article_tags,
        focus_keyword,
        ...rest
      } = dataToUse;

      const is_published = publish_option === "publish";
      const is_draft = publish_option === "draft";
      const publish_date = publish_option === "schedule" ? scheduled_date : null;

      let article_category = null;
      if (category_id) {
        const category = categories.find((c) => c.id === category_id);
        if (category) {
          article_category = category.name;
        }
      }

      let finalImageUrl = "";
      if (featured_image_url && featured_image_url.startsWith('http')) {
        finalImageUrl = featured_image_url;
      } else {
        finalImageUrl = featured_image_upload || featured_image_library || article_image || "";
      }

      const finalMetaKeywords = meta_keywords || (keywords ? keywords.join(", ") : "");
      const finalContent = dataToUse.article_body || editorContent || content || "";

      const blogToUpsert = {
        id: id || undefined,
        article_name,
        article_body: finalContent,
        article_image: finalImageUrl,
        meta_title: title || article_name,
        meta_description: description || "",
        meta_keywords: finalMetaKeywords,
        slug,
        is_published,
        is_draft,
        publish_date,
        author: adminUser?.id || "current_user", // This would need actual user ID
        category_id,
        article_category,
        article_tags: article_tags || [],
        focus_keyword: focus_keyword || "",
        seo_score: calculateSEOScore({
          article_name,
          description,
          slug,
          focus_keyword,
          article_body: finalContent
        }, finalContent),
        updated_at: new Date().toISOString(),
        created_at: id ? undefined : new Date().toISOString(),
      };

      // Remove undefined values
      Object.keys(blogToUpsert).forEach((key) => {
        if (blogToUpsert[key] === undefined || blogToUpsert[key] === null) {
          delete blogToUpsert[key];
        }
      });

      // Use optimized API client
      const { data: blog, error: blogError } = await apiClient.withRetry(async () => {
        const { supabase } = await import('@/lib/supabase');
        return supabase
          .from("blogs")
          .upsert(blogToUpsert)
          .select()
          .single();
      });

      if (blogError) throw blogError;

      // Handle tags
      if (tag_ids && tag_ids.length > 0) {
        await apiClient.withRetry(async () => {
          const { supabase } = await import('@/lib/supabase');
          
          // Delete existing tags
          await supabase
            .from("blog_post_tags")
            .delete()
            .eq("blog_id", blog.id);

          // Insert new tags
          const tagInserts = tag_ids.map((tag_id) => ({
            blog_id: blog.id,
            tag_id,
          }));

          return supabase
            .from("blog_post_tags")
            .insert(tagInserts);
        });
      }

      // Clear cache and refetch
      apiClient.clearCache('blogs');
      await fetchBlogs();

      toast.success(updatedFormData?.id ? "Blog post updated successfully!" : "Blog post created successfully!", {
        id: loadingToast,
      });
      
      return true;
    } catch (error) {
      console.error("Error saving blog:", error);
      
      // Revert optimistic update
      if (!updatedFormData?.id) {
        setBlogs(prev => prev.filter(b => b.id !== `temp_${Date.now()}`));
      }
      
      toast.error("Failed to save blog post", {
        id: loadingToast,
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBlogs, categories, adminUser, formData, editorContent]);

  // Optimized delete with optimistic updates
  const handleDelete = useCallback(async (id) => {
    try {
      setLoading(true);
      
      // Optimistic update
      const originalBlogs = [...blogs];
      setBlogs(prev => prev.filter(blog => blog.id !== id));

      await apiClient.withRetry(async () => {
        const { supabase } = await import('@/lib/supabase');
        return supabase.from("blogs").delete().eq("id", id);
      });

      toast.success("Blog post deleted successfully");
      
      // Clear cache
      apiClient.clearCache('blogs');
      
      return true;
    } catch (error) {
      console.error("Error deleting blog:", error);
      
      // Revert optimistic update
      setBlogs(originalBlogs);
      
      toast.error("Failed to delete blog post");
      return false;
    } finally {
      setLoading(false);
    }
  }, [blogs]);

  // Optimized edit handler
  const handleEdit = useCallback((blog) => {
    if (!blog) return;

    const transformedData = {
      id: blog.id,
      article_name: blog.article_name || "",
      article_body: blog.article_body || "",
      category_id: blog.category_id || null,
      tag_ids: blog.blog_post_tags?.map(pt => pt.blog_tags?.id) || [],
      article_image: blog.article_image || "",
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      meta_keywords: blog.meta_keywords || "",
      slug: blog.slug || "",
      is_published: blog.is_published || false,
      is_draft: blog.is_draft || true,
      publish_date: blog.publish_date || null,
      author: blog.author_details?.name || blog.author_details?.username || "CCSA Admin",
      title: blog.article_name || "",
      description: blog.meta_description || "",
      keywords: blog.meta_keywords ? blog.meta_keywords.split(",").map(k => k.trim()) : [],
      featured_image_url: blog.article_image || "",
      featured_image_upload: null,
      featured_image_library: blog.article_image || null,
      content: blog.article_body || "",
      publish_option: blog.is_published ? "publish" : "draft",
      scheduled_date: blog.publish_date || null,
    };

    setFormData(transformedData);
    setEditorContent(blog.article_body || "");
  }, []);

  // Optimized filter update
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // Initialize data
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return {
    blogs: filteredBlogs,
    formData,
    setFormData,
    loading,
    sortBy,
    setSortBy,
    filters,
    updateFilters,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleEdit,
    editorContent,
    setEditorContent,
    categories,
    tags,
    adminUser,
    fetchBlogs,
  };
};
