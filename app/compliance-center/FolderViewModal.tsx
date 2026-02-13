
'use client';

import { useState } from 'react';

interface Document {
  id: string;
  name: string;
  fileType: string;
  fileSize: string;
  lastUpdate: string;
  importantDate: string;
  associatedProduct: string;
  description: string;
  issuingAuthority: string;
  status: 'valid' | 'expiring-soon' | 'expired' | 'pending';
  downloadHistory: Array<{
    buyerId: string;
    buyerName: string;
    buyerCompany: string;
    downloadDate: string;
    purpose: string;
  }>;
}

interface ProductFolder {
  id: string;
  name: string;
  image: string;
  totalDocuments: number;
  complianceScore: number;
  status: 'compliant' | 'expiring-soon' | 'action-required';
  lastUpdated: string;
  documents: Document[];
}

interface FolderViewModalProps {
  folder: ProductFolder;
  onClose: () => void;
  onDocumentClick: (document: Document) => void;
  onUploadDocument: () => void;
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'FDA Certificate - Vitamin C Serum',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    lastUpdate: '2024-01-15',
    importantDate: '2024-06-15',
    associatedProduct: 'Vitamin C Brightening Serum',
    description: 'FDA approval certificate for vitamin C serum formulation and manufacturing process',
    issuingAuthority: 'Food and Drug Administration',
    status: 'valid',
    downloadHistory: [
      {
        buyerId: 'buyer-001',
        buyerName: 'Sarah Johnson',
        buyerCompany: 'Beauty Plus Retail',
        downloadDate: '2024-01-20',
        purpose: 'Product verification for retail listing'
      },
      {
        buyerId: 'buyer-002',
        buyerName: 'Michael Chen',
        buyerCompany: 'Wellness Distribution Co.',
        downloadDate: '2024-01-18',
        purpose: 'Compliance review for wholesale agreement'
      },
      {
        buyerId: 'buyer-003',
        buyerName: 'Emma Davis',
        buyerCompany: 'Natural Health Store',
        downloadDate: '2024-01-16',
        purpose: 'Due diligence for new product category'
      }
    ]
  },
  {
    id: '2',
    name: 'COA - Batch #VS2024-001',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    lastUpdate: '2024-01-10',
    importantDate: '2024-03-10',
    associatedProduct: 'Vitamin C Brightening Serum',
    description: 'Certificate of Analysis for batch VS2024-001 including purity and potency testing results',
    issuingAuthority: 'Independent Testing Lab Inc.',
    status: 'expiring-soon',
    downloadHistory: [
      {
        buyerId: 'buyer-004',
        buyerName: 'Robert Wilson',
        buyerCompany: 'Premium Skincare Ltd.',
        downloadDate: '2024-01-12',
        purpose: 'Quality assurance verification'
      },
      {
        buyerId: 'buyer-001',
        buyerName: 'Sarah Johnson',
        buyerCompany: 'Beauty Plus Retail',
        downloadDate: '2024-01-11',
        purpose: 'Batch quality review'
      }
    ]
  },
  {
    id: '3',
    name: 'Safety Data Sheet',
    fileType: 'PDF',
    fileSize: '945 KB',
    lastUpdate: '2024-01-05',
    importantDate: '2025-01-05',
    associatedProduct: 'Vitamin C Brightening Serum',
    description: 'Comprehensive safety data sheet including handling, storage, and emergency procedures',
    issuingAuthority: 'Chemical Safety Institute',
    status: 'valid',
    downloadHistory: [
      {
        buyerId: 'buyer-005',
        buyerName: 'Lisa Anderson',
        buyerCompany: 'Spa & Wellness Chain',
        downloadDate: '2024-01-08',
        purpose: 'Staff training and safety compliance'
      }
    ]
  },
  {
    id: '4',
    name: 'Organic Certification',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    lastUpdate: '2023-12-20',
    importantDate: '2024-02-20',
    associatedProduct: 'Vitamin C Brightening Serum',
    description: 'USDA Organic certification for natural ingredient sourcing and processing',
    issuingAuthority: 'USDA Organic Program',
    status: 'expired',
    downloadHistory: [
      {
        buyerId: 'buyer-002',
        buyerName: 'Michael Chen',
        buyerCompany: 'Wellness Distribution Co.',
        downloadDate: '2024-01-03',
        purpose: 'Organic product category verification'
      }
    ]
  }
];

export default function FolderViewModal({ folder, onClose, onDocumentClick, onUploadDocument }: FolderViewModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDocuments = sampleDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.fileType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'valid': { color: 'bg-green-100 text-green-800 border-green-200', icon: 'ri-check-line' },
      'expiring-soon': { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: 'ri-time-line' },
      'expired': { color: 'bg-red-100 text-red-800 border-red-200', icon: 'ri-close-line' },
      'pending': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: 'ri-loader-line' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium border rounded-full ${config.color}`}>
        <i className={`${config.icon} w-3 h-3 flex items-center justify-center mr-1`}></i>
        {status === 'expiring-soon' ? 'Expiring Soon' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric', 
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={folder.image}
              alt={folder.name}
              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{folder.name}</h2>
              <p className="text-sm text-gray-600">{folder.totalDocuments} compliance documents</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onUploadDocument}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-upload-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Upload Document
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <i className="ri-search-line w-4 h-4 flex items-center justify-center absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="all">All Documents</option>
              <option value="valid">Valid</option>
              <option value="expiring-soon">Expiring Soon</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredDocuments.length} of {sampleDocuments.length} documents
          </div>
        </div>

        {/* Documents List */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onDocumentClick(document)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                      <i className="ri-file-pdf-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{document.name}</h3>
                      <p className="text-sm text-gray-600">{document.fileType} • {document.fileSize}</p>
                    </div>
                  </div>
                  {getStatusBadge(document.status)}
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Last Update:</span>
                    <p className="font-medium">{formatDate(document.lastUpdate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Important Date:</span>
                    <p className="font-medium">{formatDate(document.importantDate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Authority:</span>
                    <p className="font-medium">{document.issuingAuthority}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-700">{document.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-file-search-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
