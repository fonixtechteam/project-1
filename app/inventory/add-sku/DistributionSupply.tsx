'use client';

interface FormData {
  countryOfOrigin: string;
  warehouseLocation: string;
  leadTime: string;
  shippingWidth: string;
  shippingHeight: string;
  shippingDepth: string;
  shippingWeight: string;
  [key: string]: any;
}

interface DistributionSupplyProps {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export default function DistributionSupply({ formData, updateFormData }: DistributionSupplyProps) {
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Australia', 
    'Japan', 'South Korea', 'Singapore', 'India', 'China'
  ];

  const warehouseLocations = [
    'California, USA', 'Texas, USA', 'New York, USA', 'Florida, USA',
    'Ontario, Canada', 'Quebec, Canada',
    'London, UK', 'Manchester, UK',
    'Hamburg, Germany', 'Munich, Germany',
    'Sydney, Australia', 'Melbourne, Australia',
    'Tokyo, Japan', 'Osaka, Japan',
    'Singapore', 'Hong Kong'
  ];

  const calculateVolume = () => {
    const width = parseFloat(formData.shippingWidth) || 0;
    const height = parseFloat(formData.shippingHeight) || 0;
    const depth = parseFloat(formData.shippingDepth) || 0;
    return width * height * depth;
  };

  const getDimensionUnit = () => {
    // Determine if dimensions are likely in cm or inches based on values
    const avgDimension = (parseFloat(formData.shippingWidth) + parseFloat(formData.shippingHeight) + parseFloat(formData.shippingDepth)) / 3;
    return avgDimension > 50 ? 'cm' : 'in';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-full mr-4">
          <i className="ri-truck-line w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Distribution & Supply</h2>
          <p className="text-gray-600 mt-1">Origin, logistics, and shipping information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Origin & Location */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country of Origin <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.countryOfOrigin}
              onChange={(e) => updateFormData('countryOfOrigin', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Where the product is manufactured</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Warehouse Location
            </label>
            <select
              value={formData.warehouseLocation}
              onChange={(e) => updateFormData('warehouseLocation', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
            >
              <option value="">Select warehouse location</option>
              {warehouseLocations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Main distribution center for this product</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lead Time (in days)
            </label>
            <input
              type="number"
              value={formData.leadTime}
              onChange={(e) => updateFormData('leadTime', e.target.value)}
              placeholder="e.g., 7"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-xs text-gray-500 mt-1">Days from order to shipment</p>
          </div>
        </div>

        {/* Shipping Dimensions */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Shipping Dimensions <span className="text-red-500">*</span>
            </label>
            
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Width</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.shippingWidth}
                    onChange={(e) => updateFormData('shippingWidth', e.target.value)}
                    placeholder="0.0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    {getDimensionUnit()}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Height</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.shippingHeight}
                    onChange={(e) => updateFormData('shippingHeight', e.target.value)}
                    placeholder="0.0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    {getDimensionUnit()}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Depth</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.shippingDepth}
                    onChange={(e) => updateFormData('shippingDepth', e.target.value)}
                    placeholder="0.0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    {getDimensionUnit()}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500">Package dimensions for shipping calculations</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Weight <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={formData.shippingWeight}
                onChange={(e) => updateFormData('shippingWeight', e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">kg</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Total weight including packaging</p>
          </div>

          {/* Calculated Fields */}
          {calculateVolume() > 0 && (
            <div className="p-4 bg-cyan-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Calculated Values</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Volume:</span>
                  <span className="font-medium text-gray-900">
                    {calculateVolume().toFixed(2)} {getDimensionUnit()}³
                  </span>
                </div>
                {formData.shippingWeight && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Density:</span>
                    <span className="font-medium text-gray-900">
                      {(parseFloat(formData.shippingWeight) / calculateVolume() * 1000).toFixed(2)} g/{getDimensionUnit()}³
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logistics Summary */}
      <div className="mt-8 p-4 bg-orange-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Logistics Overview</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center">
            <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center text-orange-600 mr-2"></i>
            <div>
              <span className="text-gray-600">Origin:</span>
              <div className="font-medium text-gray-900">
                {formData.countryOfOrigin || 'Not set'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <i className="ri-building-line w-4 h-4 flex items-center justify-center text-orange-600 mr-2"></i>
            <div>
              <span className="text-gray-600">Warehouse:</span>
              <div className="font-medium text-gray-900">
                {formData.warehouseLocation ? formData.warehouseLocation.split(',')[0] : 'Not set'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <i className="ri-time-line w-4 h-4 flex items-center justify-center text-orange-600 mr-2"></i>
            <div>
              <span className="text-gray-600">Lead Time:</span>
              <div className="font-medium text-gray-900">
                {formData.leadTime ? `${formData.leadTime} days` : 'Not set'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <i className="ri-scales-line w-4 h-4 flex items-center justify-center text-orange-600 mr-2"></i>
            <div>
              <span className="text-gray-600">Weight:</span>
              <div className="font-medium text-gray-900">
                {formData.shippingWeight ? `${formData.shippingWeight} kg` : 'Not set'}
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Readiness Indicator */}
        <div className="mt-4 pt-4 border-t border-orange-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Shipping Information Completeness:</span>
            <div className="flex items-center">
              {(() => {
                const requiredFields = ['countryOfOrigin', 'shippingWidth', 'shippingHeight', 'shippingDepth', 'shippingWeight'];
                const completedFields = requiredFields.filter(field => formData[field]);
                const percentage = (completedFields.length / requiredFields.length) * 100;
                
                return (
                  <>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${percentage === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                      {Math.round(percentage)}%
                    </span>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}