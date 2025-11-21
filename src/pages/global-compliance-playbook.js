// pages/global-compliance-playbook.js
import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";
import { Icon } from "@iconify/react";

const GlobalCompliancePlaybook = () => {
  return (
    <>
      <SEO
        title="Global Compliance Playbook | Call Center Solutions Africa"
        description="Access our Global Compliance Playbook to understand how Call Center Solutions Africa ensures compliance with international data protection and regulatory requirements."
        keywords="Call Center Solutions Africa, compliance playbook, GDPR compliance, data protection, regulatory compliance, global standards"
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow px-4 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-[#172840] mb-4">
              Global Compliance Playbook
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A comprehensive guide to understanding how Call Center Solutions
              Africa maintains compliance with international data protection and
              regulatory requirements across multiple jurisdictions.
            </p>
          </div>

          <section className="space-y-8">
            {/* Coming Soon Notice */}
            <div className="bg-gradient-to-r from-ccsa-yellow/10 to-ccsa-orange/10 border border-ccsa-orange/20 rounded-lg p-8 text-center">
              <Icon
                icon="mdi:shield-check-outline"
                className="mx-auto mb-4"
                width={64}
                height={64}
                style={{ color: "#ED761E" }}
              />
              <h2 className="text-2xl font-semibold text-[#172840] mb-4">
                Global Compliance Playbook Coming Soon
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                We're developing a comprehensive Global Compliance Playbook that
                will serve as your guide to understanding our compliance
                framework, certifications, and how we ensure adherence to
                international data protection and regulatory standards.
              </p>
            </div>

            {/* What's Included */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-[#172840] mb-6">
                What's Included in the Playbook
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:certificate"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Certifications & Standards
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Overview of our certifications and compliance with:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>ISO 27001 (Information Security)</li>
                    <li>GDPR (General Data Protection Regulation)</li>
                    <li>PCI DSS (Payment Card Industry)</li>
                    <li>HIPAA (Healthcare Information Privacy)</li>
                    <li>SOC 2 (Service Organization Control)</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:earth"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Regional Compliance
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Compliance frameworks for different regions:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>European Union (GDPR)</li>
                    <li>United States (CCPA, HIPAA)</li>
                    <li>Kenya (Data Protection Act)</li>
                    <li>South Africa (POPIA)</li>
                    <li>Other African jurisdictions</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:lock-outline"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Data Security Measures
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Detailed information about our data security practices,
                    encryption standards, access controls, and incident response
                    procedures.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:file-document-edit"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Compliance Documentation
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Access to compliance documentation, audit reports, and
                    third-party assessments that demonstrate our commitment to
                    security and compliance.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:account-check"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Vendor Management
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Information about how we manage third-party vendors and
                    ensure they meet our compliance standards.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:update"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Continuous Monitoring
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Details about our ongoing compliance monitoring, regular
                    audits, and how we stay current with evolving regulatory
                    requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance Highlights */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 mt-8">
              <h2 className="text-2xl font-semibold text-[#172840] mb-6">
                Our Compliance Commitment
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  At Call Center Solutions Africa, we understand that
                  compliance is not just about meeting regulatory requirements
                  – it's about building trust with our clients and protecting
                  the data of their customers. Our Global Compliance Playbook
                  will provide you with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Clear documentation of our compliance posture across
                    multiple jurisdictions
                  </li>
                  <li>
                    Detailed explanations of how we protect and process data
                  </li>
                  <li>
                    Information about our security controls and measures
                  </li>
                  <li>
                    Guidance on how we can help you meet your own compliance
                    obligations
                  </li>
                  <li>
                    Regular updates as regulations evolve and new requirements
                    emerge
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-ccsa-dark-blue to-[#0d1f3a] rounded-lg p-8 text-white text-center mt-12">
              <h2 className="text-2xl font-semibold mb-4">
                Need Compliance Information Now?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                While we're finalizing the playbook, our team is available to
                answer your compliance questions and provide the documentation
                you need. Contact us to discuss your specific compliance
                requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contact-us"
                  className="bg-[#ED761E] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D7641B] transition duration-300 inline-flex items-center gap-2"
                >
                  <Icon icon="mdi:phone" width={18} height={18} />
                  Contact Us
                </Link>
                <Link
                  href="/data-processing-addendum"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-white hover:text-ccsa-dark-blue transition duration-300 inline-flex items-center gap-2"
                >
                  <Icon icon="mdi:file-document" width={18} height={18} />
                  View Data Processing Addendum
                </Link>
              </div>
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

export default GlobalCompliancePlaybook;

