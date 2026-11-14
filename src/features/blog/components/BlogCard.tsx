import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface BlogPost {
  id?: string;
  slug: string | { current: string };
  title: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  publishedAt?: string;
  readTime?: string | number;
  author?: string;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "featured" | "default";
}

const BlogCard = ({ post, variant = "default" }: BlogCardProps) => {
  const slug = typeof post.slug === "object" ? post.slug.current : post.slug;

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {post.coverImage && (
          <div className={`relative overflow-hidden ${variant === "featured" ? "aspect-[16/9]" : "aspect-[16/9]"}`}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex flex-col flex-1 p-5">
          {post.category && (
            <span className="text-xs font-semibold uppercase tracking-widest text-ccsa-blue mb-2">
              {post.category}
            </span>
          )}
          <h3 className="font-bold text-ccsa-dark-blue leading-snug mb-2 group-hover:text-ccsa-blue transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-4">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3 border-t border-slate-100">
            <span>{post.publishedAt}</span>
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Icon icon="mdi:clock-outline" width={12} height={12} />
                {post.readTime} min read
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
