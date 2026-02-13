'use client';

import { useState } from 'react';

interface FormData {
  activeIngredients: string[];
  keyClaims: string[];
  usageInstructions: string;
  availableMarkets: string[];
  languagesAvailable: string[];
  [key: string]: any;
}

interface IngredientsProductClaimsProps {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export default function IngredientsProductClaims({ formData, updateFormData }: IngredientsProductClaimsProps) {
  const [newIngredient, setNewIngredient] = useState('');
  const [newClaim, setNewClaim] = useState('');

  const commonClaims = [
    'Cruelty-Free', 'Vegan', 'Organic', 'Natural', 'Non-GMO', 
    'Gluten-Free', 'Paraben-Free', 'Sulfate-Free', 'Hypoallergenic',
    'Dermatologist Tested', 'Clinically Proven', 'FDA Approved'
  ];

  const marketOptions = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'EU', name: 'European Union', flag: '🇪🇺' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' }
  ];

  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Italian', 
    'Portuguese', 'Japanese', 'Korean', 'Mandarin', 'Arabic'
  ];

  const addIngredient = () => {
    if (newIngredient.trim() && !formData.activeIngredients.includes(newIngredient.trim())) {
      updateFormData('activeIngredients', [...formData.activeIngredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    updateFormData('activeIngredients', formData.activeIngredients.filter(i => i !== ingredient));
  };

  const toggleClaim = (claim: string) => {
    if (formData.keyClaims.includes(claim)) {
      updateFormData('keyClaims', formData.keyClaims.filter(c => c !== claim));
    } else {
      updateFormData('keyClaims', [...formData.keyClaims, claim]);
    }
  };

  const addCustomClaim = () => {
    if (newClaim.trim() && !formData.keyClaims.includes(newClaim.trim())) {
      updateFormData('keyClaims', [...formData.keyClaims, newClaim.trim()]);
      setNewClaim('');
    }
  };

  const toggleMarket = (marketCode: string) => {
    if (formData.availableMarkets.includes(marketCode)) {
      updateFormData('availableMarkets', formData.availableMarkets.filter(m => m !== marketCode));
    } else {
      updateFormData('availableMarkets', [...formData.availableMarkets, marketCode]);
    }
  };

  const toggleLanguage = (language: string) => {
    if (formData.languagesAvailable.includes(language)) {
      updateFormData('languagesAvailable', formData.languagesAvailable.filter(l => l !== language));
    } else {
      updateFormData('languagesAvailable', [...formData.languagesAvailable, language]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-4">
          <i className="ri-flask-line w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Ingredients & Product Claims</h2>
          <p className="text-gray-600 mt-1">Product composition, benefits, and market positioning</p>
        </div>
      </div>

      {/* Active Ingredients */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Active Ingredients
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Enter ingredient name"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
          />
          <button
            onClick={addIngredient}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.activeIngredients.map((ingredient, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <i className="ri-close-line w-3 h-3 flex items-center justify-center"></i>
              </button>
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Add key active ingredients that provide product benefits</p>
      </div>

      {/* Key Claims */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Key Product Claims
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
          {commonClaims.map((claim) => (
            <button
              key={claim}
              onClick={() => toggleClaim(claim)}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                formData.keyClaims.includes(claim)
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {claim}
            </button>
          ))}
        </div>
        
        {/* Add Custom Claim */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newClaim}
            onChange={(e) => setNewClaim(e.target.value)}
            placeholder="Add custom claim"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            onKeyPress={(e) => e.key === 'Enter' && addCustomClaim()}
          />
          <button
            onClick={addCustomClaim}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer whitespace-nowrap"
          >
            Add Claim
          </button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Usage Instructions
        </label>
        <textarea
          rows={4}
          value={formData.usageInstructions}
          onChange={(e) => updateFormData('usageInstructions', e.target.value)}
          placeholder="Provide clear instructions on how to use this product. Include frequency, application method, precautions, etc."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">Step-by-step usage guidance</p>
          <span className="text-xs text-gray-400">{formData.usageInstructions.length}/500</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Markets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Available Markets
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {marketOptions.map((market) => (
              <button
                key={market.code}
                onClick={() => toggleMarket(market.code)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-colors cursor-pointer ${
                  formData.availableMarkets.includes(market.code)
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{market.flag}</span>
                  <span>{market.name}</span>
                </div>
                {formData.availableMarkets.includes(market.code) && (
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-600"></i>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Select markets where this product can be sold</p>
        </div>

        {/* Languages Available */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Available Languages
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {languageOptions.map((language) => (
              <button
                key={language}
                onClick={() => toggleLanguage(language)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-colors cursor-pointer ${
                  formData.languagesAvailable.includes(language)
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{language}</span>
                {formData.languagesAvailable.includes(language) && (
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center text-blue-600"></i>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Languages for product packaging and documentation</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Claims & Market Summary</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Ingredients:</span>
            <span className="ml-2 font-medium text-gray-900">{formData.activeIngredients.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Claims:</span>
            <span className="ml-2 font-medium text-gray-900">{formData.keyClaims.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Markets:</span>
            <span className="ml-2 font-medium text-gray-900">{formData.availableMarkets.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}