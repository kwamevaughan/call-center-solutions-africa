// pages/index.js
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useEffect, useRef, useMemo } from "react";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";
import { getAboutPageSchema, getBreadcrumbSchema } from "@/lib/schemas";

const About = () => {
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
    const aboutUrl = `${baseUrl}/about-us`;
    
    const aboutPageSchema = getAboutPageSchema({
      name: 'About Us',
      description: 'Learn about Call Center Solutions Africa - your trusted partner for world-class customer experience outsourcing from Africa. Discover our mission, values, and commitment to excellence.',
      url: aboutUrl
    });

    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'About Us', url: aboutUrl }
    ]);

    return [aboutPageSchema, breadcrumbSchema];
  }, []);

  return (
    <>
      <SEO
        title="About Us | Call Center Solutions Africa"
        description="Learn about Call Center Solutions Africa - your trusted partner for world-class customer experience outsourcing from Africa. Discover our mission, values, and commitment to excellence."
        keywords="about Call Center Solutions Africa, CCSA company, African BPO provider, customer experience outsourcing, Nairobi contact center, ISO 27001 certified, GDPR compliant BPO, multilingual customer service Africa"
        schema={seoSchemas}
      />
      <Header />

      <main className="relative overflow-x-hidden">
        <div
          className="relative bg-ccsa-dark-blue px-4 min-h-screen flex items-center overflow-hidden"
          id="home"
          ref={sectionRefs.home}
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
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Middle */}
          <div 
            className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, #0088D2 35%, transparent 100%)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          {/* Radial Ellipse at Bottom Middle - Orange */}
          <div 
            className="absolute left-1/2 bottom-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-50%, 30%)'
            }}
          />
          <div className="max-w-7xl mx-auto w-full relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-12">
                <div className="flex flex-col items-center gap-4 sm:gap-6 text-center max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                    <p className="text-lg sm:text-xl font-light text-white uppercase tracking-wide">
                      About CCSA
                    </p>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Our Promise
                  </h2>
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl text-center">
                  We help global organizations enhance customer satisfaction, reduce operational costs, and strengthen brand trust through high‑performance, 
                  compliant contact center solutions delivered from Africa.
                </p>
                {/* Certification Badges */}
                <div className="hidden md:flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                  {[
                    "45–60% lower cost‑to‑serve",
                    "GDPR / ISO 27001 aligned",
                    "GDPR / ISO 27001 aligned",
                  ].map((badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm sm:text-base"
                    >
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full mt-2 sm:mt-4">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/about-hero.webp"
                    width={1200}
                    height={600}
                    alt="About CCSA"
                    className="rounded-lg transform transition-transform duration-300 hover:translate-y-[-5px] w-full h-auto object-cover shadow-2xl"
                  />
                </div>
            </div>           
            
          </div>
        </div>

        {/* W Why our programs perform*/}
        <div id="why-our-programs-perform" ref={sectionRefs["why-our-programs-perform"]} className="bg-ccsa-dark-blue relative overflow-hidden">
          {/* Radial Ellipse at Top Middle - Orange */}
          <div 
            className="absolute left-1/2 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-50%, -30%)'
            }}
          />
          {/* Radial Ellipse at Top Right - Blue */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, #0088D2 35%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Left - Yellow */}
          <div 
            className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          <section className="w-full px-4 relative z-10">
            <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-20">
              <div className="flex flex-col items-center gap-4 sm:gap-6 text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                  <p className="text-lg sm:text-xl font-light text-white uppercase tracking-wide">
                      Why our programs perform
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Our Core Strengths
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  <div className="flex flex-col gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                          <Image
                            src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/customer-xp.svg"
                            width={80}
                            height={80}
                            alt="Customer Experience Intelligence"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          Customer Experience Intelligence
                        </h3>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-white/90">
                      Human + AI analytics lift FCR, boost NPS, and lower cost‑to‑serve—with real‑time QA and coaching.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                          <Image
                            src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/security.svg"
                            width={80}
                            height={80}
                            alt="Security & Compliance by Design"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                            Security & Compliance by Design
                        </h3>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-white/90">
                      Aligned with ISO 27001, GDPR, PCI‑DSS; least‑privilege access, MFA, and audit trails as standard.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                          <Image
                            src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/delivery.svg"
                            width={80}
                            height={80}
                            alt="Agile, Scalable Delivery"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                            Agile, Scalable Delivery
                        </h3>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-white/90">
                      Aligned with ISO 27001, GDPR, PCI‑DSS; least‑privilege access, MFA, and audit trails as standard.
                    </p>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6">
                <div className="flex flex-col gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <div className="flex items-center gap-3">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                            <Image
                              src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/support.svg"
                              width={80}
                              height={80}
                              alt="Customer Experience Intelligence"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-white">
                            Specialized Industry Know‑how
                          </h3>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    Human + AI analytics lift FCR, boost NPS, and lower cost‑to‑serve—with real‑time QA and coaching.
                    </p>
                </div>
                <div className="flex flex-col gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <div className="flex items-center gap-3">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                            <Image
                              src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/africa.svg"
                              width={80}
                              height={80}
                              alt="Customer Experience Intelligence"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-white">
                            Africa‑based Advantage
                          </h3>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    Kenya‑led ops, multilingual talent, and EMEA time‑zone alignment for nearshore/offshore flexibility and strong unit economics.
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

        {/* Deliver Model */}
        <section className="bg-white w-full px-4 relative overflow-hidden pb-10">
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
            {/* Radial Ellipse at Bottom Middle */}
            <div 
              className="absolute left-1/2 bottom-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
                transform: 'translate(-50%, 30%)'
              }}
            />
            <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8 sm:mb-12">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                    <p className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue uppercase">Scale on your terms</p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-ccsa-dark-blue leading-tight">
                    Delivery Models
                  </h2>                  
                </div>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-ccsa-dark-blue">
                  Start lean with a 2–4 week pilot, add hours/languages as you grow, or spin up a dedicated pod when volume stabilizes. We flex to your seasonality without losing quality.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/help.svg"
                      width={80}
                      height={80}
                      alt="Dedicated Teams"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Dedicated Teams
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    Ideal for steady volumes & premium CX
                  </p>
                  <ul className="flex flex-col gap-3 mt-2">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Single‑tenant focus with branded training</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Team Lead + agents; shared QA/Trainer</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/connection.svg"
                      width={80}
                      height={80}
                      alt="Shared Teams"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Shared Teams
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    Ideal for variable or after‑hours coverage
                  </p>
                  <ul className="flex flex-col gap-3 mt-2">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Elastic capacity, SLA‑backed quality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Quick spin‑up for pilots & campaigns</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/connection.svg"
                      width={80}
                      height={80}
                      alt="Build-Operate-Transfer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Build–Operate–Transfer
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    Ideal for enterprises setting up in Africa
                  </p>
                  <ul className="flex flex-col gap-3 mt-2">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Knowledge transfer to your in‑house team</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Structured handover & governance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue text-center mt-6">Steady volumes → Dedicated • Variable/after‑hours → Shared • In‑country setup → BOT</p>

              <div className="mt-20">
                <div className="flex flex-col gap-4 text-center">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                    <p className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue uppercase">Security and quality you can prove</p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-ccsa-dark-blue leading-tight">
                    Certifications & Compliance
                  </h2>                  
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
                  <div className="bg-white text-center border border-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <h2 className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue">
                      IISO 27001
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                     Security
                    </p>
                  </div>
                  <div className="bg-white text-center border border-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <h2 className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue">
                      IISO 9001
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                     Quality
                    </p>
                  </div>
                  <div className="bg-white text-center border border-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <h2 className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue">
                      GDPR
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                     Privacy
                    </p>
                  </div>
                  <div className="bg-white text-center border border-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <h2 className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue">
                      PCI‑DSS
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                     Payments
                    </p>
                  </div>
                  <div className="bg-white text-center border border-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <h2 className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue">
                      HIPAA-ready
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                     Healthcare
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* Trust & Transparency */}
        <section className="bg-white w-full px-4 relative overflow-hidden pb-10">
          {/* Radial Ellipse at Top Left - Yellow */}
          <div 
            className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Left Middle - Orange */}
          <div 
            className="absolute left-0 top-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, -50%)'
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-16">
            <div className="flex flex-col items-left gap-4 text-left">
              <div className="flex items-center gap-3 justify-left">
                <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue uppercase">No surprises - ever</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-ccsa-dark-blue leading-tight">
              Our Commitment to Trust & Transparency
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                      <Image
                        src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/shield.svg"
                        width={56}
                        height={56}
                        alt="What you can expect"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                      What you can expect
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-3 mt-2">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Transparent scope & pricing with written change‑control</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Live dashboards, weekly reports, and quarterly reviews</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Calibration calls & documented playbook updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">24h incident notifications with remediation steps</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                      <Image
                        src="https://ik.imagekit.io/nkmvdjnna/CCSA/about/icons/data-protection.svg"
                        width={56}
                        height={56}
                        alt="Data & security practices"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                      Data & security practices
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-3 mt-2">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Your data remains your property; access is least‑privilege</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">MFA on admin tools & comprehensive audit logs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Consent‑based recording with clear disclosures by market</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0 mt-0.5" width={20} height={20} />
                      <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">GDPR, ISO 27001, and PCI‑DSS aligned processes</span>
                    </li>
                  </ul>
                </div>
            </div>

            {/* CTA Card */}
            <div className="relative mt-10 sm:mt-16 lg:mt-20 bg-ccsa-dark-blue rounded-lg p-8 sm:p-10 lg:p-12 transform transition-transform duration-300 hover:translate-y-[-5px] overflow-hidden">
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
              <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                  <p className="text-lg sm:text-xl font-semibold text-white uppercase tracking-wide">Get started</p>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-center">
                  Ready to Talk?
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-white/90 text-center max-w-2xl">
                  Start small. Scale fast. We'll scope a pilot and share a clear rollout plan.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <Link 
                    href="/contact-us"
                    style={{ background: "var(--ccsa-gradient)" }} 
                    className="text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Icon icon="mdi:phone" width={18} height={18} />
                    Book a call
                  </Link>
                  <a 
                    href="/assets/documents/africa_cx_advantage_report.pdf"
                    download
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Icon icon="mdi:download" width={18} height={18} />
                    Download Africa CX Report
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0" width={20} height={20} />
                    <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">ISO 27001 & GDPR‑ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0" width={20} height={20} />
                    <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Multilingual 24/7 delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="text-ccsa-yellow flex-shrink-0" width={20} height={20} />
                    <span className="text-sm sm:text-base leading-relaxed text-white/90 font-semibold">Real‑time SLA tracking</span>
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

  export default About;
