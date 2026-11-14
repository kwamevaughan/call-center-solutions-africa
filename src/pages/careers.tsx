"use client";

import { useRef, useEffect, useMemo } from "react";
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useFixedHeader } from "../../utils/scrollUtils";
import { getCollectionPageSchema, getBreadcrumbSchema } from "@/lib/schemas";
import { client } from "../../sanity/lib/client";
import { jobPostingsQuery } from "../../sanity/lib/queries";

const DEPT_LABELS: Record<string, string> = {
  sales: "Sales",
  cx: "Customer Experience",
  operations: "Operations",
  technology: "Technology",
  qa: "Quality Assurance",
  hr: "Human Resources",
  finance: "Finance",
  other: "Other",
};

const JobCard = ({ job }: { job: any }) => {
  const dept = DEPT_LABELS[job.department] ?? job.department;
  const languages = job.languages?.join(" · ");

  return (
    <Link href={`/careers/${job.slug}`} className="group block h-full">
      <div className="group relative flex h-full flex-col rounded-2xl overflow-hidden bg-ccsa-dark-blue transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(1,86,153,0.4)]">
        <div className="h-1 w-full bg-ccsa-blue" />

        <div className="flex flex-col flex-1 gap-4 p-6">
          {/* Status + dept */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Now Hiring
            </span>
            {dept && (
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">
                {dept}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white leading-snug transition-colors duration-300 group-hover:text-ccsa-blue">
            {job.title}
          </h3>

          {job.summary && (
            <p className="text-sm text-white/50 leading-relaxed line-clamp-3 flex-1">
              {job.summary}
            </p>
          )}

          <div className="flex flex-col gap-2 text-sm text-white/50 pt-2 border-t border-white/10">
            {job.location && (
              <span className="flex items-center gap-2">
                <Icon icon="mdi:map-marker-outline" width={14} height={14} className="shrink-0" />
                {job.location}
              </span>
            )}
            {job.openings && (
              <span className="flex items-center gap-2">
                <Icon icon="mdi:account-multiple-outline" width={14} height={14} className="shrink-0" />
                {job.openings} opening{job.openings > 1 ? "s" : ""}
              </span>
            )}
            {languages && (
              <span className="flex items-center gap-2">
                <Icon icon="mdi:translate" width={14} height={14} className="shrink-0" />
                {languages}
              </span>
            )}
            {job.hiringTimeline && (
              <span className="flex items-center gap-2">
                <Icon icon="mdi:calendar-clock-outline" width={14} height={14} className="shrink-0" />
                {job.hiringTimeline}
              </span>
            )}
          </div>

          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-ccsa-blue transition-colors">
              View role
              <Icon
                icon="mdi:arrow-right"
                width={16}
                height={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const CareersPage = ({ jobs = [] }: { jobs: any[] }) => {
  const homeRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<HTMLElement>(null);

  useFixedHeader();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("section-visible")),
      { threshold: 0.1 }
    );
    [homeRef, positionsRef].forEach((r) => r.current && observer.observe(r.current));
    return () => [homeRef, positionsRef].forEach((r) => r.current && observer.unobserve(r.current));
  }, []);

  const seoSchemas = useMemo(() => {
    const baseUrl = "https://callcentersolutionsafrica.com";
    return [
      getCollectionPageSchema({ name: "Careers", description: "Join our team at Call Center Solutions Africa.", url: `${baseUrl}/careers` }),
      getBreadcrumbSchema([{ name: "Home", url: baseUrl }, { name: "Careers", url: `${baseUrl}/careers` }]),
    ];
  }, []);

  return (
    <>
      <SEO
        title="Careers | Call Center Solutions Africa"
        description="Join our team at Call Center Solutions Africa. We're hiring talented professionals to deliver exceptional customer service."
        schema={seoSchemas}
        keywords="careers, jobs, call center jobs Africa, customer service jobs, BPO careers, Nairobi jobs"
      />
      <Header />

      <main className="relative overflow-x-hidden">
        {/* Hero */}
        <div
          className="relative bg-gradient-to-br from-ccsa-dark-blue via-ccsa-dark-blue to-[#1a1f3a] px-4 py-20 sm:py-24 lg:py-32"
          id="home"
          ref={homeRef}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <Icon icon="mdi:briefcase-outline" width={16} height={16} className="text-ccsa-yellow" />
              <span className="text-xs font-semibold text-white uppercase tracking-widest">We&apos;re Hiring</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Build Your Career<br className="hidden sm:block" /> with CCSA
            </h1>
            <p className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed max-w-xl mx-auto">
              Join a team delivering world-class customer experience from Africa to global markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#positions"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-ccsa-blue text-white font-semibold rounded-xl hover:bg-ccsa-blue/90 transition-all text-sm"
              >
                <Icon icon="mdi:briefcase" width={18} height={18} />
                View Open Positions
              </a>
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm"
              >
                Learn About Us
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-10 border-t border-white/10 pt-10">
              {[
                { value: `${jobs.length}`, label: "Open Roles" },
                { value: "Nairobi", label: "Based In" },
                { value: "Global", label: "Client Base" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wide mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why work with us */}
        <section className="bg-white border-b border-slate-100 py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-3">Why Work With Us</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm">
                Competitive benefits, real growth, and a culture that rewards performance
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "mdi:currency-usd", title: "Competitive Pay", desc: "Market-rate salary + commissions" },
                { icon: "mdi:school-outline", title: "Learning & Growth", desc: "Ongoing training and coaching" },
                { icon: "mdi:account-group-outline", title: "Team Culture", desc: "Collaborative, high-performance" },
                { icon: "mdi:heart-pulse", title: "Health Benefits", desc: "Comprehensive medical cover" },
              ].map((b, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 hover:border-ccsa-blue/40 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-ccsa-blue/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon icon={b.icon} width={20} height={20} className="text-ccsa-blue" />
                  </div>
                  <h3 className="text-sm font-bold text-ccsa-dark-blue mb-1">{b.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open positions grid */}
        <section id="positions" ref={positionsRef} className="bg-slate-100 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-ccsa-blue mb-1">Opportunities</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-ccsa-dark-blue">Current Openings</h2>
            </div>

            {jobs.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-ccsa-dark-blue p-10 text-center">
                <Icon icon="mdi:briefcase-off-outline" width={40} height={40} className="mx-auto mb-4 text-white/20" />
                <p className="text-white font-semibold mb-2">No open roles right now</p>
                <p className="text-white/50 text-sm mb-6">
                  We&apos;re always looking for exceptional talent. Send your CV and we&apos;ll reach out when something fits.
                </p>
                <a
                  href="mailto:careers@callcentersolutionsafrica.com"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-ccsa-blue text-white text-sm font-semibold rounded-lg hover:bg-ccsa-blue/90 transition-colors"
                >
                  Send Speculative Application
                </a>
              </div>
            )}
          </div>
        </section>

        <FloatingCTA />
        <Footer />
      </main>
    </>
  );
};

export default CareersPage;

export async function getStaticProps() {
  try {
    const allJobs: any[] = await client.fetch(jobPostingsQuery);
    const jobs = allJobs.filter((j) => j.status === "open");
    return { props: { jobs }, revalidate: 60 };
  } catch {
    return { props: { jobs: [] }, revalidate: 60 };
  }
}
