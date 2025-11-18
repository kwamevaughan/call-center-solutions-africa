import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
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
      
      <main className="relative overflow-x-hidden min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-ccsa-dark-blue px-4 overflow-hidden">
          {/* Radial Ellipse at Left Bottom */}
          <div 
            className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          {/* Radial Ellipse at Top Right */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Middle */}
          <div 
            className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          <div className="max-w-7xl mx-auto w-full relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col items-center gap-6 sm:gap-8 text-center max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-white uppercase tracking-wide">
                  Insights & Resources
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Discover Expert Insights
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                Best practices and actionable strategies for call center excellence and business growth in Africa.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto w-full mt-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-6 py-4 pl-12 text-lg border-0 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
                  />
                  <Icon 
                    icon="mdi:magnify" 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/80" 
                  />
                </div>
              </div>

              {/* Categories Filter */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === "all"
                      ? "bg-white text-ccsa-dark-blue shadow-lg"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  All Articles
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      selectedCategory === category.slug
                        ? "bg-white text-ccsa-dark-blue shadow-lg"
                        : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
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
        <section className="bg-white w-full px-4 relative overflow-hidden py-16">
          {/* Radial Ellipse at Top Left */}
          <div 
            className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Top Right */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-2">
                  {selectedCategory === "all" ? "All Articles" : categories.find(c => c.slug === selectedCategory)?.name}
                </h2>
                <p className="text-base sm:text-lg text-ccsa-dark-blue/70">
                  {totalCount} {totalCount === 1 ? 'article' : 'articles'} available
                </p>
              </div>
            </div>

            {loading && blogs.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse shadow-sm">
                    <div className="bg-ccsa-dark-blue/10 h-48 rounded-lg mb-4"></div>
                    <div className="bg-ccsa-dark-blue/10 h-4 rounded mb-2"></div>
                    <div className="bg-ccsa-dark-blue/10 h-4 w-3/4 rounded mb-4"></div>
                    <div className="bg-ccsa-dark-blue/10 h-3 rounded"></div>
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
                      className="text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "var(--ccsa-gradient)"
                      }}
                    >
                      {loading ? (
                        <>
                          <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More Articles
                          <Icon icon="mdi:arrow-down" className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-ccsa-dark-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:file-document-outline" className="w-12 h-12 text-ccsa-dark-blue/50" />
                </div>
                <h3 className="text-xl font-semibold text-ccsa-dark-blue mb-2">No articles found</h3>
                <p className="text-base sm:text-lg text-ccsa-dark-blue/70 mb-6">
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
                  className="text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm sm:text-base mx-auto"
                  style={{
                    background: "var(--ccsa-gradient)"
                  }}
                >
                  <Icon icon="mdi:filter-remove" width={18} height={18} />
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

      </main>
      
      <FloatingCTA />
      <Footer />
    </>
  );
};

export default BlogPage;
