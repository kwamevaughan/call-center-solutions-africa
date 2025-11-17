// IndustriesTab.js
import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const IndustriesTab = () => {
  const [activeTab, setActiveTab] = useState("healthcare");

  const industries = [
    {
      id: "healthcare",
      label: "Healthcare",
      icon: "mdi:medical-bag",
      image: "https://ik.imagekit.io/nkmvdjnna/CCSA/industries/healthcare.webp",
      title: "Healthcare",
      description: "Patient engagement for providers, payers, and telehealth platforms.",
      tags: [
        "HIPAA and GDPR",
        "Appointments and benefits verification",
        "Secure communications and accessibility",
      ],
      secondDescription: "Reduced patient wait times by 38% and improved satisfaction from 82% to 93% for a US telehealth client (2024).",
    },
    {
      id: "fintech",
      label: "Fintech",
      icon: "mdi:credit-card-multiple",
      image: "https://ik.imagekit.io/nkmvdjnna/CCSA/industries/healthcare.webp",
      title: "Fintech",
      description: "Multilingual, compliant CX for fintech and digital payments.",
      tags: [
        "Fraud and chargebacks",
        "KYC and KYB support",
        "3DS and OTP help",
      ],
      secondDescription: "Achieved 95% SLA compliance and 40% reduction in chargeback disputes for a European payments firm (2025).",
    },
    {
      id: "saas",
      label: "SaaS",
      icon: "mdi:cloud",
      image: "https://ik.imagekit.io/nkmvdjnna/CCSA/industries/healthcare.webp",
      title: "SaaS",
      description: "Support across onboarding, troubleshooting, and renewal.",
      tags: [
        "Tier 0-2 product support",
        "In-app chat and knowledge base",
        "Onboarding and save-a-sale",
      ],
      secondDescription: "20% faster onboarding and 30% reduction in ticket volume via AI-assisted support.",
    },
    {
      id: "insurance",
      label: "Insurance",
      icon: "mdi:shield-account",
      image: "https://ik.imagekit.io/nkmvdjnna/CCSA/industries/healthcare.webp",
      title: "Insurance",
      description: "Precision for policyholders, claims, and renewals.",
      tags: [
        "FNOL intake and documentation",
        "Policy changes and renewals",
        "Claims status and fraud escalation",
      ],
      secondDescription: "25% faster claim turnaround and CSAT at 91% across multiple insurance lines.",
    },
    {
      id: "travel",
      label: "Travel",
      icon: "mdi:airplane",
      image: "https://ik.imagekit.io/nkmvdjnna/CCSA/industries/healthcare.webp",
      title: "Travel",
      description: "Real-time support for disruption-heavy operations.",
      tags: [
        "Rebooking and refunds",
        "IRROPS and notifications",
        "Social monitoring and escalation",
      ],
      secondDescription: "50% reduction in complaint escalation and 92% positive feedback during disruptions (2023-2024).",
    },
    {
      id: "telecoms",
      label: "Telecoms",
      icon: "mdi:phone",
      image: "https://ik.imagekit.io/nkmvdjnna/CCSA/industries/healthcare.webp",
      title: "Telecoms",
      description: "Network-aware helpdesk and customer care.",
      tags: [
        "Tier 1-3 support and activation",
        "Outage communications and device support",
        "Billing, plan upgrades, retention",
      ],
      secondDescription: "Improved resolution rates by 35% and reduced churn for MNO clients across Africa and the Middle East; aligned to ITIL and TM Forum, integrated with CRM and OSS/BSS.",
    }
  ];

  const activeIndustry = industries.find(industry => industry.id === activeTab);

  return (
    <div className="mt-8 sm:mt-12">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 border-b border-gray-200 pb-4">
        {industries.map((industry) => (
          <button
            key={industry.id}
            onClick={() => setActiveTab(industry.id)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === industry.id
                ? "bg-ccsa-dark-blue text-white shadow-lg"
                : "bg-gray-100 text-ccsa-dark-blue hover:bg-gray-200"
            }`}
          >
            <Icon icon={industry.icon} width={20} height={20} />
            <span>{industry.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeIndustry && (
        <div className="border-2 border-ccsa-dark-blue rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side: Full Picture */}
            <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px]">
              <Image
                src={activeIndustry.image}
                alt={activeIndustry.title}
                fill
                className="object-cover p-10 rounded-l"
                sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

            {/* Right Side: Content */}
            <div className="flex flex-col gap-4 sm:gap-6 p-6 sm:p-8 md:p-10 bg-white">
              <h3 className="text-2xl sm:text-3xl font-bold text-ccsa-dark-blue">
                {activeIndustry.title}
              </h3>
              
              <p className="text-sm sm:text-base text-ccsa-dark-blue/80 leading-relaxed">
                {activeIndustry.description}
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {activeIndustry.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-ccsa-dark-blue text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
      </div>

              <p className="text-sm sm:text-base text-ccsa-dark-blue/80 leading-relaxed">
                {activeIndustry.secondDescription}
              </p>

              <Link
                href="/contact-us"
                className="text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-sm w-fit mt-2"
                style={{
                  background: "var(--ccsa-gradient)"
                }}
              >
                <Icon icon="mdi:phone" width={18} height={18} />
                Partner With Us
              </Link>
        </div>
      </div>
        </div>
      )}
    </div>
  );
};

export default IndustriesTab;
