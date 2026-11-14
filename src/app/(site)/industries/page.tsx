import type { Metadata } from "next";
import ClientPage from "@/features/industries/components/IndustriesPage";

export const metadata: Metadata = {
  title: "Industries We Serve | Call Center Solutions Africa",
  description:
    "CCSA serves diverse industries with tailored BPO solutions – from e-commerce to fintech, healthcare to telecoms.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
