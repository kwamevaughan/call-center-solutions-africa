import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogCardProfessional from "@/components/BlogCardProfessional";
import { blogService, formatBlogData, formatDate } from "@/lib/blogService";

const BlogPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { category, search } = router.query;
      if (category) {
        setSelectedCategory(category);
      }
      if (search) {
        setSearchTerm(search);
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchTerm, currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesData = await blogService.getCategories();
      setCategories(categoriesData);

      // Fetch featured blogs
      const featuredData = await blogService.getFeaturedBlogs(3);
      setFeaturedBlogs(featuredData.map(formatBlogData));

      // Fetch blogs with filters
      const blogsData = await blogService.getBlogs({
        category: selectedCategory === "all" ? null : selectedCategory,
        search: searchTerm || null,
        page: currentPage,
        limit: 12
      });

      if (currentPage === 1) {
      setBlogs(blogsData.blogs.map(formatBlogData));
      } else {
        setBlogs(prev => [...prev, ...blogsData.blogs.map(formatBlogData)]);
      }

      setTotalCount(blogsData.totalCount);
      setHasMore(blogsData.hasMore);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setBlogs([]);
    
    // Update URL
    const query = { ...router.query };
    if (category === "all") {
      delete query.category;
    } else {
      query.category = category;
    }
    router.push({ pathname: '/blog', query }, undefined, { shallow: true });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setBlogs([]);
    
    // Update URL
    const query = { ...router.query };
    if (term) {
      query.search = term;
    } else {
      delete query.search;
    }
    router.push({ pathname: '/blog', query }, undefined, { shallow: true });
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <>
      <SEO 
        title="Blog - Call Center Solutions Africa"
        description="Stay updated with the latest insights, tips, and strategies for call center operations, customer service, and business growth in Africa."
        keywords="call center blog, customer service tips, business insights, Africa call center"
      />
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Insights & Resources
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Discover expert insights, best practices, and actionable strategies for call center excellence and business growth.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-6 py-4 pl-12 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Icon 
                    icon="heroicons:magnifying-glass" 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" 
                  />
                </div>
                </div>
              </div>
            </div>
          </div>

        {/* Categories Filter */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Articles
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
                </div>

        {/* Featured Articles */}
        {featuredBlogs.length > 0 && currentPage === 1 && (
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
                <p className="text-gray-600">Handpicked content from our experts</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBlogs.map((blog) => (
                  <BlogCardProfessional
                    key={blog.id}
                    post={blog}
                    variant="featured"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Articles */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "all" ? "All Articles" : categories.find(c => c.slug === selectedCategory)?.name}
                </h2>
              <span className="text-gray-600">
                {totalCount} {totalCount === 1 ? 'article' : 'articles'}
              </span>
            </div>

            {loading && blogs.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-3/4 rounded mb-4"></div>
                    <div className="bg-gray-200 h-3 rounded"></div>
                  </div>
                ))}
              </div>
            ) : blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog) => (
                    <BlogCardProfessional
                      key={blog.id}
                      post={blog}
                      variant="default"
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? (
                        <>
                          <Icon icon="heroicons:arrow-path" className="w-5 h-5 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                      Load More Articles
                          <Icon icon="heroicons:arrow-down" className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="heroicons:document-text" className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? `No articles match your search for "${searchTerm}"`
                    : "No articles available in this category"
                  }
                </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    setCurrentPage(1);
                    setBlogs([]);
                    }}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                  Clear Filters
                  </button>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Get the latest insights and tips delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
        <Footer />
    </>
  );
};

export default BlogPage;
