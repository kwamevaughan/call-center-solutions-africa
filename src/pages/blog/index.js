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

      // Fetch blogs with filters
      const blogsData = await blogService.getBlogs(
        currentPage,
        12,
        null, // Temporarily remove category filter to test
        null  // Temporarily remove search filter to test
      );

      console.log('Blogs data received:', blogsData);
      console.log('Blogs array:', blogsData.blogs);

      if (currentPage === 1) {
        setBlogs(blogsData.blogs.map(formatBlogData));
      } else {
        setBlogs(prev => [...prev, ...blogsData.blogs.map(formatBlogData)]);
      }

      setTotalCount(blogsData.totalCount);
      setHasMore(blogsData.hasMore);
    } catch (error) {
      console.error('Error fetching blog data:', error);
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
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
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-40">
            <div className="text-center text-white">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Insights & Resources
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto mb-12">
                Discover expert insights, best practices, and actionable strategies for call center excellence and business growth in Africa.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-6 py-4 pl-12 text-lg border-0 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
                  />
                  <Icon 
                    icon="heroicons:magnifying-glass" 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-200" 
                  />
                </div>
              </div>

              {/* Categories Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedCategory === "all"
                      ? "bg-white text-blue-600 shadow-lg"
                      : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  }`}
                >
                  All Articles
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedCategory === category.slug
                        ? "bg-white text-blue-600 shadow-lg"
                        : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedCategory === "all" ? "All Articles" : categories.find(c => c.slug === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {totalCount} {totalCount === 1 ? 'article' : 'articles'} available
                </p>
              </div>
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

      </main>
      
        <Footer />
    </>
  );
};

export default BlogPage;
