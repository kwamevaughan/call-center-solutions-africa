import type { Metadata } from "next";
import ClientPage from "@/features/services/components/QualityAssuranceCXAnalyticsPage";

export const metadata: Metadata = {
  title: "Quality Assurance & CX Analytics | Call Center Solutions Africa",
  description: "Real-time QA, call scoring and CX analytics to improve service quality.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
