'use client';

interface FormData {
  packSize: string;
  unitOfMeasure: string;
  moq: string;
  msrp: string;
  wholesalePrice: string;
  shelfLife: string;
  storageConditions: string;
  isPartOfMasterSKU: boolean;
  masterSKU: string;
  [key: string]: any;
}

interface VariantPackagingDetailsProps {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export default function VariantPackagingDetails({ formData, updateFormData }: VariantPackagingDetailsProps) {
  const unitOptions = [
    'ml', 'g', 'kg', 'L', 'oz', 'lb', 
    'units', 'pieces', 'capsules', 'tablets', 'sachets'
  ];

  const masterSKUOptions = [
    'Vitamin C Serum',
    'Omega-3 Fish Oil', 
    'Collagen Powder',
    'Probiotic Capsules'
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-4">
          <i className="ri-package-line w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Variant & Packaging Details</h2>
          <p className="text-gray-600 mt-1">Product specifications, pricing, and packaging information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pack Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pack Size <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.packSize}
            onChange={(e) => updateFormData('packSize', e.target.value)}
            placeholder="e.g., 30, 50, 100"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">Quantity or volume per package</p>
        </div>

        {/* Unit of Measure */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit of Measure <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.unitOfMeasure}
            onChange={(e) => updateFormData('unitOfMeasure', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
          >
            <option value="">Select unit</option>
            {unitOptions.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        {/* MOQ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            MOQ (Minimum Order Quantity)
          </label>
          <input
            type="number"
            value={formData.moq}
            onChange={(e) => updateFormData('moq', e.target.value)}
            placeholder="e.g., 100"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum units retailers must order</p>
        </div>

        {/* MSRP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            MSRP / MRP <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              value={formData.msrp}
              onChange={(e) => updateFormData('msrp', e.target.value)}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Manufacturer's suggested retail price</p>
        </div>

        {/* Wholesale Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wholesale Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              value={formData.wholesalePrice}
              onChange={(e) => updateFormData('wholesalePrice', e.target.value)}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Optional: Price for bulk orders</p>
        </div>

        {/* Shelf Life */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shelf Life (in months)
          </label>
          <input
            type="number"
            value={formData.shelfLife}
            onChange={(e) => updateFormData('shelfLife', e.target.value)}
            placeholder="e.g., 24"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">Product expiration period</p>
        </div>

        {/* Storage Conditions */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Storage Conditions
          </label>
          <textarea
            rows={3}
            value={formData.storageConditions}
            onChange={(e) => updateFormData('storageConditions', e.target.value)}
            placeholder="e.g., Store in a cool, dry place below 25°C. Avoid direct sunlight. Refrigerate after opening."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            maxLength={300}
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">Storage and handling requirements</p>
            <span className="text-xs text-gray-400">{formData.storageConditions.length}/300</span>
          </div>
        </div>

        {/* Master SKU Toggle */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
                  onClick={() => updateFormData('isPartOfMasterSKU', !formData.isPartOfMasterSKU)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    formData.isPartOfMasterSKU ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.isPartOfMasterSKU ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">Link to Master SKU</div>
                <div className="text-sm text-gray-500">Is this product part of an existing Master SKU?</div>
              </div>
            </div>
          </div>

          {/* Master SKU Selection */}
          {formData.isPartOfMasterSKU && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Master SKU
              </label>
              <select
                value={formData.masterSKU}
                onChange={(e) => updateFormData('masterSKU', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
              >
                <option value="">Choose parent product</option>
                {masterSKUOptions.map((masterSKU) => (
                  <option key={masterSKU} value={masterSKU}>{masterSKU}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Summary */}
      {(formData.msrp || formData.wholesalePrice) && (
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Pricing Summary</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {formData.msrp && (
              <div className="flex justify-between">
                <span className="text-gray-600">MSRP:</span>
                <span className="font-medium text-gray-900">${formData.msrp}</span>
              </div>
            )}
            {formData.wholesalePrice && (
              <div className="flex justify-between">
                <span className="text-gray-600">Wholesale:</span>
                <span className="font-medium text-gray-900">${formData.wholesalePrice}</span>
              </div>
            )}
            {formData.msrp && formData.wholesalePrice && (
              <div className="flex justify-between text-green-600">
                <span>Margin:</span>
                <span className="font-medium">
                  {Math.round(((parseFloat(formData.msrp) - parseFloat(formData.wholesalePrice)) / parseFloat(formData.msrp)) * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}