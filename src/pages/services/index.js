// pages/services/index.js
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useMemo } from "react";
import { getCollectionPageSchema, getBreadcrumbSchema } from "@/lib/schemas";

const ServicesPage = () => {
  const sectionRefs = {
    hero: useRef(null),
    services: useRef(null),
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

  // Generate SEO schemas
  const seoSchemas = useMemo(() => {
    const baseUrl = 'https://callcentersolutionsafrica.com';
    const servicesUrl = `${baseUrl}/services`;
    
    const collectionPageSchema = getCollectionPageSchema({
      name: 'BPO Services & Customer Experience Solutions',
      description: 'Discover our full range of BPO services: inbound/outbound customer service, omnichannel operations, sales enablement, technical support, claims processing, and more. ISO 27001 certified.',
      url: servicesUrl
    });

    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'Services', url: servicesUrl }
    ]);

    return [collectionPageSchema, breadcrumbSchema];
  }, []);

  const services = [
    {
      title: "Inbound & Outbound Customer Service",
      description:
        "24/7 multilingual coverage: inquiries, renewals, feedback - improving satisfaction and first-call resolution.",
      icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/chat-bubble.png",
      link: "/services/inbound-outbound-customer-service",
    },
    {
      title: "Omnichannel Contact Center Operations",
      description:
        "Unified voice/chat/email/social. Integrated CRM & analytics for faster responses and reduced costs.",
      icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/headset.svg",
      link: "/services/omnichannel-contact-center-operations",
    },
    {
      title: "Sales & Revenue Enablement",
      description:
        "Lead generation, qualification, upselling, renewals — increasing efficiency and reducing CPA.",
      icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/online-support.svg",
      link: "/services/sales-revenue-enablement",
    },
    {
      title: "Customer Retention & Loyalty Management",
      description:
        "Behavioral analytics + personalized outreach to reduce churn and boost loyalty participation.",
      icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/feedback.svg",
      link: "/services/customer-retention-loyalty",
    },
    {
      title: "Technical Support & Product Helpdesk",
      description:
        "Tiered support for SaaS, telecoms, and connected products; clearer comms and higher uptime.",
      icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/question-mark.svg",
      link: "/services/technical-support-help-desk",
    },
    {
      title: "Claims, Dispute & Verification Processes",
      description:
        "Fast, compliant handling for insurance, fintech, and e-commerce with full auditability.",
      icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/smilling-face.svg",
      link: "/services/claims-dispute-verification",
    },
    {
      title: "Quality Assurance & CX Analytics",
      description:
        "AI-assisted QA and CX intelligence that track accuracy, empathy, and performance in real time.",
      icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/woman.svg",
      link: "/services/quality-assurance-cx-analytics",
    },
    {
      title: "Back-Office & Administrative Outsourcing",
      description:
        "Data processing, billing, content moderation, and reporting — cut costs and ensure continuity.",
      icon: "https://ik.imagekit.io/nkmvdjnna/CCSA/icons/online-support.svg",
      link: "/services/back-office-admin-outsourcing",
    },
  ];

  return (
    <>
      <SEO
        title="BPO Services & Customer Experience Solutions | Call Center Solutions Africa"
        description="Discover our full range of BPO services: inbound/outbound customer service, omnichannel operations, sales enablement, technical support, claims processing, and more. ISO 27001 certified."
        keywords="BPO services Africa, customer experience solutions, call center outsourcing, omnichannel support, technical support Africa, sales enablement, customer retention management, claims processing BPO"
        schema={seoSchemas}
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
              background:
                "radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)",
              transform: "translate(-30%, 30%)",
            }}
          />
          {/* Radial Ellipse at Top Right */}
          <div
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #0088D2 0%, transparent 100%)",
              transform: "translate(30%, -30%)",
            }}
          />

          <div className="max-w-7xl mx-auto w-full relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col items-center gap-6 sm:gap-8 text-center max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-white uppercase tracking-wide">
                  Our Solutions
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Comprehensive Customer Experience Solutions
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                Whether you're a startup, government agency, or global
                enterprise, we customize CX and back-office solutions that
                improve efficiency, enhance customer satisfaction, and reduce
                costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                <Link
                  href="/contact-us"
                  className="text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm sm:text-base"
                  style={{
                    background: "var(--ccsa-gradient)",
                  }}
                >
                  <Icon icon="mdi:phone" width={18} height={18} />
                  Talk to Us
                </Link>
                <Link
                  href="/industries"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-ccsa-dark-blue flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Icon icon="mdi:briefcase" width={18} height={18} />
                  View Industries
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div
          className="relative bg-white px-4 py-12 sm:py-20"
          id="services"
          ref={sectionRefs.services}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.link}
                  className="flex flex-col gap-4 bg-ccsa-dark-blue rounded-lg p-6 sm:p-8 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex-shrink-0">
                    <Image
                      src={service.icon}
                      width={80}
                      height={80}
                      alt={service.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-tr from-ccsa-yellow to-ccsa-orange bg-clip-text text-transparent">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-ccsa-yellow mt-auto pt-2">
                    <span className="text-sm font-medium">Learn more</span>
                    <Icon icon="mdi:arrow-right" width={18} height={18} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative bg-ccsa-dark-blue px-4 py-12 sm:py-20 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)",
              transform: "translate(-50%, -50%)",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-semibold text-white uppercase tracking-wide">
                  Get started
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Ready to Transform Your Customer Experience?
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-white/90 text-center max-w-2xl">
                Start small. Scale fast. We'll scope a pilot and share a clear
                rollout plan.
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
                  Download Report
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;

