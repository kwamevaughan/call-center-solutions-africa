import type { Metadata } from "next";
import ClientPage from "@/features/services/components/CustomerRetentionLoyaltyPage";

export const metadata: Metadata = {
  title: "Customer Retention & Loyalty | Call Center Solutions Africa",
  description:
    "Reduce churn, win-back lost customers and build lasting loyalty with CCSA retention specialists.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
