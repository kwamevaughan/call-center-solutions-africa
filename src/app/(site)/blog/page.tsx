// @ts-nocheck
import type { Metadata } from "next";
import { blogService } from "@/lib/blogService";
import BlogIndexClient from "./_client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | BPO Insights & Customer Experience Strategies | Call Center Solutions Africa",
  description: "Explore CCSA's blog for expert insights on BPO, customer experience, contact center operations and outsourcing strategies from Africa.",
};

export default async function BlogPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let initialBlogs: any[] = [];
  let initialTotalCount = 0;
  let initialHasMore = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let initialCategories: any[] = [];

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

  return (
    <BlogIndexClient
      initialBlogs={initialBlogs}
      initialTotalCount={initialTotalCount}
      initialHasMore={initialHasMore}
      initialCategories={initialCategories}
    />
  );
}
