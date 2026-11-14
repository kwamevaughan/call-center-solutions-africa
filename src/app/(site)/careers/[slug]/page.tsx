import type { Metadata } from "next";
import { client } from "@sanity/lib/client";
import { jobBySlugQuery, jobSlugsQuery } from "@sanity/lib/queries";
import JobDetailClient from "@/features/careers/components/JobDetailPage";
import { notFound } from "next/navigation";
import { getKaziOpenJob, mergeKaziJob } from "@/lib/kazi-careers";

const CCSA_URL = "https://callcentersolutionsafrica.com";

function jobPostingSchema(job: any, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description:
      job.summary ??
      job.roleOverview?.[0]?.children
        ?.map((child: any) => child.text)
        .join("") ??
      `Join CCSA as a ${job.title}.`,
    datePosted: job.publishedAt ?? new Date().toISOString(),
    validThrough: job.closesAt ?? job.closingDate ?? undefined,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "Call Center Solutions Africa",
      sameAs: CCSA_URL,
    },
    jobLocation: job.location
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
            addressCountry: "KE",
          },
        }
      : undefined,
    url: `${CCSA_URL}/careers/${encodeURIComponent(slug)}`,
  };
}

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
  const kaziJob = job.kaziJobSlug
    ? await getKaziOpenJob(job.kaziJobSlug)
    : null;
  if (job.kaziJobSlug && kaziJob === null) return { title: "Job Not Found" };
  const mergedJob = job.kaziJobSlug ? mergeKaziJob(job, kaziJob) : job;
  return {
    title: `${mergedJob.title} | Careers | Call Center Solutions Africa`,
    description: mergedJob.summary || `Join CCSA as a ${mergedJob.title}`,
    alternates: { canonical: `/careers/${slug}` },
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
  const kaziJob = job.kaziJobSlug
    ? await getKaziOpenJob(job.kaziJobSlug)
    : null;
  if (job.kaziJobSlug && kaziJob === null) notFound();
  const mergedJob = job.kaziJobSlug ? mergeKaziJob(job, kaziJob) : job;
  const structuredData = JSON.stringify(
    jobPostingSchema(mergedJob, slug),
  ).replace(/</g, "\\u003c");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <JobDetailClient job={mergedJob} />
    </>
  );
}
