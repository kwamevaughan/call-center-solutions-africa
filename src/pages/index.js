// pages/index.js
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useEffect, useRef } from "react";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";
import IndustriesTab from "@/components/IndustriesTab";

const HomePage = () => {
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
        title="Call Center Solutions Africa | Advanced BPO & Contact Center Services"
        description="Empowering African businesses with tailored call center solutions. From cloud technology to advisory and equipment, we help you launch, scale, and thrive in 30 days or less."
        keywords="call center solutions Africa, BPO services Africa, contact center technology, African business solutions, cloud call center, customer experience Africa, Nairobi call center services, healthcare customer support, fintech customer service, SaaS support, insurance contact center, travel customer care, telecoms helpdesk, HIPAA compliant call center, GDPR compliant BPO, multilingual customer service, patient engagement, fraud prevention, KYC support, technical support Africa, claims processing, telehealth support, digital payments support, omnichannel contact center, 24/7 customer service Africa, ISO 27001 call center, PCI-DSS compliant, customer retention, back-office outsourcing"
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
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side: Title, Description, and CTA Buttons */}
              <div className="flex flex-col gap-5 sm:gap-6 text-white">
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                Excellence in Customer Service Outsourcing - <br/>From{" "}
                  <span className="text-ccsa-orange">Africa to the World</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
                  We help global enterprises and African organizations build world-class, cost-efficient, 
                  and secure customer service operations - powered by Africa's skilled, multilingual workforce.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/contact-us"
                    className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm"
                    style={{
                      background: "var(--ccsa-gradient)"
                    }}
                  >
                    <Icon icon="mdi:phone" width={18} height={18} />
                    Partner With Us
                  </Link>
                  <button
                    onClick={() => window.location.href = "/about-us"}
                    className="bg-transparent border-2 border-white text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-ccsa-dark-blue text-sm"
                  >
                    Learn More
                      </button>
                    </div>
                <div className="mt-3 sm:mt-4 p-3 sm:p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="flex items-start gap-3">
                    <Icon 
                      icon="mdi:format-quote-open" 
                      width={28} 
                      height={28} 
                      className="text-ccsa-yellow flex-shrink-0 mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-white/90 italic leading-relaxed">
                        <span className="font-semibold not-italic text-white">Global BPO Market Outlook, 2025:</span>{" "}
                        Africa is the fastest-growing customer service outsourcing frontier — offering up to 60% cost efficiency and best-in-class talent trained for multilingual, digital-first CX
                      </p>
              </div>
            </div>
          </div>
        </div>

              {/* Right Side: Hero Image */}
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/hero.webp"
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
                "ISO 27001",
                "GDPR",
                "PCI-DSS",
                "HIPAA-ready",
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

        {/* Who we are */}
        <div id="about-us" ref={sectionRefs["about-us"]} className="bg-ccsa-dark-blue relative overflow-hidden">
          {/* Radial Ellipse at Top Left */}
          <div 
            className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, -30%)'
            }}
          />
          <section className="w-full px-4 relative z-10">
            <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                <div className="flex flex-col h-full">                  
                  <div className="relative w-full h-full rounded-md overflow-hidden max-w-sm mx-auto lg:mx-0">
                  <Image
                      src="https://ik.imagekit.io/nkmvdjnna/CCSA/who-we-are.webp"
                    width={500}
                      height={500}
                      alt="Who We Are - Call Center Solutions Africa"
                      className="rounded-md transform transition-transform duration-300 hover:translate-y-[-5px] w-full h-full object-cover"
                  />
                </div>
                </div>
                <div className="flex flex-col gap-6 sm:gap-8 h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                    <p className="text-lg sm:text-xl font-semibold text-white">Who We Are</p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-white leading-tight">
                    Building the Future of Customer Experience from Africa
                  </h2>
                  <div className="flex flex-col gap-4">
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90">
                      Call Center Solutions Africa (CCSA) provides scalable contact center and BPO services that connect brands to customers with professionalism, 
                      empathy, and cultural understanding.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90">
                      We blend technology, talent, and trust to deliver service excellence from Africa to global markets.
                    </p>
                  </div>
                  <Link
                    href="/contact-us"
                    className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm w-fit"
                    style={{
                      background: "var(--ccsa-gradient)"
                    }}
                  >
                    <Icon icon="mdi:phone" width={18} height={18} />
                    Partner With Us
                  </Link>
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

          {/* Our solutions */}
          <section className="bg-white w-full px-4 relative overflow-hidden">
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
                    <p className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue uppercase">Our Solutions</p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-ccsa-dark-blue leading-tight">
                    Building the Future of Customer Experience from Africa.
                  </h2>                  
                </div>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-ccsa-dark-blue">
                  Whether you're a startup, government agency, or global enterprise, we customize CX and back-office solutions that improve efficiency, enhance customer satisfaction, and reduce costs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/icons/chat-bubble.png"
                      width={80}
                      height={80}
                      alt="Inbound & Outbound Customer Service"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Inbound & Outbound Customer Service
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    24/7 multilingual coverage: inquiries, renewals, feedback - improving satisfaction and first-call resolution.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                    <Image
                      src="https://ik.imagekit.io/nkmvdjnna/CCSA/icons/headset.svg"
                      width={80}
                      height={80}
                      alt="Back-office & Business Process Outsourcing"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Omnichannel Contact Center Operations
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    Unified voice/chat/email/social. Integrated CRM & analytics for faster responses and reduced costs.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/icons/online-support.svg"
                      width={80}
                      height={80}
                      alt="Technical Support & Help Desk"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Sales & Revenue<br/> Enablement
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                      Lead generation, qualification, upselling, renewals — increasing efficiency and reducing CPA.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/icons/feedback.svg"
                      width={80}
                      height={80}
                      alt="Technical Support & Help Desk"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                  Customer Retention & Loyalty Management
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    Behavioral analytics + personalized outreach to reduce churn and boost loyalty participation.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/icons/question-mark.svg"
                      width={80}
                      height={80}
                      alt="Technical Support & Help Desk"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                   Technical Support & Product Helpdesk
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    Tiered support for SaaS, telecoms, and connected products; clearer comms and higher uptime.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/icons/smilling-face.svg"
                      width={80}
                      height={80}
                      alt="Technical Support & Help Desk"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Claims, Dispute & Verification Processes
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    Fast, compliant handling for insurance, fintech, and e-commerce with full auditability.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/icons/woman.svg"
                      width={80}
                      height={80}
                      alt="Technical Support & Help Desk"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                  Quality Assurance & CX Analytics
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    AI-assisted QA and CX intelligence that track accuracy, empathy, and performance in real time.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/icons/online-support.svg"
                      width={80}
                      height={80}
                      alt="Technical Support & Help Desk"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                  Back-Office & Administrative Outsourcing
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  Data processing, billing, content moderation, and reporting — cut costs and ensure continuity.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

          {/* Why Africa */}
        <div
          className="relative bg-ccsa-dark-blue px-4 py-12 sm:py-20 overflow-hidden"
          id="why-africa"
        >
          {/* Radial Ellipse at Top Middle */}
          <div 
            className="absolute left-1/2 top-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(-50%, -30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Left */}
          <div 
            className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #ED761E 0%, #ED761E 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Right */}
          <div 
            className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(30%, 30%)'
            }}
          />
          <section className="relative z-10 mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
              <p className="text-lg sm:text-xl font-semibold text-white uppercase">Why Africa?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6 leading-tight text-white">Why Global Brands Choose CCSA</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-white/90">Global standards with the African advantage - secure, compliant, and cost-efficient CX.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="bg-white/10 border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon icon="mdi:shield-check" width={24} height={24} className="text-ccsa-yellow flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          Global Standards
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">ISO 27001 • GDPR • PCI-DSS • SOC 2</span>
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">45-60% cost reduction</span>
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">CXPA-aligned training & SLAs</span>
                      </div>
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon icon="mdi:shield-check" width={24} height={24} className="text-ccsa-yellow flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          CX Intelligence + Human Empathy
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">AI routing & analytics</span>
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">Human-centered service</span>
                      </div>
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon icon="mdi:shield-check" width={24} height={24} className="text-ccsa-yellow flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          Security & Compliance That Inspire Confidence
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">100% encrypted (in transit & at rest)</span>
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">HIPAA-ready • EU data handling</span>
                      </div>
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon icon="mdi:shield-check" width={24} height={24} className="text-ccsa-yellow flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                         Agile, Scalable & Transparent
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">Pilot → multi-region</span>
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">Real-time dashboards</span>
                        <span className="bg-white rounded-full px-3 py-1.5 text-xs sm:text-sm leading-relaxed text-ccsa-dark-blue whitespace-nowrap">Calibration calls & QBRs</span>
                      </div>
                    </div>
                </div>
                <div>
                <Link
                  href="/contact-us"
                  className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm w-auto"
                  style={{
                    background: "var(--ccsa-gradient)"
                  }}
                >
                  <Icon icon="mdi:phone" width={18} height={18} />
                  Partner With Us
                </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="relative w-full flex-1 rounded-lg overflow-hidden">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/why-africa-1.webp"
                    width={500}
                    height={500}
                    alt="Why Africa"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="relative w-full flex-1 rounded-lg overflow-hidden">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/why-africa-2.webp"
                    width={500}
                    height={500}
                    alt="Why Africa"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
           
          </section>
        </div>

          
          {/* Industries we serve in */}
        
        <div
          className="bg-white relative px-4 pb-20 overflow-hidden"
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
            <div className="flex flex-col items-center gap-4 pt-10">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-ccsa-dark-blue uppercase">
                  Industries We Serve
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-4 sm:mb-6 leading-tight">
                Industry Expertise
              </h2>
            </div>

            <div>
              <IndustriesTab />
            </div>
            
          </section>
        </div>

        {/* Africa's strategic advantage */}

        <section className="bg-ccsa-dark-blue w-full px-4 relative overflow-hidden">
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
            <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8 sm:mb-12">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                    <p className="text-lg sm:text-xl font-normal text-white uppercase">Africa's Strategic Advantage</p>
                  </div>
                  <h2 className="text-2xl pt-4 sm:text-2xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                      Where cost efficiency meets world-class talent.
                  </h2>                  
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
                <div className="flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon icon="mdi:clock-outline" width={28} height={28} className="text-ccsa-orange flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                      Time-zone alignment
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                  Ideal overlap with Europe, the Middle East, and North America.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon icon="mdi:translate" width={28} height={28} className="text-ccsa-orange flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                      Multilingual delivery
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                    English, French, Arabic, and Portuguese support.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon icon="mdi:account-group" width={28} height={28} className="text-ccsa-orange flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                      Skilled youth workforce
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                    11M+ educated graduates entering the job market annually across Africa.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon icon="mdi:handshake" width={28} height={28} className="text-ccsa-orange flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                      Government incentives
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                  Pro-outsourcing policies in Kenya, Ghana, and South Africa.
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon icon="mdi:trophy" width={28} height={28} className="text-ccsa-orange flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Global recognition
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                  South Africa ranked among the Top 3 BPO destinations worldwide (Deloitte, 2024).
                  </p>
                </div>
                <div className="flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon icon="mdi:rocket-launch" width={28} height={28} className="text-ccsa-orange flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    Kenya: emerging CX tech hub
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                  Strategic base for nearshore and offshore delivery.
                  </p>
                </div>
              </div>
            </div>
        </section>


        {/* Technoly Partners */}
        <div
          className="bg-white relative px-4 pb-20 overflow-hidden"
          id="industries"
          ref={sectionRefs.industries}
        >
          {/* Radial Ellipse at Top Right - Yellow */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Left - Orange */}
          <div 
            className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          <section className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-4 pt-10">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-ccsa-dark-blue uppercase">
                  Technology Partners
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-4 sm:mb-6 leading-tight">
              Our Trusted Technology Partners
              </h2>
            </div>

            {/* Partner Logos Grid */}
            <div className="mt-8 sm:mt-12">
              {/* Top 6 boxes in 3x2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                {[
                  { name: "HoduSoft", logo: "/assets/images/partners/hodusoft.svg" },
                  { name: "Google Cloud", logo: "/assets/images/partners/google-cloud.svg" },
                  { name: "Acronis", logo: "/assets/images/partners/acronis.svg" },
                  { name: "Iristel", logo: "/assets/images/partners/iristel.svg" },
                  { name: "AWS", logo: "/assets/images/partners/aws.svg" },
                  { name: "Backblaze", logo: "/assets/images/partners/backblaze.svg" },
                ].map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 flex items-center justify-center hover:border-ccsa-orange hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-5px]"
                  >
                    <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom centered box */}
              <div className="flex justify-center">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 flex items-center justify-center hover:border-ccsa-orange hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-5px] w-full max-w-md">
                  <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
                    <Image
                      src="/assets/images/partners/connexai.svg"
                      alt="ConnexAI"
                      width={120}
                      height={80}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            
          </section>
        </div>

         {/* Insights */}
         <div
          className="bg-ccsa-dark-blue relative px-4 pb-20 overflow-hidden"
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
          {/* Radial Ellipse at Bottom Left - Yellow */}
          <div 
            className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Right - Blue */}
          <div 
            className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(30%, 30%)'
            }}
          />
          <section className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-4 pt-10">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-white uppercase">
                  Insights and Downloads
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Resources
              </h2>
            </div>

            {/* Insights Grid */}
            <div className="mt-8 sm:mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                      Africa CX<br /> Advantage Report
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                        Explore cost efficiency, multilingual talent, and compliance-led delivery across Africa.
                    </p>
                    <a
                      href="/assets/documents/africa_cx_advantage_report.pdf"
                      download
                      className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm"
                      style={{
                        background: "var(--ccsa-gradient)"
                      }}
                    >
                      <Icon icon="mdi:download" width={18} height={18} />
                      Download Report
                    </a>
                  </div>
                  <div className="flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px] opacity-50 relative">
                    <div className="absolute top-4 right-4 bg-ccsa-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Coming Soon
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                      Africa CX<br /> Advantage Report
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                        Explore cost efficiency, multilingual talent, and compliance-led delivery across Africa.
                    </p>
                    <button
                    className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm opacity-50 cursor-not-allowed"
                    style={{
                      background: "var(--ccsa-gradient)"
                    }}
                    disabled
                  >
                    <Icon icon="mdi:download" width={18} height={18} />
                    Download Report
                  </button>
                  </div>
                  <div className="flex flex-col gap-4 bg-white rounded-lg p-6 sm:p-8 transform transition-transform duration-300 hover:translate-y-[-5px] opacity-50 relative">
                    <div className="absolute top-4 right-4 bg-ccsa-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Coming Soon
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                      Africa CX<br /> Advantage Report
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-ccsa-dark-blue">
                        Explore cost efficiency, multilingual talent, and compliance-led delivery across Africa.
                    </p>
                    <button
                    className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm opacity-50 cursor-not-allowed"
                    style={{
                      background: "var(--ccsa-gradient)"
                    }}
                    disabled
                  >
                    <Icon icon="mdi:download" width={18} height={18} />
                    Download Report
                  </button>
                  </div>
                  
              </div>
            </div>
            
          </section>
        </div>

        {/* Proposal */}
        <div
          className="relative bg-white px-4 py-12 sm:py-20 overflow-hidden"
          id="why-africa"
        >
          {/* Radial Ellipse at Top Middle */}
          <div 
            className="absolute left-1/2 top-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(-50%, -30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Left */}
          <div 
            className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #ED761E 0%, #ED761E 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Right */}
          <div 
            className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(30%, 30%)'
            }}
          />
          <section className="relative z-10 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8 sm:mb-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                  <p className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue uppercase">Get a tailored proposal</p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-ccsa-dark-blue">Considering outsourcing to Africa?</h2>
              </div>
              <div className="flex items-center">
                <p className="text-base sm:text-lg leading-relaxed text-ccsa-dark-blue">Book a 20-minute discovery call to map your CX goals and a right-size delivery model.</p>
              </div>
            </div>
            <div className="bg-ccsa-dark-blue text-white p-6 sm:p-8 lg:p-12 rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-white">Build world-class CX with 45-60% cost efficiency</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-white/90">ISO 27001 aligned, GDPR and PCI scope, multilingual teams. Nearshore and offshore from Africa.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2.5">
                      <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0" />
                      <span className="text-sm sm:text-base text-white">ISO 27001 and GDPR-ready</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2.5">
                      <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0" />
                      <span className="text-sm sm:text-base text-white">Real-time SLA tracking</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2.5">
                      <Icon icon="mdi:check-circle" width={20} height={20} className="text-ccsa-yellow flex-shrink-0" />
                      <span className="text-sm sm:text-base text-white">Multilingual 24/7 delivery</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      href="/contact-us"
                      className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm"
                      style={{
                        background: "var(--ccsa-gradient)"
                      }}
                    >
                      <Icon icon="mdi:phone" width={18} height={18} />
                      Talk to Us
                    </Link>
                    <a
                      href="/assets/documents/africa_cx_advantage_report.pdf"
                      download
                      className="text-ccsa-dark-blue bg-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm"
                    >
                      <Icon icon="mdi:download" width={18} height={18} />
                      Download Africa CX Report
                    </a>
                  </div>
                  <span className="text-white/80 text-xs sm:text-sm">*We respond within one business day. No obligation.</span>
                </div>
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="relative w-full max-w-md">
                    <Image 
                      src="https://ik.imagekit.io/nkmvdjnna/CCSA/tailored-proposal.webp" 
                      alt="Outsource to Africa" 
                      width={500} 
                      height={500}
                      className="rounded-lg object-cover w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>        
           
          </section>
        </div>
        <FloatingCTA />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
