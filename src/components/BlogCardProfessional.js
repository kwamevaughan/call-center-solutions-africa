import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { formatDate } from "@/lib/blogService";

const BlogCardProfessional = ({ post, variant = "default" }) => {
  console.log('BlogCardProfessional received post:', post);
  
  if (!post) {
    console.error('BlogCardProfessional: No post data provided');
    return null;
  }

  const variants = {
    default: {
      container: "bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden group",
      imageHeight: "h-48",
      contentPadding: "p-6",
      titleSize: "text-lg font-semibold",
      excerptSize: "text-sm",
      metaSize: "text-xs"
    },
    compact: {
      container: "bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden group",
      imageHeight: "h-20",
      contentPadding: "p-4",
      titleSize: "text-sm font-medium",
      excerptSize: "text-xs",
      metaSize: "text-xs"
    },
    featured: {
      container: "bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200 overflow-hidden group",
      imageHeight: "h-64",
      contentPadding: "p-8",
      titleSize: "text-2xl font-bold",
      excerptSize: "text-base",
      metaSize: "text-sm"
    }
  };

  const styles = variants[variant] || variants.default;

  // Handle missing image with fallback
  const imageSrc = post.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&crop=center";
  const imageAlt = post.title || "Blog post image";

  return (
    <article className={styles.container}>
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className={`relative ${styles.imageHeight} overflow-hidden`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.category && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={styles.contentPadding}>
          {/* Meta Information */}
          <div className={`flex items-center text-gray-500 ${styles.metaSize} mb-3`}>
            <div className="flex items-center mr-4">
              <Icon icon="heroicons:calendar" className="w-3 h-3 mr-1" />
              {formatDate(post.date)}
            </div>
            {post.readTime && (
              <div className="flex items-center">
                <Icon icon="heroicons:clock" className="w-3 h-3 mr-1" />
                {post.readTime}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className={`${styles.titleSize} text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && variant !== "compact" && (
            <p className={`${styles.excerptSize} text-gray-600 line-clamp-3 mb-4`}>
              {post.excerpt}
            </p>
          )}

          {/* Author */}
          {post.author && variant !== "compact" && (
            <div className="flex items-center text-gray-500">
              <Icon icon="heroicons:user" className="w-4 h-4 mr-2" />
              <span className="text-sm">{post.author}</span>
            </div>
          )}

          {/* Read More */}
          {variant !== "compact" && (
            <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
              Read more
              <Icon icon="heroicons:arrow-right" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default BlogCardProfessional;
