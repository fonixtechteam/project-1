'use client';

import { useState } from 'react';
import { Invoice } from './page';

interface InvoiceDetailModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export default function InvoiceDetailModal({ invoice, onClose }: InvoiceDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'payment-history'>('details');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'unpaid':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'partial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF for invoice:', invoice.id);
    // Implement PDF download logic
  };

  const handleSendInvoice = () => {
    console.log('Sending invoice:', invoice.id);
    // Implement send invoice logic
  };

  const handleMarkAsPaid = () => {
    console.log('Marking invoice as paid:', invoice.id);
    // Implement mark as paid logic
  };

  const calculateSubtotal = () => {
    return invoice.products.reduce((total, product) => total + product.total, 0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-lime-50 to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Invoice Details</h2>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-gray-600">{invoice.id}</p>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full ${getStatusColor(invoice.status)}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Download PDF
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

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-lime-500 text-lime-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Invoice Details
              </button>
              <button
                onClick={() => setActiveTab('payment-history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === 'payment-history'
                    ? 'border-lime-500 text-lime-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Payment History
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-250px)]">
          {activeTab === 'details' ? (
            <div className="p-6 space-y-8">
              {/* Invoice Header Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Invoice Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invoice Date:</span>
                        <span className="font-medium text-gray-900">{formatDate(invoice.invoiceDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium text-gray-900">{formatDate(invoice.dueDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium text-blue-600">{invoice.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Retailer Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Bill To</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900">{invoice.retailerInfo.name}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <i className="ri-map-pin-line text-gray-400"></i>
                        </div>
                        <p className="text-gray-600">{invoice.retailerInfo.address}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <i className="ri-phone-line text-gray-400"></i>
                        </div>
                        <p className="text-gray-600">{invoice.retailerInfo.contact}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                          <i className="ri-mail-line text-gray-400"></i>
                        </div>
                        <p className="text-gray-600">{invoice.retailerInfo.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Payment Summary */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-bold text-lg text-gray-900">{formatCurrency(invoice.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paid Amount:</span>
                        <span className="font-medium text-green-600">{formatCurrency(invoice.paidAmount)}</span>
                      </div>
                      <div className="flex justify-between border-t border-blue-200 pt-3">
                        <span className="text-gray-600">Remaining Balance:</span>
                        <span className={`font-bold text-lg ${invoice.remainingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {formatCurrency(invoice.remainingBalance)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  {invoice.remainingBalance > 0 && (
                    <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button
                          onClick={handleMarkAsPaid}
                          className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-2"></i>
                          Mark as Paid
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-message-line w-4 h-4 flex items-center justify-center mr-2"></i>
                          Send Reminder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Product List */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Items</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Product</th>
                        <th className="text-center px-6 py-3 text-sm font-medium text-gray-700">Quantity</th>
                        <th className="text-right px-6 py-3 text-sm font-medium text-gray-700">Unit Price</th>
                        <th className="text-right px-6 py-3 text-sm font-medium text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {invoice.products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <h4 className="font-medium text-gray-800">{product.name}</h4>
                                <p className="text-sm text-gray-500">SKU: {product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-gray-600">
                            {product.quantity}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-600">
                            {formatCurrency(product.unitPrice)}
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-gray-900">
                            {formatCurrency(product.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Billing Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">{formatCurrency(invoice.billing.subtotal)}</span>
                  </div>
                  {invoice.billing.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Discount {invoice.billing.discountType === 'percentage' ? `(${invoice.billing.discount}%)` : ''}:
                      </span>
                      <span className="text-green-600">-{formatCurrency(invoice.billing.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({invoice.billing.taxRate}%):</span>
                    <span className="text-gray-900">{formatCurrency(invoice.billing.taxAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Fee:</span>
                    <span className="text-gray-900">{formatCurrency(invoice.billing.shippingFee)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                      <span className="text-xl font-bold text-lime-600">{formatCurrency(invoice.billing.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Notes</h3>
                  <p className="text-gray-700">{invoice.notes}</p>
                </div>
              )}
            </div>
          ) : (
            // Payment History Tab
            <div className="p-6">
              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
                </div>
                <div className="p-6">
                  {invoice.payment.paymentHistory.length > 0 ? (
                    <div className="space-y-4">
                      {invoice.payment.paymentHistory.map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                              <i className="ri-check-line w-5 h-5 flex items-center justify-center text-white"></i>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                              <p className="text-sm text-gray-600">{payment.method}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">{formatDate(payment.date)}</p>
                            <p className="text-xs text-gray-500">ID: {payment.transactionId}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <i className="ri-history-line w-12 h-12 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
                      <p className="text-gray-500">No payments have been recorded for this invoice yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
            >
              Close
            </button>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap">
              Edit Invoice
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}