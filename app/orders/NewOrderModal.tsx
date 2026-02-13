
'use client';

import { useState } from 'react';
import { Order } from './page';

interface NewOrderModalProps {
  onClose: () => void;
  onCreateOrder: (order: Order) => void;
}

export default function NewOrderModal({ onClose, onCreateOrder }: NewOrderModalProps) {
  const [orderData, setOrderData] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    buyerAddress: '',
    shippingAddress: '',
    shippingMethod: 'standard',
    notes: ''
  });

  const [selectedProducts, setSelectedProducts] = useState<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[]>([]);

  const availableProducts = [
    { id: 'p1', name: 'Hydrating Face Serum', price: 45.00 },
    { id: 'p2', name: 'Vitamin C Moisturizer', price: 35.00 },
    { id: 'p3', name: 'Anti-Aging Night Cream', price: 65.00 },
    { id: 'p4', name: 'Cleansing Oil', price: 29.50 },
    { id: 'p5', name: 'Retinol Treatment Serum', price: 55.00 },
    { id: 'p6', name: 'Hyaluronic Acid Mask', price: 22.50 }
  ];

  const handleAddProduct = (product: typeof availableProducts[0]) => {
    const existing = selectedProducts.find(p => p.id === product.id);
    if (existing) {
      setSelectedProducts(selectedProducts.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    } else {
      setSelectedProducts(selectedProducts.map(p =>
        p.id === productId ? { ...p, quantity } : p
      ));
    }
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderData.buyerName || !orderData.buyerEmail || selectedProducts.length === 0) {
      alert('Please fill in all required fields and add at least one product');
      return;
    }

    const newOrder: Order = {
      id: `ORD-2024-${String(Date.now()).slice(-3)}`,
      buyerName: orderData.buyerName,
      orderDate: new Date().toISOString().split('T')[0],
      totalAmount: calculateTotal(),
      status: 'pending',
      products: selectedProducts.map(product => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        unitPrice: product.price,
        total: product.price * product.quantity,
        image: `https://readdy.ai/api/search-image?query=$%7Bproduct.name.toLowerCase%28%29.replace%28%2F%5Cs%20%2Fg%2C%20-%29%7D-product-with-clean-white-background-skincare-photography&width=200&height=200&seq=${product.id}&orientation=squarish`
      })),
      buyerInfo: {
        name: orderData.buyerName,
        address: orderData.buyerAddress,
        contact: orderData.buyerPhone,
        email: orderData.buyerEmail
      },
      shippingInfo: {
        address: orderData.shippingAddress || orderData.buyerAddress,
        method: orderData.shippingMethod === 'express' ? 'Express Shipping' : 'Standard Shipping',
        estimatedDelivery: new Date(Date.now() + (orderData.shippingMethod === 'express' ? 3 : 7) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      orderHistory: [
        {
          status: 'Order Placed',
          timestamp: new Date().toLocaleString(),
          note: 'Order manually created and payment confirmed'
        }
      ],
      discrepancyLog: []
    };

    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-lime-50 to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Create New Order</h2>
              <p className="text-gray-600 mt-1">Manually create a new order for a buyer</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors duration-150 cursor-pointer"
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buyer Information */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Buyer Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Name *</label>
                      <input
                        type="text"
                        value={orderData.buyerName}
                        onChange={(e) => setOrderData({ ...orderData, buyerName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        placeholder="Enter buyer name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={orderData.buyerEmail}
                        onChange={(e) => setOrderData({ ...orderData, buyerEmail: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        placeholder="buyer@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={orderData.buyerPhone}
                        onChange={(e) => setOrderData({ ...orderData, buyerPhone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <textarea
                        value={orderData.buyerAddress}
                        onChange={(e) => setOrderData({ ...orderData, buyerAddress: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        placeholder="Enter full address"
                        rows={3}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                      <textarea
                        value={orderData.shippingAddress}
                        onChange={(e) => setOrderData({ ...orderData, shippingAddress: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        placeholder="Leave empty to use buyer address"
                        rows={3}
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Method</label>
                      <select
                        value={orderData.shippingMethod}
                        onChange={(e) => setOrderData({ ...orderData, shippingMethod: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent appearance-none cursor-pointer pr-8"
                      >
                        <option value="standard">Standard Shipping (7 days)</option>
                        <option value="express">Express Shipping (3 days)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Products</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {availableProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{product.name}</h4>
                          <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddProduct(product)}
                          className="px-3 py-1.5 bg-lime-500 hover:bg-lime-600 text-white text-sm rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-add-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Products */}
                {selectedProducts.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Products</h3>
                    <div className="space-y-3">
                      {selectedProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{product.name}</h4>
                            <p className="text-sm text-gray-600">${product.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                            >
                              <i className="ri-subtract-line text-sm"></i>
                            </button>
                            <span className="w-8 text-center font-medium">{product.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                            >
                              <i className="ri-add-line text-sm"></i>
                            </button>
                            <span className="ml-3 font-medium text-lime-600">
                              ${(product.price * product.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-800">Total</span>
                          <span className="text-xl font-bold text-lime-600">${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                Create Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
