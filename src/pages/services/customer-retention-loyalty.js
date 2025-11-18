// pages/index.js
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useEffect, useRef } from "react";
import { useFixedHeader, handleScroll } from "../../../utils/scrollUtils";

const CustomerRetentionLoyaltyPage = () => {
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

  return (
    <>
      <SEO
        title="Omnichannel Contact Center Operations | Call Center Solutions Africa"
        description="Unified routing, knowledge, and analytics into one operating model. Faster customer responses, lower cost per contact, and consistent voice across all channels. Smart routing and WFM coverage from Africa."
        keywords="omnichannel contact center, unified customer service, contact center routing, customer service analytics, multi-channel customer support, unified playbook, customer service knowledge base, contact center WFM, smart routing, customer service automation, unified CRM, contact center efficiency, cost per contact reduction, SLA management, customer service integration, contact center operations, unified customer view, customer service technology"
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
              Customer Retention & Loyalty Management
              </h1>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
              We blend behavioral analytics, timely outreach, and loyalty ops to reduce churn and lift LTV—without spamming your users.
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
                "Churn save‑plays",
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
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Churn prediction</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Targeted save‑plays with clear offers and timing, based on risk signals.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Loyalty lift</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Smarter enrollment and redemption nudges increase program participation.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Closed‑loop VOC</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Feedback flows into product and service improvements to prevent repeats.
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
                  At‑risk segmentation, triggers, and personalized outreach cadences
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Win‑back, cross‑sell, and reactivation across email, SMS, WhatsApp, and social
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Loyalty enrollment, rewards operations, and fraud/abuse safeguards
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Insight reporting: churn drivers, cohort trends, and LTV shifts
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
                  Reduced churn with measurable save‑rate
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Higher LTV via cross‑sell and loyalty redemption
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-5 flex items-start gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Reactivation of dormant cohorts without list fatigue
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
              href="/services/technical-support-help-desk"
              className="group flex items-end gap-3 text-ccsa-dark-blue hover:text-ccsa-blue transition-colors duration-300"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-ccsa-dark-blue/70 uppercase tracking-wide">
                  Next
                </span>
                <span className="text-base sm:text-lg font-semibold">
                Technical Support & Help Desk
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

export default CustomerRetentionLoyaltyPage;
