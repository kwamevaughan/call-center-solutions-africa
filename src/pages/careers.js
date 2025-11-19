"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useFixedHeader } from "../../utils/scrollUtils";

const CareersPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    position: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("coverLetter", formData.coverLetter);
      formDataToSend.append("position", formData.position);
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume);
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          resume: null,
          coverLetter: "",
          position: "",
        });
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Careers | Call Center Solutions Africa"
        description="Join our team at Call Center Solutions Africa. We're hiring talented Customer Service Agents to deliver exceptional customer service. Apply now and grow your career with us."
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
                <span className="text-sm font-semibold text-ccsa-dark-blue uppercase tracking-wide">Open Positions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ccsa-dark-blue mb-4">
                Current Job Openings
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore opportunities to join our growing team
              </p>
            </div>

            <div className="space-y-8">
              {/* Customer Service Agents Position Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-3">
                        Customer Service Agents
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                          <Icon icon="mdi:map-marker" width={16} height={16} />
                          Nairobi, Kenya
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                          <Icon icon="mdi:briefcase" width={16} height={16} />
                          Full-time
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                          <Icon icon="mdi:clock-outline" width={16} height={16} />
                          Flexible Hours
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                          <Icon icon="mdi:file-document-outline" width={20} height={20} className="text-ccsa-blue" />
                          Job Description
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          We are seeking dedicated and customer-focused Customer Service Agents to join our dynamic team. 
                          As a Customer Service Agent, you will be the first point of contact for our clients' customers, 
                          providing exceptional service and support across various communication channels.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                          <Icon icon="mdi:check-circle-outline" width={20} height={20} className="text-ccsa-blue" />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2.5 text-gray-700">
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Handle inbound and outbound customer calls with professionalism and empathy</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Resolve customer inquiries, complaints, and issues efficiently</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Maintain accurate records of customer interactions in CRM systems</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Follow company scripts and procedures while providing personalized service</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Meet or exceed performance metrics including call quality and customer satisfaction</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Collaborate with team members and supervisors to improve service delivery</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                          <Icon icon="mdi:account-star-outline" width={20} height={20} className="text-ccsa-blue" />
                          Requirements
                        </h4>
                        <ul className="space-y-2.5 text-gray-700">
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>High school diploma or equivalent; college degree preferred</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Excellent verbal and written communication skills in English</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Previous customer service or call center experience is a plus</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Strong problem-solving abilities and attention to detail</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Ability to work in a fast-paced environment and handle multiple tasks</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Proficiency in computer applications and CRM software</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Flexible schedule availability including evenings and weekends</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                          <Icon icon="mdi:gift-outline" width={20} height={20} className="text-ccsa-blue" />
                          What We Offer
                        </h4>
                        <ul className="space-y-2.5 text-gray-700">
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Competitive salary and performance-based incentives</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Comprehensive training and professional development opportunities</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Health insurance and other benefits</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Supportive team environment and career growth opportunities</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Modern work environment with state-of-the-art technology</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Service Team Lead Position Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue mb-3">
                        Customer Service Team Lead
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                          <Icon icon="mdi:map-marker" width={16} height={16} />
                          Nairobi, Kenya
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                          <Icon icon="mdi:briefcase" width={16} height={16} />
                          Full-time
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ccsa-blue/10 text-ccsa-blue rounded-md text-sm font-medium">
                          <Icon icon="mdi:account-group" width={16} height={16} />
                          Leadership Role
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                          <Icon icon="mdi:file-document-outline" width={20} height={20} className="text-ccsa-blue" />
                          Job Description
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          We are looking for an experienced and dynamic Customer Service Team Lead to oversee and guide 
                          our team of customer service agents. As a Team Lead, you will be responsible for ensuring 
                          exceptional service delivery, coaching team members, and driving performance improvements 
                          while maintaining high standards of customer satisfaction.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                          <Icon icon="mdi:check-circle-outline" width={20} height={20} className="text-ccsa-blue" />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2.5 text-gray-700">
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Supervise and manage a team of customer service agents, ensuring optimal performance and productivity</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Monitor call quality, customer interactions, and service metrics to identify areas for improvement</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Provide coaching, training, and feedback to team members to enhance their skills and performance</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Handle escalated customer issues and complex inquiries with professionalism and efficiency</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Develop and implement strategies to improve team performance and customer satisfaction scores</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Prepare and present performance reports to management on team metrics and achievements</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Foster a positive team environment and ensure adherence to company policies and procedures</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                          <Icon icon="mdi:account-star-outline" width={20} height={20} className="text-ccsa-blue" />
                          Requirements
                        </h4>
                        <ul className="space-y-2.5 text-gray-700">
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Bachelor's degree in Business, Communications, or related field preferred</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Minimum 2-3 years of experience in customer service, with at least 1 year in a supervisory or team lead role</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Proven leadership skills with the ability to motivate and inspire team members</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Excellent communication, interpersonal, and conflict resolution skills</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Strong analytical skills and experience with performance metrics and reporting</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Proficiency in CRM systems, call center software, and Microsoft Office Suite</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Ability to work flexible hours including evenings, weekends, and holidays as needed</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                          <Icon icon="mdi:gift-outline" width={20} height={20} className="text-ccsa-blue" />
                          What We Offer
                        </h4>
                        <ul className="space-y-2.5 text-gray-700">
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Competitive salary package with leadership bonuses and performance incentives</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Leadership development programs and opportunities for career advancement</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Comprehensive health insurance and retirement benefits</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Opportunity to make a significant impact on team performance and customer experience</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                            <span>Collaborative work environment with supportive management</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="bg-white py-16 sm:py-20 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ccsa-blue/10 rounded-full mb-4">
                <Icon icon="mdi:file-account" width={20} height={20} className="text-ccsa-blue" />
                <span className="text-sm font-semibold text-ccsa-dark-blue uppercase tracking-wide">Apply Now</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ccsa-dark-blue mb-4">
                Submit Your Application
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete the form below to apply for one of our open positions
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
                <Icon icon="mdi:check-circle" width={64} height={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-green-800 mb-2">Application Submitted!</h3>
                <p className="text-green-700 mb-6">
                  Thank you for your interest. We've received your application and will review it shortly. 
                  We'll be in touch soon!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-ccsa-blue text-white font-semibold rounded-lg transition-all duration-300 hover:bg-ccsa-blue/90"
                >
                  <Icon icon="mdi:refresh" width={20} height={20} />
                  Submit Another Application
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 sm:p-8 md:p-12 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Position Selection */}
                  <div className="space-y-2">
                    <label htmlFor="position" className="block text-sm font-semibold text-ccsa-dark-blue">
                      Position Applying For *
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 transition-colors duration-200 bg-white"
                    >
                      <option value="">Select a position</option>
                      <option value="Customer Service Agents">Customer Service Agents</option>
                      <option value="Customer Service Team Lead">Customer Service Team Lead</option>
                    </select>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-ccsa-dark-blue">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 transition-colors duration-200 bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email and Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-ccsa-dark-blue">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 transition-colors duration-200 bg-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-semibold text-ccsa-dark-blue">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 transition-colors duration-200 bg-white"
                        placeholder="+254 700 000 000"
                      />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <label htmlFor="resume" className="block text-sm font-semibold text-ccsa-dark-blue">
                      Resume/CV *
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onChange={handleChange}
                      required
                      accept=".pdf,.doc,.docx"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 transition-colors duration-200 bg-white"
                    />
                    <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <label htmlFor="coverLetter" className="block text-sm font-semibold text-ccsa-dark-blue">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50 resize-none"
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-center pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-ccsa-blue text-white font-semibold rounded-lg transition-all duration-300 hover:bg-ccsa-blue/90 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                      {loading ? (
                        <>
                          <Icon
                            icon="mdi:loading"
                            className="animate-spin w-5 h-5"
                            width={20}
                            height={20}
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:send" width={20} height={20} />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>

        <FloatingCTA />
        <Footer />
      </main>
    </>
  );
};

export default CareersPage;

