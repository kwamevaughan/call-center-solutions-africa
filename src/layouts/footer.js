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
    <section className="footer-bg bg-white pt-2 pb-6 sm:pb-10 relative">
      {/* Overlay div */}
      <div className="absolute inset-0 bg-[#EAEAEA]/95 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-0 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-6">
            <div className="flex-shrink-0">
              <Link href="/" passHref>
                <Image
                  src="/assets/images/logo.svg"
                  alt="Logo"
                      width={180}
                  height={70}
                      className="rounded-xl w-48 sm:w-auto"
                />
              </Link>
            </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Where Innovation Meets Impact.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Services</h3>
              <div className="flex flex-col gap-3">
                <Link 
                  href="/#services"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Cloud Solutions
                </Link>
                <Link 
                  href="/#services"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Advisory Services
                </Link>
                <Link 
                  href="/#services"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Equipment & Setup
                </Link>
                <Link 
                  href="/#services"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Training & Support
                </Link>
                <Link 
                  href="/#services"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Managed Services
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Resources</h3>
              <div className="flex flex-col gap-3">
                <Link 
                  href="/blog"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Blogs
                </Link>
                <Link 
                  href="/#industries"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Case Studies
                </Link>
                <Link 
                  href="/#about-us"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  About Us
                </Link>
                <Link 
                  href="/#chooseus"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Why Choose Us
                </Link>
                <Link 
                  href="/contact-us"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Contact
                </Link>
          </div>
      </div>

            {/* Support & Legal */}
            <div className="lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Support & Legal</h3>
              <div className="flex flex-col gap-3">
                <Link 
                  href="/contact-us"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Get Support
                </Link>
                <Link 
                  href="/privacy-policy"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/privacy-policy"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Terms of Service
                </Link>
                <Link 
                  href="/contact-us"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Careers
                </Link>
                <Link 
                  href="/contact-us"
                  className="text-sm sm:text-base text-gray-600 hover:text-[#0088D2] transition-colors"
                >
                  Partner Program
            </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SVG Images Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-0 pb-8">
          <div className="flex justify-center items-center gap-8 sm:gap-12">
            <Image
              src="/assets/images/omni-channel.svg"
              width={100}
              height={40}
              alt="Omni Channel"
              className="h-8 sm:h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
            <Image
              src="/assets/images/ai-powered.svg"
              width={100}
              height={40}
              alt="AI powered"
              className="h-8 sm:h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </section>

        {/* Footer Bottom Section */}
        <div
          ref={footerRef}
          className={`relative z-10 border-t border-gray-200 pt-6 sm:pt-8 ${isFooterVisible ? "footer-visible" : "footer-slide-in"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center sm:items-start justify-between">
              <div className="flex flex-col gap-4 sm:gap-6 items-center sm:items-start">
                <p className="text-xs sm:text-sm text-center sm:text-left text-gray-600">
                  © {currentYear} Call Center Solutions Africa. All rights reserved.
                </p>
        </div>

        <div>
                <ul className="flex gap-4 sm:gap-6">
                  <li className="group flex items-start gap-2 pb-2 sm:pb-4 hover:translate-y-[-4px] transition-transform duration-300">
              <a
                href="https://www.facebook.com/callcentersolutionsafrica"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 group-hover:text-[#1877F2]"
              >
                <Icon
                  icon="ic:baseline-facebook"
                        width="24"
                        height="24"
                  className="flex-shrink-0"
                />
                <span className="sr-only">Facebook</span>
              </a>
            </li>

                  <li className="group flex items-start gap-2 pb-2 sm:pb-4 hover:translate-y-[-4px] transition-transform duration-300">
              <a
                href="https://www.linkedin.com/company/call-center-solutions-africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 group-hover:text-[#0077B5]"
              >
                <Icon
                  icon="mdi:linkedin"
                        width="24"
                        height="24"
                  className="flex-shrink-0"
                />
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>

                  <li className="group flex items-start gap-2 pb-2 sm:pb-4 hover:translate-y-[-4px] transition-transform duration-300">
              <a
                href="https://www.youtube.com/@CallCenterSolutionsAfrica"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 group-hover:text-[#FF0000]"
              >
                <Icon
                  icon="mdi:youtube"
                        width="24"
                        height="24"
                  className="flex-shrink-0"
                />
                <span className="sr-only">YouTube</span>
              </a>
            </li>

                  <li className="group flex items-start gap-2 pb-2 sm:pb-4 hover:translate-y-[-4px] transition-transform duration-300">
              <a
                href="https://www.instagram.com/call_center_solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 group-hover:text-[#E1306C]"
              >
                <Icon
                  icon="mdi:instagram"
                        width="24"
                        height="24"
                  className="flex-shrink-0"
                />
                <span className="sr-only">Instagram</span>
              </a>
            </li>

                  <li className="group flex items-start gap-2 pb-2 sm:pb-4 hover:translate-y-[-4px] transition-transform duration-300">
              <a
                href="https://x.com/Callcentersols"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 group-hover:text-[#000000]"
              >
                <Icon
                  icon="line-md:twitter-x"
                        width="24"
                        height="24"
                  className="flex-shrink-0"
                />
                <span className="sr-only">X (Twitter)</span>
              </a>
            </li>
          </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;