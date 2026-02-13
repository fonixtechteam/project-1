'use client';

import { useState } from 'react';

interface FormData {
  // Basic Product Info
  skuCode: string;
  ean: string;
  upc: string;
  brandName: string;
  productName: string;
  category: string;
  subCategory: string;
  description: string;
  
  // Variant & Packaging
  packSize: string;
  unitOfMeasure: string;
  moq: string;
  msrp: string;
  wholesalePrice: string;
  shelfLife: string;
  storageConditions: string;
  isPartOfMasterSKU: boolean;
  masterSKU: string;
  
  // Ingredients & Claims
  activeIngredients: string[];
  keyClaims: string[];
  usageInstructions: string;
  availableMarkets: string[];
  languagesAvailable: string[];
  
  // Compliance
  certifications: string[];
  regulatoryNotes: string;
  uploadedFiles: File[];
  
  // Assets & Visuals
  primaryImage: File | null;
  additionalImages: File[];
  productPDFs: { file: File; description: string }[];
  productVideos: { url: string; description: string }[];
  
  // Distribution & Supply
  countryOfOrigin: string;
  warehouseLocation: string;
  leadTime: string;
  shippingWidth: string;
  shippingHeight: string;
  shippingDepth: string;
  shippingWeight: string;
  
  [key: string]: any;
}

interface ReviewSubmissionProps {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
  onSubmit: () => void;
  onSaveDraft: () => void;
}

export default function ReviewSubmission({ formData, updateFormData, onSubmit, onSaveDraft }: ReviewSubmissionProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const completionStatus = {
    basicInfo: !!(formData.skuCode && formData.productName && formData.category),
    variantPackaging: !!(formData.packSize && formData.unitOfMeasure && formData.msrp),
    ingredients: !!(formData.activeIngredients.length > 0 || formData.keyClaims.length > 0),
    compliance: !!(formData.certifications.length > 0 || formData.regulatoryNotes || formData.uploadedFiles.length > 0),
    assets: !!(formData.primaryImage),
    distribution: !!(formData.countryOfOrigin && formData.shippingWidth && formData.shippingHeight && formData.shippingDepth && formData.shippingWeight)
  };

  const overallCompletion = Object.values(completionStatus).filter(Boolean).length;
  const totalSections = Object.keys(completionStatus).length;
  const completionPercentage = (overallCompletion / totalSections) * 100;

  const isReadyForSubmission = overallCompletion >= 4; // At least 4 out of 6 sections completed

  const sendChatMessage = () => {
    // In a real app, this would send the message to admin
    console.log('Chat message sent:', chatMessage);
    setChatMessage('');
    setShowChatModal(false);
    // Show success feedback
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full mr-4">
          <i className="ri-check-double-line w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Review & Submission</h2>
          <p className="text-gray-600 mt-1">Final review before submitting for admin approval</p>
        </div>
      </div>

      {/* Completion Overview */}
      <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Product Information Completeness</h3>
          <span className={`text-2xl font-bold ${completionPercentage >= 80 ? 'text-green-600' : completionPercentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {Math.round(completionPercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              completionPercentage >= 80 ? 'bg-green-500' : completionPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { key: 'basicInfo', label: 'Basic Info', icon: 'ri-information-line' },
            { key: 'variantPackaging', label: 'Packaging', icon: 'ri-package-line' },
            { key: 'ingredients', label: 'Ingredients', icon: 'ri-flask-line' },
            { key: 'compliance', label: 'Compliance', icon: 'ri-shield-check-line' },
            { key: 'assets', label: 'Assets', icon: 'ri-image-line' },
            { key: 'distribution', label: 'Distribution', icon: 'ri-truck-line' }
          ].map((section) => (
            <div key={section.key} className={`flex items-center p-3 rounded-lg ${
              completionStatus[section.key as keyof typeof completionStatus] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              <i className={`${section.icon} w-5 h-5 flex items-center justify-center mr-2`}></i>
              <span className="text-sm font-medium">{section.label}</span>
              {completionStatus[section.key as keyof typeof completionStatus] && (
                <i className="ri-check-line w-4 h-4 flex items-center justify-center ml-auto"></i>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Summary */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Product Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">SKU Code:</span>
              <span className="font-medium text-gray-900">{formData.skuCode || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Product:</span>
              <span className="font-medium text-gray-900">{formData.productName || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium text-gray-900">{formData.category || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">MSRP:</span>
              <span className="font-medium text-gray-900">{formData.msrp ? `$${formData.msrp}` : 'Not set'}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Assets & Documentation</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Images:</span>
              <span className="font-medium text-gray-900">
                {(formData.primaryImage ? 1 : 0) + formData.additionalImages.length} files
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Documents:</span>
              <span className="font-medium text-gray-900">
                {formData.uploadedFiles.length + formData.productPDFs.length} files
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Certifications:</span>
              <span className="font-medium text-gray-900">{formData.certifications.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Markets:</span>
              <span className="font-medium text-gray-900">{formData.availableMarkets.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="w-full flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <i className={`${showPreview ? 'ri-eye-off-line' : 'ri-eye-line'} w-5 h-5 flex items-center justify-center mr-2`}></i>
          {showPreview ? 'Hide Preview' : 'Show Full Preview'}
        </button>

        {showPreview && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Product Preview</h4>
            
            <div className="space-y-4">
              {formData.primaryImage && (
                <div className="flex items-center space-x-4">
                  <img
                    src={URL.createObjectURL(formData.primaryImage)}
                    alt="Product preview"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <div>
                    <h5 className="font-medium text-gray-900">{formData.productName}</h5>
                    <p className="text-sm text-gray-600">{formData.category} • {formData.packSize} {formData.unitOfMeasure}</p>
                    <p className="text-sm font-medium text-green-600">${formData.msrp}</p>
                  </div>
                </div>
              )}
              
              {formData.description && (
                <div>
                  <h6 className="text-sm font-medium text-gray-900 mb-1">Description</h6>
                  <p className="text-sm text-gray-600">{formData.description}</p>
                </div>
              )}
              
              {formData.keyClaims.length > 0 && (
                <div>
                  <h6 className="text-sm font-medium text-gray-900 mb-2">Claims</h6>
                  <div className="flex flex-wrap gap-2">
                    {formData.keyClaims.slice(0, 6).map((claim, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {claim}
                      </span>
                    ))}
                    {formData.keyClaims.length > 6 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{formData.keyClaims.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onSaveDraft}
          className="flex items-center justify-center px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-save-line w-5 h-5 flex items-center justify-center mr-2"></i>
          Save Draft
        </button>

        <button
          onClick={() => setShowChatModal(true)}
          className="flex items-center justify-center px-6 py-3 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-chat-3-line w-5 h-5 flex items-center justify-center mr-2"></i>
          Chat with Admin
        </button>

        <button
          onClick={onSubmit}
          disabled={!isReadyForSubmission}
          className={`flex items-center justify-center px-8 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex-1 ${
            isReadyForSubmission
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <i className="ri-send-plane-line w-5 h-5 flex items-center justify-center mr-2"></i>
          Submit for Approval
        </button>
      </div>

      {!isReadyForSubmission && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <i className="ri-alert-line w-5 h-5 flex items-center justify-center text-yellow-600 mr-2"></i>
            <p className="text-sm text-yellow-800">
              Complete at least 4 sections to submit for approval. Focus on Basic Info, Packaging, Assets, and Distribution.
            </p>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Chat with Admin</h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">
                  Need clarification or have questions about your product submission? Send a message to the admin team.
                </p>
                
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{chatMessage.length}/500 characters</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowChatModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={sendChatMessage}
                  disabled={!chatMessage.trim()}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg cursor-pointer whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}