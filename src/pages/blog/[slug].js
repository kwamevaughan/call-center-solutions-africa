import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import SEO from "@/components/SEO";
import Header from "../../layouts/header";
import Footer from "@/layouts/footer";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogCardProfessional from "@/components/BlogCardProfessional";
import { blogService, formatBlogData, formatDate } from "@/lib/blogService";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/schemas";

// Memoized share buttons component
const ShareButtons = memo(({ blog }) => {
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  }, []);

  const handleShare = useCallback(() => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: shareUrl,
      }).catch(() => {
        // Silently handle share cancellation
      });
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(shareUrl).catch(() => {
        // Silently handle clipboard errors
      });
    }
  }, [blog.title, blog.excerpt, shareUrl]);

  const facebookUrl = useMemo(() => 
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    [shareUrl]
  );

  const twitterUrl = useMemo(() => 
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`,
    [shareUrl, blog.title]
  );

  const linkedInUrl = useMemo(() => 
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    [shareUrl]
  );

  return (
    <div className="flex gap-3">
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-ccsa-blue hover:text-white transition-colors"
        aria-label="Share on Facebook"
      >
        <Icon icon="mdi:facebook" className="w-5 h-5" />
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-ccsa-blue hover:text-white transition-colors"
        aria-label="Share on Twitter"
      >
        <Icon icon="mdi:twitter" className="w-5 h-5" />
      </a>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-ccsa-blue hover:text-white transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Icon icon="mdi:linkedin" className="w-5 h-5" />
      </a>
      <button
        onClick={handleShare}
        className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-ccsa-blue hover:text-white transition-colors"
        aria-label="Copy link"
      >
        <Icon icon="mdi:link-variant" className="w-5 h-5" />
      </button>
    </div>
  );
});

ShareButtons.displayName = 'ShareButtons';

// Table of Contents Component
const TableOfContents = memo(({ headings, activeId }) => {
  const tocRef = useRef(null);

  const scrollToHeading = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  if (!headings || headings.length === 0) return null;

  return (
    <>
      {/* TOC Sidebar - Hidden on mobile, visible on lg+ */}
      <aside
        ref={tocRef}
        className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] w-80 bg-white border-r border-gray-200 overflow-y-auto pt-4 px-6 pb-8"
      >
        <div>
          <h2 className="text-lg font-bold text-ccsa-dark-blue mb-4 flex items-center gap-2">
            <Icon icon="mdi:format-list-bulleted" className="w-5 h-5 text-ccsa-blue" />
            Table of Contents
          </h2>
          <nav className="space-y-2">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              const indentClass = heading.level === 3 ? 'ml-4' : heading.level === 4 ? 'ml-8' : '';
              
              return (
                <button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  className={`
                    block w-full text-left px-3 py-2 rounded-lg text-sm
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-ccsa-blue/10 text-ccsa-blue font-semibold border-l-2 border-ccsa-blue' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-ccsa-dark-blue'
                    }
                    ${indentClass}
                  `}
                >
                  {heading.text}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
});

TableOfContents.displayName = 'TableOfContents';

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const contentRef = useRef(null);

  const fetchBlogData = useCallback(async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);

      // Fetch the main blog post
      const blogData = await blogService.getBlogBySlug(slug);
      const formattedBlog = formatBlogData(blogData);
      setBlog(formattedBlog);

      // Extract headings from content and add IDs
      if (formattedBlog.content) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(formattedBlog.content, 'text/html');
        const headingElements = doc.querySelectorAll('h2, h3, h4');
        const extractedHeadings = [];
        
        headingElements.forEach((heading, index) => {
          const text = heading.textContent.trim();
          const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          heading.id = id;
          extractedHeadings.push({
            id,
            text,
            level: parseInt(heading.tagName.charAt(1))
          });
        });

        // Update content with IDs
        formattedBlog.content = doc.body.innerHTML;
        setHeadings(extractedHeadings);
      }

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
      setError('Blog post not found');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchBlogData();
    }
  }, [slug, fetchBlogData]);

  // Extract headings from content and add IDs after blog is loaded
  useEffect(() => {
    if (!blog?.content) return;

    const extractHeadings = () => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(blog.content, 'text/html');
        const headingElements = doc.querySelectorAll('h2, h3, h4');
        const extractedHeadings = [];
        
        headingElements.forEach((heading, index) => {
          const text = heading.textContent.trim();
          if (!text) return;
          
          const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
          heading.id = id;
          extractedHeadings.push({
            id,
            text,
            level: parseInt(heading.tagName.charAt(1))
          });
        });

        // Update content with IDs if headings were found
        if (extractedHeadings.length > 0) {
          const updatedContent = doc.body.innerHTML;
          setBlog(prev => ({ ...prev, content: updatedContent }));
          setHeadings(extractedHeadings);
        }
      } catch (error) {
        console.error('Error extracting headings:', error);
      }
    };

    extractHeadings();
  }, [blog?.content]);

  // Handle scroll to update active heading
  useEffect(() => {
    if (!headings.length || typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header

      // Find the current active heading
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveHeadingId(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Memoize SEO props - must be before early returns to follow Rules of Hooks
  const seoProps = useMemo(() => {
    if (!blog) {
      return {
        title: "Loading... - Call Center Solutions Africa",
        description: "Loading blog post...",
      };
    }

    const baseUrl = 'https://callcentersolutionsafrica.com';
    const blogUrl = `${baseUrl}/blog/${blog.slug}`;
    
    // Calculate word count for article schema
    const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
    
    // Generate Article schema
    const articleSchema = getArticleSchema({
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      image: blog.image || `${baseUrl}/favicon.svg`,
      author: blog.author || 'Call Center Solutions Africa',
      datePublished: blog.date,
      dateModified: blog.date,
      url: blogUrl,
      category: blog.category,
      wordCount: wordCount
    });

    // Generate Breadcrumb schema
    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'Blog', url: `${baseUrl}/blog` },
      { name: blog.title, url: blogUrl }
    ]);

    return {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      keywords: blog.metaKeywords,
      image: blog.image,
      schema: [articleSchema, breadcrumbSchema].filter(Boolean)
    };
  }, [blog]);

  if (loading) {
    return (
      <>
        <SEO {...seoProps} />
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
              {/* Hero Section Skeleton */}
              <div className="w-full mb-12 animate-pulse">
                <div className="bg-gradient-to-br from-ccsa-dark-blue via-ccsa-dark-blue to-[#1a1f3a] rounded-lg p-8 sm:p-12 lg:p-16">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="h-6 w-32 bg-white/20 rounded-full mx-auto mb-6"></div>
                    <div className="h-10 sm:h-12 lg:h-14 bg-white/20 rounded-lg w-full max-w-3xl mx-auto mb-4"></div>
                    <div className="h-6 bg-white/20 rounded w-full max-w-2xl mx-auto mb-2"></div>
                    <div className="h-6 bg-white/20 rounded w-3/4 max-w-xl mx-auto"></div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="w-full max-w-4xl">
                <div className="flex flex-col items-center justify-center mb-12">
                  {/* Animated Spinner */}
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-ccsa-blue/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-ccsa-blue rounded-full animate-spin"></div>
                    <div className="absolute inset-3 border-4 border-ccsa-orange/20 rounded-full"></div>
                    <div 
                      className="absolute inset-3 border-4 border-transparent border-t-ccsa-orange rounded-full animate-spin" 
                      style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
                    ></div>
                    <div className="relative z-10 flex items-center justify-center">
                      <Icon icon="mdi:book-open-variant" className="w-8 h-8 text-ccsa-dark-blue" />
                    </div>
                  </div>
                  
                  {/* Loading Text */}
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-3">
                      Loading Article
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base mb-6">
                      Please wait...
                    </p>
                    
                    {/* Animated Dots */}
                    <div className="flex items-center justify-center gap-2">
                      <div 
                        className="w-2.5 h-2.5 bg-ccsa-blue rounded-full animate-bounce" 
                        style={{ animationDelay: '0s' }}
                      ></div>
                      <div 
                        className="w-2.5 h-2.5 bg-ccsa-blue rounded-full animate-bounce" 
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div 
                        className="w-2.5 h-2.5 bg-ccsa-blue rounded-full animate-bounce" 
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Content Skeleton Preview */}
                <div className="w-full animate-pulse">
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
                    <div className="h-64 sm:h-80 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-8"></div>
                    <div className="space-y-4">
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-4/6"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full mt-6"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
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
      <SEO {...seoProps} />
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Table of Contents */}
              <TableOfContents 
                headings={headings}
                activeId={activeHeadingId}
              />

              {/* Main Content Area */}
              <div className="flex-1 min-w-0 lg:max-w-4xl lg:mx-auto">
                {/* Featured Image */}
                {blog.image && (
                  <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-12 border border-gray-200 shadow-sm bg-gray-100">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-contain"
                      priority
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                    />
                  </div>
                )}

                {/* Main Content */}
                <article 
                  ref={contentRef}
                  className="prose prose-lg max-w-none prose-headings:text-ccsa-dark-blue prose-headings:font-bold prose-a:text-ccsa-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-ccsa-dark-blue prose-code:text-ccsa-dark-blue"
                >
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
                    <ShareButtons blog={blog} />
                  </div>
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
                {relatedBlogs.map((relatedBlog, index) => (
                  <BlogCardProfessional
                    key={relatedBlog.id}
                    post={relatedBlog}
                    variant={index === 0 ? "featured" : "default"}
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