
'use client';

import { useState } from 'react';

interface OrdersFiltersProps {
  searchTerm: string;
  statusFilter: string;
  dateFilter: string;
  onSearch: (term: string) => void;
  onStatusFilter: (status: string) => void;
  onDateFilter: (dateRange: string) => void;
}

export default function OrdersFilters({
  searchTerm,
  statusFilter,
  dateFilter,
  onSearch,
  onStatusFilter,
  onDateFilter
}: OrdersFiltersProps) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' }
  ];

  const getStatusLabel = () => {
    return statusOptions.find(option => option.value === statusFilter)?.label || 'All Status';
  };

  const getDateLabel = () => {
    return dateOptions.find(option => option.value === dateFilter)?.label || 'All Time';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line w-5 h-5 flex items-center justify-center text-gray-400"></i>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              placeholder="Search by Order ID, Buyer Name, or Product SKU..."
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          {/* Status Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowDateDropdown(false);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-filter-line w-4 h-4 flex items-center justify-center"></i>
              {getStatusLabel()}
              <i className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`}></i>
            </button>

            {showStatusDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onStatusFilter(option.value);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${
                      statusFilter === option.value ? 'bg-lime-50 text-lime-700 font-medium' : 'text-gray-700'
                    } ${option === statusOptions[0] ? 'rounded-t-xl' : ''} ${
                      option === statusOptions[statusOptions.length - 1] ? 'rounded-b-xl' : 'border-b border-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDateDropdown(!showDateDropdown);
                setShowStatusDropdown(false);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
              {getDateLabel()}
              <i className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform ${showDateDropdown ? 'rotate-180' : ''}`}></i>
            </button>

            {showDateDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {dateOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onDateFilter(option.value);
                      setShowDateDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${
                      dateFilter === option.value ? 'bg-lime-50 text-lime-700 font-medium' : 'text-gray-700'
                    } ${option === dateOptions[0] ? 'rounded-t-xl' : ''} ${
                      option === dateOptions[dateOptions.length - 1] ? 'rounded-b-xl' : 'border-b border-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(statusFilter !== 'all' || dateFilter !== 'all' || searchTerm) && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">Active filters:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-lime-100 text-lime-800 text-xs rounded-full">
              Search: "{searchTerm}"
              <button
                onClick={() => onSearch('')}
                className="w-3 h-3 flex items-center justify-center hover:bg-lime-200 rounded-full cursor-pointer"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            </span>
          )}
          
          {statusFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Status: {getStatusLabel()}
              <button
                onClick={() => onStatusFilter('all')}
                className="w-3 h-3 flex items-center justify-center hover:bg-blue-200 rounded-full cursor-pointer"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            </span>
          )}
          
          {dateFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Date: {getDateLabel()}
              <button
                onClick={() => onDateFilter('all')}
                className="w-3 h-3 flex items-center justify-center hover:bg-purple-200 rounded-full cursor-pointer"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            </span>
          )}
          
          <button
            onClick={() => {
              onSearch('');
              onStatusFilter('all');
              onDateFilter('all');
            }}
            className="text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
