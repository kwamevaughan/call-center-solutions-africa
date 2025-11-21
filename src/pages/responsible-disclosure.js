// pages/responsible-disclosure.js
import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";

const ResponsibleDisclosure = () => {
  return (
    <>
      <SEO
        title="Responsible Disclosure Policy | Call Center Solutions Africa"
        description="Learn about our Responsible Disclosure Policy. Report security vulnerabilities responsibly and help us keep our systems secure."
        keywords="Call Center Solutions Africa, responsible disclosure, security vulnerability, bug bounty, security policy"
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow px-4 py-16 max-w-6xl mx-auto">
          <h1 className="text-4xl font-semibold text-[#172840] mb-6 text-center">
            Responsible Disclosure Policy
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Last Updated: November 20, 2025
          </p>

          <section className="space-y-6 text-gray-700">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                1. Introduction
              </h2>
              <p>
                At Call Center Solutions Africa, we take the security of our
                systems and the privacy of our users' data seriously. We
                recognize the important role that security researchers and the
                broader community play in keeping the internet safe.
              </p>
              <p className="mt-2">
                This Responsible Disclosure Policy outlines how security
                researchers can report potential vulnerabilities in our systems
                in a responsible and coordinated manner. We appreciate your help
                in keeping our services secure.
              </p>
            </div>

            {/* Scope */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                2. Scope
              </h2>
              <p>
                This policy applies to the following systems and services:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Our main website:{" "}
                  <a
                    href="https://www.callcentersolutionsafrica.com"
                    className="text-[#ED761E] hover:underline"
                  >
                    www.callcentersolutionsafrica.com
                  </a>
                </li>
                <li>Our web applications and APIs</li>
                <li>Our customer service platforms</li>
                <li>Any other systems owned or operated by Call Center Solutions Africa</li>
              </ul>
              <p className="mt-2">
                <strong>Out of Scope:</strong> The following activities are
                explicitly excluded from this policy:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Social engineering or phishing attacks</li>
                <li>Physical security attacks</li>
                <li>Denial of Service (DoS) or Distributed Denial of Service (DDoS) attacks</li>
                <li>Attacks on third-party services or applications</li>
                <li>Any activity that violates applicable laws or regulations</li>
              </ul>
            </div>

            {/* Reporting Vulnerabilities */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                3. Reporting Vulnerabilities
              </h2>
              <p>
                If you discover a security vulnerability, please report it to us
                as soon as possible. To report a vulnerability, please send an
                email to:
              </p>
              <p className="mt-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:security@callcentersolutionsafrica.com"
                  className="text-[#ED761E] hover:underline"
                >
                  security@callcentersolutionsafrica.com
                </a>
              </p>
              <p className="mt-2">
                Please include the following information in your report:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  A detailed description of the vulnerability and its potential
                  impact
                </li>
                <li>
                  Steps to reproduce the vulnerability (proof of concept code,
                  screenshots, or videos are helpful)
                </li>
                <li>
                  The affected system or component
                </li>
                <li>
                  Your contact information (we may need to follow up with you)
                </li>
                <li>
                  Any suggested remediation or mitigation steps (if applicable)
                </li>
              </ul>
            </div>

            {/* What to Expect */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                4. What to Expect
              </h2>
              <p>When you report a vulnerability, you can expect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Acknowledgment:</strong> We will acknowledge receipt
                  of your report within 48 hours
                </li>
                <li>
                  <strong>Initial Assessment:</strong> We will provide an
                  initial assessment of the vulnerability within 7 business
                  days
                </li>
                <li>
                  <strong>Updates:</strong> We will keep you informed of our
                  progress in addressing the vulnerability
                </li>
                <li>
                  <strong>Resolution:</strong> We will work to resolve the
                  vulnerability as quickly as possible, typically within 90 days
                  depending on the severity
                </li>
                <li>
                  <strong>Recognition:</strong> With your permission, we may
                  recognize your contribution to our security (if you wish to be
                  credited)
                </li>
              </ul>
            </div>

            {/* Guidelines */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                5. Guidelines for Responsible Disclosure
              </h2>
              <p>
                To ensure a safe and coordinated disclosure process, please
                follow these guidelines:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Act in Good Faith:</strong> Only access or modify data
                  that is necessary to demonstrate the vulnerability
                </li>
                <li>
                  <strong>Respect Privacy:</strong> Do not access, modify, or
                  disclose any personal data beyond what is necessary to
                  demonstrate the vulnerability
                </li>
                <li>
                  <strong>Avoid Disruption:</strong> Do not disrupt our services
                  or impact our users' experience
                </li>
                <li>
                  <strong>Keep It Confidential:</strong> Do not publicly
                  disclose the vulnerability until we have had a reasonable
                  opportunity to address it (typically 90 days after our
                  acknowledgment)
                </li>
                <li>
                  <strong>No Malicious Activity:</strong> Do not engage in any
                  malicious activity, including but not limited to:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Installing malware</li>
                    <li>Exfiltrating data beyond what is necessary</li>
                    <li>Modifying or destroying data</li>
                    <li>Accessing accounts that do not belong to you</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Safe Harbor */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                6. Safe Harbor
              </h2>
              <p>
                We will not pursue legal action against security researchers who:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Act in good faith and in accordance with this Responsible
                  Disclosure Policy
                </li>
                <li>
                  Do not access, modify, or destroy data beyond what is
                  necessary to demonstrate the vulnerability
                </li>
                <li>
                  Do not disrupt our services or impact our users
                </li>
                <li>
                  Report the vulnerability to us in a timely manner
                </li>
                <li>
                  Do not publicly disclose the vulnerability before we have had
                  a reasonable opportunity to address it
                </li>
              </ul>
              <p className="mt-2">
                <strong>Note:</strong> This safe harbor applies only to
                activities conducted in good faith and in accordance with this
                policy. Any activities that violate applicable laws or cause harm
                to our systems or users are not covered by this safe harbor.
              </p>
            </div>

            {/* Rewards */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                7. Recognition and Rewards
              </h2>
              <p>
                While we do not currently operate a formal bug bounty program,
                we appreciate the valuable contributions of security
                researchers. We may, at our discretion:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Publicly recognize your contribution (with your permission)
                </li>
                <li>
                  Provide a token of appreciation for significant vulnerabilities
                </li>
                <li>
                  Offer early access to security patches or updates
                </li>
              </ul>
              <p className="mt-2">
                We evaluate each report on a case-by-case basis, considering
                factors such as severity, impact, and quality of the report.
              </p>
            </div>

            {/* Severity Classification */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                8. Severity Classification
              </h2>
              <p>We classify vulnerabilities according to the following severity levels:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Critical:</strong> Vulnerabilities that could lead to
                  complete system compromise, unauthorized access to sensitive
                  data, or significant service disruption
                </li>
                <li>
                  <strong>High:</strong> Vulnerabilities that could lead to
                  unauthorized access to user data or significant impact on
                  system functionality
                </li>
                <li>
                  <strong>Medium:</strong> Vulnerabilities that could lead to
                  limited unauthorized access or moderate impact on system
                  functionality
                </li>
                <li>
                  <strong>Low:</strong> Vulnerabilities with minimal impact or
                  that require specific conditions to exploit
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                9. Contact Us
              </h2>
              <p>
                If you have any questions about this Responsible Disclosure
                Policy, please contact us at:
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:security@callcentersolutionsafrica.com"
                  className="text-[#ED761E] hover:underline"
                >
                  security@callcentersolutionsafrica.com
                </a>
              </p>
              <p className="mt-2">
                General Inquiries:{" "}
                <a
                  href="mailto:hello@callcentersolutionsafrica.com"
                  className="text-[#ED761E] hover:underline"
                >
                  hello@callcentersolutionsafrica.com
                </a>
              </p>
              <p className="mt-2">
                Address: 7th floor, Mitsumi Business Park, Nairobi, Kenya
              </p>
            </div>
          </section>
          <div className="flex justify-center gap-4 pt-10">
            <Link href="/">
              <button className="bg-[#ED761E] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D7641B] transition duration-300">
                Back to Homepage
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ResponsibleDisclosure;

