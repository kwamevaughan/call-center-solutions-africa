// pages/index.js
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useEffect, useRef, useMemo, useState } from "react";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";
import IndustriesTab from "@/components/IndustriesTab";
import GoogleReviewsTestimonials from "@/components/GoogleReviewsTestimonials";
import SectionBridgeVideo from "@/components/SectionBridgeVideo";
import OurSolutionsSlider from "@/components/OurSolutionsSlider";
import DeliveryModels from "@/components/DeliveryModels";
import { getWebPageSchema, getBreadcrumbSchema } from "@/lib/schemas";

/** MP4 for Featured Video in Resources (was the Who we are bridge). */
const HOME_SECTION_VIDEO_SRC = "/assets/videos/ccsa-company-video.mp4";
const HERO_VIDEO_SRC = "/assets/videos/ccsa-hero.mp4";
/** YouTube embed for the bridge between Who we are and Our solutions (was Featured Video). */
const HOME_YOUTUBE_EMBED_URL =
  "https://www.youtube.com/embed/h9g2ZZjUYV0?autoplay=1&mute=1&loop=1&playlist=h9g2ZZjUYV0&rel=0";
const TEAM_STORIES_VIDEOS = [
  {
    title: "CCSA agent story",
    description: "Meet the people behind sales engagement and high-performance CX delivery.",
    url: "https://www.youtube.com/embed/J4ihMo5r9Z0?si=e3Z-Xiw1_SyCQ-c_",
  },
  {
    title: "Inside CCSA operations",
    description: "A snapshot of our client-first execution in action.",
    url: "https://www.youtube.com/embed/0BtlnCYm7KA?autoplay=1&mute=1&rel=0",
  },
  {
    title: "Why CCSA exists",
    description: "How our teams collaborate to deliver outcomes daily.",
    url: "https://www.youtube.com/embed/oYv5VWtIDYA?autoplay=1&mute=1&rel=0&si=ySsq3H7ydUDn_PQ2",
  },
];

const getYoutubeVideoId = (embedUrl) => {
  try {
    const url = new URL(embedUrl);
    const parts = url.pathname.split("/");
    return parts[parts.length - 1] || "";
  } catch {
    return "";
  }
};

const getAutoplayEmbedUrl = (embedUrl) => {
  try {
    const url = new URL(embedUrl);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("mute", "1");
    url.searchParams.set("rel", "0");
    return url.toString();
  } catch {
    return embedUrl;
  }
};

const HomePage = () => {
  const [activeStoryVideo, setActiveStoryVideo] = useState(null);
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

  useEffect(() => {
    if (!activeStoryVideo) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveStoryVideo(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeStoryVideo]);

  // Generate SEO schemas
  const seoSchemas = useMemo(() => {
    const baseUrl = 'https://callcentersolutionsafrica.com';
    
    const webPageSchema = getWebPageSchema({
      name: 'Home - Call Center Solutions Africa',
      description: 'CCSA delivers world-class, secure, and multilingual customer service outsourcing from Africa. Offering 45–60% cost savings, ISO 27001 compliance, and 24/7 CX delivery.',
      url: baseUrl
    });

    return [webPageSchema];
  }, []);

  return (
    <>
      <SEO
        title="Excellence in Customer Service Outsourcing from Africa | CCSA"
        description="CCSA delivers world-class, secure, and multilingual customer service outsourcing from Africa. Offering 45–60% cost savings, ISO 27001 compliance, and 24/7 CX delivery."
        keywords="call center solutions, BPO services, contact center technology, business solutions, cloud call center, customer experience, Nairobi call center services, healthcare customer support, fintech customer service, SaaS support, insurance contact center, travel customer care, telecoms helpdesk, HIPAA compliant call center, GDPR compliant BPO, multilingual customer service, patient engagement, fraud prevention, KYC support, technical support, claims processing, telehealth support, digital payments support, omnichannel contact center, 24/7 customer service, ISO 27001 call center, PCI-DSS compliant, customer retention, back-office outsourcing"
        schema={seoSchemas}
      />
      <Header />

      <main className="relative overflow-x-hidden">
        <div
          className="relative bg-ccsa-dark-blue px-4 min-h-screen flex items-start md:items-center overflow-hidden pt-24 pb-10"
          id="home"
          ref={sectionRefs.home}
        >
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="hero"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          </div>

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />

          {/* Radial Ellipse at Left Bottom */}
          <div 
            className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl z-10"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          {/* Radial Ellipse at Top Right */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl z-10"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          <div className="max-w-7xl mx-auto w-full relative z-20 px-2 sm:px-4">
            <div className="flex flex-col items-center text-center gap-4 sm:gap-6 text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Accelerate Revenue Through Outsourced <br/>{" "}  Sales Conversion and {" "}
                  <span className="text-ccsa-orange">Revenue Contact Center</span>
              </h1>
              <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-white/90 px-2 sm:px-0">
                We help business acrosss the globe build world-class, cost-efficient, 
                and secure sales and customer service operations powered by Africa's skilled, multilingual workforce.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
                <button
                  onClick={() => window.location.href = "/contact-us"}
                  className="bg-transparent border-2 border-white text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-ccsa-dark-blue text-sm"
                >
                  Start a Pilot
                </button>
              </div>
                {/* Certification Badges */}
              <div className="hidden md:flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
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
              {/* Global BPO Market Outlook */}
              <div className="mt-5 sm:mt-6 w-full flex justify-start">
                <div className="p-3 sm:p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 max-w-xl w-full text-left">
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
            <div className="relative z-10 mx-auto max-w-7xl pt-12 sm:pt-20 pb-24 sm:pb-32 lg:pb-40">
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
                    <p className="text-lg sm:text-xl uppercase text-white">Who We Are</p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                    Building the Future of Sales Engagement and Customer Experience
                  </h2>
                  <div className="flex flex-col gap-4">
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90">
                    CCSA helps growth-focused companies convert more leads, book more qualified conversations, close more telesales revenue, and reactivate dormant customers through managed sales teams from Africa. 
                        Instead of just generating leads, we help you convert them consistently and profitably. We combine high-performing agents, data-driven engagement playbooks, 
                        and omnichannel execution across phone, WhatsApp, social, and email to help you close more deals and reactivate dormant revenue. 
                    </p>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90">
                      We blend technology, talent, and trust to deliver service excellence from Africa to global markets.
                    </p>
                  </div>
                  <Link
                    href="/about-us"
                    className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm w-fit"
                    style={{
                      background: "var(--ccsa-gradient)"
                    }}
                  >
                    Read More
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
        </div>

         {/* Our solutions */}
        <div className="relative z-20">
          <section className="bg-white w-full px-4 relative overflow-visible">
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
            {/* Native video on section edge: ~1/4 over Who we are (dark), ~3/4 on this section (white) */}
            <div
              className="relative z-30 mx-auto w-full max-w-4xl -translate-y-[25%] pointer-events-auto"
              style={{
                marginBottom:
                  "calc(-0.25 * min(100vw - 2rem, 56rem) * 9 / 16)",
              }}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-black/10">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={HOME_YOUTUBE_EMBED_URL}
                  title="Who we are — featured video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
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
                  Whether you're a startup, government agency, or global enterprise, we customize sales CX and back-office solutions that improve efficiency, enhance customer satisfaction, and reduce costs.
                </p>
              </div>

              <OurSolutionsSlider />
            </div>
          </section>
        </div>

        {/* Stories from our team */}
        <section className="bg-gradient-to-b from-white to-slate-50/60 w-full px-4 pb-12 sm:pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 bg-ccsa-orange rounded-full flex-shrink-0" />
              <p className="text-lg sm:text-xl font-semibold text-ccsa-dark-blue uppercase">
                Stories from our team
              </p>
            </div>
            <p className="text-sm sm:text-base text-ccsa-dark-blue/80 mb-6 sm:mb-8 max-w-2xl">
              Hear directly from our people about the culture, commitment, and delivery standards that power every client engagement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM_STORIES_VIDEOS.map((video, index) => (
                <div
                  key={video.title}
                  className="group rounded-2xl border border-slate-200/70 bg-white p-3 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-ccsa-yellow to-ccsa-orange mb-3" />
                  <button
                    type="button"
                    onClick={() => setActiveStoryVideo(video)}
                    className="relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-black/10 text-left"
                    aria-label={`Open ${video.title} in modal`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${getYoutubeVideoId(video.url)}/hqdefault.jpg`}
                      alt={`${video.title} thumbnail`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ccsa-dark-blue shadow-md">
                        <Icon icon="mdi:play-circle" width={20} height={20} />
                        Play video
                      </span>
                    </div>
                  </button>
                  <div className="pt-4 px-1">
                    <h3 className="text-base sm:text-lg font-semibold text-ccsa-dark-blue">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-sm text-ccsa-dark-blue/75 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {activeStoryVideo && (
          <div
            className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
            onClick={() => setActiveStoryVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl rounded-2xl bg-ccsa-dark-blue p-3 sm:p-4 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveStoryVideo(null)}
                className="absolute -top-3 -right-3 sm:top-3 sm:right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-ccsa-dark-blue shadow-lg"
                aria-label="Close video modal"
              >
                <Icon icon="mdi:close" width={18} height={18} />
              </button>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={getAutoplayEmbedUrl(activeStoryVideo.url)}
                  title={activeStoryVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* Delivery Models */}
        <DeliveryModels />
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
                    <ol className="text-white list-none flex flex-col gap-3">
                      <li className="flex items-start gap-3">
                        <Icon icon="mdi:shield-outline" width={20} height={20} className="text-white flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Proven sales closing teams that handle high-touch engagement</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon icon="mdi:shield-outline" width={20} height={20} className="text-white flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Omnichannel outreach (calls, WhatsApp, social, email, chat)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon icon="mdi:shield-outline" width={20} height={20} className="text-white flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">KPI-driven execution with transparent reporting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon icon="mdi:shield-outline" width={20} height={20} className="text-white flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">30-60 day pilot options with scale-up pathways</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon icon="mdi:shield-outline" width={20} height={20} className="text-white flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Global reach & expertise</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon icon="mdi:shield-outline" width={20} height={20} className="text-white flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">24/7/365 Availability across all global time zones</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon icon="mdi:shield-outline" width={20} height={20} className="text-white flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Integrated technology for CRM and omnichannel CX</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon icon="mdi:shield-outline" width={20} height={20} className="text-white flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">English & French speaking teams</span>
                      </li>
                    </ol>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact-us"
                    className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm w-fit"
                    style={{
                      background: "var(--ccsa-gradient)"
                    }}
                  >
                    Book a discovery call
                  </Link>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">*understand how to convert more of your existing lead flow into predictable revenue.</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <div className="relative w-full flex-1 rounded-lg overflow-hidden min-h-0">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/why-africa-1.webp"
                    width={500}
                    height={300}
                    alt="Why Africa"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="relative w-full flex-1 rounded-lg overflow-hidden min-h-0">
                  <Image
                    src="https://ik.imagekit.io/nkmvdjnna/CCSA/why-africa-2.webp"
                    width={500}
                    height={300}
                    alt="Why Africa"
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
           
          </section>
        </div>

        {/* Google Reviews Testimonials */}
        <GoogleReviewsTestimonials />

          
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
              {/* All logos in 4-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { name: "Squaretalk", logo: "/assets/images/partners/sq-logo-text.png" },
                  { name: "Google Cloud", logo: "/assets/images/partners/google-cloud.svg" },
                  { name: "Acronis", logo: "/assets/images/partners/acronis.svg" },
                  { name: "Iristel", logo: "/assets/images/partners/iristel.svg" },
                  { name: "AWS", logo: "/assets/images/partners/aws.svg" },
                  { name: "Backblaze", logo: "/assets/images/partners/backblaze.svg" },
                  { name: "ConnexAI", logo: "/assets/images/partners/connexai.svg" },
                  { name: "HoduSoft", logo: "/assets/images/partners/hodusoft.svg" },
                ].map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 flex items-center justify-center hover:border-ccsa-orange hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-5px]"
                  >
                    <div className="relative w-full h-12 sm:h-16 flex items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={100}
                        height={60}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                ))}
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

            <div className="mt-8 sm:mt-10 flex justify-center">
              <div className="relative w-full max-w-xl sm:max-w-2xl">
                <SectionBridgeVideo src={HOME_SECTION_VIDEO_SRC} />
              </div>
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
