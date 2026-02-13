'use client';

import { useState } from 'react';
import BasicProductInfo from './BasicProductInfo';
import VariantPackagingDetails from './VariantPackagingDetails';
import IngredientsProductClaims from './IngredientsProductClaims';
import ComplianceCertification from './ComplianceCertification';
import AssetsVisuals from './AssetsVisuals';
import DistributionSupply from './DistributionSupply';
import ReviewSubmission from './ReviewSubmission';

interface SKUFormProps {
  mode: string;
  skuId: string | null;
}

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
}

export default function SKUForm({ mode, skuId }: SKUFormProps) {
  const [activeCard, setActiveCard] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    skuCode: '',
    ean: '',
    upc: '',
    brandName: 'Your Brand Name',
    productName: '',
    category: '',
    subCategory: '',
    description: '',
    packSize: '',
    unitOfMeasure: '',
    moq: '',
    msrp: '',
    wholesalePrice: '',
    shelfLife: '',
    storageConditions: '',
    isPartOfMasterSKU: false,
    masterSKU: '',
    activeIngredients: [],
    keyClaims: [],
    usageInstructions: '',
    availableMarkets: [],
    languagesAvailable: [],
    certifications: [],
    regulatoryNotes: '',
    uploadedFiles: [],
    primaryImage: null,
    additionalImages: [],
    productPDFs: [],
    productVideos: [],
    countryOfOrigin: '',
    warehouseLocation: '',
    leadTime: '',
    shippingWidth: '',
    shippingHeight: '',
    shippingDepth: '',
    shippingWeight: ''
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const cards = [
    { id: 1, title: 'Basic Product Info', icon: 'ri-information-line' },
    { id: 2, title: 'Variant & Packaging', icon: 'ri-package-line' },
    { id: 3, title: 'Ingredients & Claims', icon: 'ri-flask-line' },
    { id: 4, title: 'Compliance & Certification', icon: 'ri-shield-check-line' },
    { id: 5, title: 'Assets & Visuals', icon: 'ri-image-line' },
    { id: 6, title: 'Distribution & Supply', icon: 'ri-truck-line' },
    { id: 7, title: 'Review & Submission', icon: 'ri-check-double-line' }
  ];

  const renderCardContent = () => {
    switch (activeCard) {
      case 1:
        return <BasicProductInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <VariantPackagingDetails formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <IngredientsProductClaims formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <ComplianceCertification formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <AssetsVisuals formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <DistributionSupply formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <ReviewSubmission 
          formData={formData} 
          updateFormData={updateFormData}
          onSubmit={() => console.log('Submitting for approval...', formData)}
          onSaveDraft={() => console.log('Saving draft...', formData)}
        />;
      default:
        return <BasicProductInfo formData={formData} updateFormData={updateFormData} />;
    }
  };

  const isCardCompleted = (cardId: number) => {
    switch (cardId) {
      case 1:
        return formData.skuCode && formData.productName && formData.category;
      case 2:
        return formData.packSize && formData.unitOfMeasure && formData.msrp;
      case 3:
        return formData.activeIngredients.length > 0 || formData.keyClaims.length > 0;
      case 4:
        return formData.certifications.length > 0 || formData.regulatoryNotes || formData.uploadedFiles.length > 0;
      case 5:
        return formData.primaryImage !== null;
      case 6:
        return formData.countryOfOrigin && formData.shippingWidth && formData.shippingHeight && formData.shippingDepth && formData.shippingWeight;
      case 7:
        return true; // Review section is always accessible
      default:
        return false;
    }
  };

  return (
    <div className="flex">
      {/* Progress Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Product Setup</h3>
        <div className="space-y-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className={`w-full flex items-center p-4 rounded-lg text-left transition-colors cursor-pointer ${
                activeCard === card.id
                  ? 'bg-red-50 border border-red-200 text-red-700'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                isCardCompleted(card.id)
                  ? 'bg-green-100 text-green-600'
                  : activeCard === card.id
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {isCardCompleted(card.id) ? (
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
                ) : (
                  <i className={`${card.icon} w-4 h-4 flex items-center justify-center`}></i>
                )}
              </div>
              <div>
                <div className="font-medium">{card.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {isCardCompleted(card.id) ? 'Completed' : card.id <= 6 ? 'Required' : 'Review'}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-2">
            <i className="ri-lightbulb-line w-5 h-5 flex items-center justify-center text-blue-600 mr-2"></i>
            <span className="text-sm font-medium text-blue-900">Pro Tip</span>
          </div>
          <p className="text-sm text-blue-800">
            Complete all required fields for faster approval. Upload high-quality product images and detailed compliance documents.
          </p>
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Progress Summary</h4>
          <div className="space-y-2">
            {(() => {
              const completedCards = cards.filter(card => isCardCompleted(card.id) && card.id <= 6).length;
              const totalCards = 6; // Excluding review section
              const percentage = (completedCards / totalCards) * 100;
              
              return (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-gray-900">{completedCards}/{totalCards}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderCardContent()}

        {/* Navigation Buttons */}
        {activeCard < 7 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setActiveCard(Math.max(1, activeCard - 1))}
              disabled={activeCard === 1}
              className={`flex items-center px-6 py-3 rounded-lg whitespace-nowrap cursor-pointer ${
                activeCard === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Previous
            </button>

            <div className="flex space-x-3">
              <button 
                onClick={() => console.log('Saving draft...', formData)}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg whitespace-nowrap cursor-pointer"
              >
                Save Draft
              </button>
              
              {activeCard < 6 ? (
                <button
                  onClick={() => setActiveCard(Math.min(7, activeCard + 1))}
                  className="flex items-center px-6 py-3 bg-red-600 text-white hover:bg-red-700 rounded-lg whitespace-nowrap cursor-pointer"
                >
                  Next
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center ml-2"></i>
                </button>
              ) : (
                <button 
                  onClick={() => setActiveCard(7)}
                  className="flex items-center px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Review & Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}