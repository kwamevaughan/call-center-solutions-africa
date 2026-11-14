import type { Metadata } from "next";
import CareersClient from "@/features/careers/components/CareersPage";
import { getKaziJobs } from "@/lib/kazi-careers";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers | Call Center Solutions Africa",
  description:
    "Join our team at Call Center Solutions Africa. We're hiring talented professionals to deliver exceptional customer service.",
  keywords:
    "careers, jobs, call center jobs Africa, customer service jobs, BPO careers, Nairobi jobs",
};

export default async function CareersPage() {
  const jobs = await getKaziJobs();
  return <CareersClient jobs={jobs} />;
}
