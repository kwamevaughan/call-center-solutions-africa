// pages/industries.js
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import IndustriesTab from "@/components/IndustriesTab";
import { useEffect, useRef } from "react";

const IndustriesPage = () => {
  const sectionRefs = {
    hero: useRef(null),
    industries: useRef(null),
  };

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
        title="Industries We Serve | Call Center Solutions Africa"
        description="Industry-specific customer experience solutions for Healthcare, Fintech, SaaS, Insurance, Travel, and Telecoms. HIPAA, GDPR, and PCI-DSS compliant BPO services from Africa."
        keywords="healthcare customer support, fintech customer service, SaaS support, insurance contact center, travel customer care, telecoms helpdesk, HIPAA compliant call center, GDPR compliant BPO, multilingual customer service, patient engagement, fraud prevention, KYC support, technical support Africa, claims processing, telehealth support, digital payments support"
      />
      <Header />

      <main className="relative overflow-x-hidden">
        {/* Hero Section */}
        <div
          className="relative bg-ccsa-dark-blue px-4 min-h-[60vh] flex items-center overflow-hidden"
          id="hero"
          ref={sectionRefs.hero}
        >
          {/* Radial Ellipse at Left Bottom */}
          <div 
            className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          {/* Radial Ellipse at Top Right */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Middle */}
          <div 
            className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          <div className="max-w-7xl mx-auto w-full relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col items-center gap-6 sm:gap-8 text-center max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-white uppercase tracking-wide">
                  Industries We Serve
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Industry-Specific Expertise
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                We deliver tailored customer experience solutions across healthcare, fintech, SaaS, insurance, travel, and telecoms—with compliance, security, and multilingual support built in.
              </p>
              {/* Certification Badges */}
              <div className="hidden md:flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                {[
                  "HIPAA-ready",
                  "GDPR Compliant",
                  "PCI-DSS",
                  "ISO 27001",
                  "24/7 Multilingual"
                ].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm sm:text-base"
                  >
                    <Icon icon="mdi:shield-check" width={20} height={20} className="text-ccsa-orange flex-shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Industries Tab Section */}
        <div
          className="bg-white relative px-4 py-12 sm:py-20 overflow-hidden"
          id="industries"
          ref={sectionRefs.industries}
        >
          {/* Radial Ellipse at Top Left - Orange */}
          <div 
            className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Top Right - Yellow */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Right - Orange */}
          <div 
            className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(30%, 30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Left - Blue */}
          <div 
            className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          <section className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-4 mb-8 sm:mb-12">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-ccsa-dark-blue uppercase">
                  Industry Expertise
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-4 sm:mb-6 leading-tight text-center">
                Tailored Solutions for Every Industry
              </h2>
              <p className="text-base sm:text-lg text-ccsa-dark-blue/80 leading-relaxed text-center max-w-3xl">
                Our teams understand the unique challenges and compliance requirements of each industry, delivering specialized support that drives results.
              </p>
            </div>

            <div>
              <IndustriesTab />
            </div>
          </section>
        </div>

        {/* Why Industry Expertise Matters */}
        <section className="bg-ccsa-dark-blue w-full px-4 relative overflow-hidden py-12 sm:py-20">
          {/* Radial Ellipse at Top Left - Blue */}
          <div 
            className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(-30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Top Right - Orange */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Right - Yellow */}
          <div 
            className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(30%, 30%)'
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                  <p className="text-lg sm:text-xl font-semibold text-white uppercase">Why Industry Expertise Matters</p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                  Specialized Knowledge, Proven Results
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-white/90">
                  Each industry has unique compliance requirements, customer expectations, and operational challenges. Our specialized teams bring deep domain knowledge to deliver solutions that work.
                </p>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:check-circle" width={24} height={24} className="text-ccsa-yellow flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        Compliance-First Approach
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed text-white/90">
                        HIPAA for healthcare, PCI-DSS for payments, GDPR for data privacy—we build compliance into every process.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:check-circle" width={24} height={24} className="text-ccsa-yellow flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        Industry-Specific Training
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed text-white/90">
                        Our agents receive specialized training on industry terminology, processes, and best practices.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:check-circle" width={24} height={24} className="text-ccsa-yellow flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        Proven Track Record
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed text-white/90">
                        We've delivered measurable improvements in CSAT, FCR, and cost efficiency across all industries we serve.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/contact-us"
                    className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm w-fit"
                    style={{
                      background: "var(--ccsa-gradient)"
                    }}
                  >
                    <Icon icon="mdi:phone" width={18} height={18} />
                    Discuss Your Industry Needs
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/industries/industry-expertise.webp"
                    alt="Industry Expertise"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-full h-auto shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Stats Section */}
        <section className="bg-white w-full px-4 relative overflow-hidden py-12 sm:py-20">
          {/* Radial Ellipse at Top Left */}
          <div 
            className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Top Right */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-4 mb-8 sm:mb-12">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue uppercase">Our Impact</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-4 sm:mb-6 leading-tight text-center">
                Results Across Industries
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="mdi:chart-line" width={32} height={32} className="text-ccsa-orange flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Healthcare
                  </h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">38%</p>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Reduction in patient wait times for US telehealth client
                </p>
              </div>
              <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="mdi:credit-card" width={32} height={32} className="text-ccsa-orange flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Fintech
                  </h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">40%</p>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Reduction in chargeback disputes for European payments firm
                </p>
              </div>
              <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="mdi:shield-check" width={32} height={32} className="text-ccsa-orange flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Insurance
                  </h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">25%</p>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Faster claim turnaround with 91% CSAT across multiple lines
                </p>
              </div>
              <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="mdi:cloud" width={32} height={32} className="text-ccsa-orange flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    SaaS
                  </h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">30%</p>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Reduction in ticket volume via AI-assisted support
                </p>
              </div>
              <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="mdi:airplane" width={32} height={32} className="text-ccsa-orange flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Travel
                  </h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">50%</p>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Reduction in complaint escalation during disruptions
                </p>
              </div>
              <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="mdi:phone" width={32} height={32} className="text-ccsa-orange flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Telecoms
                  </h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">35%</p>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Improvement in resolution rates and reduced churn
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-ccsa-dark-blue w-full px-4 relative overflow-hidden py-12 sm:py-20">
          {/* Radial Ellipse at Top Left - Blue */}
          <div 
            className="absolute left-0 top-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, #0088D2 35%, transparent 100%)',
              transform: 'translate(-30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Right - Yellow */}
          <div 
            className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(30%, 30%)'
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="bg-white rounded-lg p-8 sm:p-10 lg:p-12 transform transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                  <p className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue uppercase tracking-wide">Ready to Get Started</p>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ccsa-dark-blue leading-tight">
                  Let's Discuss Your Industry-Specific Needs
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-ccsa-dark-blue/80 max-w-2xl">
                  Our team understands the unique challenges of your industry. Book a call to explore how we can deliver compliant, cost-efficient customer experience solutions.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <Link 
                    href="/contact-us"
                    style={{ background: "var(--ccsa-gradient)" }} 
                    className="text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Icon icon="mdi:phone" width={18} height={18} />
                    Schedule a Consultation
                  </Link>
                  <a 
                    href="/assets/documents/africa_cx_advantage_report.pdf"
                    download
                    className="bg-transparent border-2 border-ccsa-dark-blue text-ccsa-dark-blue px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-ccsa-dark-blue hover:text-white flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Icon icon="mdi:download" width={18} height={18} />
                    Download Industry Report
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="text-ccsa-orange flex-shrink-0" width={20} height={20} />
                    <span className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue font-semibold">Industry-Specific Training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="text-ccsa-orange flex-shrink-0" width={20} height={20} />
                    <span className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue font-semibold">Compliance-First Approach</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="text-ccsa-orange flex-shrink-0" width={20} height={20} />
                    <span className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue font-semibold">Proven Results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FloatingCTA />
        <Footer />
      </main>
    </>
  );
};

export default IndustriesPage;

