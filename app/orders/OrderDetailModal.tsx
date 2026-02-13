
'use client';

import { useState } from 'react';
import { Order } from './page';
import ChatModal from './ChatModal';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: 'pending' | 'shipped' | 'delivered') => void;
}

export default function OrderDetailModal({ order, onClose, onUpdateStatus }: OrderDetailModalProps) {
  const [showChat, setShowChat] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Processing', icon: 'ri-time-line' },
      { key: 'shipped', label: 'Shipped', icon: 'ri-truck-line' },
      { key: 'delivered', label: 'Delivered', icon: 'ri-checkbox-circle-line' }
    ];

    const statusIndex = steps.findIndex(step => step.key === order.status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= statusIndex,
      active: index === statusIndex
    }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-lime-50 to-green-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                <p className="text-gray-600 mt-1">{order.id}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowChat(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-chat-3-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Chat with Buyer
                </button>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors duration-150 cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-gray-500"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="p-6 space-y-8">
              {/* Order Status Tracker */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
                <div className="flex items-center justify-between relative">
                  {getStatusSteps().map((step, index) => (
                    <div key={step.key} className="flex flex-col items-center relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        step.completed 
                          ? 'bg-lime-500 text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <i className={`${step.icon} text-lg`}></i>
                      </div>
                      <span className={`text-sm mt-2 font-medium ${
                        step.completed ? 'text-lime-600' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200">
                    <div 
                      className="h-full bg-lime-500 transition-all duration-500"
                      style={{ 
                        width: `${(getStatusSteps().findIndex(s => s.key === order.status) / (getStatusSteps().length - 1)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Order History Timeline */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order History Timeline</h3>
                <div className="space-y-4">
                  {order.orderHistory.map((history, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-lime-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-800">{history.status}</h4>
                          <span className="text-sm text-gray-500">{history.timestamp}</span>
                        </div>
                        {history.note && (
                          <p className="text-sm text-gray-600 mt-1">{history.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                    <div className="space-y-4">
                      {order.products.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{product.name}</h4>
                            <p className="text-sm text-gray-600">Qty: {product.quantity} × {formatAmount(product.unitPrice)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">{formatAmount(product.total)}</p>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                          <span className="text-xl font-bold text-lime-600">{formatAmount(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buyer Information */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Buyer Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <i className="ri-store-line text-gray-400"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{order.buyerInfo.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <i className="ri-map-pin-line text-gray-400"></i>
                        </div>
                        <div>
                          <p className="text-gray-600">{order.buyerInfo.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <i className="ri-phone-line text-gray-400"></i>
                        </div>
                        <div>
                          <p className="text-gray-600">{order.buyerInfo.contact}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <i className="ri-mail-line text-gray-400"></i>
                        </div>
                        <div>
                          <p className="text-gray-600">{order.buyerInfo.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping & Additional Info */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <i className="ri-map-pin-line text-gray-400"></i>
                        </div>
                        <div>
                          <p className="text-gray-600">{order.shippingInfo.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <i className="ri-truck-line text-gray-400"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{order.shippingInfo.method}</p>
                        </div>
                      </div>
                      {order.shippingInfo.trackingNumber && (
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                            <i className="ri-barcode-line text-gray-400"></i>
                          </div>
                          <div>
                            <p className="text-gray-600">{order.shippingInfo.trackingNumber}</p>
                          </div>
                        </div>
                      )}
                      {order.shippingInfo.estimatedDelivery && (
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                            <i className="ri-calendar-line text-gray-400"></i>
                          </div>
                          <div>
                            <p className="text-gray-600">Est. Delivery: {formatDate(order.shippingInfo.estimatedDelivery)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Discrepancy Log */}
                  {order.discrepancyLog.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Issues & Notes</h3>
                      <div className="space-y-3">
                        {order.discrepancyLog.map((issue, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                              <i className={`${issue.resolved ? 'ri-checkbox-circle-line text-green-500' : 'ri-error-warning-line text-yellow-500'}`}></i>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800">{issue.issue}</p>
                              <p className="text-sm text-gray-500 mt-1">{issue.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4 justify-end">
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap">
                Generate Invoice
              </button>
              
              {order.status === 'pending' && (
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, 'shipped');
                    onClose();
                  }}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  Mark as Shipped
                </button>
              )}
              
              {order.status === 'shipped' && (
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, 'delivered');
                    onClose();
                  }}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  Mark as Delivered
                </button>
              )}
              
              <button
                onClick={() => {
                  const nextStatus = order.status === 'pending' ? 'shipped' : order.status === 'shipped' ? 'delivered' : order.status;
                  if (nextStatus !== order.status) {
                    onUpdateStatus(order.id, nextStatus as 'pending' | 'shipped' | 'delivered');
                    onClose();
                  }
                }}
                className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {showChat && (
        <ChatModal
          order={order}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
}
