import { Icon } from "@iconify/react";
import { useState } from "react";
import toast from "react-hot-toast";

const ApplicationForm = () => {
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

    const toastId = toast.loading("Submitting your application...");

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

      const response = await fetch("/api/submit-application", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Application submitted successfully!", { id: toastId });
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
        toast.error(result.error || "Something went wrong. Please try again.", { id: toastId });
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to submit application. Please try again.", { id: toastId });
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="application-form" className="bg-white py-16 sm:py-20 border-t border-gray-200">
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
                  <option value="Sales Executive – Telesales & Omnichannel Growth">Sales Executive – Telesales & Omnichannel Growth</option>
                  <option value="Customer Service Agents" disabled>Customer Service Agents (Closed)</option>
                  <option value="Customer Service Team Lead" disabled>Customer Service Team Lead (Closed)</option>
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
                {formData.resume && (
                  <p className="text-sm text-ccsa-blue flex items-center gap-2">
                    <Icon icon="mdi:file-check" width={18} height={18} />
                    Selected: {formData.resume.name}
                  </p>
                )}
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
  );
};

export default ApplicationForm;

