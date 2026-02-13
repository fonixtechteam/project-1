
'use client';

import Link from 'next/link';

interface InventoryHeaderProps {
  onBulkUpload: () => void;
  onSubmitForApproval: () => void;
  hasDrafts: boolean;
}

export default function InventoryHeader({ 
  onBulkUpload, 
  onSubmitForApproval, 
  hasDrafts 
}: InventoryHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog, status, and compliance</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onBulkUpload}
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-upload-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Bulk Upload CSV
            </button>
            
            {hasDrafts && (
              <button
                onClick={onSubmitForApproval}
                className="flex items-center px-4 py-2 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Submit for Approval
              </button>
            )}
            
            <Link href="/inventory/add-sku">
              <button className="flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Add SKU
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
