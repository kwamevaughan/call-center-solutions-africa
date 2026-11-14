import type { Metadata } from "next";
import ClientPage from "@/features/services/components/ServicesPage";

export const metadata: Metadata = {
  title: "BPO & Contact Center Services | Call Center Solutions Africa",
  description:
    "Explore CCSA's full suite of BPO and contact center services — from customer service to technical support, sales, and back-office operations.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
