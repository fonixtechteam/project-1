
'use client';

import { useState } from 'react';

interface FiltersBarProps {
  filters: {
    status: string;
    country: string;
    dateRange: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function FiltersBar({ filters, onFiltersChange }: FiltersBarProps) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const countryOptions = [
    { value: 'all', label: 'All Countries' },
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Australia', label: 'Australia' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' }
  ];

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <button
            className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {statusOptions.find(opt => opt.value === filters.status)?.label}
              </span>
              <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
            </div>
          </button>
          
          {showStatusDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={() => {
                    handleFilterChange('status', option.value);
                    setShowStatusDropdown(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Country Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <button
            className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {countryOptions.find(opt => opt.value === filters.country)?.label}
              </span>
              <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
            </div>
          </button>
          
          {showCountryDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {countryOptions.map((option) => (
                <button
                  key={option.value}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={() => {
                    handleFilterChange('country', option.value);
                    setShowCountryDropdown(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <button
            className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
              </span>
              <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
            </div>
          </button>
          
          {showDateDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={() => {
                    handleFilterChange('dateRange', option.value);
                    setShowDateDropdown(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Buyer name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
