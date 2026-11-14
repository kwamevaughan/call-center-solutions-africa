import type { Metadata } from "next";
import { client } from "@sanity/lib/client";
import { jobBySlugQuery, jobSlugsQuery } from "@sanity/lib/queries";
import JobDetailClient from "@/features/careers/components/JobDetailPage";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(jobSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await client.fetch(jobBySlugQuery, { slug });
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} | Careers | Call Center Solutions Africa`,
    description: job.summary || `Join CCSA as a ${job.title}`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await client.fetch(jobBySlugQuery, { slug });
  if (!job) notFound();
  return <JobDetailClient job={job} />;
}
