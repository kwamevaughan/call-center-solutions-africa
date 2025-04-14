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
    <div className="space-y-8">
      {/* Banking & Fintech Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("business-fintech")}
        >
          <h3 className="text-2xl">Banking & Fintech</h3>
          <Icon
            icon={
              expandedSection === "business-fintech"
                ? "mdi:chevron-up"
                : "mdi:chevron-down"
            }
            width="24"
            height="24"
            className="text-white transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === "business-fintech"
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-500 mt-2 text-white leading-tight">
            Secure, regulation-ready support systems
          </p>
        </div>
      </div>

      {/* Telcom Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("telecom")}
        >
          <h3 className="text-2xl">Telecom</h3>
          <Icon
            icon={
              expandedSection === "telecom"
                ? "mdi:chevron-up"
                : "mdi:chevron-down"
            }
            width="24"
            height="24"
            className="text-white transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === "telecom"
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-500 mt-2 text-white leading-tight">
            Handle high-volume inquiries with AI-driven efficiency.
          </p>
        </div>
      </div>

      {/* E-Commerce Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("e-commerce")}
        >
          <h3 className="text-2xl">E-Commerce</h3>
          <Icon
            icon={
              expandedSection === "e-commerce"
                ? "mdi:chevron-up"
                : "mdi:chevron-down"
            }
            width="24"
            height="24"
            className="text-white transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === "e-commerce"
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-500 mt-2 text-white leading-tight">
            Scale support during peak sales with cloud flexibility.
          </p>
        </div>
      </div>

      {/* BPOs Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("bpo")}
        >
          <h3 className="text-2xl">BPOs</h3>
          <Icon
            icon={
              expandedSection === "bpo" ? "mdi:chevron-up" : "mdi:chevron-down"
            }
            width="24"
            height="24"
            className="text-white transition-transform duration-300"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === "bpo"
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-500 mt-2 text-white leading-tight">
            Launch your own BPO and serve global clients directly from Africa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustriesTab;
