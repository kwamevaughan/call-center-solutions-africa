"use client";

import { useState } from "react";
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
  isCustomBudget,
  setIsCustomBudget,
  handleRecaptcha,
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
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
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Business Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
              placeholder="your.email@company.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-gray-700"
            >
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
              placeholder="Your Company Name"
            />
          </div>
        </div>
      </div>

      {/* Business Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          Business Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="industry"
              className="block text-sm font-semibold text-gray-700"
            >
              Industry *
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
            >
              <option value="">Select your industry</option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Healthcare">Healthcare</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Travel & Hospitality">Travel & Hospitality</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="teamSize"
              className="block text-sm font-semibold text-gray-700"
            >
              Team Size *
            </label>
            <select
              id="teamSize"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
            >
              <option value="">Select team size</option>
              <option value="1-10">1-10 agents</option>
              <option value="11-50">11-50 agents</option>
              <option value="51-100">51-100 agents</option>
              <option value="100+">100+ agents</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          Services of Interest *
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Technology Solutions", icon: "lucide:zap" },
            { name: "Advisory Services", icon: "lucide:target" },
            { name: "Equipment Setup", icon: "ic:baseline-build" },
            { name: "Cloud Platforms", icon: "lucide:cloud" },
            { name: "AI & Analytics", icon: "lucide:brain" },
          ].map((service) => (
            <label
              key={service.name}
              className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                formData.services.includes(service.name)
                  ? "border-ccsa-blue bg-ccsa-blue/10 shadow-md"
                  : "border-gray-200 bg-gray-50/50 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                name="services"
                value={service.name}
                checked={formData.services.includes(service.name)}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-center">
                <Icon
                  icon={service.icon}
                  className="text-2xl mr-3"
                  style={{ color: "#0088d2" }}
                />
                <span className="font-medium text-gray-800">
                  {service.name}
                </span>
              </div>
              {formData.services.includes(service.name) && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-ccsa-blue rounded-full flex items-center justify-center">
                  <Icon icon="lucide:check" className="w-3 h-3 text-white" />
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Project Details Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          Project Details
        </h3>

        <div className="space-y-2">
          <label
            htmlFor="currentChallenges"
            className="block text-sm font-semibold text-gray-700"
          >
            Current Challenges *
          </label>
          <textarea
            id="currentChallenges"
            name="currentChallenges"
            value={formData.currentChallenges}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Tell us about your current challenges - scaling operations, technology integration, compliance issues, etc."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-gray-50/50 resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="timeline"
              className="block text-sm font-semibold text-gray-700"
            >
              Project Timeline *
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
            >
              <option value="">Select timeline</option>
              <option value="Immediate">
                <div className="flex items-center">
                  <Icon
                    icon="lucide:rocket"
                    className="mr-2"
                    style={{ color: "#f45b01" }}
                  />
                  Immediate (Within 1 month)
                </div>
              </option>
              <option value="1-3 Months">
                <div className="flex items-center">
                  <Icon
                    icon="lucide:clock"
                    className="mr-2"
                    style={{ color: "#f45b01" }}
                  />
                  1-3 Months
                </div>
              </option>
              <option value="3-6 Months">
                <div className="flex items-center">
                  <Icon
                    icon="lucide:calendar"
                    className="mr-2"
                    style={{ color: "#f45b01" }}
                  />
                  3-6 Months
                </div>
              </option>
              <option value="6+ Months">
                <div className="flex items-center">
                  <Icon
                    icon="lucide:calendar-check"
                    className="mr-2"
                    style={{ color: "#f45b01" }}
                  />
                  6+ Months
                </div>
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="budget"
              className="block text-sm font-semibold text-gray-700"
            >
              Budget Range *
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={(e) => {
                handleChange(e);
                setIsCustomBudget(e.target.value === "Custom");
              }}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
            >
              <option value="">Select budget range</option>
              <option value="Under $10,000">
                <div className="flex items-center">
                  <Icon
                    icon="lucide:dollar-sign"
                    className="mr-2"
                    style={{ color: "#ffd100" }}
                  />
                  Under $10,000
                </div>
              </option>
              <option value="$10,000 - $50,000">
                <div className="flex items-center">
                  <Icon
                    icon="lucide:briefcase"
                    className="mr-2"
                    style={{ color: "#ffd100" }}
                  />
                  $10,000 - $50,000
                </div>
              </option>
              <option value="$50,000 - $100,000">
                <div className="flex items-center">
                  <Icon
                    icon="lucide:building"
                    className="mr-2"
                    style={{ color: "#ffd100" }}
                  />
                  $50,000 - $100,000
                </div>
              </option>
              <option value="Over $100,000">
                <div className="flex items-center">
                  <Icon
                    icon="lucide:trophy"
                    className="mr-2"
                    style={{ color: "#ffd100" }}
                  />
                  Over $100,000
                </div>
              </option>
              <option value="Custom">
                <div className="flex items-center">
                  <Icon
                    icon="lucide:edit"
                    className="mr-2"
                    style={{ color: "#ffd100" }}
                  />
                  Custom Amount
                </div>
              </option>
            </select>
          </div>
        </div>

        {isCustomBudget && (
          <div className="space-y-2 animate-fadeIn">
            <label
              htmlFor="customBudget"
              className="block text-sm font-semibold text-gray-700"
            >
              Custom Budget Amount
            </label>
            <input
              type="text"
              id="customBudget"
              name="customBudget"
              value={formData.customBudget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ccsa-blue focus:ring-0 transition-colors duration-200 bg-gray-50/50"
              placeholder="Please specify your budget"
            />
          </div>
        )}
      </div>

      {/* reCAPTCHA and Submit */}
      <div className="space-y-6 pt-6 border-t border-gray-200">
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
                Submit Proposal Request
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
