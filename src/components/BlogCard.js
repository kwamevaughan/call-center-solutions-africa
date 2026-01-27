import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { formatDate } from "@/lib/blogService";

const BlogCard = ({ post, variant = "default" }) => {
  const variants = {
    default: {
      container: "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0088D2]/20 group",
      imageHeight: "h-48 sm:h-56",
      contentPadding: "p-6 sm:p-8",
      titleSize: "text-lg sm:text-xl font-bold",
      excerptSize: "text-sm sm:text-base",
      metaSize: "text-xs sm:text-sm"
    },
    featured: {
      container: "bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-[#0088D2]/20 group transform hover:-translate-y-2",
      imageHeight: "h-56 sm:h-64",
      contentPadding: "p-6 sm:p-8",
      titleSize: "text-xl sm:text-2xl font-bold",
      excerptSize: "text-base sm:text-lg",
      metaSize: "text-sm sm:text-base"
    },
    compact: {
      container: "bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 hover:from-blue-50 hover:to-gray-50 transition-all duration-300 border border-gray-200 hover:border-[#0088D2]/30 group",
      imageHeight: "h-24 sm:h-32",
      contentPadding: "p-0",
      titleSize: "text-sm sm:text-base font-bold",
      excerptSize: "text-xs sm:text-sm",
      metaSize: "text-xs"
    }
  };

  const styles = variants[variant] || variants.default;

  // Handle missing image with fallback
  const imageSrc = post.image || "/assets/images/hero-1.jpg";
  const imageAlt = post.title || "Blog post image";

  return (
    <article className={styles.container}>
      {variant !== "compact" && (
        <div className={`relative ${styles.imageHeight} overflow-hidden bg-gray-100`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className={`absolute top-4 left-4`}>
            <span className={`bg-gradient-to-r from-[#FFD100] to-[#F45B00] text-gray-900 rounded-full font-semibold shadow-lg ${variant === "featured" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs"}`}>
              {post.category || "General"}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
              <Icon icon="mdi:arrow-right" className="text-[#0088D2] text-lg" />
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.contentPadding}>
        <div className={`flex items-center text-gray-500 mb-3 ${styles.metaSize}`}>
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 mr-2">
            <Icon icon="mdi:calendar" className="mr-1 text-[#0088D2]" /> 
            {formatDate(post.date)}
          </div>
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
            <Icon icon="mdi:clock-outline" className="mr-1 text-[#0088D2]" /> 
            {post.readTime || "2 min read"}
          </div>
        </div>
        
        <h3 className={`text-gray-900 mb-3 leading-tight ${styles.titleSize} group-hover:text-[#0088D2] transition-colors duration-300`}>
          <Link href={`/blog/${post.slug}`} className="hover:text-[#0088D2] transition-colors">
            {post.title}
          </Link>
        </h3>
        
        {variant !== "compact" && (
          <p className={`text-gray-600 mb-6 leading-relaxed ${styles.excerptSize}`}>
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0088D2] to-[#0056B3] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shadow-md">
              {(post.author || "A").split(' ').map(name => name[0]).join('')}
            </div>
            <span className={`text-gray-600 font-medium ${styles.metaSize}`}>
              {post.author || "Anonymous"}
            </span>
          </div>
          {variant !== "compact" && (
            <Link 
              href={`/blog/${post.slug}`}
              className={`text-[#0088D2] hover:text-[#0056B3] font-semibold ${styles.metaSize} flex items-center group-hover:translate-x-1 transition-transform duration-300`}
            >
              Read More
              <Icon icon="mdi:arrow-right" className="ml-1" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
