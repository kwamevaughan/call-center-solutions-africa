import type { Metadata } from "next";
import ClientPage from "@/features/about/components/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Call Center Solutions Africa",
  description: "Learn about Call Center Solutions Africa – your trusted BPO partner delivering world-class customer experience from Africa.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
