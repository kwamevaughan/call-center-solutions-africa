// pages/data-processing-addendum.js
import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";

const DataProcessingAddendum = () => {
  return (
    <>
      <SEO
        title="Data Processing Addendum | Call Center Solutions Africa"
        description="Read the Data Processing Addendum for Call Center Solutions Africa. Understand how we process personal data in compliance with data protection regulations."
        keywords="Call Center Solutions Africa, data processing addendum, GDPR, data protection, privacy compliance"
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow px-4 py-16 max-w-6xl mx-auto">
          <h1 className="text-4xl font-semibold text-[#172840] mb-6 text-center">
            Data Processing Addendum
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
                This Data Processing Addendum ("DPA") forms part of the Terms
                of Service or other agreement between Call Center Solutions
                Africa ("we," "us," "our," or "Processor") and you ("you,"
                "your," or "Controller") governing the processing of personal
                data in connection with our services.
              </p>
              <p className="mt-2">
                This DPA sets out the terms and conditions under which we will
                process personal data on your behalf in compliance with
                applicable data protection laws, including but not limited to the
                General Data Protection Regulation (GDPR), the Kenya Data
                Protection Act, and other applicable data protection
                legislation.
              </p>
            </div>

            {/* Definitions */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                2. Definitions
              </h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>"Controller"</strong> means the entity that determines
                  the purposes and means of the processing of personal data.
                </li>
                <li>
                  <strong>"Processor"</strong> means the entity that processes
                  personal data on behalf of the Controller.
                </li>
                <li>
                  <strong>"Personal Data"</strong> means any information
                  relating to an identified or identifiable natural person.
                </li>
                <li>
                  <strong>"Processing"</strong> means any operation performed on
                  personal data, including collection, storage, use, disclosure,
                  or deletion.
                </li>
                <li>
                  <strong>"Data Protection Laws"</strong> means all applicable
                  laws and regulations relating to the processing, privacy, and
                  use of personal data.
                </li>
                <li>
                  <strong>"Data Subject"</strong> means the natural person to
                  whom the personal data relates.
                </li>
              </ul>
            </div>

            {/* Scope and Purpose */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                3. Scope and Purpose of Processing
              </h2>
              <p>
                We will process personal data on your behalf solely for the
                purpose of providing our call center and customer service
                solutions as described in our service agreement. The types of
                personal data we may process include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Customer contact information (names, email addresses, phone numbers)</li>
                <li>Customer service interaction records</li>
                <li>Account and billing information</li>
                <li>Any other personal data you provide to us in connection with our services</li>
              </ul>
              <p className="mt-2">
                We will not process personal data for any purpose other than
                those specified in our service agreement or as instructed by
                you, except where required by applicable law.
              </p>
            </div>

            {/* Our Obligations */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                4. Our Obligations as Processor
              </h2>
              <p>We agree to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Process personal data only in accordance with your documented
                  instructions, unless required by applicable law
                </li>
                <li>
                  Ensure that persons authorized to process personal data are
                  subject to appropriate confidentiality obligations
                </li>
                <li>
                  Implement and maintain appropriate technical and organizational
                  measures to protect personal data against unauthorized or
                  unlawful processing and against accidental loss, destruction,
                  or damage
                </li>
                <li>
                  Assist you in responding to requests from data subjects to
                  exercise their rights under applicable data protection laws
                </li>
                <li>
                  Notify you without undue delay if we become aware of a personal
                  data breach
                </li>
                <li>
                  Assist you in ensuring compliance with your obligations under
                  applicable data protection laws
                </li>
                <li>
                  Make available to you all information necessary to demonstrate
                  compliance with this DPA
                </li>
              </ul>
            </div>

            {/* Security Measures */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                5. Security Measures
              </h2>
              <p>
                We implement appropriate technical and organizational measures to
                ensure a level of security appropriate to the risk, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Encryption of personal data in transit and at rest</li>
                <li>Regular security assessments and vulnerability testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection and security</li>
                <li>Incident response and breach notification procedures</li>
                <li>Regular backups and disaster recovery procedures</li>
                <li>Physical security measures for our facilities</li>
              </ul>
            </div>

            {/* Sub-Processors */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                6. Sub-Processors
              </h2>
              <p>
                We may engage sub-processors to assist in providing our services.
                We will:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Inform you of any intended changes concerning the addition or
                  replacement of sub-processors
                </li>
                <li>
                  Ensure that any sub-processor is bound by data protection
                  obligations that are substantially similar to those set out in
                  this DPA
                </li>
                <li>
                  Remain fully liable for the performance of sub-processors
                  under this DPA
                </li>
              </ul>
              <p className="mt-2">
                If you object to our use of a sub-processor, you may terminate
                the relevant service agreement in accordance with its terms.
              </p>
            </div>

            {/* Data Subject Rights */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                7. Data Subject Rights
              </h2>
              <p>
                We will assist you in responding to requests from data subjects
                to exercise their rights under applicable data protection laws,
                including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Right of access to personal data</li>
                <li>Right to rectification of inaccurate personal data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restriction of processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
              <p className="mt-2">
                We will provide reasonable assistance to enable you to respond to
                such requests within the timeframes required by applicable law.
              </p>
            </div>

            {/* Data Breach Notification */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                8. Data Breach Notification
              </h2>
              <p>
                In the event of a personal data breach, we will:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Notify you without undue delay after becoming aware of the
                  breach
                </li>
                <li>
                  Provide you with all relevant information about the breach,
                  including the nature of the breach, categories of data
                  affected, and number of data subjects concerned
                </li>
                <li>
                  Assist you in meeting your obligations to notify supervisory
                  authorities and data subjects, where required
                </li>
                <li>
                  Take reasonable steps to mitigate the effects of the breach
                </li>
              </ul>
            </div>

            {/* International Transfers */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                9. International Data Transfers
              </h2>
              <p>
                If we transfer personal data outside the European Economic Area
                (EEA) or other jurisdictions with data protection laws, we will
                ensure that appropriate safeguards are in place, such as:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Standard contractual clauses approved by relevant authorities</li>
                <li>Adequacy decisions by relevant authorities</li>
                <li>Other legally recognized transfer mechanisms</li>
              </ul>
            </div>

            {/* Return or Deletion of Data */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                10. Return or Deletion of Data
              </h2>
              <p>
                Upon termination of our services or upon your request, we will:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Return all personal data to you in a structured, commonly used,
                  and machine-readable format, or
                </li>
                <li>
                  Delete all personal data, unless we are required by applicable
                  law to retain it
                </li>
              </ul>
              <p className="mt-2">
                We will complete the return or deletion within 30 days of
                termination or your request, unless a longer retention period is
                required by applicable law.
              </p>
            </div>

            {/* Audits */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                11. Audits
              </h2>
              <p>
                We will make available to you all information necessary to
                demonstrate compliance with this DPA. You may conduct audits or
                inspections of our data processing activities, subject to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Reasonable advance notice (at least 30 days)</li>
                <li>Confidentiality obligations</li>
                <li>Limitation to business hours</li>
                <li>Your bearing the costs of such audits</li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                12. Contact Us
              </h2>
              <p>
                If you have any questions about this Data Processing Addendum,
                please contact us at:
              </p>
              <p>
                Email:{" "}
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

export default DataProcessingAddendum;

