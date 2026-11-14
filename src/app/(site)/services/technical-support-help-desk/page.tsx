import type { Metadata } from "next";
import ClientPage from "@/features/services/components/TechnicalSupportHelpDeskPage";

export const metadata: Metadata = {
  title: "Technical Support & Help Desk | Call Center Solutions Africa",
  description: "Tier 1–3 technical support and help desk outsourcing from Africa.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
