"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";

const Footer = () => {
  const footerRef = useRef(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Check if the footer is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // When 10% of the footer is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsFooterVisible(true);
        } else {
          setIsFooterVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <section className="footer-bg bg-white pt-2 pb-20 relative">
      {/* Overlay div */}
      <div className="absolute inset-0 bg-[#EAEAEA]/95 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Content Container */}
        <section className="relative z-10 max-w-6xl mx-auto px-3 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20 pb-10 ">
          <div className="flex flex-col gap-8 items-center sm:items-start">
            <div className="flex-shrink-0">
              <Link href="/" passHref>
                <Image
                  src="/assets/images/logo.svg"
                  alt="Logo"
                  width={200}
                  height={70}
                  className="rounded-xl"
                />
              </Link>
            </div>
            <h2 className="text-3xl text-center sm:text-left">
              Where Innovation Meets Impact.
            </h2>
          </div>
        </section>
      </div>

      {/* Footer Bottom Section */}
      <div
        ref={footerRef}
        className={`relative z-10 flex flex-col sm:flex-row gap-2 items-center sm:items-start justify-between max-w-6xl mx-auto px-3 sm:px-0 ${isFooterVisible ? "footer-visible" : "footer-slide-in"}`}
      >
        <div className="flex flex-col gap-8 items-center sm:items-start pb-4">
          <p className="text-sm">
            © {currentYear} |{" "}
            <Link href="/privacy-policy" className="hover:text-[#ED761E]">
              Privacy Policy | Terms of Service
            </Link>
          </p>
          <div className="flex gap-4 ">
            <Image
              src="/assets/images/omni-channel.svg"
              width={150}
              height={0}
              alt="Omni Channel"
              className="rounded-md transform transition-transform duration-300 hover:translate-y-[-5px]"
            />

            <Image
              src="/assets/images/ai-powered.svg"
              width={150}
              height={0}
              alt="AI powered"
              className="rounded-md transform transition-transform duration-300 hover:translate-y-[-5px]"
            />
          </div>
        </div>

        <div>
          <ul className="flex cursor-pointer">
            <li className="group flex items-start gap-2 pb-4 hover:translate-y-[-4px] transition-transform duration-300">
              <Icon
                icon="ic:baseline-facebook"
                width="32"
                height="32"
                className="flex-shrink-0 text-gray-600 group-hover:text-[#1877F2]" // Facebook
              />
              <Link href="tel:+254721314242" />
            </li>

            <li className="group flex items-start gap-2 pb-4 hover:translate-y-[-4px] transition-transform duration-300">
              <Icon
                icon="mdi:linkedin"
                width="32"
                height="32"
                className="flex-shrink-0 text-gray-600 group-hover:text-[#0077B5]" // LinkedIn
              />
              <Link href="mailto:hello@callcentersolutions.africa" />
            </li>

            <li className="group flex items-start gap-2 pb-4 hover:translate-y-[-4px] transition-transform duration-300">
              <Icon
                icon="mingcute:instagram-fill"
                width="32"
                height="32"
                className="flex-shrink-0 text-gray-600 group-hover:text-[#E4405F]" // Instagram
              />
              <Link href="mailto:hello@callcentersolutions.africa" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
