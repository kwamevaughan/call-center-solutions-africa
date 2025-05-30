"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";
import LogoMarquee from "@/components/LogoMarquee";
import { Icon } from "@iconify/react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    teamSize: "",
    services: [],
    currentChallenges: "",
    timeline: "",
    budget: "",
    additionalInfo: "",
    customBudget: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCustomBudget, setIsCustomBudget] = useState(false);
  const router = useRouter();

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA");
      setLoading(false);
      return;
    }

    const toastId = toast.loading("Sending your request...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!", { id: toastId });
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          industry: "",
          teamSize: "",
          services: [],
          currentChallenges: "",
          timeline: "",
          budget: "",
          additionalInfo: "",
          customBudget: "",
        });
        setRecaptchaToken(null);
        setIsCustomBudget(false);
        router.push("/thank-you");
      } else {
        toast.error(result.error || "Something went wrong", { id: toastId });
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to send message", { id: toastId });
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Call Center Solutions Africa"
        description="Get in touch with our Nairobi-based team to discuss your call center and BPO needs. Request a custom proposal today!"
        keywords="contact call center solutions Africa, BPO services contact, Nairobi contact center, customer experience solutions"
      />

      {/* Hero Section with Gradient Overlay */}
      <div className="relative min-h-[60vh] bg-gradient-to-br from-[#2a2b5f] via-[#0088d2] to-[#faf7f5] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0088d2]/20 via-[#2a2b5f]/20 to-[#ffd100]/20"></div>
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#0088d2]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f45b01]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <Header className="relative z-20" />

        <div className="relative z-10 flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#ffd100] to-[#ffd100] bg-clip-text text-transparent">
              Powering African Businesses
              <span className="block text-transparent bg-gradient-to-r from-[#dfdfdf] to-[#f88543] bg-clip-text">
                with Call Center & BPO Solutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 font-light">
              Cloud tech, expert guidance, and equipment to scale your contact
              center.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#ffd100] rounded-full mr-2"></div>
                <span>Full Support</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#e3e3e3] rounded-full mr-2"></div>
                <span>Fast Setup</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#f45b01] rounded-full mr-2"></div>
                <span>Proven Expertise</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="relative">
        <ScrollToTop />

        {/* Main Form Section */}
        <section className="relative -mt-20 z-10 mx-auto max-w-7xl px-4 pb-20">
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-3xl max-w-5xl w-full mx-auto shadow-2xl shadow-[#2a2b5f]/10">
            {/* Form Header */}
            <div className="text-center mb-12">
              
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Request Your Custom Proposal
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Tell us about your business needs and we'll craft a tailored
                solution that drives results
              </p>
            </div>

            <ContactForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              error={error}
              loading={loading}
              isCustomBudget={isCustomBudget}
              setIsCustomBudget={setIsCustomBudget}
              handleRecaptcha={handleRecaptcha}
            />
          </div>
        </section>

        {/* Logo Marquee Section */}
        <section className="w-full pt-10 pb-10 bg-gradient-to-b from-gray-50 to-white">
          <LogoMarquee />
        </section>
      </main>

      <Footer />
    </>
  );
}
