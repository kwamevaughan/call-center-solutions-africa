import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Claims, Dispute & Verification Services | Call Center Solutions Africa",
  description: "Accurate claims processing and dispute resolution. Reduce fraud and improve customer satisfaction.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
