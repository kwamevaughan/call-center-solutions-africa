import { Icon } from "@iconify/react";

const QuickNavigationMenu = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <span className="text-sm font-semibold text-ccsa-dark-blue">Quick Jump:</span>
        <a
          href="#sales-executive"
          className="text-sm text-ccsa-blue hover:text-ccsa-dark-blue font-medium flex items-center gap-1 transition-colors"
        >
          <Icon icon="mdi:arrow-right" width={16} height={16} />
          Sales Executive
        </a>
        <span className="text-gray-300">|</span>
        <a
          href="#danish-customer-service-executive"
          className="text-sm text-ccsa-blue hover:text-ccsa-dark-blue font-medium flex items-center gap-1 transition-colors"
        >
          <Icon icon="mdi:arrow-right" width={16} height={16} />
          Danish Customer Service
        </a>
        <span className="text-gray-300">|</span>
        <a
          href="#customer-service-agents"
          className="text-sm text-gray-600 hover:text-ccsa-dark-blue font-medium flex items-center gap-1 transition-colors"
        >
          <Icon icon="mdi:arrow-right" width={16} height={16} />
          Customer Service Agents
        </a>
        <span className="text-gray-300">|</span>
        <a
          href="#team-lead"
          className="text-sm text-gray-600 hover:text-ccsa-dark-blue font-medium flex items-center gap-1 transition-colors"
        >
          <Icon icon="mdi:arrow-right" width={16} height={16} />
          Team Lead
        </a>
        <span className="text-gray-300">|</span>
        <a
          href="#application-form"
          className="text-sm text-ccsa-blue hover:text-ccsa-dark-blue font-medium flex items-center gap-1 transition-colors"
        >
          <Icon icon="mdi:file-account" width={16} height={16} />
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default QuickNavigationMenu;

