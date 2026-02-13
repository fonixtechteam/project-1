'use client';

import { useState } from 'react';

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export default function FiltersSidebar({ isOpen, onClose, onApplyFilters }: FiltersSidebarProps) {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    subCategory: '',
    moqRange: { min: '', max: '' },
    priceRange: { min: '', max: '' },
    countries: [],
    complianceStatus: ''
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: '',
      category: '',
      subCategory: '',
      moqRange: { min: '', max: '' },
      priceRange: { min: '', max: '' },
      countries: [],
      complianceStatus: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="bg-white w-80 h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
            </button>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Product name, SKU code..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="skincare">Skincare</option>
                <option value="supplements">Supplements</option>
                <option value="wellness">Wellness</option>
                <option value="beauty">Beauty</option>
              </select>
            </div>

            {/* Sub-Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub-Category
              </label>
              <select
                value={filters.subCategory}
                onChange={(e) => handleFilterChange('subCategory', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
              >
                <option value="">All Sub-Categories</option>
                <option value="serums">Serums</option>
                <option value="creams">Creams</option>
                <option value="vitamins">Vitamins</option>
                <option value="minerals">Minerals</option>
              </select>
            </div>

            {/* MOQ Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MOQ Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.moqRange.min}
                  onChange={(e) => handleFilterChange('moqRange', { ...filters.moqRange, min: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.moqRange.max}
                  onChange={(e) => handleFilterChange('moqRange', { ...filters.moqRange, max: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range ($)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Compliance Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compliance Status
              </label>
              <select
                value={filters.complianceStatus}
                onChange={(e) => handleFilterChange('complianceStatus', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
              >
                <option value="">All Compliance</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="missing">Missing Docs</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Country Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Availability
              </label>
              <div className="space-y-2">
                {['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia'].map((country) => (
                  <label key={country} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded cursor-pointer"
                      onChange={(e) => {
                        const newCountries = e.target.checked
                          ? [...filters.countries, country]
                          : filters.countries.filter(c => c !== country);
                        handleFilterChange('countries', newCountries);
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-700">{country}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <button
              onClick={resetFilters}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
            >
              Reset
            </button>
            <button
              onClick={() => {
                onApplyFilters(filters);
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}