'use client';

interface DocumentFiltersProps {
  viewMode: 'table' | 'cards';
  onViewModeChange: (mode: 'table' | 'cards') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  productFilter: string;
  onProductFilterChange: (product: string) => void;
  dateRangeFilter: string;
  onDateRangeFilterChange: (range: string) => void;
}

export default function DocumentFilters({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  productFilter,
  onProductFilterChange,
  dateRangeFilter,
  onDateRangeFilterChange
}: DocumentFiltersProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm border-b border-blue-100 px-8 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <i className="ri-search-line w-5 h-5 flex items-center justify-center absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search documents or products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="valid">Valid</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending Review</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Product:</label>
            <select
              value={productFilter}
              onChange={(e) => onProductFilterChange(e.target.value)}
              className="pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
            >
              <option value="all">All Products</option>
              <option value="vitamin-c-serum">Vitamin C Brightening Serum</option>
              <option value="omega-3-capsules">Omega-3 Fish Oil Capsules</option>
              <option value="collagen-powder">Premium Collagen Powder</option>
              <option value="probiotic-capsules">Daily Probiotic Capsules</option>
              <option value="biotin-supplements">Biotin Hair Growth Supplements</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Expiry:</label>
            <select
              value={dateRangeFilter}
              onChange={(e) => onDateRangeFilterChange(e.target.value)}
              className="pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="30-days">Next 30 Days</option>
              <option value="90-days">Next 90 Days</option>
              <option value="6-months">Next 6 Months</option>
              <option value="expired">Already Expired</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded cursor-pointer transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-table-line w-4 h-4 flex items-center justify-center"></i>
            </button>
            <button
              onClick={() => onViewModeChange('cards')}
              className={`p-1.5 rounded cursor-pointer transition-colors ${
                viewMode === 'cards'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-layout-grid-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}