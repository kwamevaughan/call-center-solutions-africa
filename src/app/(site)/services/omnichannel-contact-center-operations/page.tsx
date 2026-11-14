import type { Metadata } from "next";
import ClientPage from "@/features/services/components/OmnichannelContactCenterOperationsPage";

export const metadata: Metadata = {
  title: "Omnichannel Contact Center Operations | Call Center Solutions Africa",
  description: "Unified routing, knowledge, and analytics across all channels from Africa.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
