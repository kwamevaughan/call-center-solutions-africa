import type { Metadata } from "next";
import ClientPage from "@/features/case-studies/components/CaseStudiesIndex";

export const metadata: Metadata = {
  title: "Case Studies | Call Center Solutions Africa",
  description:
    "Explore CCSA case studies across sales, onboarding, telemarketing and tele-research campaigns.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
