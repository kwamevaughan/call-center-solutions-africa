// pages/case-studies.js
import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";
import { Icon } from "@iconify/react";

const CaseStudies = () => {
  return (
    <>
      <SEO
        title="Customer Success Stories & Case Studies | Call Center Solutions Africa"
        description="Read real case studies showing how businesses improved CSAT, reduced costs, and scaled operations with our BPO services. ISO 27001 certified results from Africa."
        keywords="case studies BPO, customer success stories, call center case studies Africa, customer service ROI, BPO success metrics, customer experience case studies"
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow px-4 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-[#172840] mb-4">
              Case Studies Library
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover how businesses across industries have transformed their
              customer experience and achieved remarkable results with Call
              Center Solutions Africa.
            </p>
          </div>

          <section className="space-y-8">
            {/* Coming Soon Notice */}
            <div className="bg-gradient-to-r from-ccsa-yellow/10 to-ccsa-orange/10 border border-ccsa-orange/20 rounded-lg p-8 text-center">
              <Icon
                icon="mdi:file-document-outline"
                className="mx-auto mb-4"
                width={64}
                height={64}
                style={{ color: "#ED761E" }}
              />
              <h2 className="text-2xl font-semibold text-[#172840] mb-4">
                Case Studies Coming Soon
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                We're currently compiling detailed case studies showcasing the
                success stories of our clients. These will include real-world
                examples of how we've helped businesses improve customer
                satisfaction, reduce costs, and scale their operations.
              </p>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Our case studies will cover various industries including
                healthcare, financial services, e-commerce, technology, and more.
                Each case study will detail the challenges faced, solutions
                implemented, and measurable results achieved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contact-us"
                  className="bg-[#ED761E] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D7641B] transition duration-300 flex items-center gap-2"
                >
                  <Icon icon="mdi:phone" width={18} height={18} />
                  Request a Case Study
                </Link>
                <Link
                  href="/blog"
                  className="bg-transparent border-2 border-[#ED761E] text-[#ED761E] px-8 py-3 rounded-full font-medium text-sm hover:bg-[#ED761E] hover:text-white transition duration-300 flex items-center gap-2"
                >
                  <Icon icon="mdi:book-open-variant" width={18} height={18} />
                  View Our Blog
                </Link>
              </div>
            </div>

            {/* What to Expect */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-[#172840] mb-6">
                What You'll Find in Our Case Studies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:chart-line"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Measurable Results
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Real metrics and KPIs showing improvements in customer
                    satisfaction, response times, cost savings, and operational
                    efficiency.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:lightbulb-on"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Solutions & Strategies
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Detailed explanations of the solutions we implemented and the
                    strategies that led to success.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:account-group"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Industry Insights
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Case studies across multiple industries to help you
                    understand how our solutions apply to your business.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:handshake"
                      width={32}
                      height={32}
                      style={{ color: "#ED761E" }}
                    />
                    <h3 className="text-xl font-semibold text-[#172840]">
                      Client Testimonials
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Direct quotes and testimonials from our clients sharing their
                    experience working with us.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-ccsa-dark-blue to-[#0d1f3a] rounded-lg p-8 text-white text-center mt-12">
              <h2 className="text-2xl font-semibold mb-4">
                Interested in Learning More?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Contact us to discuss how we can help your business achieve
                similar results, or request a custom case study relevant to
                your industry.
              </p>
              <Link
                href="/contact-us"
                className="bg-[#ED761E] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D7641B] transition duration-300 inline-flex items-center gap-2"
              >
                <Icon icon="mdi:phone" width={18} height={18} />
                Contact Us
              </Link>
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

export default CaseStudies;

