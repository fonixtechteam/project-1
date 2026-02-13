'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import SKUForm from './SKUForm';

function AddSKUContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'create';
  const skuId = searchParams.get('id');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {mode === 'edit' ? 'Edit SKU' : 'Add New SKU'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {mode === 'edit' 
                    ? 'Update product information and submit for review' 
                    : 'Create a new product and submit for admin approval'
                  }
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-save-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Save Draft
                </button>
                
                <button className="flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Submit for Approval
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <SKUForm mode={mode} skuId={skuId} />
        </div>
      </div>
    </div>
  );
}

export default function AddSKUPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <AddSKUContent />
    </Suspense>
  );
}