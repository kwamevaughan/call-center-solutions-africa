// pages/case-studies/[slug].js
import Link from "next/link";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import SEO from "@/components/SEO";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { getWebPageSchema, getBreadcrumbSchema } from "@/lib/schemas";
import {
  getCaseStudyBySlug,
  getCaseStudyRegion,
  getAdjacentCaseStudies,
  getCaseStudyMetaDescription,
  caseStudyDetails,
  caseStudiesCta,
} from "@/data/caseStudies";

const BASE_URL = "https://callcentersolutionsafrica.com";

const sectionIcon = {
  profile: "mdi:domain",
  challenge: "mdi:chart-timeline-variant",
  delivered: "mdi:check-decagram",
  impact: "mdi:chart-areaspline",
};

function SectionBlock({ icon, title, children, className = "" }) {
  return (
    <div className={`scroll-mt-28 ${className}`}>
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-ccsa-dark-blue/5 text-[#ED761E] ring-1 ring-ccsa-dark-blue/10">
          <Icon icon={icon} width={22} height={22} />
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-lg font-semibold text-[#172840] tracking-tight">
            {title}
          </h2>
          <div className="mt-3 text-[15px] sm:text-base leading-relaxed text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudyPage({ study, prev, next, index }) {
  const region = getCaseStudyRegion(study.id);
  const pageUrl = `${BASE_URL}/case-studies/${study.id}`;
  const metaDescription = getCaseStudyMetaDescription(study);

  const seoSchemas = useMemo(() => {
    const webPageSchema = getWebPageSchema({
      name: `${study.headline} | CCSA Case Study`,
      description: metaDescription,
      url: pageUrl,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Case Studies", url: `${BASE_URL}/case-studies` },
      { name: study.headline, url: pageUrl },
    ]);

    return [webPageSchema, breadcrumbSchema];
  }, [study.headline, study.id, metaDescription, pageUrl]);

  return (
    <>
      <SEO
        title={`${study.headline} | Case Study | CCSA`}
        description={metaDescription}
        keywords="CCSA case study, contact center, BPO, telesales, telemarketing, merchant onboarding, tele-research"
        schema={seoSchemas}
      />
      <Header />
      <main className="min-h-screen flex flex-col bg-white">
        <section className="relative overflow-hidden bg-ccsa-dark-blue pt-24 pb-12 sm:pb-16">
          <div
            className="pointer-events-none absolute left-0 bottom-0 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #F45B00 0%, #F45B00 40%, transparent 70%)",
              transform: "translate(-35%, 35%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #0088D2 0%, transparent 70%)",
              transform: "translate(25%, -45%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />

          <div className="relative z-10">
            <div className="border-b border-white/10">
              <div className="mx-auto max-w-6xl px-4 py-3 text-xs sm:text-sm">
                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/70"
                >
                  <Link href="/" className="font-medium transition hover:text-white">
                    Home
                  </Link>
                  <Icon icon="mdi:chevron-right" width={16} className="text-white/35" />
                  <Link
                    href="/case-studies"
                    className="font-medium transition hover:text-white"
                  >
                    Case studies
                  </Link>
                  <Icon icon="mdi:chevron-right" width={16} className="text-white/35" />
                  <span className="font-medium text-white line-clamp-2 max-w-[min(100%,32rem)] sm:line-clamp-1">
                    {study.headline}
                  </span>
                </nav>
              </div>
            </div>

            <header className="mx-auto max-w-6xl px-4 pt-10 sm:pt-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ED761E]">
                  {study.eyebrow.replace(/\s*\|\s*/g, " · ")}
                </span>
                {region ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/95 backdrop-blur-sm">
                    <Icon icon="mdi:map-marker-outline" width={14} height={14} />
                    {region}
                  </span>
                ) : null}
                <span className="inline-flex items-center rounded-full border border-white/15 bg-black/20 px-2.5 py-0.5 text-[11px] font-medium text-white/80">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(caseStudyDetails.length).padStart(2, "0")}
                </span>
              </div>
              <h1 className="mt-5 max-w-4xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-[2rem] md:leading-snug">
                {study.headline}
              </h1>
            </header>
          </div>
        </section>

        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            <div className="lg:col-span-7 space-y-10 sm:space-y-12">
              <SectionBlock
                icon={sectionIcon.profile}
                title="Client Profile"
              >
                <p>{study.clientProfile}</p>
              </SectionBlock>
              <SectionBlock
                icon={sectionIcon.challenge}
                title="The Challenge"
              >
                <p>{study.challenge}</p>
              </SectionBlock>
              <SectionBlock
                icon={sectionIcon.delivered}
                title="What CCSA Delivered"
              >
                <p>{study.delivered}</p>
              </SectionBlock>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5">
                  <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-[#172840]">
                      Campaign snapshot
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Website-safe programme details
                    </p>
                  </div>
                  <dl className="divide-y divide-slate-100 px-5 py-1">
                    {study.campaignRows.map((row) => (
                      <div
                        key={row.label}
                        className="grid gap-0.5 py-3.5 sm:grid-cols-[minmax(0,38%)_1fr] sm:gap-4"
                      >
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {row.label}
                        </dt>
                        <dd className="text-sm font-medium leading-snug text-[#172840]">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-2xl border-l-4 border-[#ED761E] bg-gradient-to-br from-slate-50 to-white px-5 py-5 shadow-sm ring-1 ring-slate-200/80">
                  <div className="flex items-center gap-2 text-[#172840]">
                    <Icon icon={sectionIcon.impact} width={20} height={20} className="text-[#ED761E]" />
                    <h2 className="text-sm font-semibold uppercase tracking-wide">
                      Impact
                    </h2>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                    {study.impact}
                  </p>
                </div>

                <Link
                  href="/contact-us"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ED761E] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#D7641B]"
                >
                  <Icon icon="mdi:email-outline" width={18} height={18} />
                  Discuss a similar programme
                </Link>
              </div>
            </aside>
          </div>
        </div>

        <section className="border-t border-slate-200 bg-slate-50/80 px-4 py-12 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
              More case studies
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6">
              {prev ? (
                <Link
                  href={`/case-studies/${prev.id}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#ED761E]/40 hover:shadow-md"
                >
                  <div className="min-w-0 text-left">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Previous
                    </span>
                    <p className="mt-1 font-semibold text-[#172840] transition-colors line-clamp-2 group-hover:text-[#ED761E]">
                      {prev.headline}
                    </p>
                  </div>
                  <Icon
                    icon="mdi:arrow-left"
                    width={22}
                    className="flex-shrink-0 text-slate-400 transition group-hover:text-[#ED761E]"
                  />
                </Link>
              ) : (
                <div className="hidden min-h-[1px] sm:block" aria-hidden />
              )}
              {next ? (
                <Link
                  href={`/case-studies/${next.id}`}
                  className={`group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#ED761E]/40 hover:shadow-md sm:flex-row-reverse sm:text-right ${!prev ? "sm:col-start-2" : ""}`}
                >
                  <div className="min-w-0 sm:text-right">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Next
                    </span>
                    <p className="mt-1 font-semibold text-[#172840] transition-colors line-clamp-2 group-hover:text-[#ED761E]">
                      {next.headline}
                    </p>
                  </div>
                  <Icon
                    icon="mdi:arrow-right"
                    width={22}
                    className="flex-shrink-0 text-slate-400 transition group-hover:text-[#ED761E]"
                  />
                </Link>
              ) : (
                <div className="hidden min-h-[1px] sm:block" aria-hidden />
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#ED761E] hover:underline"
              >
                <Icon icon="mdi:view-grid-outline" width={18} height={18} />
                View all case studies
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-6xl px-4 pb-16">
          <div className="rounded-2xl bg-gradient-to-r from-ccsa-dark-blue to-[#0d1f3a] px-6 py-10 text-center text-white sm:px-10">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {caseStudiesCta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-white/90 leading-relaxed">
              {caseStudiesCta.body}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ED761E] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#D7641B]"
              >
                <Icon icon="mdi:trending-up" width={18} height={18} />
                {caseStudiesCta.primaryLabel}
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-ccsa-dark-blue"
              >
                <Icon icon="mdi:calendar-clock" width={18} height={18} />
                {caseStudiesCta.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: caseStudyDetails.map((s) => ({ params: { slug: s.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) {
    return { notFound: true };
  }
  const { prev, next, index } = getAdjacentCaseStudies(params.slug);
  return {
    props: {
      study,
      prev,
      next,
      index,
    },
  };
}
