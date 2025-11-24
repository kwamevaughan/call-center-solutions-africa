"use client";

import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";
import { Icon } from "@iconify/react";

const ThankYouPage = () => {
  return (
    <>
      <SEO
        title="Thank You for Your Inquiry | Call Center Solutions Africa"
        description="Thank you for contacting us. We've received your request and will respond within 24-48 hours with a customized BPO solution for your business needs."
        keywords="thank you contact, Call Center Solutions Africa inquiry, BPO consultation booked, customer service proposal"
        noindex={true}
      />
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-[#2a2b5f] via-[#0088d2] to-[#faf7f5]">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0088d2]/20 via-[#2a2b5f]/20 to-[#ffd100]/20"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#0088d2]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f45b01]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <Header className="relative z-20" />

        <div className="flex-grow flex items-center justify-center px-4 mt-20 py-16 relative z-10">
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-3xl max-w-2xl w-full mx-auto shadow-2xl shadow-[#2a2b5f]/10 text-center">
            

            <h1 className="text-4xl md:text-5xl py-2 font-bold bg-gradient-to-r from-[#2a2b5f] via-[#0088d2] to-[#f45b01] bg-clip-text text-transparent mb-4">
              Thank You for Reaching Out!
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Your proposal request has been successfully submitted. Our team
              will review your details and get back to you within 24-48 hours
              with a tailored solution.
            </p>
            <div className="flex flex-col items-center gap-4 mb-8">
              <p className="text-gray-500 text-sm">
                In the meantime, explore how we empower African businesses:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#ffd100] rounded-full mr-2"></div>
                  <span>Cloud-Based Solutions</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#e3e3e3] rounded-full mr-2"></div>
                  <span>Expert Guidance</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#f45b01] rounded-full mr-2"></div>
                  <span>Scalable Equipment</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <button className="bg-[#ED761E] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D7641B] transition duration-300">
                  Back to Homepage
                </button>
              </Link>
              <Link href="/#services">
                <button className="bg-transparent border border-[#0088d2] text-[#0088d2] px-8 py-3 rounded-full font-medium text-sm hover:bg-[#0088d2] hover:text-white transition duration-300">
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer className="relative z-20" />
      </main>
    </>
  );
};

export default ThankYouPage;
