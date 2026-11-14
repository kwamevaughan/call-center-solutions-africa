import type { Metadata } from "next";
import ClientPage from "@/features/services/components/InboundOutboundCustomerServicePage";

export const metadata: Metadata = {
  title: "Inbound & Outbound Customer Service | Call Center Solutions Africa",
  description: "Responsive inbound and proactive outbound customer service from Africa.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
