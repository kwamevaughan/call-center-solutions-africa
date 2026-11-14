import React from "react";
import type { Metadata } from "next";
import { blogService } from "@/shared/lib/blogService";
import BlogPostClient from "@/features/blog/components/BlogPost";
import type { FormattedPost } from "@sanity/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await blogService.getAllSlugs();
    return slugs.map((slug: string) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blog = await blogService.getBlogBySlug(slug);
    if (!blog) return { title: "Blog Post Not Found" };
    return {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      openGraph: {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt,
        images: blog.image ? [{ url: blog.image }] : [],
      },
    };
  } catch {
    return { title: "Blog | Call Center Solutions Africa" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const blog = await blogService.getBlogBySlug(slug);
    if (!blog) return null; // triggers not-found
    const relatedBlogs: FormattedPost[] = blog.categoryData?.length
      ? await blogService.getRelatedBlogs(
          blog.id,
          blog.categoryData.map((c) => c._id),
          3,
        )
      : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Client = BlogPostClient as React.ComponentType<any>;
    return <Client blog={blog} relatedBlogs={relatedBlogs} />;
  } catch {
    return null;
  }
}
