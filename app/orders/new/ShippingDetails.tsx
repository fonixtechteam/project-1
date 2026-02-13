
'use client';

import { useState } from 'react';

interface ShippingData {
  method: 'standard' | 'express' | 'overnight';
  address: string;
  specialInstructions: string;
  trackingNumber?: string;
}

interface ShippingDetailsProps {
  shippingData: ShippingData;
  onShippingChange: (data: ShippingData) => void;
  onNext: () => void;
  onBack: () => void;
  retailerAddress: string;
}

const shippingMethods = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 15.00,
    icon: 'ri-truck-line'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 35.00,
    icon: 'ri-rocket-line'
  },
  {
    id: 'overnight',
    name: 'Overnight Delivery',
    description: '1 business day',
    price: 75.00,
    icon: 'ri-flashlight-line'
  }
];

export default function ShippingDetails({ 
  shippingData, 
  onShippingChange, 
  onNext, 
  onBack, 
  retailerAddress 
}: ShippingDetailsProps) {
  const [useRetailerAddress, setUseRetailerAddress] = useState(true);
  const [customAddress, setCustomAddress] = useState('');

  const handleMethodChange = (method: 'standard' | 'express' | 'overnight') => {
    onShippingChange({
      ...shippingData,
      method
    });
  };

  const handleAddressChange = (useRetailer: boolean) => {
    setUseRetailerAddress(useRetailer);
    onShippingChange({
      ...shippingData,
      address: useRetailer ? retailerAddress : customAddress
    });
  };

  const handleCustomAddressChange = (address: string) => {
    setCustomAddress(address);
    if (!useRetailerAddress) {
      onShippingChange({
        ...shippingData,
        address
      });
    }
  };

  const handleInstructionsChange = (instructions: string) => {
    onShippingChange({
      ...shippingData,
      specialInstructions: instructions
    });
  };

  const getSelectedMethod = () => {
    return shippingMethods.find(method => method.id === shippingData.method);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipping Details</h2>
        
        <div className="space-y-8">
          {/* Shipping Method Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Select Shipping Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shippingMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => handleMethodChange(method.id as 'standard' | 'express' | 'overnight')}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    shippingData.method === method.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      shippingData.method === method.id ? 'bg-red-600' : 'bg-gray-100'
                    }`}>
                      <i className={`${method.icon} text-lg ${
                        shippingData.method === method.id ? 'text-white' : 'text-gray-600'
                      }`}></i>
                    </div>
                    {shippingData.method === method.id && (
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-gray-800 mb-1">{method.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                  <p className="font-semibold text-red-600">${method.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping Address</h3>
            
            <div className="space-y-4">
              {/* Address Options */}
              <div className="flex items-start gap-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="addressType"
                    checked={useRetailerAddress}
                    onChange={() => handleAddressChange(true)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Use Retailer Address</p>
                    <p className="text-sm text-gray-600 mt-1">{retailerAddress}</p>
                  </div>
                </label>
              </div>

              <div className="flex items-start gap-4">
                <label className="flex items-start gap-3 cursor-pointer w-full">
                  <input
                    type="radio"
                    name="addressType"
                    checked={!useRetailerAddress}
                    onChange={() => handleAddressChange(false)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-2">Use Custom Address</p>
                    <textarea
                      value={customAddress}
                      onChange={(e) => handleCustomAddressChange(e.target.value)}
                      disabled={useRetailerAddress}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        useRetailerAddress ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      placeholder="Enter custom shipping address..."
                      rows={3}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-4">
              Special Instructions (Optional)
            </label>
            <textarea
              value={shippingData.specialInstructions}
              onChange={(e) => handleInstructionsChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Add any special shipping instructions, delivery preferences, or notes..."
              rows={4}
            />
          </div>

          {/* Tracking Information Placeholder */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="ri-information-line text-white"></i>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Tracking Information</h4>
                <p className="text-blue-700 text-sm">
                  A tracking number will be automatically generated and sent to the retailer once the order is processed and shipped.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Summary */}
          {getSelectedMethod() && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <i className={`${getSelectedMethod()?.icon} text-white`}></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800 mb-1">Shipping Summary</h4>
                  <div className="text-green-700 text-sm space-y-1">
                    <p><strong>Method:</strong> {getSelectedMethod()?.name}</p>
                    <p><strong>Delivery Time:</strong> {getSelectedMethod()?.description}</p>
                    <p><strong>Shipping Cost:</strong> ${getSelectedMethod()?.price.toFixed(2)}</p>
                    <p><strong>Address:</strong> {useRetailerAddress ? retailerAddress : customAddress || 'Custom address not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 bg-white rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer whitespace-nowrap font-semibold text-lg shadow-lg"
        >
          <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center mr-3"></i>
          Back to Products
        </button>
        
        <button
          onClick={onNext}
          disabled={!shippingData.address}
          className={`flex items-center px-8 py-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap font-semibold text-lg shadow-lg ${
            shippingData.address
              ? 'bg-lime-600 text-white hover:bg-lime-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Review
          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-3"></i>
        </button>
      </div>
    </div>
  );
}
