// IndustriesTab.js
import { useState } from "react";
import { Icon } from "@iconify/react";

const IndustriesTab = () => {
  // State to manage which section is expanded
  const [expandedSection, setExpandedSection] = useState("business-fintech");

  // Function to toggle the expanded section
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Banking & Fintech Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer p-2 sm:p-0"
          onClick={() => toggleSection("business-fintech")}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Banking & Fintech</h3>
          <Icon
            icon={
              expandedSection === "business-fintech"
                ? "mdi:chevron-up"
                : "mdi:chevron-down"
            }
            width="20"
            height="20"
            className="text-white transition-transform duration-300 flex-shrink-0"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === "business-fintech"
              ? "max-h-32 sm:max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-300 mt-2 text-sm sm:text-base text-white leading-relaxed">
            Secure, regulation-ready support systems
          </p>
        </div>
      </div>

      {/* Telcom Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer p-2 sm:p-0"
          onClick={() => toggleSection("telecom")}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Telecom</h3>
          <Icon
            icon={
              expandedSection === "telecom"
                ? "mdi:chevron-up"
                : "mdi:chevron-down"
            }
            width="20"
            height="20"
            className="text-white transition-transform duration-300 flex-shrink-0"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === "telecom"
              ? "max-h-32 sm:max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-300 mt-2 text-sm sm:text-base text-white leading-relaxed">
            Handle high-volume inquiries with AI-driven efficiency.
          </p>
        </div>
      </div>

      {/* E-Commerce Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer p-2 sm:p-0"
          onClick={() => toggleSection("e-commerce")}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium">E-Commerce</h3>
          <Icon
            icon={
              expandedSection === "e-commerce"
                ? "mdi:chevron-up"
                : "mdi:chevron-down"
            }
            width="20"
            height="20"
            className="text-white transition-transform duration-300 flex-shrink-0"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === "e-commerce"
              ? "max-h-32 sm:max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-300 mt-2 text-sm sm:text-base text-white leading-relaxed">
            Scale support during peak sales with cloud flexibility.
          </p>
        </div>
      </div>

      {/* BPOs Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer p-2 sm:p-0"
          onClick={() => toggleSection("bpo")}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium">BPOs</h3>
          <Icon
            icon={
              expandedSection === "bpo" ? "mdi:chevron-up" : "mdi:chevron-down"
            }
            width="20"
            height="20"
            className="text-white transition-transform duration-300 flex-shrink-0"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === "bpo"
              ? "max-h-32 sm:max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-300 mt-2 text-sm sm:text-base text-white leading-relaxed">
            Launch your own BPO and serve global clients directly from Africa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustriesTab;
