// pages/terms-of-service.js
import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="Terms of Service | Legal Agreement | Call Center Solutions Africa"
        description="Review our terms of service for BPO and call center services. Understand usage policies, liability, and legal agreements for secure outsourcing in Africa."
        keywords="terms of service Call Center Solutions Africa, legal agreement BPO, service terms Africa, call center contract terms"
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow px-4 py-16 max-w-6xl mx-auto">
          <h1 className="text-4xl font-semibold text-[#172840] mb-6 text-center">
            Terms of Service
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
                Welcome to Call Center Solutions Africa ("we," "our," or "us").
                These Terms of Service ("Terms") govern your access to and use
                of our website located at{" "}
                <a
                  href="https://www.callcentersolutionsafrica.com"
                  className="text-[#ED761E] hover:underline"
                >
                  www.callcentersolutionsafrica.com
                </a>{" "}
                (the "Website") and any services we provide (collectively, the
                "Services").
              </p>
              <p className="mt-2">
                By accessing or using our Website or Services, you agree to be
                bound by these Terms. If you do not agree to these Terms, please
                do not use our Website or Services.
              </p>
            </div>

            {/* Acceptance of Terms */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                2. Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, or using our Website, you acknowledge
                that you have read, understood, and agree to be bound by these
                Terms and to comply with all applicable laws and regulations. If
                you are using the Services on behalf of an organization, you
                represent and warrant that you have the authority to bind that
                organization to these Terms.
              </p>
            </div>

            {/* Use of Services */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                3. Use of Services
              </h2>
              <p>You agree to use our Services only for lawful purposes and in
                accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Use the Services in any way that violates any applicable law
                  or regulation
                </li>
                <li>
                  Transmit any malicious code, viruses, or harmful data through
                  our Services
                </li>
                <li>
                  Attempt to gain unauthorized access to any portion of our
                  Website or Services
                </li>
                <li>
                  Interfere with or disrupt the integrity or performance of our
                  Services
                </li>
                <li>
                  Use automated systems (bots, scrapers, etc.) to access our
                  Services without our prior written consent
                </li>
                <li>
                  Impersonate any person or entity or misrepresent your
                  affiliation with any person or entity
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                4. Intellectual Property Rights
              </h2>
              <p>
                All content, features, and functionality of our Website and
                Services, including but not limited to text, graphics, logos,
                images, audio clips, digital downloads, and software, are owned
                by Call Center Solutions Africa or its licensors and are
                protected by international copyright, trademark, and other
                intellectual property laws.
              </p>
              <p className="mt-2">
                You may not reproduce, distribute, modify, create derivative
                works of, publicly display, publicly perform, republish,
                download, store, or transmit any of the material on our Website
                without our prior written consent, except as permitted by these
                Terms.
              </p>
            </div>

            {/* User Content */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                5. User Content
              </h2>
              <p>
                If you submit any content, information, or materials through our
                Services (including through contact forms, comments, or other
                means), you grant us a non-exclusive, worldwide, royalty-free,
                perpetual, and irrevocable license to use, reproduce, modify,
                adapt, publish, translate, and distribute such content for any
                purpose.
              </p>
              <p className="mt-2">
                You represent and warrant that you own or have the necessary
                rights to grant us this license and that your content does not
                violate any third-party rights or applicable laws.
              </p>
            </div>

            {/* Disclaimer of Warranties */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                6. Disclaimer of Warranties
              </h2>
              <p>
                Our Services are provided "as is" and "as available" without any
                warranties of any kind, either express or implied. We do not
                warrant that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  The Services will be uninterrupted, secure, or error-free
                </li>
                <li>
                  The results obtained from using the Services will be accurate
                  or reliable
                </li>
                <li>
                  Any defects or errors in the Services will be corrected
                </li>
              </ul>
              <p className="mt-2">
                To the fullest extent permitted by law, we disclaim all
                warranties, express or implied, including but not limited to
                implied warranties of merchantability, fitness for a particular
                purpose, and non-infringement.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                7. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, Call Center
                Solutions Africa, its officers, directors, employees, agents,
                and affiliates shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of
                profits or revenues, whether incurred directly or indirectly, or
                any loss of data, use, goodwill, or other intangible losses,
                resulting from:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Your use or inability to use our Services</li>
                <li>
                  Any unauthorized access to or use of our servers or any
                  personal information stored therein
                </li>
                <li>
                  Any interruption or cessation of transmission to or from our
                  Services
                </li>
                <li>
                  Any bugs, viruses, trojan horses, or the like that may be
                  transmitted to or through our Services
                </li>
              </ul>
            </div>

            {/* Indemnification */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                8. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless Call Center
                Solutions Africa, its officers, directors, employees, agents, and
                affiliates from and against any and all claims, damages,
                obligations, losses, liabilities, costs, or debt, and expenses
                (including but not limited to attorney's fees) arising from:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Your use of or access to our Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party right</li>
                <li>Any content you submit through our Services</li>
              </ul>
            </div>

            {/* Third-Party Links */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                9. Third-Party Links
              </h2>
              <p>
                Our Website may contain links to third-party websites or services
                that are not owned or controlled by Call Center Solutions
                Africa. We have no control over, and assume no responsibility
                for, the content, privacy policies, or practices of any
                third-party websites or services.
              </p>
              <p className="mt-2">
                You acknowledge and agree that Call Center Solutions Africa
                shall not be responsible or liable, directly or indirectly, for
                any damage or loss caused or alleged to be caused by or in
                connection with the use of or reliance on any such content,
                goods, or services available on or through any such third-party
                websites or services.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                10. Termination
              </h2>
              <p>
                We reserve the right to terminate or suspend your access to our
                Services immediately, without prior notice or liability, for any
                reason whatsoever, including without limitation if you breach
                these Terms.
              </p>
              <p className="mt-2">
                Upon termination, your right to use the Services will cease
                immediately. All provisions of these Terms that by their nature
                should survive termination shall survive termination, including,
                without limitation, ownership provisions, warranty disclaimers,
                indemnity, and limitations of liability.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                11. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of Kenya, without regard to its conflict of law
                provisions. Any disputes arising under or in connection with
                these Terms shall be subject to the exclusive jurisdiction of
                the courts of Kenya.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                12. Changes to Terms
              </h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days notice prior to any new
                terms taking effect.
              </p>
              <p className="mt-2">
                What constitutes a material change will be determined at our sole
                discretion. By continuing to access or use our Services after
                those revisions become effective, you agree to be bound by the
                revised terms.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                13. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us at:
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

export default TermsOfService;

