// pages/index.js
import { useState } from "react";
import SEO from "@/components/SEO";
import Header from "../layouts/header";
import CustomSlider from "../components/CustomSlider";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import IndustriesTab from "@/components/IndustriesTab";
import ContactModal from "@/components/ContactModal";
import Footer from "@/layouts/footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect, useRef } from "react";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";

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
          className="hero-bg section pt-0 relative px-4 sm:px-0"
          id="home"
          ref={sectionRefs.home}
        >
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
          <div className="mx-auto max-w-6xl relative z-10 pt-80 pb-20">
            <section className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-8 items-end">
              <div className="flex flex-col gap-8 justify-end">
                <h2 className="text-3xl md:text-5xl text-white">
                  Powering African Businesses with Advanced Call Center & BPO
                  Solutions
                </h2>
                <p className="text-white">
                  From cloud tech to expert guidance and premium
                  equipment—everything you need to launch, grow, and scale your
                  contact center across Africa.
                </p>
                <div className="flex md:flex-row flex-col gap-4">
                  <button
                    onClick={(e) => {
                      handleScroll(e, "#contact-us", isFixed);
                    }}
                    className="bg-[#ED761E] text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-[#e17a2f] hover:translate-y-[-4px] transition-transform duration-300"
                  >
                    Start Your Journey Today
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div id="about-us" ref={sectionRefs["about-us"]}>
          {/* First Section: "Why We're Here" */}
          <section className="bg-[#6EB28F] w-full px-4 sm:px-0">
            {" "}
            {/* Full-width background for this section */}
            <div className="relative z-10 mx-auto max-w-6xl py-28">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-white rounded-full flex-shrink-0" />
                  <p className="text-xl font-semibold">Why We're Here</p>
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
          <section className="bg-[#6EAAD7] w-full px-4 sm:px-0">
            {" "}
            {/* Full-width background for this section */}
            <div className="relative z-10 mx-auto max-w-6xl py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start justify-items-end">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                    <p className="text-xl font-semibold">About Us</p>
                  </div>
                  <h2 className="text-3xl font-light mb-6">
                    Your Vision. Our Solutions. Africa’s Future.
                  </h2>
                  <div className="flex flex-col gap-4 text-xl font-semibold mb-6">
                    <p>Our Mission</p>
                    <span className="text-lg font-normal leading-tight">
                      To redefine customer service across Africa by combining
                      global technologies with deep local insight. With over a
                      decade of experience across markets like Nairobi and
                      Lagos, we empower businesses to connect, engage, and
                      thrive.
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 text-xl font-semibold mb-4">
                    <p>Why We Exist</p>
                    <ul className="space-y-0 text-lg font-normal">
                      <li className="flex items-start gap-3 pb-4 hover:translate-y-[-2px] transition-transform duration-300">
                        <Icon
                          icon="mdi:check-circle"
                          width="24"
                          height="24"
                          className="flex-shrink-0"
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
                          className="flex-shrink-0"
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
                          className="flex-shrink-0"
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
                      src="/assets/images/about-1.jpg"
                      width={400}
                      height={0}
                      alt="Our Vision"
                      className="rounded-md transform transition-transform duration-300 hover:translate-y-[-5px]"
                    />
                    <Image
                      src="/assets/images/about-2.jpg"
                      width={400}
                      height={0}
                      alt="Our Mission"
                      className="rounded-md transform transition-transform duration-300 hover:translate-y-[-5px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="relative section px-4 sm:px-0"
          id="services"
          ref={sectionRefs.services}
        >
          <div className="absolute bottom-8 right-32 w-16 h-16 rounded-full z-0"></div>
          <section className="relative z-10 mx-auto max-w-6xl py-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
              <p className="text-xl font-semibold">Our Services</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start justify-items-end">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-light mb-20">
                  Complete Solutions for Every Phase of Your Contact Center
                </h2>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-3 transform transition-transform duration-300 hover:translate-y-[-5px]">
                  <div className="flex gap-4 justify-between items-center">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-2">
                <Image
                  src="/assets/images/advisory.jpg"
                  width={400}
                  height={0}
                  alt="Technology"
                  className="rounded-md"
                />
                <p className="text-xl font-semibold">Technology</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 hover:translate-y-[-2px] transition-transform duration-300">
                    <span className="flex-shrink-0 text-xl">•</span>
                    <p className="text-base leading-tight">
                      Complete support from cloud platforms to office setup
                    </p>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-y-[-2px] transition-transform duration-300">
                    <span className="flex-shrink-0 text-xl">•</span>
                    <p className="text-base leading-tight">
                      AI-powered chatbots & analytics
                    </p>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-y-[-2px] transition-transform duration-300">
                    <span className="flex-shrink-0 text-xl">•</span>
                    <p className="text-base leading-tight">
                      Scalable for any business size
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-2">
                <Image
                  src="/assets/images/tech.jpg"
                  width={400}
                  height={0}
                  alt="Advisory"
                  className="rounded-md"
                />
                <p className="text-xl font-semibold">Advisory</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 hover:translate-y-[-2px] transition-transform duration-300">
                    <span className="flex-shrink-0 text-xl">•</span>
                    <p className="text-base leading-tight">
                      Local compliance support (NDPR, POPIA, Kenya Data Act)
                    </p>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-y-[-2px] transition-transform duration-300">
                    <span className="flex-shrink-0 text-xl">•</span>
                    <p className="text-base leading-tight">
                      Customer experience & workforce strategy
                    </p>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-y-[-2px] transition-transform duration-300">
                    <span className="flex-shrink-0 text-xl">•</span>
                    <p className="text-base leading-tight">
                      Expansion support across African markets
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-2">
                <Image
                  src="/assets/images/equipment.jpg"
                  width={400}
                  height={0}
                  alt="Equipment"
                  className="rounded-md"
                />
                <p className="text-xl font-semibold">Equipment</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 hover:translate-y-[-2px] transition-transform duration-300">
                    <span className="flex-shrink-0 text-xl">•</span>
                    <p className="text-base leading-tight">
                      Ergonomic workstations & noise-canceling headsets
                    </p>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-y-[-2px] transition-transform duration-300">
                    <span className="flex-shrink-0 text-xl">•</span>
                    <p className="text-base leading-tight">
                      High-speed internet solutions
                    </p>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-y-[-2px] transition-transform duration-300">
                    <span className="flex-shrink-0 text-xl">•</span>
                    <p className="text-base leading-tight">
                      Custom hardware bundles for smooth operations
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <div
          className="bg-[#194E78] relative section px-4 sm:px-0"
          id="industries"
          ref={sectionRefs.industries}
        >
          <section className="relative z-10 mx-auto max-w-6xl">
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
            <section className="grid grid-cols-1 sm:grid-cols-2 items-end">
              <div className="flex flex-col justify-end gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                  <p className="text-xl font-semibold text-white">
                    Testimonial
                  </p>
                </div>
                <p className="text-white">
                  Call Center Solutions Africa helped us launch a 24/7 support
                  hub in Lagos within 30 days. Their local know-how was
                  invaluable.
                </p>
              </div>
            </section>
            <div className="text-white w-full pb-20">
              <CustomSlider />
            </div>
          </section>
        </div>
        <div className="section-bg bg-white relative">
          <div className="grid py-48"></div>
        </div>
        <div
          className="bg-white relative section px-4 sm:px-0"
          id="chooseus"
          ref={sectionRefs.chooseus}
        >
          <section className="relative z-10 mx-auto max-w-6xl pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start pt-20">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#ED761E] rounded-full flex-shrink-0" />
                  <p className="text-xl font-semibold">Why Choose Us</p>
                </div>
                <h2 className="text-3xl font-normal mb-6">
                  From Vision to Reality—Africa’s Trusted Contact Center Partner
                </h2>
              </div>
              <div className="flex flex-col gap-10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-10">
              <div className="flex flex-col gap-10 bg-[#6EB28F] rounded-lg px-4 py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-6">
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

              <div className="flex flex-col gap-10 bg-[#6EB28F] rounded-lg px-4 py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-6">
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

              <div className="flex flex-col gap-10 bg-[#6EB28F] rounded-lg px-4 py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-6">
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

              <div className="flex flex-col gap-10 bg-[#6EB28F] rounded-lg px-4 py-10 transform transition-transform duration-300 hover:translate-y-[-5px] space-y-6">
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
        <div
          className="bg-[#A7A9B1] relative section px-4 sm:px-0"
          id="contact-us"
          ref={sectionRefs["contact-us"]}
        >
          <section className="relative z-10 mx-auto max-w-6xl py-20">
            <div className="p-10 sm:p-20 bg-[#ED761E] rounded-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0">
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
                    <li className="flex items-start gap-2 pb-4 items-center hover:translate-y-[-4px] transition-transform duration-300">
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

                    <li className="flex items-start gap-2 pb-4 items-center hover:translate-y-[-4px] transition-transform duration-300">
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

                    <li className="flex items-start gap-2 pb-4 items-center hover:translate-y-[-4px] transition-transform duration-300">
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
