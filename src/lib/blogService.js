import { supabase } from './supabase'

export const blogService = {
  // Get all published blogs with pagination
  async getBlogs(page = 1, limit = 9, category = null, search = null) {
    // First, get the total count
    let countQuery = supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)
      .eq('is_draft', false)

    // Apply category filter to count
    if (category && category !== 'all') {
      countQuery = countQuery.eq('article_category', category)
    }

    // Apply search filter to count
    if (search) {
      countQuery = countQuery.or(`article_name.ilike.%${search}%,article_body.ilike.%${search}%,meta_keywords.ilike.%${search}%`)
    }

    const { count, error: countError } = await countQuery

    if (countError) {
      console.error('Error fetching blog count:', countError)
      throw countError
    }

    // Then, get the actual blog data with joins
    let query = supabase
      .from('blogs')
      .select(`
        *,
        admin_users!blogs_author_fkey (
          id,
          name,
          username
        ),
        blog_categories!blogs_category_id_fkey (
          id,
          name,
          slug
        )
      `)
      .eq('is_published', true)
      .eq('is_draft', false)
      .order('publish_date', { ascending: false })

    // Apply category filter
    if (category && category !== 'all') {
      query = query.eq('article_category', category)
    }

    // Apply search filter
    if (search) {
      query = query.or(`article_name.ilike.%${search}%,article_body.ilike.%${search}%,meta_keywords.ilike.%${search}%`)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error } = await query

    if (error) {
      console.error('Error fetching blogs:', error)
      throw error
    }

    return {
      blogs: data || [],
      totalCount: count || 0,
      hasMore: data && data.length === limit
    }
  },

  // Get a single blog by slug
  async getBlogBySlug(slug) {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        admin_users!blogs_author_fkey (
          id,
          name,
          username
        ),
        blog_categories!blogs_category_id_fkey (
          id,
          name,
          slug
        )
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .eq('is_draft', false)
      .single()

    if (error) {
      console.error('Error fetching blog:', error)
      throw error
    }

    return data
  },

  // Get featured blogs (you can customize this logic)
  async getFeaturedBlogs(limit = 3) {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        admin_users!blogs_author_fkey (
          id,
          name,
          username
        ),
        blog_categories!blogs_category_id_fkey (
          id,
          name,
          slug
        )
      `)
      .eq('is_published', true)
      .eq('is_draft', false)
      .order('publish_date', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured blogs:', error)
      throw error
    }

    return data || []
  },

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      throw error
    }

    return data || []
  },

  // Get related blogs (same category, excluding current blog)
  async getRelatedBlogs(currentBlogId, category, limit = 3) {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        admin_users!blogs_author_fkey (
          id,
          name,
          username
        ),
        blog_categories!blogs_category_id_fkey (
          id,
          name,
          slug
        )
      `)
      .eq('is_published', true)
      .eq('is_draft', false)
      .eq('article_category', category)
      .neq('id', currentBlogId)
      .order('publish_date', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching related blogs:', error)
      throw error
    }

    return data || []
  },

  // Get blogs by category
  async getBlogsByCategory(category, limit = 6) {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        admin_users!blogs_author_fkey (
          id,
          name,
          username
        ),
        blog_categories!blogs_category_id_fkey (
          id,
          name,
          slug
        )
      `)
      .eq('is_published', true)
      .eq('is_draft', false)
      .eq('article_category', category)
      .order('publish_date', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching blogs by category:', error)
      throw error
    }

    return data || []
  }
}

// Helper function to format blog data for components
export const formatBlogData = (blog) => {
  if (!blog) return null

  return {
    id: blog.id,
    title: blog.article_name,
    excerpt: blog.meta_description || blog.article_body?.substring(0, 150) + '...',
    content: blog.article_body,
    image: blog.article_image,
    slug: blog.slug,
    category: blog.article_category,
    tags: blog.article_tags ? blog.article_tags.split(',').map(tag => tag.trim()) : [],
    author: blog.admin_users ? `${blog.admin_users.name || blog.admin_users.username}` : 'Anonymous',
    authorId: blog.author,
    date: blog.publish_date || blog.created_at,
    readTime: calculateReadTime(blog.article_body),
    metaTitle: blog.meta_title,
    metaDescription: blog.meta_description,
    metaKeywords: blog.meta_keywords,
    focusKeyword: blog.focus_keyword,
    seoScore: blog.seo_score,
    categoryData: blog.blog_categories
  }
}

// Helper function to calculate read time
export const calculateReadTime = (content) => {
  if (!content) return '2 min read'
  
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  
  return `${readTime} min read`
}

// Helper function to format date
export const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
