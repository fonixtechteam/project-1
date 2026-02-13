
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MasterSKU {
  id: string;
  name: string;
  category: string;
  complianceStatus: 'approved' | 'missing' | 'rejected';
  skuCount: number;
  docsCount: number;
  status: 'draft' | 'submitted' | 'live';
  lastModified: string;
}

const mockMasterSKUs: MasterSKU[] = [
  {
    id: '1',
    name: 'Vitamin C Serum',
    category: 'Skincare',
    complianceStatus: 'approved',
    skuCount: 3,
    docsCount: 8,
    status: 'live',
    lastModified: '2024-01-15'
  },
  {
    id: '2',
    name: 'Omega-3 Fish Oil',
    category: 'Supplements',
    complianceStatus: 'missing',
    skuCount: 2,
    docsCount: 5,
    status: 'draft',
    lastModified: '2024-01-12'
  },
  {
    id: '3',
    name: 'Collagen Powder',
    category: 'Wellness',
    complianceStatus: 'rejected',
    skuCount: 4,
    docsCount: 3,
    status: 'submitted',
    lastModified: '2024-01-10'
  },
  {
    id: '4',
    name: 'Probiotic Capsules',
    category: 'Supplements',
    complianceStatus: 'approved',
    skuCount: 1,
    docsCount: 6,
    status: 'live',
    lastModified: '2024-01-08'
  }
];

export default function MasterSKUsTab() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'bg-gray-100 text-gray-700',
      submitted: 'bg-blue-100 text-blue-700',
      live: 'bg-green-100 text-green-700'
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  const getComplianceBadge = (status: string) => {
    const variants = {
      approved: 'bg-green-100 text-green-700',
      missing: 'bg-amber-100 text-amber-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return variants[status as keyof typeof variants] || variants.missing;
  };

  const getComplianceIcon = (status: string) => {
    const icons = {
      approved: 'ri-check-line',
      missing: 'ri-alert-line',
      rejected: 'ri-close-line'
    };
    return icons[status as keyof typeof icons] || icons.missing;
  };

  return (
    <div className="px-8 py-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Master SKUs</h3>
            <div className="flex items-center space-x-3">
              <Link href="/inventory/add-sku">
                <button className="flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Add New SKU
                </button>
              </Link>
              <div className="flex items-center space-x-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-8 cursor-pointer">
                  <option>All Categories</option>
                  <option>Skincare</option>
                  <option>Supplements</option>
                  <option>Wellness</option>
                </select>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-8 cursor-pointer">
                  <option>All Status</option>
                  <option>Draft</option>
                  <option>Submitted</option>
                  <option>Live</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <input type="checkbox" className="rounded cursor-pointer" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Master SKU Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Compliance Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  SKU Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Docs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockMasterSKUs.map((sku) => (
                <tr key={sku.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded cursor-pointer" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sku.name}</div>
                    <div className="text-sm text-gray-500">Modified {sku.lastModified}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {sku.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceBadge(sku.complianceStatus)}`}>
                      <i className={`${getComplianceIcon(sku.complianceStatus)} w-3 h-3 flex items-center justify-center mr-1`}></i>
                      {sku.complianceStatus === 'approved' ? 'Approved' : 
                       sku.complianceStatus === 'missing' ? 'Missing Docs' : 'Rejected'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sku.skuCount} variants
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <i className="ri-file-text-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      {sku.docsCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(sku.status)}`}>
                      {sku.status.charAt(0).toUpperCase() + sku.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                        <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                        <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                        <i className="ri-upload-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                        <i className="ri-message-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
