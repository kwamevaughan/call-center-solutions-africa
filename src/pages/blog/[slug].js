import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SEO from "@/components/SEO";
import Header from "../../layouts/header";
import Footer from "@/layouts/footer";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogCardProfessional from "@/components/BlogCardProfessional";
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
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="animate-pulse">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
                <div className="bg-gray-200 h-8 w-3/4 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 w-1/2 rounded mb-8"></div>
                <div className="bg-gray-200 h-64 rounded-lg mb-8"></div>
                <div className="space-y-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-200 h-4 rounded"></div>
                  ))}
                </div>
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
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon="mdi:file-document-outline" className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-ccsa-dark-blue mb-4">Article Not Found</h1>
              <p className="text-gray-600 mb-8 text-lg">
                The article you're looking for doesn't exist or has been moved.
              </p>
              <Link 
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-ccsa-blue text-white font-semibold rounded-lg hover:bg-ccsa-blue/90 transition-colors"
              >
                <Icon icon="mdi:arrow-left" className="w-5 h-5" />
                Back to Blog
              </Link>
            </div>
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
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-ccsa-dark-blue via-ccsa-dark-blue to-[#1a1f3a] py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              {/* Category Badge */}
              {blog.category && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white mb-6">
                  <Icon icon="mdi:tag-outline" className="w-4 h-4" />
                  {blog.category}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                {blog.excerpt || "Discover insights and strategies for business growth"}
              </p>
              
              {/* Meta Information */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:calendar-outline" className="w-5 h-5" />
                  <span className="font-medium text-sm">{formatDate(blog.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:clock-outline" className="w-5 h-5" />
                  <span className="font-medium text-sm">{blog.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:account-outline" className="w-5 h-5" />
                  <span className="font-medium text-sm">By {blog.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Image */}
            {blog.image && (
              <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-12 border border-gray-200 shadow-sm">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Main Content */}
            <article className="prose prose-lg max-w-none prose-headings:text-ccsa-dark-blue prose-headings:font-bold prose-a:text-ccsa-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-ccsa-dark-blue prose-code:text-ccsa-dark-blue">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* Social Sharing */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-ccsa-dark-blue mb-2 flex items-center gap-2">
                    <Icon icon="mdi:share-variant-outline" className="w-5 h-5 text-ccsa-blue" />
                    Share this article
                  </h3>
                  <p className="text-sm text-gray-600">Help others discover this content</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-ccsa-blue hover:text-white transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Icon icon="mdi:facebook" className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(blog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-ccsa-blue hover:text-white transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Icon icon="mdi:twitter" className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-ccsa-blue hover:text-white transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Icon icon="mdi:linkedin" className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && navigator.share) {
                        navigator.share({
                          title: blog.title,
                          text: blog.excerpt,
                          url: window.location.href,
                        });
                      } else if (typeof window !== 'undefined') {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-ccsa-blue hover:text-white transition-colors"
                    aria-label="Copy link"
                  >
                    <Icon icon="mdi:link-variant" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <section className="bg-gray-50 py-16 sm:py-20 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-ccsa-blue/10 rounded-full mb-4">
                  <Icon icon="mdi:book-open-variant-outline" width={20} height={20} className="text-ccsa-blue" />
                  <span className="text-sm font-semibold text-ccsa-dark-blue uppercase tracking-wide">Related Articles</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-ccsa-dark-blue mb-4">
                  Continue Reading
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore more insights and strategies from our blog
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCardProfessional
                    key={relatedBlog.id}
                    post={relatedBlog}
                    variant="default"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        {/* Call to Action Section */}
        <section className="bg-gradient-to-br from-ccsa-dark-blue via-ccsa-dark-blue to-[#1a1f3a] py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get expert advice on call center solutions and customer service strategies tailored for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-ccsa-blue text-white font-semibold rounded-lg hover:bg-ccsa-blue/90 transition-colors text-base"
              >
                Get Free Consultation
                <Icon icon="mdi:arrow-right" className="w-5 h-5" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-ccsa-dark-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors text-base"
              >
                <Icon icon="mdi:book-open-variant" className="w-5 h-5" />
                Read More Articles
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;