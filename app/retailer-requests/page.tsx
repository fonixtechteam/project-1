
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import BuyerRequestsHeader from './RetailerRequestsHeader';
import FiltersBar from './FiltersBar';
import RequestsTable from './RequestsTable';
import BuyerPreviewDrawer from './RetailerPreviewDrawer';

export default function BuyerRequestsPage() {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    country: 'all',
    dateRange: 'all',
    search: ''
  });

  const mockRequests = [
    {
      id: 1,
      buyerName: "Bella Beauty Boutique",
      businessType: "Beauty Retail Chain",
      market: "United States",
      requestDate: "2024-01-15",
      status: "pending",
      details: {
        companyName: "Bella Beauty Boutique Inc.",
        yearsInBusiness: "8 years",
        outlets: "24 locations",
        certifications: ["FDA Registered", "Organic Certified", "Cruelty-Free"]
      }
    },
    {
      id: 2,
      buyerName: "Luxe Cosmetics Co.",
      businessType: "Premium Beauty Store",
      market: "Canada",
      requestDate: "2024-01-14",
      status: "approved",
      details: {
        companyName: "Luxe Cosmetics Co. Ltd.",
        yearsInBusiness: "12 years",
        outlets: "6 flagship stores",
        certifications: ["Health Canada Approved", "Premium Beauty Alliance"]
      }
    },
    {
      id: 3,
      buyerName: "Natural Glow Market",
      businessType: "Organic Beauty Shop",
      market: "United Kingdom",
      requestDate: "2024-01-13",
      status: "rejected",
      details: {
        companyName: "Natural Glow Market Ltd.",
        yearsInBusiness: "5 years",
        outlets: "3 stores",
        certifications: ["Organic Standards UK"]
      }
    },
    {
      id: 4,
      buyerName: "Beauty Empire Network",
      businessType: "Multi-Brand Retailer",
      market: "Australia",
      requestDate: "2024-01-12",
      status: "pending",
      details: {
        companyName: "Beauty Empire Network Pty Ltd.",
        yearsInBusiness: "15 years",
        outlets: "42 locations",
        certifications: ["TGA Compliant", "Australian Made Certified"]
      }
    },
    {
      id: 5,
      buyerName: "Glamour Corner",
      businessType: "Beauty Specialty Store",
      market: "Germany",
      requestDate: "2024-01-11",
      status: "approved",
      details: {
        companyName: "Glamour Corner GmbH",
        yearsInBusiness: "9 years",
        outlets: "12 locations",
        certifications: ["EU Cosmetics Regulation", "German Beauty Standards"]
      }
    }
  ];

  const handleViewDetails = (buyer) => {
    setSelectedBuyer(buyer);
  };

  const handleCloseDrawer = () => {
    setSelectedBuyer(null);
  };

  const filteredRequests = mockRequests.filter(request => {
    if (filters.status !== 'all' && request.status !== filters.status) return false;
    if (filters.country !== 'all' && request.market !== filters.country) return false;
    if (filters.search && !request.buyerName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <BuyerRequestsHeader />
        
        <div className="p-8">
          <FiltersBar filters={filters} onFiltersChange={setFilters} />
          
          {filteredRequests.length > 0 ? (
            <RequestsTable 
              requests={filteredRequests} 
              onViewDetails={handleViewDetails}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 py-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-store-line w-8 h-8 flex items-center justify-center text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No buyer requests yet</h3>
                <p className="text-gray-500">You'll see them here once approved by Synergy.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {selectedBuyer && (
        <BuyerPreviewDrawer 
          retailer={selectedBuyer} 
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
}
