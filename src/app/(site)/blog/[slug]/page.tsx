// @ts-nocheck
import type { Metadata } from "next";
import { blogService } from "@/lib/blogService";
import BlogPostClient from "./_client";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await blogService.getAllSlugs();
    return slugs.map((slug: string) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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
        images: blog.coverImage ? [{ url: blog.coverImage }] : [],
      },
    };
  } catch {
    return { title: "Blog | Call Center Solutions Africa" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const blog = await blogService.getBlogBySlug(slug);
    if (!blog) return null; // triggers not-found
    const relatedBlogs = blog.categoryData?.length
      ? await blogService.getRelatedBlogs(blog.id, blog.categoryData.map((c: any) => c._id || c.id), 3)
      : [];
    return <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} />;
  } catch {
    return null;
  }
}
