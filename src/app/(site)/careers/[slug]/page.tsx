import type { Metadata } from "next";
import JobDetailClient from "@/features/careers/components/JobDetailPage";
import { notFound } from "next/navigation";
import { getKaziJob, getKaziJobs } from "@/lib/kazi-careers";

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
  const jobs = await getKaziJobs();
  return jobs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getKaziJob(slug);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} | Careers | Call Center Solutions Africa`,
    description: job.summary || `Join CCSA as a ${job.title}`,
    alternates: { canonical: `/careers/${slug}` },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getKaziJob(slug);
  if (!job) notFound();
  const structuredData = JSON.stringify(jobPostingSchema(job, slug)).replace(
    /</g,
    "\\u003c",
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <JobDetailClient job={job} />
    </>
  );
}
