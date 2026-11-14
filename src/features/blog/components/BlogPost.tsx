// @ts-nocheck
"use client";
import { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { PortableText } from '@portabletext/react';
import BlogCardProfessional from "@/features/blog/components/BlogCardProfessional";
import { blogService, formatDate } from "@/shared/lib/blogService";
import { getArticleSchema, getBreadcrumbSchema } from "@/shared/lib/schemas";
import { urlForImage } from '@sanity/lib/image';

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

// Portable Text components for rendering Sanity rich text
const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = value.asset?.url || urlForImage(value)?.url()
      if (!src) return null
      return (
        <figure className="my-8">
          <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image src={src} alt={value.alt || ''} fill className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }) => {
      const styles = {
        info: 'bg-blue-50 border-blue-400 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
        success: 'bg-green-50 border-green-400 text-green-800',
        error: 'bg-red-50 border-red-400 text-red-800',
      }
      return (
        <div className={`border-l-4 p-4 my-6 rounded-r-lg ${styles[value.type] || styles.info}`}>
          <p className="font-medium">{value.text}</p>
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-ccsa-blue hover:underline"
      >
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-bold text-ccsa-dark-blue mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold text-ccsa-dark-blue mt-8 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold text-ccsa-dark-blue mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-ccsa-blue pl-4 italic text-gray-600 my-6">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700">{children}</ol>,
  },
}

const BlogPost = ({ blog, relatedBlogs = [] }) => {
  const [headings, setHeadings] = useState([]);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const contentRef = useRef(null);

  // Extract headings from Portable Text body blocks for Table of Contents
  useEffect(() => {
    if (!blog?.content || !Array.isArray(blog.content)) return;

    const extracted = blog.content
      .filter((block) => block._type === 'block' && ['h2', 'h3', 'h4'].includes(block.style))
      .map((block, index) => {
        const text = block.children?.map((c) => c.text || '').join('') || '';
        const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
        return { id, text, level: parseInt(block.style.charAt(1)) };
      });

    setHeadings(extracted);
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
    
    // Calculate word count from Portable Text
    const wordCount = Array.isArray(blog.content)
      ? blog.content
          .filter((b) => b._type === 'block')
          .map((b) => b.children?.map((c) => c.text || '').join(' ') || '')
          .join(' ')
          .split(/\s+/).filter(Boolean).length
      : 0;
    
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

  if (!blog) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
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
                  {Array.isArray(blog.content) ? (
                    <PortableText value={blog.content} components={portableTextComponents} />
                  ) : (
                    <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content || '' }} />
                  )}
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
    </>
  );
};

export default BlogPost;
