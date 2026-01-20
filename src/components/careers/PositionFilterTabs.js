import { Icon } from "@iconify/react";

const PositionFilterTabs = ({ filter, setFilter }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <button
        onClick={() => setFilter("all")}
        className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
          filter === "all"
            ? "bg-ccsa-blue text-white shadow-md"
            : "bg-white text-ccsa-dark-blue border-2 border-gray-200 hover:border-ccsa-blue"
        }`}
      >
        <Icon icon="mdi:view-list" width={18} height={18} className="inline mr-2" />
        All Positions
      </button>
      <button
        onClick={() => setFilter("open")}
        className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
          filter === "open"
            ? "bg-ccsa-blue text-white shadow-md"
            : "bg-white text-ccsa-dark-blue border-2 border-gray-200 hover:border-ccsa-blue"
        }`}
      >
        <Icon icon="mdi:check-circle" width={18} height={18} className="inline mr-2" />
        Open Positions
      </button>
      <button
        onClick={() => setFilter("closed")}
        className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
          filter === "closed"
            ? "bg-ccsa-blue text-white shadow-md"
            : "bg-white text-ccsa-dark-blue border-2 border-gray-200 hover:border-ccsa-blue"
        }`}
      >
        <Icon icon="mdi:close-circle" width={18} height={18} className="inline mr-2" />
        Closed Positions
      </button>
    </div>
  );
};

export default PositionFilterTabs;

