import type { Metadata } from "next";
import { client } from '@sanity/lib/client';
import { jobPostingsQuery } from '@sanity/lib/queries';
import CareersClient from "@/features/careers/components/CareersPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers | Call Center Solutions Africa",
  description: "Join our team at Call Center Solutions Africa. We're hiring talented professionals to deliver exceptional customer service.",
  keywords: "careers, jobs, call center jobs Africa, customer service jobs, BPO careers, Nairobi jobs",
};

export default async function CareersPage() {
  let jobs: any[] = [];
  try {
    const all = await client.fetch(jobPostingsQuery);
    jobs = all.filter((j: any) => j.status === "open");
  } catch {}
  return <CareersClient jobs={jobs} />;
}
