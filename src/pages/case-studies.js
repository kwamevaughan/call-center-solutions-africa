// pages/case-studies.js — case study library index
import Link from "next/link";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import SEO from "@/components/SEO";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { getCollectionPageSchema, getBreadcrumbSchema } from "@/lib/schemas";
import {
  caseStudiesHero,
  caseStudiesLibraryIntro,
  featuredCaseStudies,
  caseStudyDetails,
  caseStudiesCta,
} from "@/data/caseStudies";

const CaseStudiesIndex = () => {
  const seoSchemas = useMemo(() => {
    const baseUrl = "https://callcentersolutionsafrica.com";
    const caseStudiesUrl = `${baseUrl}/case-studies`;

    const collectionPageSchema = getCollectionPageSchema({
      name: "Case Studies | Call Center Solutions Africa",
      description:
        "Sales, onboarding, telemarketing and tele-research campaigns delivered across Africa, the UK and the United States. Explore how CCSA structures outreach and converts conversations into opportunities.",
      url: caseStudiesUrl,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
      { name: "Home", url: baseUrl },
      { name: "Case Studies", url: caseStudiesUrl },
    ]);

    return [collectionPageSchema, breadcrumbSchema];
  }, []);

  return (
    <>
      <SEO
        title="Case Studies | Sales & Marketing Contact Center Campaigns | CCSA"
        description="CCSA delivers structured sales, onboarding, telemarketing and market research campaigns across Africa, the United Kingdom and the United States. Browse our case study library."
        keywords="BPO case studies, telesales Africa, contact center campaigns, merchant onboarding UK, tele-research, software telemarketing, CCSA case studies"
        schema={seoSchemas}
      />
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-50">
        <section className="relative overflow-hidden bg-ccsa-dark-blue pt-24 pb-14 sm:pb-20">
          <div
            className="pointer-events-none absolute left-0 bottom-0 h-[min(100%,520px)] w-[520px] rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #F45B00 0%, #F45B00 40%, transparent 70%)",
              transform: "translate(-40%, 40%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #0088D2 0%, transparent 70%)",
              transform: "translate(20%, -45%)",
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
                  <Link href="/" className="transition hover:text-white">
                    Home
                  </Link>
                  <Icon icon="mdi:chevron-right" width={16} className="text-white/35" />
                  <span className="font-medium text-white">Case studies</span>
                </nav>
              </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 pt-10 text-center text-white sm:pt-14">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ED761E]">
                Evidence of delivery
              </p>
              <h1 className="mx-auto mt-4 max-w-4xl text-2xl font-bold leading-tight sm:text-3xl md:text-4xl md:leading-snug">
                {caseStudiesHero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
                {caseStudiesHero.lead}
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
                {caseStudiesHero.supporting}
              </p>
            </div>
          </div>
        </section>

        <div className="relative z-10 -mt-10 flex-grow px-4 pb-16 sm:-mt-12 sm:pb-20">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200/80 bg-white px-5 py-10 shadow-xl shadow-slate-900/5 sm:px-8 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-xl font-semibold leading-snug text-[#172840] sm:text-2xl">
                {caseStudiesLibraryIntro.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {caseStudiesLibraryIntro.body}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-5xl border-t border-slate-200 pt-12">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#ED761E]">
                    Library
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[#172840] sm:text-xl">
                    {caseStudyDetails.length} programmes across Africa, the UK &amp; the US
                  </h3>
                </div>
                <p className="max-w-md text-sm text-slate-500">
                  Each study opens on its own page with campaign data, delivery scope and outcomes.
                </p>
              </div>

              <ul className="mt-8 space-y-3 sm:space-y-4">
                {featuredCaseStudies.map((item, i) => (
                  <li key={item.id}>
                    <Link
                      href={`/case-studies/${item.id}`}
                      className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 hover:border-[#ED761E]/35 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex min-w-0 flex-1 items-start gap-4">
                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ccsa-dark-blue text-sm font-bold text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-base font-semibold text-[#172840] transition group-hover:text-[#ED761E] sm:text-lg">
                            {item.title}
                          </h4>
                          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                            <Icon
                              icon="mdi:map-marker-outline"
                              width={16}
                              className="flex-shrink-0 text-[#ED761E]"
                            />
                            {item.region}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex flex-shrink-0 items-center gap-2 self-start rounded-full bg-[#ED761E]/10 px-4 py-2 text-sm font-semibold text-[#ED761E] transition group-hover:bg-[#ED761E] group-hover:text-white sm:self-center">
                        Read study
                        <Icon
                          icon="mdi:arrow-right"
                          width={18}
                          className="transition group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-6xl">
            <div className="rounded-2xl bg-gradient-to-r from-ccsa-dark-blue to-[#0d1f3a] px-6 py-10 text-center text-white sm:px-10 sm:py-12">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {caseStudiesCta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-white/90 leading-relaxed">
                {caseStudiesCta.body}
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ED761E] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#D7641B]"
                >
                  <Icon icon="mdi:trending-up" width={18} height={18} />
                  {caseStudiesCta.primaryLabel}
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-ccsa-dark-blue"
                >
                  <Icon icon="mdi:calendar-clock" width={18} height={18} />
                  {caseStudiesCta.secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default CaseStudiesIndex;
