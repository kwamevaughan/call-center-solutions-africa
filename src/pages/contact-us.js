"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import FloatingCTA from "@/components/FloatingCTA";
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
        // Call gtag_report_conversion before redirecting
        if (typeof window.gtag !== "undefined") {
          window.gtag_report_conversion(); // Call without URL since we redirect manually
        }
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
      {/* Add the conversion tracking script */}
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              'send_to': 'AW-11088484153/0A3cCIDF_NUZELmus6cp',
              'event_callback': callback
            });
            return false;
          }
        `}
      </Script>

      <SEO
        title="Contact Us | Get a Custom Proposal | Call Center Solutions Africa"
        description="Ready to outsource your customer service? Contact our Nairobi-based team for a free consultation and custom BPO proposal. ISO 27001 certified, multilingual support."
        keywords="contact Call Center Solutions Africa, BPO proposal, Nairobi contact center, customer service outsourcing Africa, ISO 27001 certified contact center, multilingual BPO services"
      />

      <Header />

      <main className="relative overflow-x-hidden">
        {/* Hero Section */}
        <div
          className="relative bg-ccsa-dark-blue px-4 min-h-[60vh] flex items-center overflow-hidden"
        >
          {/* Radial Ellipse at Left Bottom */}
          <div 
            className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)',
              transform: 'translate(-30%, 30%)'
            }}
          />
          {/* Radial Ellipse at Top Right */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Middle */}
          <div 
            className="absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          <div className="max-w-7xl mx-auto w-full relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col items-center gap-6 sm:gap-8 text-center max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-white uppercase tracking-wide">
                  Get in Touch
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Request Your Custom Proposal
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                Tell us about your business needs and we'll craft a tailored solution that drives results
              </p>
              {/* Certification Badges */}
              <div className="hidden md:flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                {[
                  "ISO 27001",
                  "GDPR",
                  "PCI-DSS",
                  "HIPAA-ready",
                  "24/7 Multilingual"
                ].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm sm:text-base"
                  >
                    <Icon icon="mdi:shield-check" width={20} height={20} className="text-ccsa-orange flex-shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <section className="bg-white w-full px-4 relative overflow-hidden pb-20">
          {/* Radial Ellipse at Top Left */}
          <div 
            className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 35%, transparent 100%)',
              transform: 'translate(-30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Top Right */}
          <div 
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(30%, -30%)'
            }}
          />
          {/* Radial Ellipse at Bottom Middle */}
          <div 
            className="absolute left-1/2 bottom-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(-50%, 30%)'
            }}
          />
          
          <div className="relative mx-auto max-w-7xl mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-8 md:p-12 shadow-2xl border border-gray-100">
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
              </div>

              {/* Contact Information Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-ccsa-dark-blue rounded-lg p-8 shadow-2xl border border-gray-100 sticky top-24">
                  <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                  <div className="flex flex-col gap-6">
                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Icon icon="mdi:map-marker" width={24} height={24} className="text-ccsa-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Address</h4>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=The+Westwood+Office+Westlands+Nairobi+Kenya"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/90 hover:text-ccsa-yellow transition-colors block"
                        >
                          The Westwood Office, 6th Floor 6A, Comply Guide Advisory, Westlands, Nairobi, Kenya
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Icon icon="mdi:phone" width={24} height={24} className="text-ccsa-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Phone</h4>
                        <a 
                          href="tel:+254701850850"
                          className="text-sm text-white/90 hover:text-ccsa-yellow transition-colors block"
                        >
                          +254 701 850 850
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Icon icon="mdi:email" width={24} height={24} className="text-ccsa-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Email</h4>
                        <a 
                          href="mailto:hello@callcentersolutionsafrica.com"
                          className="text-sm text-white/90 hover:text-ccsa-yellow transition-colors block break-all"
                        >
                          hello@callcentersolutionsafrica.com
                        </a>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/20 pt-6">
                      <p className="text-sm text-white/80 leading-relaxed">
                        Our team typically responds within one business day. We're here to help you find the perfect solution for your business needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Marquee Section */}
        <section className="w-full pt-10 pb-10 bg-white relative overflow-hidden">
          <LogoMarquee />
        </section>
      </main>

      <FloatingCTA />
      <Footer />
    </>
  );
}
