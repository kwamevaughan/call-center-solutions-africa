"use client";

import { useState, useMemo } from "react";
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useFixedHeader } from "../../utils/scrollUtils";
import PositionFilterTabs from "@/components/careers/PositionFilterTabs";
import QuickNavigationMenu from "@/components/careers/QuickNavigationMenu";
import SalesExecutivePosition from "@/components/careers/SalesExecutivePosition";
import ClosedPositionsSection from "@/components/careers/ClosedPositionsSection";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { getCollectionPageSchema, getBreadcrumbSchema } from "@/lib/schemas";

const CareersPage = () => {
  const [filter, setFilter] = useState("all"); // "all", "open", "closed"
  const [closedPositionsExpanded, setClosedPositionsExpanded] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    positions: useRef(null),
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

  // Generate SEO schemas
  const seoSchemas = useMemo(() => {
    const baseUrl = 'https://callcentersolutionsafrica.com';
    const careersUrl = `${baseUrl}/careers`;
    
    const collectionPageSchema = getCollectionPageSchema({
      name: 'Careers',
      description: 'Join our team at Call Center Solutions Africa. We\'re hiring talented Customer Service Agents to deliver exceptional customer service. Apply now and grow your career with us.',
      url: careersUrl
    });

    const breadcrumbSchema = getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'Careers', url: careersUrl }
    ]);

    return [collectionPageSchema, breadcrumbSchema];
  }, []);

  return (
    <>
      <SEO
        title="Careers | Call Center Solutions Africa"
        description="Join our team at Call Center Solutions Africa. We're hiring talented Customer Service Agents to deliver exceptional customer service. Apply now and grow your career with us."
        schema={seoSchemas}
        keywords="careers, jobs, call center jobs Africa, customer service jobs, BPO careers, call center agent jobs, Nairobi jobs, customer support careers"
      />
      <Header />

      <main className="relative overflow-x-hidden bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative bg-gradient-to-br from-ccsa-dark-blue via-ccsa-dark-blue to-[#1a1f3a] px-4 py-20 sm:py-24 lg:py-32"
          id="home"
          ref={sectionRefs.home}
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                <Icon icon="mdi:briefcase-outline" width={20} height={20} className="text-ccsa-yellow" />
                <span className="text-sm font-medium text-white uppercase tracking-wide">Careers</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Build Your Career with Us
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join Call Center Solutions Africa and be part of a team that delivers world-class customer service 
                from Africa to the world. We're looking for passionate professionals ready to make an impact.
              </p>
              <div className="flex items-center justify-center gap-2 mb-8 text-white/80">
                <Icon icon="mdi:email" width={20} height={20} className="text-ccsa-yellow" />
                <a href="mailto:careers@callcentersolutionsafrica.com" className="text-lg hover:text-white transition-colors">
                  careers@callcentersolutionsafrica.com
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#positions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-ccsa-blue text-white font-semibold rounded-lg transition-all duration-300 hover:bg-ccsa-blue/90 text-base"
                >
                  <Icon icon="mdi:briefcase" width={20} height={20} />
                  View Open Positions
                </a>
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-ccsa-dark-blue font-semibold rounded-lg transition-all duration-300 hover:bg-gray-100 text-base"
                >
                  <Icon icon="mdi:information" width={20} height={20} />
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Overview Section */}
        <section className="bg-white py-16 sm:py-20 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-ccsa-dark-blue mb-4">
                Why Work With Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer competitive benefits and a supportive environment for professional growth
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "mdi:currency-usd", title: "Competitive Salary", desc: "Market-competitive compensation packages" },
                { icon: "mdi:school", title: "Professional Growth", desc: "Continuous learning and development opportunities" },
                { icon: "mdi:account-group", title: "Team Environment", desc: "Collaborative and supportive workplace culture" },
                { icon: "mdi:heart-pulse", title: "Health Benefits", desc: "Comprehensive health insurance coverage" }
              ].map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-ccsa-blue transition-colors">
                  <div className="w-12 h-12 bg-ccsa-blue/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon icon={benefit.icon} width={24} height={24} className="text-ccsa-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-ccsa-dark-blue mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section id="positions" ref={sectionRefs.positions} className="bg-gray-50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ccsa-blue/10 rounded-full mb-4">
                <Icon icon="mdi:briefcase-plus" width={20} height={20} className="text-ccsa-blue" />
                <span className="text-sm font-semibold text-ccsa-dark-blue uppercase tracking-wide">Job Openings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ccsa-dark-blue mb-4">
                Current Job Openings
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Explore opportunities to join our growing team
              </p>

              <PositionFilterTabs filter={filter} setFilter={setFilter} />
              <QuickNavigationMenu />
            </div>

            <div className="space-y-8">
              {/* Sales Executive Position */}
              {(filter === "all" || filter === "open") && (
                <SalesExecutivePosition />
              )}

              {/* Closed Positions Section */}
              {(filter === "all" || filter === "closed") && (
                <ClosedPositionsSection 
                  closedPositionsExpanded={closedPositionsExpanded}
                  setClosedPositionsExpanded={setClosedPositionsExpanded}
                />
              )}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <ApplicationForm />

        <FloatingCTA />
        <Footer />
      </main>
    </>
  );
};

export default CareersPage;

