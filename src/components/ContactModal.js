"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";


export default function ContactModal({ isOpen, onClose }) {
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
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCustomBudget, setIsCustomBudget] = useState(false); // State to track if 'Custom' is selected
  const router = useRouter();

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

        // Reset form
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

        // Delay a bit before closing the modal
        setTimeout(() => {
          onClose();
        }, 2000);
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



  // Close the modal if click outside of it
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick} // Handle click outside of modal to close it
    >
      <div
        className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Request Your Custom Proposal
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 text-3xl hover:text-red-800 focus:outline-none"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
            />
          </div>

          {/* Email and Company on the Same Row */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
            />
          </div>

          {/* Business Details */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
              >
                <option value="">Select an industry</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Travel & Hospitality">
                  Travel & Hospitality
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
              >
                <option value="">Select team size</option>
                <option value="1-10">1-10 agents</option>
                <option value="11-50">11-50 agents</option>
                <option value="51-100">51-100 agents</option>
                <option value="100+">100+ agents</option>
              </select>
            </div>
          </div>

          {/* Services of Interest */}
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Services of Interest * (Select all that apply)
            </p>
            <div className="space-y-2">
              {[
                "Technology Solutions",
                "Advisory Services",
                "Equipment Setup",
                "Cloud Platforms",
                "AI & Analytics",
              ].map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-[#ED761E] focus:ring-[#ED761E]"
                  />
                  <span className="ml-2 text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <label
              htmlFor="currentChallenges"
              className="block text-sm font-medium text-gray-700"
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
              placeholder="E.g., scaling operations, technology integration, compliance issues"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
            />
          </div>

          {/* Timeline, Budget */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
              >
                <option value="">Select timeline</option>
                <option value="Immediate">Immediate (Within 1 month)</option>
                <option value="1-3 Months">1-3 Months</option>
                <option value="3-6 Months">3-6 Months</option>
                <option value="6+ Months">6+ Months</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value === "Custom") {
                    setIsCustomBudget(true);
                  } else {
                    setIsCustomBudget(false);
                  }
                }}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
              >
                <option value="">Select budget</option>
                <option value="Under $10,000">Under $10,000</option>
                <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                <option value="Over $100,000">Over $100,000</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>

          {isCustomBudget && (
            <div>
              <label
                htmlFor="customBudget"
                className="block text-sm font-medium text-gray-700"
              >
                Please specify your budget
              </label>
              <input
                type="text"
                id="customBudget"
                name="customBudget"
                value={formData.customBudget}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ED761E] focus:ring-[#ED761E]"
              />
            </div>
          )}

          {/* Submit Button (Not Full Width) */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#ED761E] text-white cursor-pointer px-6 py-2 rounded-full font-medium hover:bg-[#e17a2f] disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit Proposal Request"}
            </button>
          </div>

          {/* reCAPTCHA */}
          <div>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptcha}
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
