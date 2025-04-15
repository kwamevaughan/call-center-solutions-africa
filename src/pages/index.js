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
        image="https://callcentersolutionsafrica.com/assets/images/logo.svg"
        canonical="https://callcentersolutionsafrica.com/"
      />
      <Header />

      <main className="sm:px-0 sm:pt-0 relative">
        <ScrollToTop />
        <div
          className="relative section pt-0 px-4 sm:px-0 h-[85vh] flex items-center"
          id="home"
          ref={sectionRefs.home}
        >
          {/* Background Slider */}
          <div className="absolute inset-0 z-10">
            {" "}
            {/* Make sure it's above background and below text */}
            <HeroSlider />
          </div>

          {/* Text Content Over Slider */}
          <div className="absolute bottom-0 left-0 z-20 w-full px-4 sm:px-0 pointer-events-all">
            {" "}
            {/* Higher than HeroSlider */}
            <div className="w-full md:w-1/2 relative left-0 sm:left-14">
              <section className="relative max-w-7xl bg-white px-10 sm:px-32 p-10 rounded-tr-3xl w-full -mx-4 sm:-mx-8 lg:-mx-16">
                <div className="flex flex-col gap-6 justify-end">
                  <h2 className="text-2xl">
                    Powering African Businesses with Advanced{" "}
                    <span className="text-[#F45B00]">Call Center</span> &{" "}
                    <span className="text-[#FFD100]">BPO Solutions</span>
                  </h2>
                  <p className="text-sm">
                    From cloud tech to expert guidance and premium
                    equipment—everything you need to launch, grow, and scale
                    your contact center across Africa.
                  </p>
                  <div className="flex md:flex-row flex-col gap-4">
                    <button
                      onClick={(e) => {
                        handleScroll(e, "#contact-us", isFixed);
                      }}
                      className="bg-[#0088D2] text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-[#e17a2f] hover:translate-y-[-4px] transition-transform duration-300"
                    >
                      Start Your Journey Today
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div id="about-us" ref={sectionRefs["about-us"]}>
          {/* First Section: "Why We're Here" */}
          <section className="w-full px-4 sm:px-0">
            <Marquee /> {/* Full-width background for this section */}
            <div className="relative z-10 mx-auto max-w-7xl py-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#FFD100] rounded-full flex-shrink-0" />
                    <p className="text-xl font-semibold">Why We're Here</p>
                  </div>

                  <Image
                    src="/assets/images/why-here.jpg"
                    width={500}
                    height={0}
                    alt=""
                    className="rounded-md transform transition-transform duration-300 hover:translate-y-[-5px]"
                  />
                </div>
                <div className="flex flex-col gap-10">
                  <div className="flex items-center gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <p className="text-2xl leading-tight">
                      In Africa’s growing digital economy, customer experience
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
          <section className="bg-[#0088D2] w-full px-4 sm:px-0">
            {" "}
            {/* Full-width background for this section */}
            <div className="relative z-10 mx-auto max-w-7xl py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start justify-items-end">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#FFD100] rounded-full flex-shrink-0" />
                    <p className="text-xl font-semibold text-white">About Us</p>
                  </div>
                  <h2 className="text-3xl font-light mb-6 text-white">
                    Your Vision. Our Solutions. Africa’s Future.
                  </h2>
                  <div className="flex flex-col gap-4 text-xl font-semibold mb-6 teext-white">
                    <p className="text-white">Our Mission</p>
                    <span className="text-lg font-light leading-tight text-white">
                      To redefine customer service across Africa by combining
                      global technologies with deep local insight. With over a
                      decade of experience across markets like Nairobi and
                      Lagos, we empower businesses to connect, engage, and
                      thrive.
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 text-xl font-semibold mb-4 text-white">
                    <p>Why We Exist</p>
                    <ul className="space-y-0 text-lg font-normal">
                      <li className="flex items-start gap-3 pb-4 hover:translate-y-[-2px] transition-transform duration-300">
                        <Icon
                          icon="mdi:check-circle"
                          width="24"
                          height="24"
                          className="flex-shrink-0 text-[#FFD100]"
                        />
                        <p className="text-base leading-tight">
                          10+ years serving African businesses
                        </p>
                      </li>
                      <li className="flex items-start gap-3 pb-4 hover:translate-y-[-2px] transition-transform duration-300">
                        <Icon
                          icon="mdi:check-circle"
                          width="24"
                          height="24"
                          className="flex-shrink-0 text-[#FFD100]"
                        />
                        <p className="text-base leading-tight">
                          Complete support from cloud platforms to office setup
                        </p>
                      </li>
                      <li className="flex items-start gap-3 pb-4 hover:translate-y-[-2px] transition-transform duration-300">
                        <Icon
                          icon="mdi:check-circle"
                          width="24"
                          height="24"
                          className="flex-shrink-0 text-[#FFD100]"
                        />
                        <p className="text-base leading-tight">
                          Fast deployment go live in 30 days or less
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-8">
                    <Image
                      src="/assets/images/about-us-image.png"
                      width={500}
                      height={0}
                      alt="Our Vision"
                      className="rounded-md transform transition-transform duration-300 hover:translate-y-[-5px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="relative section px-4 sm:px-0 py-20"
          id="services"
          ref={sectionRefs.services}
        >
          <div className="absolute bottom-8 right-32 w-16 h-16 rounded-full z-0"></div>
          <section className="relative z-10 mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
              <p className="text-xl font-semibold">Our Services</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start justify-items-end">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-light mb-0 sm:mb-20">
                  Complete Solutions for Every Phase of Your Contact Center
                </h2>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex gap-4 justify-between items-center ">
                    <button
                      onClick={(e) => {
                        handleScroll(e, "#chooseus", isFixed);
                      }}
                      className="bg-[#ED761E] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#e17a2f] hover:translate-y-[-4px] transition-transform duration-300"
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
          className="bg-[#2A2B5F] relative section px-4 sm:px-0"
          id="industries"
          ref={sectionRefs.industries}
        >
          <section className="relative z-10 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start py-20">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                  <p className="text-xl font-semibold text-white">
                    Industries We Serve
                  </p>
                </div>
                <h2 className="text-3xl font-light text-white mb-6">
                  Delivering Impact Across Africa’s Leading Sectors
                </h2>
              </div>
              <div className="flex flex-col gap-10 text-white">
                <IndustriesTab />
              </div>
            </div>
          </section>
          <div className="z-10 w-full ml-0  sm:ml-32 sm:px-0">
            <div className="w-full md:w-1/2 left-0 sm:left-14">
              <section className="bg-white pr-4 py-8 rounded-br-3xl rounded-tr-3xl w-full -mx-4 sm:-mx-8 lg:-mx-32">
                <div className="bg-[#0088D2] p-8 sm:p-10 rounded-3xl w-full -mx-4">
                  <TestimonialSlider />
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="section-bg">
          <div
            className="relative section px-4 sm:px-0"
            id="chooseus"
            ref={sectionRefs.chooseus}
          >
            <section className="relative z-10 mx-auto max-w-7xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start py-40">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3"></div>
                </div>
              </div>
            </section>
            <div className="z-10 w-full ml-0 sm:ml-32 sm:px-0">
              <div className="w-full md:w-1/2 left-0 sm:left-14">
                <section className="bg-white pr-4 py-8 rounded-tr-3xl w-full -mx-4 sm:-mx-8 lg:-mx-32">
                  <div className="bg-white rounded-3xl w-full ">
                    <div className="pl-8 sm:pl-28 ">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                        <p className="text-xl font-semibold">Why Choose Us</p>
                      </div>

                      <h2 className="text-3xl font-normal my-6">
                        From Vision to Reality—Africa’s Trusted Contact Center
                        Partner
                      </h2>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="bg-white relative  pt-10 px-4 sm:px-0">
            <section className="relative z-10 mx-auto max-w-7xl pb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col items-start gap-4 bg-white rounded-3xl"></div>
                <div className="flex flex-col gap-10"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-10">
                <div className="flex flex-col gap-10 bg-[#0088D2] rounded-lg px-4 py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-10">
                  <Image
                    src="/assets/images/vision1.svg"
                    width={80}
                    height={0}
                    alt="Our Vision"
                    className="rounded-md"
                  />
                  <p className="text-base text-white">
                    Built for African languages, infrastructure, and regulations
                  </p>
                </div>

                <div className="flex flex-col gap-10 bg-[#0088D2] rounded-lg px-4 py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-10">
                  <Image
                    src="/assets/images/vision2.svg"
                    width={80}
                    height={0}
                    alt="Our Vision"
                    className="rounded-md"
                  />
                  <p className="text-base text-white">
                    Rapid setup get up and running in 30 days
                  </p>
                </div>

                <div className="flex flex-col gap-10 bg-[#0088D2] rounded-lg px-4 py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-10">
                  <Image
                    src="/assets/images/vision3.svg"
                    width={80}
                    height={0}
                    alt="Our Vision"
                    className="rounded-md"
                  />
                  <p className="text-base text-white">
                    Full-service: we handle setup, training & optimization
                  </p>
                </div>

                <div className="flex flex-col gap-10 bg-[#0088D2] rounded-lg px-4 py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-10">
                  <Image
                    src="/assets/images/vision4.svg"
                    width={80}
                    height={0}
                    alt="Our Vision"
                    className="rounded-md"
                  />
                  <p className="text-base text-white">
                    Lower costs with scalable cloud-based platforms
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div
          className="relative section px-4 sm:px-0"
          id="contact-us"
          ref={sectionRefs["contact-us"]}
        >
          <section className="relative z-10 mx-auto max-w-7xl text-white">
            <div className="p-10 sm:p-20 bg-[#F45B00] rounded-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 ">
                <h2 className="text-3xl">
                  Let’s Build Africa’s Next-Gen Contact Centers Together
                </h2>
                <p>
                  Our Nairobi-based team is available 24/7 to support clients
                  across Africa.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-end justify-items-end mt-10 sm:mt-20">
                <div className="py-4 sm:py-0">
                  <ul className="cursor-pointer">
                    <li className="flex items-start gap-2 pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                      <Icon
                        icon="material-symbols:call"
                        width="24"
                        height="24"
                        className="flex-shrink-0"
                      />
                      <Link href="tel:+254721314242">
                        <p className="text-base leading-tight hover:underline">
                          +254 721 314 242
                        </p>
                      </Link>
                    </li>

                    <li className="flex items-start gap-2 pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                      <Icon
                        icon="material-symbols:call"
                        width="24"
                        height="24"
                        className="flex-shrink-0"
                      />
                      <Link href="mailto:hello@callcentersolutions.africa">
                        <p className="text-base leading-tight hover:underline">
                          hello@callcentersolutions.africa
                        </p>
                      </Link>
                    </li>

                    <li className="flex items-start gap-2 pb-4 hover:translate-y-[-4px] transition-transform duration-300">
                      <Icon
                        icon="mdi:location"
                        width="24"
                        height="24"
                        className="flex-shrink-0"
                      />
                      <Link
                        href="https://maps.google.com/?q=7th+Floor,+Mitsumi+Business+Park,+Muthithi+Road,+Westlands,+Nairobi,+Kenya"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-base leading-tight hover:underline">
                          7th Floor, Mitsumi Business Park, Muthithi Road,
                          Westlands, Nairobi, Kenya
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#292929] text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-[#000] hover:translate-y-[-4px] transition-transform duration-300"
                  >
                    Get Your Custom Proposal Today
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="w-full pt-20 pb-10">
          <LogoMarquee />
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
