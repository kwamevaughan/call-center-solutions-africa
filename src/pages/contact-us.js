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
    company: "",
    email: "",
    phone: "",
    howCanWeHelp: "",
    estimatedHours: "",
    goals: "",
    rfpFile: null,
    privacyAgreement: false,
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookCall = () => {
    // Open calendar booking link or scroll to form
    const calendarLink = 'https://calendly.com/callcentersolutionsafrica'; // Update with actual calendar link
    window.open(calendarLink, '_blank');
  };

  const handleWhatsApp = () => {
    const phoneNumber = '254701850850'; // WhatsApp number without + sign
    const message = encodeURIComponent('Hello! I would like to learn more about your services.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
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

    if (!formData.privacyAgreement) {
      setError("Please agree to the Privacy Policy");
      setLoading(false);
      return;
    }

    const toastId = toast.loading("Sending your request...");

    try {
      // Convert file to base64 if present
      let rfpFileBase64 = null;
      let rfpFileName = null;
      let rfpFileType = null;

      if (formData.rfpFile) {
        rfpFileBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            resolve(base64String);
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.rfpFile);
        });
        rfpFileName = formData.rfpFile.name;
        rfpFileType = formData.rfpFile.type;
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rfpFile: rfpFileBase64,
          rfpFileName,
          rfpFileType,
          recaptchaToken,
        }),
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
          company: "",
          email: "",
          phone: "",
          howCanWeHelp: "",
          estimatedHours: "",
          goals: "",
          rfpFile: null,
          privacyAgreement: false,
        });
        setRecaptchaToken(null);
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
              background: 'radial-gradient(circle, #0088D2 0%, #0088D2 35%, transparent 100%)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          <div className="max-w-7xl mx-auto w-full relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-center">
                <div className="flex flex-col items-start gap-6 sm:gap-8 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                    <p className="text-lg sm:text-xl font-light text-white tracking-wide">
                        Response time: under 24h
                    </p>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      Let's talk about your CX
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                  Sales, customer support, multilingual help desks, or a fully managed contact center—tell us what you need and we'll tailor a plan.
                  </p>
                  {/* Certification Badges */}
                  <div className="hidden md:flex items-center justify-start gap-2 mt-4 sm:mt-6">
                    <button
                      type="button"
                      onClick={scrollToForm}
                      className="text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "var(--ccsa-gradient)"
                      }}
                    >
                      <Icon icon="heroicons:document-text" width={16} height={16} />
                      Request a Proposal
                    </button>
                    {/* <button
                      type="button"
                      onClick={handleBookCall}
                      className="text-white border border-2-white px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon icon="heroicons:calendar-days" width={16} height={16} />
                      Book a discovery call
                    </button> */}
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="text-white border border-2-white px-4 py-2 rounded-full font-normal transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon icon="mdi:whatsapp" width={16} height={16} />
                      WhatsApp
                    </button>
                  </div>
                </div>
                <div className="bg-transparent text-white shadow-2xl border border-white/20 rounded-lg p-6 sm:p-8 flex flex-col gap-4 items-start">
                  <h3 className="text-xl font-semibold mb-2">Talk to us</h3>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:email" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-1" />
                    <a href="mailto:hello@callcentersolutionsafrica.com" className="text-white/90 hover:text-ccsa-yellow transition-colors break-all">
                      hello@callcentersolutionsafrica.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:phone" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-1" />
                    <a href="tel:+254701850850" className="text-white/90 hover:text-ccsa-yellow transition-colors">
                      +254 701 850 850
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:map-marker" width={20} height={20} className="text-ccsa-yellow flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-sm leading-relaxed">
                        The Westwood Office, 6th Floor 6A, Comply Guide Advisory, Westlands, Nairobi, Kenya
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <a href="https://www.linkedin.com/company/callcentersolutionsafrica" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Icon icon="mdi:linkedin" width={24} height={24} className="text-white/90 hover:text-ccsa-yellow transition-colors cursor-pointer" />
                    </a>
                    <a href="https://www.facebook.com/callcentersolutionsafrica" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Icon icon="mdi:facebook" width={24} height={24} className="text-white/90 hover:text-ccsa-yellow transition-colors cursor-pointer" />
                    </a>
                    <a href="https://www.instagram.com/cssa_africa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Icon icon="mdi:instagram" width={24} height={24} className="text-white/90 hover:text-ccsa-yellow transition-colors cursor-pointer" />
                    </a>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <section id="contact-form" className="bg-ccsa-dark-blue w-full px-4 relative overflow-hidden pb-20">
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
              background: 'radial-gradient(circle, #0088D2 0%, #0088D2 35%, transparent 100%)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          {/* Radial Ellipse at Top Left */}
          <div 
            className="absolute left-0 top-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 30%, transparent 100%)',
              transform: 'translate(-20%, -20%)'
            }}
          />
          {/* Radial Ellipse at Right Bottom */}
          <div 
            className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #F45B00 0%, transparent 100%)',
              transform: 'translate(20%, 20%)'
            }}
          />
          {/* Radial Ellipse at Center Top */}
          <div 
            className="absolute left-1/2 top-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #0088D2 0%, transparent 100%)',
              transform: 'translate(-50%, -40%)'
            }}
          />
          {/* Radial Ellipse at Center Bottom */}
          <div 
            className="absolute left-1/2 bottom-0 w-[450px] h-[450px] rounded-full opacity-25 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FFD100 0%, #FFD100 30%, transparent 100%)',
              transform: 'translate(-50%, 30%)'
            }}
          />
          
          <div className="relative mx-auto max-w-4xl mt-10">
            {/* Main Form Section */}
            <div className="bg-transparent rounded-lg p-8 md:p-12 shadow-2xl border-2 border-white/30">
              <ContactForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                error={error}
                loading={loading}
                handleRecaptcha={handleRecaptcha}
              />
            </div>
          </div>
        </section>
      </main>

      <FloatingCTA />
      <Footer />
    </>
  );
}
