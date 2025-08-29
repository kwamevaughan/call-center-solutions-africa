import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogSearch from "@/components/BlogSearch";
import BlogCard from "@/components/BlogCard";
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

      // Fetch main blogs
      const blogsData = await blogService.getBlogs(
        currentPage, 
        9, 
        selectedCategory === 'all' ? null : selectedCategory, 
        searchTerm || null
      );
      
      setBlogs(blogsData.blogs.map(formatBlogData));
      setTotalCount(blogsData.totalCount);
      setHasMore(blogsData.hasMore);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const getCategoryCount = (categoryId) => {
    return blogs.filter(blog => blog.category === categoryId).length;
  };

  return (
    <>
      <SEO 
        title="Blog - Call Center Solutions Africa"
        description="Stay ahead of the curve with expert insights, best practices, and the latest trends in call center operations and customer experience across Africa."
        keywords="call center blog, customer experience, BPO insights, Africa call center, industry trends"
      />
      <Header />
      <main className="relative overflow-x-hidden">
        {/* Corporate Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0088D2] via-[#0056B3] to-[#003366] py-20 sm:py-28">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[url('/assets/images/section-bg.jpg')] bg-cover bg-center opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Icon icon="mdi:file-document-multiple" className="text-white mr-2" />
                <span className="text-white font-medium">Industry Insights</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Strategic Insights & 
                <span className="block text-[#FFD100]">Best Practices</span>
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
                Stay ahead of the curve with expert insights, best practices, and the latest trends in call center operations and customer experience across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center text-white/80">
                  <Icon icon="mdi:account-group" className="mr-2" />
                  <span>Expert Contributors</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Icon icon="mdi:trending-up" className="mr-2" />
                  <span>Industry Trends</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Icon icon="mdi:map-marker" className="mr-2" />
                  <span>Africa Focus</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredBlogs.length > 0 && (
          <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-[#0088D2]/10 text-[#0088D2] rounded-full px-4 py-2 mb-4">
                  <Icon icon="mdi:star" className="mr-2" />
                  <span className="font-medium">Featured Content</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Strategic Insights
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Discover our most comprehensive and impactful articles that drive business transformation
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBlogs.map((blog, index) => (
                  <div key={blog.id} className={`transform transition-all duration-300 hover:-translate-y-2 ${index === 1 ? 'lg:scale-105' : ''}`}>
                    <BlogCard post={blog} variant="featured" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter Section */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 shadow-sm">
              <BlogSearch
                onSearch={handleSearch}
                onCategoryFilter={handleCategoryFilter}
                categories={categories}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </section>

        {/* All Posts Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 'Latest Articles'}
                </h2>
                <p className="text-gray-600">
                  {totalCount} {totalCount === 1 ? 'article' : 'articles'} found
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                <div className="flex items-center text-gray-500">
                  <Icon icon="mdi:sort" className="mr-2" />
                  <span className="text-sm">Latest First</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Icon icon="mdi:view-grid" className="mr-2" />
                  <span className="text-sm">Grid View</span>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-6 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded"></div>
                  </div>
                ))}
              </div>
            ) : blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} post={blog} variant="default" />
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center">
                    <button
                      onClick={loadMore}
                      className="inline-flex items-center bg-gradient-to-r from-[#0088D2] to-[#0056B3] text-white px-8 py-4 rounded-lg hover:from-[#0056B3] hover:to-[#003366] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Icon icon="mdi:plus" className="mr-2" />
                      Load More Articles
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:file-document-outline" className="text-gray-400 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {searchTerm 
                    ? `No articles match your search for "${searchTerm}"`
                    : 'No articles available at the moment.'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="inline-flex items-center text-[#0088D2] hover:text-[#0056B3] font-medium"
                  >
                    <Icon icon="mdi:refresh" className="mr-2" />
                    Clear search and show all articles
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default BlogPage;
