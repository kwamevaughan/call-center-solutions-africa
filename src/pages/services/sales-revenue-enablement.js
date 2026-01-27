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
                <p className="text-lg sm:text-xl font-semibold text-white uppercase">Scope</p>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-white mb-8 sm:mb-12">What we do</h2>
              <div className="flex flex-col gap-3 sm:gap-4 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Lead generation and qualification (BANT/MEDDPICC-style)
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Demo booking, calendar orchestration, and warm transfers
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Upsell, cross-sell, renewals, and light collections where appropriate
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Script/playbook design, A/B testing, and call recording reviews
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-4 relative z-10">
            <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-20">
              <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-semibold text-white uppercase">Impact</p>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-white mb-8 sm:mb-12">Outcomes & KPIs</h2>
              <div className="flex flex-col gap-3 sm:gap-4 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  More qualified pipeline and booked demos
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Higher show-rate and win-rate across segments
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Lower CAC and faster time-to-first-contact
                  </p>
                </div>
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
