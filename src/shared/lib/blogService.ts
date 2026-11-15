import { client } from "../../../sanity/lib/client";
import {
  postsQuery,
  postsByCategoryQuery,
  postsBySearchQuery,
  postBySlugQuery,
  relatedPostsQuery,
  featuredPostsQuery,
  categoriesQuery,
  postSlugsQuery,
} from "../../../sanity/lib/queries";
import type {
  SanityPost,
  SanityCategory,
  FormattedPost,
  BlogListResult,
} from "../../../sanity/lib/types";
import type { PortableTextBlock } from "@portabletext/types";

// ─── Blog service ─────────────────────────────────────────────────────────────

interface PaginatedResult {
  posts: SanityPost[];
  total: number;
}

export const blogService = {
  /** Get published posts with optional category/search filter and pagination */
  async getBlogs(
    page = 1,
    limit = 9,
    category: string | null = null,
    search: string | null = null,
  ): Promise<BlogListResult> {
    const start = (page - 1) * limit;
    const end = start + limit;

    let result: PaginatedResult;

    if (search) {
      result = await client.fetch<PaginatedResult>(postsBySearchQuery, {
        search: `*${search}*`,
        start,
        end,
      });
    } else if (category && category !== "all") {
      result = await client.fetch<PaginatedResult>(postsByCategoryQuery, {
        categorySlug: category,
        start,
        end,
      });
    } else {
      result = await client.fetch<PaginatedResult>(postsQuery, { start, end });
    }

    const posts = result.posts ?? [];
    const totalCount = result.total ?? 0;

    return {
      blogs: posts.map(formatBlogData),
      totalCount,
      hasMore: posts.length === limit,
    };
  },

  /** Get a single published post by slug */
  async getBlogBySlug(slug: string): Promise<FormattedPost> {
    const data = await client.fetch<SanityPost | null>(postBySlugQuery, {
      slug,
    });
    if (!data) throw new Error(`Post not found: ${slug}`);
    return formatBlogData(data);
  },

  /** Get the latest/featured posts */
  async getFeaturedBlogs(limit = 3): Promise<FormattedPost[]> {
    const data = await client.fetch<SanityPost[]>(featuredPostsQuery, {
      limit,
    });
    return (data ?? []).map(formatBlogData);
  },

  /** Get all categories */
  async getCategories(): Promise<SanityCategory[]> {
    const data = await client.fetch<SanityCategory[]>(categoriesQuery);
    return data ?? [];
  },

  /** Get related posts (same category, exclude current) */
  async getRelatedBlogs(
    currentBlogId: string,
    categoryIds: string[] = [],
    limit = 3,
  ): Promise<FormattedPost[]> {
    const data = await client.fetch<SanityPost[]>(relatedPostsQuery, {
      currentId: currentBlogId,
      categoryIds,
      limit,
    });
    return (data ?? []).map(formatBlogData);
  },

  /** All published slugs (for getStaticPaths / sitemap) */
  async getAllSlugs(): Promise<string[]> {
    const data = await client.fetch<Array<{ slug: string }>>(postSlugsQuery);
    return (data ?? []).map((item) => item.slug);
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Resolve the best available image URL for a post */
export function getPostImageUrl(post: SanityPost): string | null {
  if (post.mainImage?.asset) {
    const ref = post.mainImage.asset as { _ref?: string; url?: string };
    if (ref.url) return ref.url;
    if (ref._ref) {
      const [, id, dim, fmt] = ref._ref.split("-");
      return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "jf7k2yuf"}/production/${id}-${dim}.${fmt}`;
    }
  }
  if (post.mainImageUrl) return post.mainImageUrl;
  return null;
}

/** Map a raw Sanity post to the shape components expect */
export function formatBlogData(post: SanityPost): FormattedPost {
  const imageUrl = getPostImageUrl(post);

  // Content: PT body takes priority; rawHtml is the fallback for migrated posts
  const content: PortableTextBlock[] | string | null =
    post.body && Array.isArray(post.body) && post.body.length > 0
      ? post.body
      : (post.rawHtml ?? null);

  return {
    id: post._id,
    title: post.title,
    excerpt: post.excerpt ?? "",
    content,
    image: imageUrl,
    slug:
      typeof post.slug === "string" ? post.slug : (post.slug?.current ?? ""),
    category: post.categories?.[0]?.slug?.current ?? null,
    categoryName: post.categories?.[0]?.name ?? null,
    categoryData: post.categories ?? [],
    tags: post.tags ?? [],
    author: post.author?.name ?? "CCSA Team",
    authorId: post.author?._id,
    authorData: post.author ?? null,
    date: post.publishedAt ?? post._createdAt,
    readTime: calculateReadTime(content),
    metaTitle: post.metaTitle ?? post.title,
    metaDescription: post.metaDescription ?? post.excerpt ?? "",
    metaKeywords: post.metaKeywords ?? "",
    focusKeyword: post.focusKeyword ?? "",
    canonicalUrl: post.canonicalUrl ?? null,
    ogTitle: post.ogTitle ?? post.metaTitle ?? post.title,
    ogDescription:
      post.ogDescription ?? post.metaDescription ?? post.excerpt ?? "",
    twitterCard: post.twitterCard ?? "summary_large_image",
    isPublished: post.isPublished,
    isDraft: post.isDraft,
  };
}

/** Estimate read time from either PT blocks or an HTML string */
export function calculateReadTime(
  content: PortableTextBlock[] | string | null,
): string {
  if (!content) return "2 min read";

  let text = "";

  if (Array.isArray(content)) {
    text = content
      .filter((b) => b._type === "block")
      .map((b) =>
        ((b as { children?: Array<{ text?: string }> }).children ?? [])
          .map((c) => c.text ?? "")
          .join(""),
      )
      .join(" ");
  } else {
    // Strip HTML tags for a rough word count
    text = content.replace(/<[^>]+>/g, " ");
  }

  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/** Format an ISO date string for display */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
