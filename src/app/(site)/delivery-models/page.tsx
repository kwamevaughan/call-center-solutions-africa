import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Delivery Models | Flexible BPO Engagement Options | Call Center Solutions Africa",
  description: "Explore our flexible delivery models – dedicated teams, shared resources, hybrid models and project-based engagements.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
