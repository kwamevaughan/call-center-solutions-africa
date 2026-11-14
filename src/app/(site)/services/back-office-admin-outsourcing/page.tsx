import type { Metadata } from "next";
import ClientPage from "@/features/services/components/BackOfficeAdminOutsourcingPage";

export const metadata: Metadata = {
  title: "Back Office & Admin Outsourcing | Call Center Solutions Africa",
  description: "Reliable back-office operations from Africa. Data processing, billing, content moderation and reporting.",
};

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
