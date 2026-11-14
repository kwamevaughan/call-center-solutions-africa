// pages/index.js
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useEffect, useRef, useMemo } from "react";
import { useFixedHeader, handleScroll } from "../../../utils/scrollUtils";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schemas";

const REVENUE_CONVERSION_SERVICES = [
  {
    id: "01",
    title: "Speed-to-Lead and Inbound Sales Conversion",
    whatItIs:
      "A dedicated team that responds to inbound enquiries from your website, ads, landing pages, WhatsApp, social media, referrals, and campaigns before leads go cold.",
    bestFor:
      "Paid advertising teams, healthcare providers, insurance firms, real estate companies, education providers, SaaS companies, ecommerce brands and service businesses.",
    handles:
      "Lead response, needs discovery, qualification, appointment booking, warm transfers, missed-call recovery, quote follow-up, lead scoring, and CRM updates.",
    kpis:
      "Time to first response, contact rate, qualification rate, booked appointments, show rate, conversion rate, cost per qualified lead, and lead-to-sale conversion.",
  },
  {
    id: "02",
    title: "Outbound SDR and Appointment Setting",
    whatItIs:
      "A managed outbound team that identifies prospects, contacts decision-makers, qualifies interest and books meetings for your sales team.",
    bestFor:
      "B2B SaaS, fintech, professional services, logistics, telecoms, healthcare, insurance, technology providers and African market-entry campaigns.",
    handles:
      "ICP mapping, prospect list validation, cold calling, email follow-up, LinkedIn outreach, WhatsApp outreach where appropriate, qualification, meeting booking and CRM handoff.",
    kpis:
      "Calls made, conversations held, decision-maker contact rate, qualified meetings booked, meeting attendance rate, pipeline generated and cost per meeting.",
  },
  {
    id: "03",
    title: "Telesales and Direct Sales Campaigns",
    whatItIs:
      "A trained telesales team that sells products and services directly over the phone and digital channels, especially where the offer is clear, repeatable and campaign-driven.",
    bestFor:
      "Insurance products, telecom packages, subscriptions, education enrolments, healthcare plans, financial services, travel packages, ecommerce offers and renewals.",
    handles:
      "Sales calls, objection handling, order completion, payment link guidance, quote conversion, call-back scheduling, abandoned application recovery and campaign reporting.",
    kpis:
      "Conversion rate, revenue per agent, sales per day, average order value, cost per sale, call quality score and refund or cancellation rate.",
  },
  {
    id: "04",
    title: "Omnichannel Lead Nurture and Follow-Up",
    whatItIs:
      "A structured follow-up engine that keeps prospects warm across calls, WhatsApp, email, social media and chat until they are ready to buy.",
    bestFor:
      "Longer buying cycles, considered purchases, high-ticket services, event leads, webinar leads, dormant CRM leads and incomplete applications.",
    handles:
      "Follow-up sequences, nurture calls, WhatsApp reminders, content follow-up, quote chasing, appointment reminders, re-engagement campaigns and pipeline hygiene.",
    note:
      "HubSpot's 2025 State of Sales analysis shows why this matters: social outreach now outranks email for response rates, and sales teams relying only on email may be missing where buyers are active.",
    kpis:
      "Follow-up completion rate, reactivation rate, appointment show rate, pipeline progression, quote-to-close rate and dormant lead recovery.",
  },
  {
    id: "05",
    title: "Customer Reactivation, Renewals, and Upsell",
    whatItIs:
      "A revenue recovery team that re-engages dormant customers, renews existing accounts, identifies upsell opportunities and reduces avoidable churn.",
    bestFor:
      "Subscription businesses, SaaS, insurance, telecoms, healthcare, education, membership businesses, travel and financial services.",
    handles:
      "Renewal reminders, expired customer outreach, dormant account reactivation, upsell campaigns, cross-sell campaigns, loyalty calls and cancellation-save conversations.",
    kpis:
      "Renewal rate, reactivation rate, upsell conversion, churn reduction, recovered revenue and customer lifetime value improvement.",
  },
  {
    id: "06",
    title: "Sales QA, CRM and Revenue Analytics",
    whatItIs:
      'The quality and intelligence layer behind every sales campaign. This turns CCSA from "people making calls" into a managed revenue operation.',
    bestFor:
      "Any client that needs visibility, compliance, coaching and continuous improvement.",
    handles:
      "Call scoring, script testing, objection analysis, CRM hygiene, lead disposition tracking, conversion dashboards, coaching insights and weekly performance reviews.",
    kpis: "",
  },
];

const SalesRevenueEnablementPage = () => {
  const sectionRefs = {
    home: useRef(null),
    "about-us": useRef(null),
    industries: useRef(null),
  };


  const isFixed = useFixedHeader();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Generate SEO schemas
  const seoSchemas = useMemo(() => {
    const baseUrl = 'https://callcentersolutionsafrica.com';
    const serviceUrl = `${baseUrl}/services/sales-revenue-enablement`;
    
    const serviceSchema = getServiceSchema({
      name: 'Sales & Revenue Enablement',
      description: 'Lead generation, qualification, upselling, renewals — increasing efficiency and reducing CPA.',
      serviceType: 'Sales Enablement',
      url: serviceUrl
    });

    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'Services', url: `${baseUrl}/services` },
      { name: 'Sales & Revenue Enablement', url: serviceUrl }
    ]);

    return [serviceSchema, breadcrumbSchema];
  }, []);

  return (
    <>
      <SEO
        title="Sales & Revenue Enablement | Call Center Solutions Africa"
        description="Lead generation, qualification, upselling, renewals — increasing efficiency and reducing CPA."
        keywords="sales enablement, lead generation, revenue enablement, sales outsourcing, lead qualification, upselling services, sales conversion, revenue growth, sales operations, BPO sales services"
        schema={seoSchemas}
      />
      <Header />

      <main className="relative overflow-x-hidden">
        <div
          className="relative bg-ccsa-dark-blue px-4 min-h-screen flex items-center overflow-hidden"
          id="home"
          ref={sectionRefs.home}
        >
          {/* Radial Ellipse at Bottom Left - Orange */}
          <div 
            className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          {/* Radial Ellipse at Top Right - Yellow */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Middle - Blue */}
          <div 
            className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, #0088D2 35%, transparent 100%)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side: Title, Description, and CTA Buttons */}
              <div className="flex flex-col gap-5 sm:gap-6 text-white">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-semibold text-white uppercase">Solution</p>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Sales & Revenue Enablement
              </h1>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
              Inbound upsell and outbound SDR motions with precise targeting, clean CRM handoffs, and transparent dashboards to close more deals.
              </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact-us"
                  className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm"
                  style={{
                    background: "var(--ccsa-gradient)"
                  }}
                >
                  <Icon icon="mdi:lightning-bolt" width={18} height={18} />
                  Start a pilot
                </Link>
                <button
                  onClick={() => window.location.href = "/about-us"}
                  className="bg-transparent border-2 border-white text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-ccsa-dark-blue text-sm"
                >
                  Get Pricing
                    </button>
                  </div>                
              </div>

              {/* Right Side: Hero Image */}
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/hero.webp?updatedAt=1762971504618"
                    alt="Call Center Solutions Africa"
                    width={350}
                    height={350}
                    className="rounded-2xl shadow-2xl object-cover w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Certification Badges */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-20">
              {[
                "Predictable pipeline",
                "10‑day pilot",
                "EMEA coverage",
                "GDPR‑aligned"
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm sm:text-base"
                >
                  <Icon icon="mdi:check" width={20} height={20} className="text-white flex-shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Value */}
        <div id="about-us" ref={sectionRefs["about-us"]} className="bg-ccsa-dark-blue relative overflow-hidden">
          {/* Radial Ellipse at Top Left */}
          <div 
            className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Left Middle - Yellow */}
          <div 
            className="absolute left-0 top-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-30%, -50%)'
            }}
          />
          <section className="w-full px-4 relative z-10">
            <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-20">
              <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-semibold text-white uppercase">VALUE</p>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-white mb-8 sm:mb-12">Why teams pick this solution</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Predictable pipeline</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  More SQLs and demos with higher show- and win-rates.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Lower CAC</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  ICP-aligned outreach, objection handling, and clean handoffs reduce acquisition cost.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Expand & retain</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Upsell, cross-sell, renewals, and win-back motions tied to CS.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-4 relative z-10">
            <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-20">
              <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-semibold text-white uppercase">
                  The CCSA Revenue Conversion Suite
                </p>
              </div>
              <p className="text-center text-sm sm:text-base md:text-lg leading-relaxed text-white/90 max-w-5xl mx-auto mb-8 sm:mb-12">
                A managed sales contact center solution for companies that need trained sales agents,
                structured outreach, fast follow-up, and measurable revenue outcomes across voice,
                WhatsApp, email, chat, and social channels.
              </p>
              <div className="mb-8 sm:mb-10 bg-white/5 border border-white/20 rounded-xl p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-5 text-sm sm:text-base">
                  <div className="md:col-span-2 text-white/80">Managed model</div>
                  <div className="md:col-span-3 text-white leading-relaxed">
                    Trained sales agents, structured outreach, fast follow-up, and performance reporting.
                  </div>
                  <div className="md:col-span-2 text-white/80">Core channels</div>
                  <div className="md:col-span-3 text-white leading-relaxed">
                    Voice, WhatsApp, email, chat, and social.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                {REVENUE_CONVERSION_SERVICES.map((service) => (
                  <article
                    key={service.id}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-4px]"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="inline-flex items-center justify-center min-w-[44px] h-8 px-3 rounded-full bg-ccsa-orange text-white text-xs sm:text-sm font-semibold tracking-wide">
                        {service.id}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {service.title}
                      </h3>
                    </div>

                    <div className="space-y-4 text-white/90 text-sm sm:text-base leading-relaxed">
                      <p>
                        <span className="font-semibold text-white">What it is:</span>{" "}
                        {service.whatItIs}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Best for:</span>{" "}
                        {service.bestFor}
                      </p>
                      <p>
                        <span className="font-semibold text-white">What CCSA handles:</span>{" "}
                        {service.handles}
                      </p>
                      {service.note && (
                        <p className="text-white bg-white/10 border border-white/15 rounded-lg p-4">
                          {service.note}
                        </p>
                      )}
                    </div>

                    {service.kpis && (
                      <div className="mt-5 pt-5 border-t border-white/15">
                        <p className="text-xs sm:text-sm uppercase tracking-wide text-ccsa-yellow font-semibold mb-2">
                          KPIs
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed text-white/95">
                          {service.kpis}
                        </p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
          {/* Radial Ellipse at Bottom Right */}
          <div 
            className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(30%, 30%)'
            }}
          />
        </div>

        {/* Next Section */}
        <section className="bg-white w-full px-4 relative overflow-hidden py-8">
          <div className="max-w-7xl mx-auto flex justify-end">
            <Link
              href="/services/customer-retention-loyalty"
              className="group flex items-end gap-3 text-ccsa-dark-blue hover:text-ccsa-blue transition-colors duration-300"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-ccsa-dark-blue/70 uppercase tracking-wide">
                  Next
                </span>
                <span className="text-base sm:text-lg font-semibold">
                    Customer Retention & Loyalty
                </span>
              </div>
              <Icon 
                icon="mdi:arrow-right" 
                width={24} 
                height={24} 
                className="transform group-hover:translate-x-1 transition-transform duration-300 mb-1" 
              />
            </Link>
          </div>
        </section>

        <FloatingCTA />
        <Footer />
      </main>
    </>
  );
};

export default SalesRevenueEnablementPage;
