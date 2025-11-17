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
    <section className="bg-ccsa-dark-blue pt-2 pb-6 sm:pb-10 relative overflow-hidden">
      {/* Overlay div */}
      <div className="absolute inset-0 bg-ccsa-dark-blue z-0 pointer-events-none"></div>
      
      {/* Radial Ellipse at Top Middle - Yellow */}
      <div 
        className="absolute left-1/2 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
          transform: 'translate(-50%, -30%)'
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
      {/* Radial Ellipse at Bottom Left - Blue */}
      <div 
        className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
          transform: 'translate(-30%, 30%)'
        }}
      />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-0 py-12 sm:py-16 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
      
             {/* Solutions  */}
             <div className="lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Solutions</h3>
              <div className="flex flex-col gap-3">
                <Link 
                  href="./services"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Services
                </Link>
                <Link 
                  href="./industries"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Industries
                </Link>
                <Link 
                  href="./delivery-models"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Delivery Models
                </Link>
                <Link 
                  href="./security-and-compliance"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Security and Compliance
                </Link>
              </div>
            </div>


            {/* Resources */}
            <div className="lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Resources</h3>
              <div className="flex flex-col gap-3">
                <Link 
                  href="#"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Africa CX Advantage Report
                </Link>
                <Link 
                  href="#" 
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Global Compliance Playbook
                </Link>
                <Link 
                  href="#"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Case Studies Library
                </Link>
          </div>
            </div>

            {/* Contact */}
            <div className="lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Contact</h3>
              <div className="flex flex-col gap-3">
                <Link 
                  href="#"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  7th floor, Mitsumi Business Park, Nairobi
                </Link>
                <Link 
                  href="#"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Talk to sales
                </Link>
                <Link 
                  href="#"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  General inquiries
                </Link>
              </div>
            </div>

            

            {/* Support & Legal */}
            <div className="lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Legal</h3>
              <div className="flex flex-col gap-3">
                <Link 
                  href="#"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="#"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Terms of Service
                </Link>
                <Link 
                  href="#"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Data Processing Addendum
                </Link>
                <Link 
                  href="#"
                  className="text-sm font-light text-white hover:text-ccsa-yellow transition-colors"
                >
                  Responsible Disclosure
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Bottom Section */}
        <div
          ref={footerRef}
          className={`relative z-10 border-t border-gray-600 pt-6 sm:pt-8 ${isFooterVisible ? "footer-visible" : "footer-slide-in"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center sm:items-start justify-between">
              
            <div className="flex flex-col gap-4 sm:gap-6 items-center sm:items-end">
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

            <div className="flex flex-col gap-4 sm:gap-6 items-center sm:items-start">
                <p className="text-xs sm:text-sm text-center sm:text-left text-gray-200">
                  © {currentYear} Call Center Solutions Africa. All rights reserved.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;