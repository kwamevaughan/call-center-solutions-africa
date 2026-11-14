import type { Metadata } from "next";
import ClientPage from "@/features/services/components/SalesRevenueEnablementPage";

export const metadata: Metadata = {
  title: "Sales & Revenue Enablement | Call Center Solutions Africa",
  description:
    "B2B and B2C telesales, upselling and cross-selling to grow your revenue from Africa.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
