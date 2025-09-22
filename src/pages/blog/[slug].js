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
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="bg-white rounded-2xl shadow-sm p-8">
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
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon="heroicons:document-text" className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
              <p className="text-gray-600 mb-8 text-lg">
                The article you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              href="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                <Icon icon="heroicons:arrow-left" className="w-5 h-5 mr-2" />
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
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40">
            <div className="text-center text-white">
              {/* Category Badge */}
              {blog.category && (
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white mb-6">
                  <Icon icon="heroicons:tag" className="w-4 h-4 mr-2" />
                  {blog.category}
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {blog.excerpt || "Discover insights and strategies for business growth"}
              </p>
              
              {/* Meta Information */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-blue-100">
                <div className="flex items-center">
                  <Icon icon="heroicons:calendar" className="w-5 h-5 mr-2" />
                  <span className="font-medium">{formatDate(blog.date)}</span>
                </div>
                <div className="flex items-center">
                  <Icon icon="heroicons:clock" className="w-5 h-5 mr-2" />
                  <span className="font-medium">{blog.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Icon icon="heroicons:user" className="w-5 h-5 mr-2" />
                  <span className="font-medium">By {blog.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Featured Image */}
            {blog.image && (
              <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-12">
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
            <article className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>


            {/* Social Sharing */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Icon icon="heroicons:share" className="w-6 h-6 mr-2 text-blue-600" />
                Share this article
              </h3>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Icon icon="ic:baseline-facebook" className="w-6 h-6" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <Icon icon="line-md:twitter-x" className="w-6 h-6" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Icon icon="mdi:linkedin" className="w-6 h-6" />
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: blog.title,
                        text: blog.excerpt,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="flex items-center justify-center w-12 h-12 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Icon icon="heroicons:link" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
                <p className="text-gray-600 text-lg">Continue reading with these related topics</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCardProfessional
                    key={relatedBlog.id}
                    post={relatedBlog}
                    variant="default"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Author Section */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon icon="heroicons:user" className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">About the Author</h3>
                <p className="text-xl font-semibold text-gray-700 mb-2">{blog.author}</p>
                <p className="text-gray-600">Content Specialist at Call Center Solutions Africa</p>
                <p className="text-gray-600 mt-2">
                  Expert in call center operations, customer service strategies, and business growth in Africa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get expert advice on call center solutions and customer service strategies tailored for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get Free Consultation
                <Icon icon="heroicons:arrow-right" className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Read More Articles
                <Icon icon="heroicons:document-text" className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;