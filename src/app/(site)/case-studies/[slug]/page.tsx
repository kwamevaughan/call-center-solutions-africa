// @ts-nocheck
import type { Metadata } from "next";
import { caseStudyDetails, getCaseStudyBySlug, getAdjacentCaseStudies } from "@/data/caseStudies";
import CaseStudyClient from "./_client";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseStudyDetails.map((s: any) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: `${study.title} | Case Studies | Call Center Solutions Africa`,
    description: study.description || study.excerpt || "Read this CCSA case study.",
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();
  const { prev, next, index } = getAdjacentCaseStudies(slug);
  return <CaseStudyClient study={study} prev={prev} next={next} index={index} />;
}
