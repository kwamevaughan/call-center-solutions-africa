import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogCard from "./BlogCard";
import { blogService, formatBlogData } from "@/lib/blogService";

const BlogSection = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      setLoading(true);
      const posts = await blogService.getFeaturedBlogs(3);
      setRecentPosts(posts.map(formatBlogData));
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
            <p className="text-lg sm:text-xl font-semibold text-gray-900">Latest Insights</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Industry Insights & Best Practices
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay ahead of the curve with expert insights, best practices, and the latest trends in call center operations and customer experience across Africa.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded"></div>
              </div>
            ))}
          </div>
        ) : recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="default" />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon icon="mdi:file-document-outline" className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles available</h3>
            <p className="text-gray-600 mb-6">
              Check back soon for the latest insights and industry updates.
            </p>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center bg-[#0088D2] text-white px-8 py-3 rounded-lg hover:bg-[#0056B3] transition-colors duration-300 font-medium"
          >
            View All Articles
            <Icon icon="mdi:arrow-right" className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
