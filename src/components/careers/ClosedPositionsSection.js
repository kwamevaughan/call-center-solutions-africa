import { Icon } from "@iconify/react";
import CustomerServiceAgentsPosition from "./positions/CustomerServiceAgentsPosition";
import CustomerServiceTeamLeadPosition from "./positions/CustomerServiceTeamLeadPosition";

const ClosedPositionsSection = ({ closedPositionsExpanded, setClosedPositionsExpanded }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <Icon icon="mdi:archive" width={24} height={24} className="text-gray-500" />
          <h3 className="text-xl font-bold text-gray-700">Closed Positions</h3>
          <span className="text-sm text-gray-500">(2 positions)</span>
        </div>
        <button
          onClick={() => setClosedPositionsExpanded(!closedPositionsExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <Icon 
            icon={closedPositionsExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} 
            width={20} 
            height={20} 
          />
          {closedPositionsExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {closedPositionsExpanded && (
        <div className="space-y-6">
          <CustomerServiceAgentsPosition />
          <CustomerServiceTeamLeadPosition />
        </div>
      )}
    </div>
  );
};

export default ClosedPositionsSection;

