import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Contact Us | Get a Custom BPO Proposal | Call Center Solutions Africa",
  description: "Contact Call Center Solutions Africa for a custom BPO proposal. Reach our team to discuss your customer service outsourcing needs.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
