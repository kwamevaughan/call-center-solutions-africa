import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const BlogSearch = ({ onSearch, onCategoryFilter, categories, selectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCategoryChange = (category) => {
    onCategoryFilter(category);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Input */}
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                width="24"
                height="24"
              />
              <input
                type="text"
                placeholder="Search strategic insights, best practices, industry trends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-12 pr-16 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088D2] focus:border-[#0088D2] transition-all duration-300 text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#0088D2] to-[#0056B3] text-white p-3 rounded-lg hover:from-[#0056B3] hover:to-[#003366] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Icon icon="mdi:arrow-right" width="20" height="20" />
              </button>
            </div>
          </form>
        </div>

        {/* Category Filter */}
        <div className="lg:w-72">
          <div className="relative">
            <Icon
              icon="mdi:filter-variant"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
              width="20"
              height="20"
            />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0088D2] focus:border-[#0088D2] transition-all duration-300 bg-white appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories && categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              width="20"
              height="20"
            />
          </div>
        </div>
      </div>

      {/* Search Suggestions */}
      {isSearchFocused && searchTerm && (
        <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <Icon icon="mdi:lightbulb-on" className="text-[#0088D2] mr-2" />
            <p className="text-sm font-semibold text-gray-700">Popular searches:</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "AI & Automation", 
              "Customer Experience", 
              "BPO Solutions", 
              "Kenya Market", 
              "Technology Trends", 
              "Call Center Operations", 
              "Africa Business", 
              "Digital Transformation"
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-[#0088D2] hover:bg-[#0088D2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Icon icon="mdi:file-document-multiple" className="mr-2 text-[#0088D2]" />
            <span>Expert-curated content</span>
          </div>
          <div className="flex items-center">
            <Icon icon="mdi:update" className="mr-2 text-[#0088D2]" />
            <span>Updated weekly</span>
          </div>
          <div className="flex items-center">
            <Icon icon="mdi:account-group" className="mr-2 text-[#0088D2]" />
            <span>Industry professionals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSearch;
