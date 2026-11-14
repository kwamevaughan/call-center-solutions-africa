"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

interface ApplicationFormProps {
  jobTitle?: string;
  jobSlug: string;
}

const ApplicationForm = ({ jobTitle, jobSlug }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    resume: null as File | null,
    coverLetter: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files?.[0] ?? null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting your application...");

    try {
      const body = new FormData();
      body.append("fullName", formData.fullName);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("coverLetter", formData.coverLetter);
      body.append("position", jobTitle ?? "");
      body.append("jobSlug", jobSlug);
      body.append("linkedin", formData.linkedin);
      body.append("consented", "true");
      if (formData.resume) body.append("resume", formData.resume);

      const res = await fetch("/api/submit-application", {
        method: "POST",
        body,
      });
      const result = await res.json();

      if (res.ok) {
        toast.success("Application submitted!", { id: toastId });
        setSubmitted(true);
      } else {
        toast.error(result.error ?? "Something went wrong. Please try again.", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Failed to submit. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <Icon
          icon="mdi:check-circle"
          width={48}
          height={48}
          className="text-green-500 mx-auto mb-3"
        />
        <h3 className="text-lg font-semibold text-green-800 mb-1">
          Application Submitted!
        </h3>
        <p className="text-sm text-green-700">
          We've received your application and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-7">
      <h2 className="text-base font-semibold uppercase tracking-wide text-slate-400 mb-1">
        Apply Now
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Or email us at{" "}
        <a
          href="mailto:careers@callcentersolutionsafrica.com"
          className="text-ccsa-blue hover:underline"
        >
          careers@callcentersolutionsafrica.com
        </a>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Full Name" required>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 outline-none transition-colors"
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Email" required>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 outline-none transition-colors"
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254 700 000 000"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 outline-none transition-colors"
            />
          </Field>
        </div>

        <Field label="LinkedIn profile" required>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            required
            placeholder="linkedin.com/in/your-name"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 outline-none transition-colors"
          />
        </Field>

        <Field label="Resume / CV" required>
          <input
            type="file"
            name="resume"
            onChange={handleFile}
            required
            accept=".pdf,.doc,.docx"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 outline-none transition-colors cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-ccsa-blue/10 file:text-ccsa-blue"
          />
          <p className="text-xs text-slate-400 mt-1">PDF or DOCX · max 4 MB</p>
        </Field>

        <Field label="Cover Letter">
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={4}
            placeholder="Why are you a great fit for this role?"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-ccsa-blue focus:ring-2 focus:ring-ccsa-blue/20 outline-none transition-colors resize-none"
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-ccsa-blue text-white text-sm font-semibold rounded-xl hover:bg-ccsa-blue/90 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Icon
                icon="mdi:loading"
                className="animate-spin"
                width={18}
                height={18}
              />
              Submitting…
            </>
          ) : (
            <>
              <Icon icon="mdi:send" width={18} height={18} />
              Submit Application
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

export default ApplicationForm;
