import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SEO from "@/components/SEO";
import Header from "../../layouts/header";
import Footer from "@/layouts/footer";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogCard from "@/components/BlogCard";
import { blogService, formatBlogData, formatDate } from "@/lib/blogService";

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch the main blog post
      const blogData = await blogService.getBlogBySlug(slug);
      const formattedBlog = formatBlogData(blogData);
      setBlog(formattedBlog);

      // Fetch related blogs
      if (formattedBlog.category) {
        const relatedData = await blogService.getRelatedBlogs(
          formattedBlog.id,
          formattedBlog.category,
          3
        );
        setRelatedBlogs(relatedData.map(formatBlogData));
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <SEO 
          title="Loading... - Call Center Solutions Africa"
          description="Loading blog post..."
        />
        <Header />
        <main className="relative overflow-x-hidden pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="animate-pulse">
              <div className="bg-gray-200 h-48 sm:h-64 rounded-lg mb-6 sm:mb-8"></div>
              <div className="bg-gray-200 h-6 sm:h-8 rounded mb-3 sm:mb-4"></div>
              <div className="bg-gray-200 h-4 sm:h-6 rounded mb-2 sm:mb-2"></div>
              <div className="bg-gray-200 h-3 sm:h-4 rounded mb-6 sm:mb-8"></div>
              <div className="space-y-3 sm:space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="bg-gray-200 h-3 sm:h-4 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <SEO 
          title="Blog Post Not Found - Call Center Solutions Africa"
          description="The requested blog post could not be found."
        />
        <Header />
        <main className="relative overflow-x-hidden pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center">
            <Icon icon="mdi:file-document-outline" className="text-gray-400 text-4xl sm:text-6xl mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/blog"
              className="bg-[#0088D2] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#0056B3] transition-colors duration-300 font-medium text-sm sm:text-base"
            >
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.excerpt}
        keywords={blog.metaKeywords}
      />
      <Header />
      <main className="relative overflow-x-hidden">
        {/* Hero Section with Blog Image Background */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end pt-20">
          {/* Background Image */}
          {blog.image ? (
            <div className="absolute inset-0 z-0">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
            </div>
          ) : (
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0088D2] via-[#0056B3] to-[#003366]">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          )}
          
          {/* Content */}
          <div className="relative z-10 w-full">
            <div className="max-w-4xl mx-auto px-4 pb-12 sm:pb-16 lg:pb-20">
              <div className="mb-6 sm:mb-8">
                <Link 
                  href="/blog"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 transition-all duration-300 text-sm sm:text-base"
                >
                  <Icon icon="mdi:arrow-left" className="mr-2" />
                  Back to Blog
                </Link>
                
                {blog.category && (
                  <div className="inline-flex items-center bg-[#FFD100] text-gray-900 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
                    <Icon icon="mdi:tag" className="mr-2" />
                    {blog.category}
                  </div>
                )}
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  {blog.title}
                </h1>
                
                <div className="hidden sm:flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-white/90 mb-6 sm:mb-8">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-sm sm:text-base">
                    <Icon icon="mdi:calendar" className="mr-2" />
                    {formatDate(blog.date)}
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-sm sm:text-base">
                    <Icon icon="mdi:clock-outline" className="mr-2" />
                    {blog.readTime}
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-sm sm:text-base">
                    <Icon icon="mdi:account" className="mr-2" />
                    By {blog.author}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="lg:col-span-3">
                <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed text-base sm:text-lg"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </article>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                      <Icon icon="mdi:tag-multiple" className="mr-2 text-[#0088D2]" />
                      Article Tags
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {blog.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gradient-to-r from-[#0088D2]/10 to-[#0056B3]/10 text-[#0088D2] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-[#0088D2]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Sharing */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <Icon icon="mdi:share-variant" className="mr-2 text-[#0088D2]" />
                    Share this article
                  </h3>
                  <div className="flex gap-3 sm:gap-4">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#1877F2] to-[#166FE5] text-white p-3 sm:p-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <Icon icon="ic:baseline-facebook" width="20" height="20" className="sm:w-6 sm:h-6" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#1DA1F2] to-[#1A91DA] text-white p-3 sm:p-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <Icon icon="line-md:twitter-x" width="20" height="20" className="sm:w-6 sm:h-6" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#0077B5] to-[#006097] text-white p-3 sm:p-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <Icon icon="mdi:linkedin" width="20" height="20" className="sm:w-6 sm:h-6" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                {/* Related Posts */}
                {relatedBlogs.length > 0 && (
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                      <Icon icon="mdi:file-document-multiple" className="mr-2 text-[#0088D2]" />
                      Related Articles
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {relatedBlogs.map((relatedBlog) => (
                        <BlogCard key={relatedBlog.id} post={relatedBlog} variant="compact" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default BlogPost;
