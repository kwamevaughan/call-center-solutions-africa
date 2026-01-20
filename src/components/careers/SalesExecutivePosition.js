import { Icon } from "@iconify/react";

const SalesExecutivePosition = () => {
  return (
    <div id="sales-executive" className="bg-white rounded-lg border-2 border-ccsa-blue/20 shadow-lg hover:shadow-xl transition-all">
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue">
                Sales Executive – Telesales & Omnichannel Growth
              </h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium animate-pulse">
                <Icon icon="mdi:check-circle" width={16} height={16} />
                Open Position
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                <Icon icon="mdi:map-marker" width={16} height={16} />
                Nairobi (Hybrid / On-site)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                <Icon icon="mdi:account-multiple" width={16} height={16} />
                10 Positions Available
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                <Icon icon="mdi:calendar-clock" width={16} height={16} />
                Rolling Basis
              </span>
            </div>
          </div>
          <a
            href="#application-form"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ccsa-blue text-white font-semibold rounded-lg transition-all duration-300 hover:bg-ccsa-blue/90 hover:shadow-md whitespace-nowrap"
          >
            <Icon icon="mdi:send" width={18} height={18} />
            Apply Now
          </a>
        </div>

        {/* Job Description */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:file-document-outline" width={20} height={20} className="text-ccsa-blue" />
                About CCSA Africa
              </h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Call Center Solutions Africa (CCSA) is a fast-growing outsourced sales and customer engagement company serving businesses across Africa, Europe, and global markets. We specialize in high-performance telesales, lead conversion, and omnichannel outreach that directly drives revenue for our clients.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are building a world-class sales engine and are looking for driven sales professionals who thrive on targets, conversations, and closing deals.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:file-document-outline" width={20} height={20} className="text-ccsa-blue" />
                Role Overview
              </h4>
              <p className="text-gray-700 leading-relaxed">
                We are seeking experienced, highly fluent English-speaking Sales Executives with a strong passion for telesales and omnichannel outreach. This role is ideal for self-motivated closers who enjoy engaging prospects, overcoming objections, and converting warm and cold leads into paying customers across phone, email, WhatsApp, and LinkedIn.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                You will be at the frontline of revenue generation, representing both CCSA and our clients, with clear performance metrics, structured playbooks, and strong leadership support.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:check-circle-outline" width={20} height={20} className="text-ccsa-blue" />
                Key Responsibilities
              </h4>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Execute high-volume outbound telesales campaigns targeting qualified leads provided via CRM</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Engage prospects through omnichannel outreach (calls, email, WhatsApp, LinkedIn)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Conduct needs discovery, qualify prospects, and confidently pitch client solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Handle objections and close deals while maintaining high conversion rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Accurately update CRM systems with call outcomes, notes, and next actions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Meet and exceed daily, weekly, and monthly sales targets</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Collaborate with QA, training, and team leads to continuously improve scripts and performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Maintain exceptional professionalism, tone, and clarity in all customer interactions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:account-star-outline" width={20} height={20} className="text-ccsa-blue" />
                Required Qualifications & Experience
              </h4>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>2+ years proven experience in telesales, inside sales, or call center sales</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Native-level or near-native English fluency (spoken and written is non-negotiable)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Strong persuasion, negotiation, and closing skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>High energy, resilience, and comfort with rejection</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Experience working with CRMs and sales dialers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Ability to follow structured sales processes while still thinking independently</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:account-search" width={20} height={20} className="text-ccsa-blue" />
                Ideal Candidate Profile
              </h4>
              <p className="text-gray-700 leading-relaxed mb-3">You are:</p>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>A hunter, not an order-taker</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Comfortable spending most of your day on calls and follow-ups</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Target-driven and motivated by performance-based earnings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Confident in speaking to decision-makers across different industries</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Coachable, competitive, and eager to grow into senior or leadership roles</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:gift-outline" width={20} height={20} className="text-ccsa-blue" />
                What We Offer
              </h4>
              <ul className="space-y-2.5 text-gray-700">
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Competitive base salary + uncapped commissions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Clear KPIs and transparent performance tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Structured onboarding, sales playbooks, and ongoing coaching</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Exposure to international clients and markets</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>Fast growth opportunities into Senior Sales, Team Lead, or Account Manager roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="mdi:check" width={18} height={18} className="text-ccsa-blue flex-shrink-0 mt-0.5" />
                  <span>A performance-driven, ambitious sales culture</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-ccsa-dark-blue mb-3 flex items-center gap-2">
                <Icon icon="mdi:lightbulb-on" width={20} height={20} className="text-ccsa-blue" />
                Why Join CCSA Africa?
              </h4>
              <p className="text-gray-700 leading-relaxed">
                At CCSA, results are rewarded. If you can sell, close, and consistently hit targets, you will grow fast. This is not a passive sales role. It is a high-impact position for professionals who want to sharpen their sales mastery and earn based on results.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3 font-semibold">
                Apply if you're ready to sell, not just talk about sales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesExecutivePosition;

