'use client';

interface FormData {
  skuCode: string;
  ean: string;
  upc: string;
  brandName: string;
  productName: string;
  category: string;
  subCategory: string;
  description: string;
  [key: string]: any;
}

interface BasicProductInfoProps {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export default function BasicProductInfo({ formData, updateFormData }: BasicProductInfoProps) {
  const categories = [
    'Skincare',
    'Supplements',
    'Wellness',
    'Beauty',
    'Personal Care',
    'Health & Fitness'
  ];

  const subCategories = {
    'Skincare': ['Serums', 'Moisturizers', 'Cleansers', 'Treatments', 'Sunscreen'],
    'Supplements': ['Vitamins', 'Minerals', 'Protein', 'Probiotics', 'Omega-3'],
    'Wellness': ['Essential Oils', 'Aromatherapy', 'Sleep Support', 'Stress Relief'],
    'Beauty': ['Makeup', 'Hair Care', 'Nail Care', 'Tools & Accessories'],
    'Personal Care': ['Oral Care', 'Body Care', 'Deodorants', 'Feminine Care'],
    'Health & Fitness': ['Sports Nutrition', 'Recovery', 'Performance', 'Weight Management']
  };

  const handleCategoryChange = (category: string) => {
    updateFormData('category', category);
    updateFormData('subCategory', ''); // Reset subcategory when category changes
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-full mr-4">
          <i className="ri-information-line w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Basic Product Information</h2>
          <p className="text-gray-600 mt-1">Essential product identifiers and general details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SKU Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SKU Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.skuCode}
            onChange={(e) => updateFormData('skuCode', e.target.value)}
            placeholder="e.g., VCS-30ML-001"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">Unique internal identifier for this product</p>
        </div>

        {/* EAN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            EAN (European Article Number)
          </label>
          <input
            type="text"
            value={formData.ean}
            onChange={(e) => updateFormData('ean', e.target.value)}
            placeholder="e.g., 1234567890123"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">13-digit barcode standard</p>
        </div>

        {/* UPC */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPC (Universal Product Code)
          </label>
          <input
            type="text"
            value={formData.upc}
            onChange={(e) => updateFormData('upc', e.target.value)}
            placeholder="e.g., 123456789012"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">12-digit barcode for North America</p>
        </div>

        {/* Brand Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            value={formData.brandName}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">Your registered brand name</p>
        </div>

        {/* Product Name */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) => updateFormData('productName', e.target.value)}
            placeholder="e.g., Vitamin C Brightening Serum"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">Clear, descriptive product name for retailers</p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Sub-Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sub-Category
          </label>
          <select
            value={formData.subCategory}
            onChange={(e) => updateFormData('subCategory', e.target.value)}
            disabled={!formData.category}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="">Select sub-category</option>
            {formData.category && subCategories[formData.category as keyof typeof subCategories]?.map((subCat) => (
              <option key={subCat} value={subCat}>{subCat}</option>
            ))}
          </select>
          {!formData.category && (
            <p className="text-xs text-gray-500 mt-1">Please select a category first</p>
          )}
        </div>

        {/* Product Description */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Provide a detailed description of your product, including benefits, key features, and usage recommendations..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">Detailed product information for retailers</p>
            <span className="text-xs text-gray-400">{formData.description.length}/500</span>
          </div>
        </div>
      </div>

      {/* Validation Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Required Fields Summary</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div className={`flex items-center ${formData.skuCode ? 'text-green-600' : 'text-red-600'}`}>
            <i className={`${formData.skuCode ? 'ri-check-line' : 'ri-close-line'} w-4 h-4 flex items-center justify-center mr-2`}></i>
            SKU Code
          </div>
          <div className={`flex items-center ${formData.productName ? 'text-green-600' : 'text-red-600'}`}>
            <i className={`${formData.productName ? 'ri-check-line' : 'ri-close-line'} w-4 h-4 flex items-center justify-center mr-2`}></i>
            Product Name
          </div>
          <div className={`flex items-center ${formData.category ? 'text-green-600' : 'text-red-600'}`}>
            <i className={`${formData.category ? 'ri-check-line' : 'ri-close-line'} w-4 h-4 flex items-center justify-center mr-2`}></i>
            Category
          </div>
        </div>
      </div>
    </div>
  );
}