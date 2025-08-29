// pages/index.js
import { useState } from "react";
import SEO from "@/components/SEO";
import Header from "../layouts/header";
import TestimonialSlider from "../components/TestimonialSlider";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import HeroSlider from "@/components/HeroSlider";
import IndustriesTab from "@/components/IndustriesTab";
import ContactModal from "@/components/ContactModal";
import Footer from "@/layouts/footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect, useRef } from "react";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";
import Marquee from "@/components/Marquee";
import FeatureCarousel from "@/components/FeatureCarousel";
import LogoMarquee from "@/components/LogoMarquee";
import BlogSection from "@/components/BlogSection";

const HomePage = () => {
  const sectionRefs = {
    home: useRef(null),
    "about-us": useRef(null),
    services: useRef(null),
    industries: useRef(null),
    chooseus: useRef(null),
    "contact-us": useRef(null),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        keywords="call center solutions Africa, BPO services Africa, contact center technology, African business solutions, cloud call center, customer experience Africa, Nairobi call center services"
      />
      <Header />

      <main className="relative overflow-x-hidden">
        <ScrollToTop />
        <div
          className="relative section pt-0 px-4 h-[85vh] flex items-center"
          id="home"
          ref={sectionRefs.home}
        >
          {/* Background Slider */}
          <div className="absolute inset-0 z-10">
            <HeroSlider />
          </div>

          {/* Text Content Over Slider */}
          <div className="absolute bottom-0 left-0 z-20 w-full pointer-events-all">
            <div className="">
              <div className="w-full md:w-1/2">
                <section className="relative bg-white px-6 sm:px-10 md:px-32 py-8 sm:p-10 rounded-tr-3xl">
                  <div className="flex flex-col gap-4 sm:gap-6 justify-end max-w-7xl mx-auto">
                    <h2 className="text-l sm:text-xl md:text-2xl leading-tight">
                      Powering African Businesses with Advanced{" "}
                      <span className="text-[#F45B00]">Call Center</span> &{" "}
                      <span className="text-[#FFD100]">BPO Solutions</span>
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                      From cloud tech to expert guidance and premium
                      equipment - everything you need to launch, grow, and scale
                      your contact center across Africa.
                    </p>
                    <div className="flex md:flex-row flex-col gap-4">
                      <button
                        onClick={(e) => {
                          handleScroll(e, "#contact-us", isFixed);
                        }}
                        className="bg-[#0088D2] text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-[#e17a2f] hover:translate-y-[-4px] transition-transform duration-300 w-full md:w-auto"
                      >
                        Start Your Journey Today
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div id="about-us" ref={sectionRefs["about-us"]}>
          {/* First Section: "Why We're Here" */}
          <section className="w-full px-4">
            <Marquee />
            <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#FFD100] rounded-full flex-shrink-0" />
                    <p className="text-lg sm:text-xl font-semibold">Why We're Here</p>
                  </div>

                  <Image
                    src="/assets/images/why-here.jpg"
                    width={500}
                    height={0}
                    alt=""
                    className="rounded-md transform transition-transform duration-300 hover:translate-y-[-5px] w-full"
                  />
                </div>
                <div className="flex flex-col gap-6 sm:gap-10">
                  <div className="flex items-center gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <p className="text-lg sm:text-xl md:text-2xl leading-tight">
                      In Africa's growing digital economy, customer experience
                      sets you apart. We provide tailored contact center
                      solutions technology, strategy, and infrastructure to help
                      you launch, scale, and build lasting customer loyalty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Second Section: "About Us" */}
          <section className="bg-[#0088D2] w-full px-4">
            <div className="relative z-10 mx-auto max-w-7xl py-12 sm:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-items-end">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#FFD100] rounded-full flex-shrink-0" />
                    <p className="text-lg sm:text-xl font-semibold text-white">About Us</p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6 text-white leading-tight">
                    Your Vision. Our Solutions. Africa's Future.
                  </h2>
                  <div className="flex flex-col gap-4 text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">
                    <p className="text-white">Our Mission</p>
                    <span className="text-base sm:text-lg font-light leading-tight text-white">
                      To redefine customer service across Africa by combining
                      global technologies with deep local insight. With over a
                      decade of experience across markets like Nairobi and
                      Lagos, we empower businesses to connect, engage, and
                      thrive.
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 text-lg sm:text-xl font-semibold mb-4 text-white">
                    <p>Why We Exist</p>
                    <ul className="space-y-0 text-base sm:text-lg font-normal">
                      <li className="flex items-start gap-3 pb-4 hover:translate-y-[-2px] transition-transform duration-300">
                        <Icon
                          icon="mdi:check-circle"
                          width="20"
                          height="20"
                          className="flex-shrink-0 text-[#FFD100] mt-0.5"
                        />
                        <p className="text-sm sm:text-base leading-tight">
                          10+ years serving African businesses
                        </p>
                      </li>
                      <li className="flex items-start gap-3 pb-4 hover:translate-y-[-2px] transition-transform duration-300">
                        <Icon
                          icon="mdi:check-circle"
                          width="20"
                          height="20"
                          className="flex-shrink-0 text-[#FFD100] mt-0.5"
                        />
                        <p className="text-sm sm:text-base leading-tight">
                          Complete support from cloud platforms to office setup
                        </p>
                      </li>
                      <li className="flex items-start gap-3 pb-4 hover:translate-y-[-2px] transition-transform duration-300">
                        <Icon
                          icon="mdi:check-circle"
                          width="20"
                          height="20"
                          className="flex-shrink-0 text-[#FFD100] mt-0.5"
                        />
                        <p className="text-sm sm:text-base leading-tight">
                          Fast deployment go live in 30 days or less
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col gap-6 sm:gap-10">
                  <div className="flex flex-col gap-6 sm:gap-8">
                    <Image
                      src="/assets/images/about-us-image.png"
                      width={500}
                      height={0}
                      alt="Our Vision"
                      className="rounded-md transform transition-transform duration-300 hover:translate-y-[-5px] w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="relative section px-4 py-12 sm:py-20"
          id="services"
          ref={sectionRefs.services}
        >
          <div className="absolute bottom-8 right-32 w-16 h-16 rounded-full z-0"></div>
          <section className="relative z-10 mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
              <p className="text-lg sm:text-xl font-semibold">Our Services</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-items-end">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-light mb-0 sm:mb-20 leading-tight">
                  Complete Solutions for Every Phase of Your Contact Center
                </h2>
              </div>
              <div className="flex flex-col gap-6 sm:gap-10">
                <div className="flex items-center gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex gap-4 justify-between items-center">
                    <button
                      onClick={(e) => {
                        handleScroll(e, "#chooseus", isFixed);
                      }}
                      className="bg-[#ED761E] text-white px-6 sm:px-8 py-3 rounded-full font-medium text-sm hover:bg-[#e17a2f] hover:translate-y-[-4px] transition-transform duration-300 w-full sm:w-auto"
                    >
                      Explore Our Solutions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <FeatureCarousel />
        </div>
        <div
          className="bg-[#2A2B5F] relative section px-4"
          id="industries"
          ref={sectionRefs.industries}
        >
          <section className="relative z-10 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-12 sm:py-20">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                  <p className="text-lg sm:text-xl font-semibold text-white">
                    Industries We Serve
                  </p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 sm:mb-6 leading-tight">
                  Delivering Impact Across Africa's Leading Sectors
                </h2>
              </div>
              <div className="flex flex-col gap-6 sm:gap-10 text-white">
                <IndustriesTab />
              </div>
            </div>
          </section>
          <div className="w-full">
            <div className="">
              <div className="w-full md:w-1/2">
                <section className="bg-white pr-4 px-4 py-6 sm:py-8 rounded-tr-3xl rounded-bl-3xl">
                  <div className="bg-[#0088D2] p-6 sm:p-8 md:p-10 rounded-3xl">
                    <TestimonialSlider />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="section-bg">
          <div
            className="relative section px-4"
            id="chooseus"
            ref={sectionRefs.chooseus}
          >
            <section className="relative z-10 mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-20 sm:py-40">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3"></div>
                </div>
              </div>
            </section>
            <div className="w-full">
              <div className="">
                <div className="w-full md:w-1/2">
                  <section className="bg-white pr-4 py-6 sm:py-8 rounded-tr-3xl">
                    <div className="bg-white rounded-3xl w-full">
                      <div className="pl-6 sm:pl-8 md:pl-28">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                          <p className="text-lg sm:text-xl font-semibold">Why Choose Us</p>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-normal my-4 sm:my-6 leading-tight">
                          From Vision to Reality—Africa's Trusted Contact Center
                          Partner
                        </h2>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white relative pt-6 sm:pt-10 px-4">
            <section className="relative z-10 mx-auto max-w-7xl pb-6 sm:pb-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col items-start gap-4 bg-white rounded-3xl"></div>
                <div className="flex flex-col gap-6 sm:gap-10"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 sm:py-10">
                <div className="flex flex-col gap-6 sm:gap-10 bg-[#0088D2] rounded-lg px-4 py-8 sm:py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-6 sm:space-y-10">
                  <Image
                    src="/assets/images/vision1.svg"
                    width={60}
                    height={0}
                    alt="Our Vision"
                    className="rounded-md w-16 sm:w-20"
                  />
                  <p className="text-sm sm:text-base text-white leading-relaxed">
                    Built for African languages, infrastructure, and regulations
                  </p>
                </div>

                <div className="flex flex-col gap-6 sm:gap-10 bg-[#0088D2] rounded-lg px-4 py-8 sm:py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-6 sm:space-y-10">
                  <Image
                    src="/assets/images/vision2.svg"
                    width={60}
                    height={0}
                    alt="Our Vision"
                    className="rounded-md w-16 sm:w-20"
                  />
                  <p className="text-sm sm:text-base text-white leading-relaxed">
                    Rapid setup get up and running in 30 days
                  </p>
                </div>

                <div className="flex flex-col gap-6 sm:gap-10 bg-[#0088D2] rounded-lg px-4 py-8 sm:py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-6 sm:space-y-10">
                  <Image
                    src="/assets/images/vision3.svg"
                    width={60}
                    height={0}
                    alt="Our Vision"
                    className="rounded-md w-16 sm:w-20"
                  />
                  <p className="text-sm sm:text-base text-white leading-relaxed">
                    Full-service: we handle setup, training & optimization
                  </p>
                </div>

                <div className="flex flex-col gap-6 sm:gap-10 bg-[#0088D2] rounded-lg px-4 py-8 sm:py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-6 sm:space-y-10">
                  <Image
                    src="/assets/images/vision4.svg"
                    width={60}
                    height={0}
                    alt="Our Vision"
                    className="rounded-md w-16 sm:w-20"
                  />
                  <p className="text-sm sm:text-base text-white leading-relaxed">
                    Lower costs with scalable cloud-based platforms
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div
          className="relative section px-4"
          id="contact-us"
          ref={sectionRefs["contact-us"]}
        >
          <section className="relative z-10 mx-auto max-w-7xl text-white">
            <div className="p-6 sm:p-10 md:p-20 bg-[#F45B00] rounded-3xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-20">
                <h2 className="text-2xl sm:text-3xl leading-tight">
                  Let's Build Africa's Next-Gen Contact Centers Together
                </h2>
                <p className="text-base sm:text-lg leading-relaxed">
                  Our Nairobi-based team is available 24/7 to support clients
                  across Africa.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 items-end justify-items-end mt-8 sm:mt-10 md:mt-20 gap-6 sm:gap-0">
                <div className="py-4 sm:py-0 w-full lg:w-auto">
                  <ul className="cursor-pointer space-y-4">
                    <li className="flex items-start gap-2 pb-2 sm:pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                      <Icon
                        icon="material-symbols:call"
                        width="20"
                        height="20"
                        className="flex-shrink-0 mt-0.5"
                      />
                      <Link href="tel:+254701850850">
                        <p className="text-sm sm:text-base leading-tight hover:underline">
                          +254 701 850 850
                        </p>
                      </Link>
                    </li>

                    <li className="flex items-start gap-2 pb-2 sm:pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                      <Icon
                        icon="basil:envelope-outline"
                        width="20"
                        height="20"
                        className="flex-shrink-0 mt-0.5"
                      />
                      <Link href="mailto:hello@callcentersolutionsafrica.com">
                        <p className="text-sm sm:text-base leading-tight hover:underline">
                          hello@callcentersolutionsafrica.com
                        </p>
                      </Link>
                    </li>

                    <li className="flex items-start gap-2 pb-2 sm:pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                      <Icon
                        icon="mdi:location"
                        width="20"
                        height="20"
                        className="flex-shrink-0 mt-0.5"
                      />
                      <Link
                        href="https://maps.google.com/?q=7th+Floor,+Mitsumi+Business+Park,+Muthithi+Road,+Westlands,+Nairobi,+Kenya"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-sm sm:text-base leading-tight hover:underline">
                          7th Floor, Mitsumi Business Park, Muthithi Road,
                          Westlands, Nairobi, Kenya
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-auto">
                  <Link href="/contact-us">
                    <button className="bg-[#292929] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm hover:bg-[#000] hover:translate-y-[-4px] transition-transform duration-300 w-full lg:w-auto">
                      Get Your Custom Proposal Today
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <BlogSection />

        <section className="w-full pt-12 sm:pt-20 pb-6 sm:pb-10 px-4">
          <div className="max-w-7xl mx-auto">
            <LogoMarquee />
          </div>
        </section>

        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
