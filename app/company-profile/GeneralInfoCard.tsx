
'use client';
import { useState } from 'react';

interface GeneralInfoCardProps {
  isEditMode: boolean;
}

export default function GeneralInfoCard({ isEditMode }: GeneralInfoCardProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    brandName: 'Lumina Beauty',
    shortBio: 'Premium organic skincare brand focused on sustainable beauty solutions for modern consumers. Our products combine ancient botanical wisdom with cutting-edge scientific research.',
    website: 'https://luminabeauty.com',
    socialMedia: {
      instagram: '@luminabeauty',
      facebook: 'LuminaBeautyOfficial',
      twitter: '@lumina_beauty',
      linkedin: 'lumina-beauty-inc'
    },
    marketsServed: ['North America', 'Europe', 'Asia-Pacific', 'Latin America'],
    productCategories: ['Skincare', 'Face Masks', 'Serums', 'Moisturizers', 'Anti-Aging', 'Organic']
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
    setHasChanges(true);
  };

  const addMarket = (market: string) => {
    if (market && !formData.marketsServed.includes(market)) {
      handleInputChange('marketsServed', [...formData.marketsServed, market]);
    }
  };

  const removeMarket = (market: string) => {
    handleInputChange('marketsServed', formData.marketsServed.filter(m => m !== market));
  };

  const addCategory = (category: string) => {
    if (category && !formData.productCategories.includes(category)) {
      handleInputChange('productCategories', [...formData.productCategories, category]);
    }
  };

  const removeCategory = (category: string) => {
    handleInputChange('productCategories', formData.productCategories.filter(c => c !== category));
  };

  const handleSave = () => {
    setHasChanges(false);
    // Save logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">General Information</h3>
        <span className="text-sm text-gray-500 bg-green-50 text-green-700 px-2 py-1 rounded-full">
          Public Profile
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Brand Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
            {isEditMode ? (
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            ) : (
              <p className="text-gray-900 font-medium">{formData.brandName}</p>
            )}
          </div>

          {/* Short Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Bio <span className="text-gray-500">(280 characters)</span>
            </label>
            {isEditMode ? (
              <textarea
                value={formData.shortBio}
                onChange={(e) => handleInputChange('shortBio', e.target.value)}
                maxLength={280}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            ) : (
              <p className="text-gray-700">{formData.shortBio}</p>
            )}
            {isEditMode && (
              <p className="text-xs text-gray-500 mt-1">{formData.shortBio.length}/280 characters</p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors cursor-pointer">
              <div className="flex flex-col items-center">
                <img 
                  src="https://readdy.ai/api/search-image?query=modern%20minimalist%20beauty%20brand%20logo%20with%20elegant%20typography%20on%20clean%20white%20background%2C%20professional%20cosmetics%20company%20branding&width=120&height=120&seq=brand-logo-1&orientation=squarish"
                  alt="Brand Logo"
                  className="w-16 h-16 object-contain mb-4"
                />
                {isEditMode && (
                  <>
                    <div className="w-6 h-6 flex items-center justify-center mb-2">
                      <i className="ri-upload-cloud-2-line text-xl text-gray-400"></i>
                    </div>
                    <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Website URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
            {isEditMode ? (
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            ) : (
              <a href={formData.website} target="_blank" rel="noopener noreferrer" 
                 className="text-red-600 hover:text-red-700 cursor-pointer">
                {formData.website}
              </a>
            )}
          </div>

          {/* Social Media Links */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Media</label>
            <div className="space-y-3">
              {Object.entries(formData.socialMedia).map(([platform, handle]) => (
                <div key={platform} className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                    <i className={`ri-${platform}-line text-gray-600`}></i>
                  </div>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                      placeholder={`@${platform}handle`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <span className="text-gray-700">{handle}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Markets Served */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Markets Served</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.marketsServed.map((market) => (
                <span key={market} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {market}
                  {isEditMode && (
                    <button
                      onClick={() => removeMarket(market)}
                      className="ml-2 w-4 h-4 flex items-center justify-center cursor-pointer hover:text-blue-600"
                    >
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditMode && (
              <input
                type="text"
                placeholder="Add market (press Enter)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addMarket(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            )}
          </div>

          {/* Product Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.productCategories.map((category) => (
                <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  {category}
                  {isEditMode && (
                    <button
                      onClick={() => removeCategory(category)}
                      className="ml-2 w-4 h-4 flex items-center justify-center cursor-pointer hover:text-purple-600"
                    >
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditMode && (
              <input
                type="text"
                placeholder="Add category (press Enter)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addCategory(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditMode && hasChanges && (
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
