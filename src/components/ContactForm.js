"use client";

import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";

// Dynamically import ReCAPTCHA with SSR disabled
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false, // This ensures the component only loads on the client
});

export default function ContactForm({
  formData,
  setFormData,
  handleSubmit,
  error,
  loading,
  handleRecaptcha,
}) {
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-transparent">
      {/* Personal Information Section */}
      <div className="space-y-6">
        <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
        <p className="text-sm text-white">Please fill out the form below to contact us. We will get back to you as soon as possible.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-white"
            >
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
              placeholder="Your Company Name"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Work Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
              placeholder="your.email@company.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-white"
            >
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* How Can We Help Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="howCanWeHelp"
            className="block text-sm font-semibold text-white"
          >
            How can we help? *
          </label>
          <select
            id="howCanWeHelp"
            name="howCanWeHelp"
            value={formData.howCanWeHelp}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
          >
            <option value="">Select how we can help</option>
            <option value="Lead Follow-Up & Qualification">Lead Follow-Up & Qualification</option>
            <option value="Outbound Sales Closing">Outbound Sales Closing</option>
            <option value="Omnichannel Engagement (Calls + WhatsApp + Social + Email)">Omnichannel Engagement (Calls + WhatsApp + Social + Email)</option>
            <option value="Reactivating Past Leads">Reactivating Past Leads</option>
            <option value="CRM & CX Suite Integration & Reporting">CRM & CX Suite Integration & Reporting</option>
            <option value="Other (Tell Us More)">Other (Tell Us More)</option>
          </select>
        </div>
      </div>

      {/* Goals Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="goals"
            className="block text-sm font-semibold text-white"
          >
            Tell us about your goals *
          </label>
          <textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Tell us about your goals and what you're looking to achieve..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50 resize-none"
          />
        </div>
      </div>

      {/* Privacy Policy Checkbox */}
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacyAgreement"
            name="privacyAgreement"
            checked={formData.privacyAgreement}
            onChange={handleChange}
            required
            className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-ccsa-blue focus:ring-ccsa-blue focus:ring-2 cursor-pointer"
          />
          <label
            htmlFor="privacyAgreement"
            className="text-sm text-white cursor-pointer"
          >
            I agree to the processing of my data according to the{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ccsa-blue hover:underline font-semibold"
            >
              Privacy Policy
            </a>
            . *
          </label>
        </div>
      </div>

      {/* reCAPTCHA and Submit */}
      <div className="space-y-6 pt-6 border-t border-white/30">
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={handleRecaptcha}
            theme="light"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "var(--ccsa-gradient)"
            }}
          >
            {loading ? (
              <>
                <Icon
                  icon="mdi:loading"
                  className="animate-spin w-5 h-5"
                  width={18}
                  height={18}
                />
                Sending your request...
              </>
            ) : (
              <>
                <Icon icon="mdi:send" width={18} height={18} />
                Submit Message
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
