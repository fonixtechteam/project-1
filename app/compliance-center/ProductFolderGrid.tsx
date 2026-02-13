
'use client';

import React, { useState } from 'react';

interface ProductFolder {
  id: string;
  name: string;
  image: string;
  totalDocuments: number;
  categories: {
    certificates: number;
    regulatory: number;
    'product-info': number;
  };
  status: 'compliant' | 'expiring' | 'non-compliant';
  complianceScore: number;
  lastUpdated: string;
}

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

interface ProductFolderGridProps {
  products: ProductFolder[];
  onProductClick: (product: ProductFolder) => void;
  viewMode: 'grid' | 'list';
  searchQuery: string;
  statusFilter: string;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: string) => void;
  onFolderClick: (folder: any) => void;
}

export default function ProductFolderGrid({
  products,
  onProductClick,
  viewMode,
  searchQuery,
  statusFilter,
  onViewModeChange,
  onSearchChange,
  onStatusFilterChange,
  onFolderClick,
}: ProductFolderGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expiring':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'non-compliant':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'ri-shield-check-line';
      case 'expiring':
        return 'ri-time-line';
      case 'non-compliant':
        return 'ri-error-warning-line';
      default:
        return 'ri-file-line';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'Compliant';
      case 'expiring':
        return 'Expiring Soon';
      case 'non-compliant':
        return 'Action Required';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const sampleFolders = products;

  return (
    <div className="p-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <i className="ri-search-line w-4 h-4 flex items-center justify-center absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-4 py-2 pr-8 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm text-sm cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="compliant">Compliant</option>
            <option value="expiring-soon">Expiring Soon</option>
            <option value="action-required">Action Required</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <i className="ri-grid-line w-4 h-4 flex items-center justify-center mr-1"></i>
            Grid
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <i className="ri-list-unordered w-4 h-4 flex items-center justify-center mr-1"></i>
            List
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compliant Products</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
              <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-amber-600">3</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-lg">
              <i className="ri-time-line w-5 h-5 flex items-center justify-center text-amber-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Action Required</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg">
              <i className="ri-error-warning-line w-5 h-5 flex items-center justify-center text-red-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-blue-600">17</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
              <i className="ri-folder-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Product Folders */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
          >
            {/* Product Image */}
            <div className="relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover object-top rounded-lg"
              />
              <div className="absolute top-2 right-2">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                  <i className={`${getStatusIcon(product.status)} w-3 h-3 flex items-center justify-center mr-1`}></i>
                  {getStatusText(product.status)}
                </div>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            {/* Compliance Score */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Compliance Score</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className={`h-2 rounded-full ${
                      product.complianceScore >= 90
                        ? 'bg-green-500'
                        : product.complianceScore >= 75
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${product.complianceScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{product.complianceScore}%</span>
              </div>
            </div>

            {/* Document Categories */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="ri-award-line w-4 h-4 flex items-center justify-center text-blue-600 mr-2"></i>
                  <span className="text-sm text-gray-600">Certificates</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{product.categories.certificates} docs</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="ri-file-shield-line w-4 h-4 flex items-center justify-center text-green-600 mr-2"></i>
                  <span className="text-sm text-gray-600">Regulatory</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{product.categories.regulatory} docs</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="ri-file-text-line w-4 h-4 flex items-center justify-center text-purple-600 mr-2"></i>
                  <span className="text-sm text-gray-600">Product Info</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{product.categories['product-info']} docs</span>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Updated {formatDate(product.lastUpdated)}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <i className="ri-folder-line w-3 h-3 flex items-center justify-center mr-1"></i>
                  {product.totalDocuments} total
                </div>
              </div>
            </div>

            {/* Hover Effect Arrow */}
            <div className="flex items-center justify-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center text-blue-600"></i>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-folder-line w-8 h-8 flex items-center justify-center text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find products.</p>
          </div>
        )}
      </div>
    </div>
  );
}
