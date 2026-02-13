
'use client';

import { useState } from 'react';

interface Retailer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  type: string;
}

interface SelectedProduct {
  id: string;
  name: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  total: number;
  image: string;
  isBundle?: boolean;
  bundleItems?: string[];
}

interface ShippingData {
  method: 'standard' | 'express' | 'overnight';
  address: string;
  specialInstructions: string;
}

interface OrderReviewProps {
  retailer: Retailer;
  products: SelectedProduct[];
  shipping: ShippingData;
  onBack: () => void;
  onSubmit: () => void;
  onProductsChange?: (products: SelectedProduct[]) => void;
}

const shippingCosts = {
  standard: 15.00,
  express: 35.00,
  overnight: 75.00
};

const shippingLabels = {
  standard: 'Standard Shipping (5-7 days)',
  express: 'Express Shipping (2-3 days)',
  overnight: 'Overnight Delivery (1 day)'
};

export default function OrderReview({ 
  retailer, 
  products, 
  shipping, 
  onBack, 
  onSubmit, 
  onProductsChange 
}: OrderReviewProps) {
  const [editableProducts, setEditableProducts] = useState(products);
  const [showKitOptions, setShowKitOptions] = useState(false);

  const subtotal = editableProducts.reduce((sum, product) => sum + product.total, 0);
  const shippingCost = shippingCosts[shipping.method];
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shippingCost + tax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const updated = editableProducts.filter(p => p.id !== productId);
      setEditableProducts(updated);
      onProductsChange?.(updated);
    } else {
      const updated = editableProducts.map(p =>
        p.id === productId 
          ? { ...p, quantity: newQuantity, total: newQuantity * p.unitPrice }
          : p
      );
      setEditableProducts(updated);
      onProductsChange?.(updated);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    const updated = editableProducts.filter(p => p.id !== productId);
    setEditableProducts(updated);
    onProductsChange?.(updated);
  };

  const handleSaveDraft = () => {
    alert('Order draft saved successfully! You can continue editing this order later.');
  };

  const availableKits = [
    {
      id: 'kit1',
      name: 'Skincare Essentials Bundle',
      description: 'Complete skincare routine with cleanser, serum, and moisturizer',
      products: ['Hydrating Face Serum', 'Vitamin C Moisturizer', 'Cleansing Oil'],
      originalPrice: 109.50,
      bundlePrice: 89.99,
      savings: 19.51
    },
    {
      id: 'kit2',
      name: 'Anti-Aging Power Kit',
      description: 'Advanced anti-aging treatment with retinol and night cream',
      products: ['Retinol Treatment Serum', 'Anti-Aging Night Cream'],
      originalPrice: 120.00,
      bundlePrice: 99.99,
      savings: 20.01
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Step 4: Order Review & Summary</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Retailer Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Retailer Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-store-line text-gray-400"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{retailer.name}</p>
                    <p className="text-sm text-gray-600">{retailer.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-map-pin-line text-gray-400"></i>
                  </div>
                  <p className="text-gray-600">{retailer.address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-mail-line text-gray-400"></i>
                  </div>
                  <p className="text-gray-600">{retailer.email}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-phone-line text-gray-400"></i>
                  </div>
                  <p className="text-gray-600">{retailer.phone}</p>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-truck-line text-gray-400"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{shippingLabels[shipping.method]}</p>
                    <p className="text-sm text-gray-600">Cost: {formatCurrency(shippingCost)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-map-pin-line text-gray-400"></i>
                  </div>
                  <p className="text-gray-600">{shipping.address}</p>
                </div>
                {shipping.specialInstructions && (
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                      <i className="ri-information-line text-gray-400"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Special Instructions:</p>
                      <p className="text-gray-600 text-sm">{shipping.specialInstructions}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Kit/Bundle Options */}
            <div className="bg-gradient-to-br from-lime-50 to-green-50 border border-lime-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-800">Kit/Bundle Options</h3>
                <button
                  onClick={() => setShowKitOptions(!showKitOptions)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-gift-line w-4 h-4 flex items-center justify-center"></i>
                  <span className="text-sm font-medium">View Bundles</span>
                </button>
              </div>
              
              {showKitOptions && (
                <div className="space-y-3">
                  {availableKits.map((kit) => (
                    <div key={kit.id} className="bg-white border border-lime-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-green-800 mb-1">{kit.name}</h4>
                          <p className="text-sm text-green-700 mb-2">{kit.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-500 line-through">{formatCurrency(kit.originalPrice)}</span>
                            <span className="font-bold text-green-600">{formatCurrency(kit.bundlePrice)}</span>
                            <span className="px-2 py-0.5 bg-lime-100 text-lime-700 rounded-full text-xs">
                              Save {formatCurrency(kit.savings)}
                            </span>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 bg-lime-600 text-white text-sm rounded-lg hover:bg-lime-700 transition-colors cursor-pointer whitespace-nowrap">
                          Add Bundle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {!showKitOptions && (
                <p className="text-green-700 text-sm">
                  Save money with our pre-configured product bundles. Click "View Bundles" to see available options.
                </p>
              )}
            </div>

            {/* Expected Timeline */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Expected Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium text-blue-800">Order Submission</p>
                    <p className="text-sm text-blue-600">Immediate upon clicking Submit Order</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium text-blue-800">Admin Review</p>
                    <p className="text-sm text-blue-600">1-2 business hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium text-blue-800">Processing</p>
                    <p className="text-sm text-blue-600">1-2 business days after approval</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium text-blue-800">Shipping</p>
                    <p className="text-sm text-blue-600">
                      {shipping.method === 'standard' ? '5-7 business days' :
                       shipping.method === 'express' ? '2-3 business days' :
                       '1 business day'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Editable */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-lg">
                  <i className="ri-edit-line w-4 h-4 flex items-center justify-center text-orange-600"></i>
                  <span className="text-sm text-orange-700 font-medium">Editable</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {editableProducts.map((product) => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{product.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>Unit Price: {formatCurrency(product.unitPrice)}</span>
                            </div>
                            {product.isBundle && (
                              <div className="mt-2">
                                <span className="px-2 py-0.5 bg-lime-100 text-lime-700 text-xs rounded-full">Bundle</span>
                                <p className="text-xs text-gray-500 mt-1">
                                  Includes: {product.bundleItems?.join(', ')}
                                </p>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg cursor-pointer ml-2"
                            title="Remove product"
                          >
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        </div>
                        
                        {/* Editable Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
                              >
                                <i className="ri-subtract-line text-sm"></i>
                              </button>
                              <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                                className="w-12 text-center border border-gray-200 rounded py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                                min="1"
                              />
                              <button
                                onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
                              >
                                <i className="ri-add-line text-sm"></i>
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800">{formatCurrency(product.total)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal ({editableProducts.length} items)</span>
                  <span className="font-medium text-gray-800">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping ({shippingLabels[shipping.method].split(' (')[0]})</span>
                  <span className="font-medium text-gray-800">{formatCurrency(shippingCost)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium text-gray-800">{formatCurrency(tax)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                    <span className="text-xl font-bold text-lime-600">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <i className="ri-shield-check-line text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-green-800 mb-1">Ready for Submission</h4>
                  <p className="text-green-700 text-sm mb-2">
                    Your order is ready to be submitted to Synergy Admin for review and processing.
                  </p>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Order will be sent to Synergy Admin immediately</li>
                    <li>• You'll receive a confirmation email with order ID</li>
                    <li>• Admin will review within 1-2 business hours</li>
                    <li>• You'll be notified once approved and processing begins</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center mt-0.5">
                  <i className="ri-information-line text-white text-sm"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-800 mb-1">Order Terms</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Payment terms: Net 30 days from invoice date</li>
                    <li>• Returns accepted within 14 days of delivery</li>
                    <li>• Damaged items must be reported within 48 hours</li>
                    <li>• All prices are subject to applicable taxes</li>
                    <li>• Orders subject to Synergy Admin approval</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 bg-white rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer whitespace-nowrap font-semibold text-lg shadow-lg"
        >
          <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center mr-3"></i>
          Back to Shipping
        </button>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleSaveDraft}
            className="flex items-center px-6 py-3 border-2 border-orange-400 text-orange-600 bg-white rounded-xl hover:bg-orange-50 transition-colors cursor-pointer whitespace-nowrap font-medium"
          >
            <i className="ri-draft-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Save as Draft
          </button>
          <button
            onClick={onSubmit}
            className="flex items-center px-10 py-4 bg-lime-600 text-white rounded-xl hover:bg-lime-700 transition-colors cursor-pointer whitespace-nowrap font-bold text-lg shadow-lg"
          >
            <i className="ri-send-plane-line w-5 h-5 flex items-center justify-center mr-3"></i>
            Submit Order ({formatCurrency(total)})
          </button>
        </div>
      </div>
    </div>
  );
}
