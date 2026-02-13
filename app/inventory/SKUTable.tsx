
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SKU {
  id: string;
  skuCode: string;
  ean: string;
  upc: string;
  brandName: string;
  productName: string;
  category: string;
  subCategory: string;
  packSize: string;
  uom: string;
  moq: number;
  msrp: number;
  wholesalePrice?: number;
  shelfLife: number;
  storageConditions: string;
  complianceStatus: 'approved' | 'pending' | 'missing' | 'rejected';
  assetsCount: number;
  docsCount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'hidden';
  lastModified: string;
  activeIngredients: string[];
  complianceDocs: { name: string; status: 'approved' | 'pending' | 'missing' | 'rejected'; uploadDate: string }[];
  productImages: string[];
  primaryImageIndex: number;
}

interface SKUTableProps {
  skus: SKU[];
  selectedSKUs: string[];
  onSelectSKU: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onBulkAction: (action: string) => void;
  activeTab: string;
}

export default function SKUTable({
  skus,
  selectedSKUs,
  onSelectSKU,
  onSelectAll,
  onBulkAction,
  activeTab
}: SKUTableProps) {
  const [editingSKU, setEditingSKU] = useState<SKU | null>(null);
  const [showChatModal, setShowChatModal] = useState<SKU | null>(null);
  const [showComplianceModal, setShowComplianceModal] = useState<SKU | null>(null);
  const [showImageModal, setShowImageModal] = useState<SKU | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [newIngredient, setNewIngredient] = useState('');
  const [draggedFiles, setDraggedFiles] = useState<File[]>([]);

  const validateForm = (data: any) => {
    const errors: {[key: string]: string} = {};

    if (!data.skuCode || data.skuCode.length < 3) {
      errors.skuCode = 'SKU code must be at least 3 characters';
    }
    if (!data.productName || data.productName.length < 2) {
      errors.productName = 'Product name is required';
    }
    if (!data.packSize || isNaN(parseFloat(data.packSize))) {
      errors.packSize = 'Valid pack size is required';
    }
    if (!data.msrp || isNaN(parseFloat(data.msrp)) || parseFloat(data.msrp) <= 0) {
      errors.msrp = 'Valid MSRP is required';
    }
    if (data.wholesalePrice && parseFloat(data.wholesalePrice) >= parseFloat(data.msrp)) {
      errors.wholesalePrice = 'Wholesale price must be less than MSRP';
    }

    return errors;
  };

  const addIngredient = () => {
    if (newIngredient.trim() && editingSKU && !editingSKU.activeIngredients.includes(newIngredient.trim())) {
      setEditingSKU({
        ...editingSKU,
        activeIngredients: [...editingSKU.activeIngredients, newIngredient.trim()]
      });
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    if (editingSKU) {
      setEditingSKU({
        ...editingSKU,
        activeIngredients: editingSKU.activeIngredients.filter(i => i !== ingredient)
      });
    }
  };

  const handleFileUpload = (files: FileList, type: 'compliance' | 'images') => {
    // Handle file upload logic
    console.log(`Uploading ${files.length} ${type} files`);
  };

  const getComplianceIcon = (status: string) => {
    const icons = {
      approved: { icon: 'ri-check-line', color: 'text-green-600', bg: 'bg-green-100' },
      pending: { icon: 'ri-time-line', color: 'text-blue-600', bg: 'bg-blue-100' },
      missing: { icon: 'ri-alert-line', color: 'text-amber-600', bg: 'bg-amber-100' },
      rejected: { icon: 'ri-close-line', color: 'text-red-600', bg: 'bg-red-100' }
    };
    return icons[status as keyof typeof icons] || icons.pending;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'bg-gray-100 text-gray-700',
      submitted: 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      hidden: 'bg-orange-100 text-orange-700'
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Bulk Actions Bar */}
      {selectedSKUs.length > 0 && (
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedSKUs.length} SKUs selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onBulkAction('submit')}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
              >
                Submit Selected
              </button>
              <button
                onClick={() => onBulkAction('hide')}
                className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
              >
                Hide Selected
              </button>
              <button
                onClick={() => onBulkAction('delete')}
                className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedSKUs.length === skus.length && skus.length > 0}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                SKU Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                EAN / UPC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Pack Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                MOQ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                MSRP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Wholesale
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Shelf Life
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Compliance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Assets
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
            {skus.map((sku) => (
              <tr key={sku.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedSKUs.includes(sku.id)}
                    onChange={() => onSelectSKU(sku.id)}
                    className="rounded cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{sku.skuCode}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div>EAN: {sku.ean || 'N/A'}</div>
                    <div className="text-gray-500">UPC: {sku.upc || 'N/A'}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                    {sku.productName}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Modified {sku.lastModified}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sku.category}</div>
                  <div className="text-xs text-gray-500">{sku.subCategory}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sku.packSize} {sku.uom}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sku.moq}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">${sku.msrp}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {sku.wholesalePrice ? `$${sku.wholesalePrice}` : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sku.shelfLife} months</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceBadge(sku.complianceStatus)}`}>
                    <i className={`${getComplianceIcon(sku.complianceStatus).icon} w-3 h-3 flex items-center justify-center mr-1`}></i>
                    {sku.complianceStatus === 'approved' ? 'Approved' :
                     sku.complianceStatus === 'pending' ? 'Pending' :
                     sku.complianceStatus === 'missing' ? 'Missing' : 'Rejected'}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">{sku.docsCount} docs</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <i className="ri-image-line w-4 h-4 flex items-center justify-center mr-1"></i>
                    {sku.assetsCount}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(sku.status)}`}>
                    {sku.status.charAt(0).toUpperCase() + sku.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingSKU(sku)}
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      title="Edit SKU"
                    >
                      <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      title="Upload Documents"
                    >
                      <i className="ri-upload-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      title="Submit for Approval"
                    >
                      <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      title="Hide SKU"
                    >
                      <i className="ri-eye-off-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                    <button
                      onClick={() => setShowChatModal(sku)}
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      title="Chat with Admin"
                    >
                      <i className="ri-message-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inline Edit Modal */}
      {editingSKU && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Edit SKU: {editingSKU.skuCode}</h3>
              <button
                onClick={() => setEditingSKU(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU Code</label>
                  <input
                    type="text"
                    defaultValue={editingSKU.skuCode}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">EAN</label>
                  <input
                    type="text"
                    defaultValue={editingSKU.ean}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">UPC</label>
                  <input
                    type="text"
                    defaultValue={editingSKU.upc}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    defaultValue={editingSKU.productName}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    defaultValue={editingSKU.category}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
                  >
                    <option>Skincare</option>
                    <option>Supplements</option>
                    <option>Wellness</option>
                    <option>Beauty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pack Size</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      defaultValue={editingSKU.packSize}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <select
                      defaultValue={editingSKU.uom}
                      className="border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
                    >
                      <option>ml</option>
                      <option>g</option>
                      <option>units</option>
                      <option>capsules</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MOQ</label>
                  <input
                    type="number"
                    defaultValue={editingSKU.moq}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MSRP</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={editingSKU.msrp}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wholesale Price</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={editingSKU.wholesalePrice || ''}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shelf Life (months)</label>
                  <input
                    type="number"
                    defaultValue={editingSKU.shelfLife}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Conditions</label>
                  <textarea
                    rows={3}
                    defaultValue={editingSKU.storageConditions}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingSKU(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save changes logic here
                  setEditingSKU(null);
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Chat with Admin - {showChatModal.productName}
              </h3>
              <button
                onClick={() => setShowChatModal(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-900 mb-2">Admin (Sarah Chen)</div>
                <div className="text-sm text-blue-800">Please update the compliance documentation for this product. The current COA is expired.</div>
                <div className="text-xs text-blue-600 mt-2">2 hours ago</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg ml-8">
                <div className="text-sm font-medium text-gray-900 mb-2">You</div>
                <div className="text-sm text-gray-800">I'll upload the new COA today. Should be ready for review by tomorrow.</div>
                <div className="text-xs text-gray-600 mt-2">1 hour ago</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getComplianceBadge(status: string) {
  const badges = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-blue-100 text-blue-700',
    missing: 'bg-amber-100 text-amber-700',
    rejected: 'bg-red-100 text-red-700'
  };
  return badges[status as keyof typeof badges] || badges.pending;
}
