// pages/security-and-compliance.js
import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";
import { Icon } from "@iconify/react";

const SecurityAndCompliance = () => {
  const certifications = [
    {
      title: "ISO 27001",
      description: "Information Security Management System",
      icon: "mdi:shield-check",
    },
    {
      title: "GDPR",
      description: "General Data Protection Regulation Compliance",
      icon: "mdi:shield-lock",
    },
    {
      title: "HIPAA",
      description: "Health Insurance Portability and Accountability Act",
      icon: "mdi:medical-bag",
    },
    {
      title: "PCI DSS",
      description: "Payment Card Industry Data Security Standard",
      icon: "mdi:credit-card-multiple",
    },
    {
      title: "SOC 2",
      description: "Service Organization Control 2 Compliance",
      icon: "mdi:certificate",
    },
    {
      title: "Data Protection Act",
      description: "Kenya Data Protection Act Compliance",
      icon: "mdi:file-document-check",
    },
  ];

  const securityMeasures = [
    {
      title: "Data Encryption",
      description:
        "End-to-end encryption for data in transit and at rest, ensuring your sensitive information is protected at all times.",
      icon: "mdi:lock",
    },
    {
      title: "Access Controls",
      description:
        "Multi-factor authentication, role-based access controls, and regular access reviews to ensure only authorized personnel can access data.",
      icon: "mdi:account-key",
    },
    {
      title: "Network Security",
      description:
        "Firewalls, intrusion detection systems, and regular security audits to protect against unauthorized access and threats.",
      icon: "mdi:network",
    },
    {
      title: "Physical Security",
      description:
        "Secure facilities with biometric access, 24/7 monitoring, and restricted access zones to protect physical infrastructure.",
      icon: "mdi:security",
    },
    {
      title: "Incident Response",
      description:
        "Comprehensive incident response plans and procedures to quickly detect, respond to, and recover from security incidents.",
      icon: "mdi:alert-circle",
    },
    {
      title: "Regular Audits",
      description:
        "Regular internal and external security audits, vulnerability assessments, and penetration testing to maintain security posture.",
      icon: "mdi:file-search",
    },
  ];

  const complianceAreas = [
    {
      title: "Data Privacy",
      description:
        "Comprehensive data privacy controls and procedures to protect personal information in accordance with applicable regulations.",
      regulations: ["GDPR", "CCPA", "Data Protection Act"],
    },
    {
      title: "Healthcare",
      description:
        "HIPAA-compliant processes and infrastructure for handling protected health information (PHI).",
      regulations: ["HIPAA", "HITECH"],
    },
    {
      title: "Financial Services",
      description:
        "PCI DSS compliance and financial industry regulations for secure handling of payment card and financial data.",
      regulations: ["PCI DSS", "GLBA"],
    },
    {
      title: "International",
      description:
        "Compliance with international data protection and privacy regulations across multiple jurisdictions.",
      regulations: ["GDPR", "POPIA", "PIPEDA"],
    },
  ];

  return (
    <>
      <SEO
        title="Security and Compliance | Call Center Solutions Africa"
        description="Learn about our comprehensive security measures and compliance certifications including ISO 27001, GDPR, HIPAA, PCI DSS, and SOC 2. Your data security is our priority."
        keywords="security compliance, ISO 27001, GDPR compliance, HIPAA compliant, PCI DSS, SOC 2, data security, information security, call center security"
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          {/* Hero Section */}
          <div className="relative bg-ccsa-dark-blue px-4 py-16 sm:py-20 overflow-hidden">
            <div
              className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #F45B00 0%, #F45B00 35%, transparent 100%)",
                transform: "translate(-30%, 30%)",
              }}
            />
            <div
              className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #0088D2 0%, transparent 100%)",
                transform: "translate(30%, -30%)",
              }}
            />

            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-4 h-4 bg-ccsa-yellow rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl font-light text-white uppercase tracking-wide">
                  Security & Compliance
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Your Data Security is Our Priority
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                We maintain the highest standards of security and compliance to
                protect your data and ensure regulatory compliance across
                multiple jurisdictions and industries.
              </p>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="bg-white px-4 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-[#172840] text-center mb-4">
                Certifications & Standards
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                We maintain compliance with leading international security and
                privacy standards to ensure your data is protected.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #FFD100 0%, #ED761E 100%)",
                        }}
                      >
                        <Icon
                          icon={cert.icon}
                          width={24}
                          height={24}
                          className="text-white"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#172840]">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Measures */}
          <div className="bg-gray-50 px-4 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-[#172840] text-center mb-4">
                Security Measures
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                We implement comprehensive security measures to protect your
                data and systems from threats and unauthorized access.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {securityMeasures.map((measure, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <Icon
                      icon={measure.icon}
                      width={40}
                      height={40}
                      className="text-[#ED761E] mb-4"
                    />
                    <h3 className="text-xl font-semibold text-[#172840] mb-2">
                      {measure.title}
                    </h3>
                    <p className="text-gray-700">{measure.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance Areas */}
          <div className="bg-white px-4 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-[#172840] text-center mb-4">
                Compliance by Industry
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                We maintain compliance with industry-specific regulations to
                meet your unique requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {complianceAreas.map((area, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-8"
                  >
                    <h3 className="text-2xl font-semibold text-[#172840] mb-4">
                      {area.title}
                    </h3>
                    <p className="text-gray-700 mb-6">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.regulations.map((reg, idx) => (
                        <span
                          key={idx}
                          className="bg-[#ED761E] text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {reg}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-ccsa-dark-blue px-4 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Additional Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Link
                  href="/data-processing-addendum"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Icon
                      icon="mdi:file-document"
                      width={32}
                      height={32}
                      className="text-ccsa-yellow"
                    />
                    <h3 className="text-xl font-semibold text-white">
                      Data Processing Addendum
                    </h3>
                  </div>
                  <p className="text-white/90">
                    Review our comprehensive data processing addendum for
                    detailed information about how we handle your data.
                  </p>
                </Link>
                <Link
                  href="/global-compliance-playbook"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Icon
                      icon="mdi:book-open-variant"
                      width={32}
                      height={32}
                      className="text-ccsa-yellow"
                    />
                    <h3 className="text-xl font-semibold text-white">
                      Global Compliance Playbook
                    </h3>
                  </div>
                  <p className="text-white/90">
                    Access our comprehensive compliance playbook for detailed
                    information about our compliance framework.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative bg-white px-4 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172840] leading-tight mb-6">
                Have Security or Compliance Questions?
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-8 max-w-2xl mx-auto">
                Our security and compliance team is available to answer your
                questions and provide the documentation you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact-us"
                  className="bg-[#ED761E] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D7641B] transition duration-300 inline-flex items-center gap-2"
                >
                  <Icon icon="mdi:phone" width={18} height={18} />
                  Contact Us
                </Link>
                <Link
                  href="/responsible-disclosure"
                  className="bg-transparent border-2 border-[#ED761E] text-[#ED761E] px-8 py-3 rounded-full font-medium text-sm hover:bg-[#ED761E] hover:text-white transition duration-300 inline-flex items-center gap-2"
                >
                  <Icon icon="mdi:shield-alert" width={18} height={18} />
                  Responsible Disclosure
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default SecurityAndCompliance;

