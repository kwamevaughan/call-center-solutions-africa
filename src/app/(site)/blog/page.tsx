import React, { Suspense } from "react";
import type { Metadata } from "next";
import { blogService } from "@/shared/lib/blogService";
import BlogIndexClient from "@/features/blog/components/BlogPage";
import type { FormattedPost, SanityCategory } from "@sanity/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Blog | BPO Insights & Customer Experience Strategies | Call Center Solutions Africa",
  description:
    "Explore CCSA's blog for expert insights on BPO, customer experience, contact center operations and outsourcing strategies from Africa.",
};

export default async function BlogPage() {
  let initialBlogs: FormattedPost[] = [];
  let initialTotalCount = 0;
  let initialHasMore = false;
  let initialCategories: SanityCategory[] = [];

  try {
    const [blogsResult, categoriesData] = await Promise.all([
      blogService.getBlogs(1, 12),
      blogService.getCategories(),
    ]);
    initialBlogs = blogsResult.blogs;
    initialTotalCount = blogsResult.totalCount;
    initialHasMore = blogsResult.hasMore;
    initialCategories = categoriesData;
  } catch {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Client = BlogIndexClient as React.ComponentType<any>;
  return (
    <Suspense fallback={null}>
      <Client
        initialBlogs={initialBlogs}
        initialTotalCount={initialTotalCount}
        initialHasMore={initialHasMore}
        initialCategories={initialCategories}
      />
    </Suspense>
  );
}
