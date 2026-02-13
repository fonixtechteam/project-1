
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface IndividualSKU {
  id: string;
  name: string;
  masterSKU: string;
  attributes: string[];
  msrp: number;
  wholesale: number;
  complianceStatus: 'approved' | 'missing' | 'rejected';
  isVisible: boolean;
  status: 'draft' | 'submitted' | 'live';
}

const mockIndividualSKUs: IndividualSKU[] = [
  {
    id: '1',
    name: 'Vitamin C Serum - 30ml',
    masterSKU: 'Vitamin C Serum',
    attributes: ['30ml', 'Glass Bottle'],
    msrp: 45.99,
    wholesale: 22.50,
    complianceStatus: 'approved',
    isVisible: true,
    status: 'live'
  },
  {
    id: '2',
    name: 'Vitamin C Serum - 50ml',
    masterSKU: 'Vitamin C Serum',
    attributes: ['50ml', 'Glass Bottle'],
    msrp: 65.99,
    wholesale: 32.50,
    complianceStatus: 'approved',
    isVisible: true,
    status: 'live'
  },
  {
    id: '3',
    name: 'Omega-3 Fish Oil - 60 caps',
    masterSKU: 'Omega-3 Fish Oil',
    attributes: ['60 capsules', 'Softgel'],
    msrp: 29.99,
    wholesale: 15.00,
    complianceStatus: 'missing',
    isVisible: false,
    status: 'draft'
  },
  {
    id: '4',
    name: 'Collagen Powder - Vanilla 300g',
    masterSKU: 'Collagen Powder',
    attributes: ['300g', 'Vanilla', 'Powder'],
    msrp: 55.99,
    wholesale: 28.00,
    complianceStatus: 'rejected',
    isVisible: false,
    status: 'submitted'
  }
];

export default function IndividualSKUsTab() {
  const [skus, setSKUs] = useState(mockIndividualSKUs);

  const toggleVisibility = (id: string) => {
    setSKUs(prevSKUs =>
      prevSKUs.map(sku =>
        sku.id === id ? { ...sku, isVisible: !sku.isVisible } : sku
      )
    );
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

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'bg-gray-100 text-gray-700',
      submitted: 'bg-blue-100 text-blue-700',
      live: 'bg-green-100 text-green-700'
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  return (
    <div className="px-8 py-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Individual SKUs</h3>
            <div className="flex items-center space-x-3">
              <Link href="/inventory/add-sku">
                <button className="flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Add New SKU
                </button>
              </Link>
              <div className="flex items-center space-x-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-8 cursor-pointer">
                  <option>All Status</option>
                  <option>Draft</option>
                  <option>Submitted</option>
                  <option>Live</option>
                </select>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-8 cursor-pointer">
                  <option>All Compliance</option>
                  <option>Approved</option>
                  <option>Missing Docs</option>
                  <option>Rejected</option>
                </select>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-8 cursor-pointer">
                  <option>All Visibility</option>
                  <option>Visible</option>
                  <option>Hidden</option>
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
                  SKU Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Master SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Attributes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Compliance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Visibility
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {skus.map((sku) => (
                <tr key={sku.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded cursor-pointer" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sku.name}</div>
                    <div className={`text-xs font-medium ${getStatusBadge(sku.status)} inline-flex items-center px-2 py-0.5 rounded-full mt-1`}>
                      {sku.status.charAt(0).toUpperCase() + sku.status.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {sku.masterSKU}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {sku.attributes.map((attr, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {attr}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>MSRP: ${sku.msrp}</div>
                      <div className="text-gray-500">Wholesale: ${sku.wholesale}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceBadge(sku.complianceStatus)}`}>
                      <i className={`${getComplianceIcon(sku.complianceStatus)} w-3 h-3 flex items-center justify-center mr-1`}></i>
                      {sku.complianceStatus === 'approved' ? 'Approved' : 
                       sku.complianceStatus === 'missing' ? 'Missing Docs' : 'Rejected'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleVisibility(sku.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        sku.isVisible ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          sku.isVisible ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link href={`/inventory/add-sku?mode=edit&id=${sku.id}`}>
                        <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                          <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      </Link>
                      <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                        <i className="ri-upload-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                        <i className="ri-eye-off-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-900 cursor-pointer">
                        <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
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
