import type { Metadata } from "next";
import HomeClient from "@/features/home/components/HomePage";

export const metadata: Metadata = {
  title: "Excellence in Customer Service Outsourcing from Africa | CCSA",
  description: "CCSA delivers world-class, secure, and multilingual customer service outsourcing from Africa. Offering 45–60% cost savings, ISO 27001 compliance, and 24/7 CX delivery.",
  keywords: "call center solutions Africa, BPO services Africa, contact center technology, customer experience Africa, Nairobi call center",
};

export default function HomePage() {
  return <HomeClient />;
}
