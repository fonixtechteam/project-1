
'use client';

import { useState } from 'react';

interface Retailer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  type: string;
  status: string;
}

interface RetailerSelectionProps {
  selectedRetailer: Retailer | null;
  onRetailerSelect: (retailer: Retailer) => void;
  onNext: () => void;
}

const mockRetailers: Retailer[] = [
  {
    id: 'R001',
    name: 'Beauty Boutique Store',
    email: 'orders@beautyboutique.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    address: '123 Fashion Ave, New York, NY 10001',
    type: 'Premium Retailer',
    status: 'accepted'
  },
  {
    id: 'R002',
    name: 'Wellness Corner',
    email: 'purchasing@wellnesscorner.com',
    phone: '+1 (555) 987-6543',
    location: 'Los Angeles, CA',
    address: '456 Health St, Los Angeles, CA 90210',
    type: 'Health & Wellness',
    status: 'accepted'
  },
  {
    id: 'R003',
    name: 'Premium Skincare Hub',
    email: 'orders@premiumskincarehub.com',
    phone: '+1 (555) 456-7890',
    location: 'Miami, FL',
    address: '789 Beauty Blvd, Miami, FL 33101',
    type: 'Luxury Retailer',
    status: 'accepted'
  },
  {
    id: 'R004',
    name: 'Natural Beauty Co.',
    email: 'orders@naturalbeautyco.com',
    phone: '+1 (555) 234-5678',
    location: 'Portland, OR',
    address: '321 Organic Way, Portland, OR 97201',
    type: 'Organic Specialist',
    status: 'accepted'
  },
  {
    id: 'R005',
    name: 'Urban Glow Retail',
    email: 'info@urbanglow.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    address: '567 Beauty Lane, Chicago, IL 60601',
    type: 'Urban Retailer',
    status: 'accepted'
  }
];

export default function RetailerSelection({ selectedRetailer, onRetailerSelect, onNext }: RetailerSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNewRetailerForm, setShowNewRetailerForm] = useState(false);

  const filteredRetailers = mockRetailers.filter(retailer =>
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    retailer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    retailer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRetailerSelect = (retailer: Retailer) => {
    onRetailerSelect(retailer);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Step 1: Retailer (Buyer) Selection</h2>
            <p className="text-gray-600 mt-1">Select an approved retailer to create an order</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700 font-medium">Approved Retailers Only</span>
          </div>
        </div>

        {/* Retailer Dropdown Selection */}
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Retailer *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  {selectedRetailer ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <i className="ri-store-line text-red-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{selectedRetailer.name}</p>
                        <p className="text-sm text-gray-600">{selectedRetailer.location} • {selectedRetailer.type}</p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Choose a retailer...</span>
                  )}
                  <i className={`ri-arrow-${isDropdownOpen ? 'up' : 'down'}-s-line text-gray-400 transition-transform`}></i>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-80 overflow-auto">
                {/* Search Bar */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-search-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Search by name, location, or ID..."
                    />
                  </div>
                </div>

                {/* Retailer Options */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredRetailers.map((retailer) => (
                    <button
                      key={retailer.id}
                      type="button"
                      onClick={() => handleRetailerSelect(retailer)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <i className="ri-store-line text-green-600"></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-800">{retailer.name}</h3>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              {retailer.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{retailer.type} • {retailer.location}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {retailer.id} • {retailer.email}</p>
                        </div>
                      </div>
                    </button>
                  ))}

                  {filteredRetailers.length === 0 && (
                    <div className="px-4 py-6 text-center">
                      <i className="ri-search-line w-12 h-12 flex items-center justify-center text-gray-300 mx-auto mb-3"></i>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No retailers found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your search terms</p>
                    </div>
                  )}
                </div>

                {/* Add New Retailer Option */}
                <div className="p-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewRetailerForm(true);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm font-medium">Add New Retailer</span>
                  </button>
                </div>
              </div>
              )}
            </div>
          </div>

          {/* Selected Retailer Details */}
          {selectedRetailer && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800 mb-2">Selected Retailer</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-green-700 font-medium">Name:</span>
                      <span className="text-green-800 ml-2">{selectedRetailer.name}</span>
                    </div>
                    <div>
                      <span className="text-green-700 font-medium">Type:</span>
                      <span className="text-green-800 ml-2">{selectedRetailer.type}</span>
                    </div>
                    <div>
                      <span className="text-green-700 font-medium">Location:</span>
                      <span className="text-green-800 ml-2">{selectedRetailer.location}</span>
                    </div>
                    <div>
                      <span className="text-green-700 font-medium">Contact:</span>
                      <span className="text-green-800 ml-2">{selectedRetailer.phone}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-green-700 font-medium">Address:</span>
                      <span className="text-green-800 ml-2">{selectedRetailer.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="ri-information-line text-white"></i>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Approved Retailers Only</h4>
                <p className="text-blue-700 text-sm">
                  Only retailers whose requests have been reviewed and accepted by Synergy Admin are available for order creation. 
                  This ensures all orders are placed with verified and approved business partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedRetailer}
          className={`flex items-center px-8 py-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap font-semibold text-lg ${
            selectedRetailer
              ? 'bg-lime-600 text-white hover:bg-lime-700 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Products
          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-3"></i>
        </button>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
}
