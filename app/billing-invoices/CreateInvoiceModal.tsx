
'use client';

import { useState } from 'react';
import { Invoice } from './page';

interface CreateInvoiceModalProps {
  onClose: () => void;
  onCreateInvoice: (invoice: Invoice) => void;
}

export default function CreateInvoiceModal({ onClose, onCreateInvoice }: CreateInvoiceModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [invoiceData, setInvoiceData] = useState({
    retailerName: '',
    retailerEmail: '',
    retailerPhone: '',
    retailerAddress: '',
    orderId: '',
    dueDate: '',
    notes: '',
    discountType: 'fixed' as 'percentage' | 'fixed',
    discountValue: 0,
    taxRate: 8.25,
    shippingFee: 0
  });

  const [selectedProducts, setSelectedProducts] = useState<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[]>([]);

  const availableRetailers = [
    { name: 'Beauty Boutique Store', email: 'orders@beautyboutique.com', phone: '+1 (555) 123-4567', address: '123 Fashion Ave, New York, NY 10001' },
    { name: 'Wellness Corner', email: 'purchasing@wellnesscorner.com', phone: '+1 (555) 987-6543', address: '456 Health St, Los Angeles, CA 90210' },
    { name: 'Premium Skincare Hub', email: 'orders@premiumskincarehub.com', phone: '+1 (555) 456-7890', address: '789 Beauty Blvd, Miami, FL 33101' },
    { name: 'Natural Beauty Co.', email: 'orders@naturalbeautyco.com', phone: '+1 (555) 234-5678', address: '321 Organic Way, Portland, OR 97201' },
    { name: 'Eco Beauty Store', email: 'orders@ecobeautystore.com', phone: '+1 (555) 345-6789', address: '654 Green Ave, Seattle, WA 98101' }
  ];

  const availableOrders = [
    'ORD-2024-001', 'ORD-2024-002', 'ORD-2024-003', 'ORD-2024-004', 'ORD-2024-005',
    'ORD-2024-006', 'ORD-2024-007', 'ORD-2024-008', 'ORD-2024-009', 'ORD-2024-010'
  ];

  const availableProducts = [
    { id: 'p1', name: 'Hydrating Face Serum', price: 45.00 },
    { id: 'p2', name: 'Vitamin C Moisturizer', price: 35.00 },
    { id: 'p3', name: 'Anti-Aging Night Cream', price: 65.00 },
    { id: 'p4', name: 'Cleansing Oil', price: 29.50 },
    { id: 'p5', name: 'Retinol Treatment Serum', price: 55.00 },
    { id: 'p6', name: 'Hyaluronic Acid Mask', price: 22.50 },
    { id: 'p7', name: 'Organic Face Cleanser', price: 28.00 },
    { id: 'p8', name: 'Natural Toner Spray', price: 18.50 },
    { id: 'p9', name: 'Botanical Face Oil', price: 42.00 },
    { id: 'p10', name: 'Herbal Exfoliating Scrub', price: 25.00 }
  ];

  const handleRetailerSelect = (retailer: typeof availableRetailers[0]) => {
    setInvoiceData({
      ...invoiceData,
      retailerName: retailer.name,
      retailerEmail: retailer.email,
      retailerPhone: retailer.phone,
      retailerAddress: retailer.address
    });
  };

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

  const calculateSubtotal = () => {
    return selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (invoiceData.discountType === 'percentage') {
      return subtotal * (invoiceData.discountValue / 100);
    }
    return invoiceData.discountValue;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return (subtotal - discount) * (invoiceData.taxRate / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    const shipping = invoiceData.shippingFee;
    return subtotal - discount + tax + shipping;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving as draft...');
    onClose();
  };

  const handleSubmit = () => {
    if (!invoiceData.retailerName || !invoiceData.retailerEmail || selectedProducts.length === 0) {
      alert('Please fill in all required fields and add at least one product');
      return;
    }

    const newInvoice: Invoice = {
      id: `INV-2024-${String(Date.now()).slice(-3)}`,
      retailerName: invoiceData.retailerName,
      orderId: invoiceData.orderId || `ORD-2024-${String(Date.now()).slice(-3)}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: invoiceData.dueDate,
      totalAmount: calculateTotal(),
      paidAmount: 0,
      remainingBalance: calculateTotal(),
      status: 'pending',
      products: selectedProducts.map(product => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        unitPrice: product.price,
        total: product.price * product.quantity,
        image: `https://readdy.ai/api/search-image?query=${product.name.toLowerCase().replace(/\s+/g, '-')}-product-with-clean-white-background-skincare-photography&width=200&height=200&seq=${product.id}&orientation=squarish`
      })),
      retailerInfo: {
        name: invoiceData.retailerName,
        address: invoiceData.retailerAddress,
        contact: invoiceData.retailerPhone,
        email: invoiceData.retailerEmail
      },
      billing: {
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        discountType: invoiceData.discountType,
        taxRate: invoiceData.taxRate,
        taxAmount: calculateTax(),
        shippingFee: invoiceData.shippingFee,
        totalAmount: calculateTotal()
      },
      payment: {
        status: 'pending',
        paymentHistory: []
      },
      notes: invoiceData.notes
    };

    onCreateInvoice(newInvoice);
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-lime-50 to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Generate New Invoice</h2>
              <p className="text-gray-600 mt-1">Create a new invoice for your retailer</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors duration-150 cursor-pointer"
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep >= step ? 'bg-lime-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step ? 'text-lime-600' : 'text-gray-400'
                  }`}>
                    {step === 1 ? 'Retailer Info' : step === 2 ? 'Products' : 'Review & Submit'}
                  </span>
                  {step < 3 && <i className="ri-arrow-right-line ml-4 text-gray-300"></i>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Step 1: Retailer Information */}
          {currentStep === 1 && (
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Retailer</h3>
                    <div className="space-y-3">
                      {availableRetailers.map((retailer, index) => (
                        <button
                          key={index}
                          onClick={() => handleRetailerSelect(retailer)}
                          className={`w-full text-left p-4 border rounded-lg transition-colors cursor-pointer ${
                            invoiceData.retailerName === retailer.name
                              ? 'border-lime-500 bg-lime-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{retailer.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{retailer.email}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Retailer Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Retailer Name *</label>
                        <input
                          type="text"
                          value={invoiceData.retailerName}
                          onChange={(e) => setInvoiceData({ ...invoiceData, retailerName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          placeholder="Enter retailer name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={invoiceData.retailerEmail}
                          onChange={(e) => setInvoiceData({ ...invoiceData, retailerEmail: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          placeholder="retailer@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={invoiceData.retailerPhone}
                          onChange={(e) => setInvoiceData({ ...invoiceData, retailerPhone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea
                          value={invoiceData.retailerAddress}
                          onChange={(e) => setInvoiceData({ ...invoiceData, retailerAddress: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          placeholder="Enter full address"
                          rows={3}
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
                        <select
                          value={invoiceData.orderId}
                          onChange={(e) => setInvoiceData({ ...invoiceData, orderId: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent appearance-none cursor-pointer pr-8"
                        >
                          <option value="">Select Order (Optional)</option>
                          {availableOrders.map(order => (
                            <option key={order} value={order}>{order}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                        <input
                          type="date"
                          value={invoiceData.dueDate}
                          onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Products */}
          {currentStep === 2 && (
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Products</h3>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                      {availableProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">{product.name}</h4>
                            <p className="text-sm text-gray-600">{formatCurrency(product.price)}</p>
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
                </div>

                <div className="space-y-6">
                  {/* Selected Products */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Products</h3>
                    {selectedProducts.length > 0 ? (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedProducts.map((product) => (
                          <div key={product.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{product.name}</h4>
                              <p className="text-sm text-gray-600">{formatCurrency(product.price)} each</p>
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
                              <span className="ml-3 font-medium text-lime-600 min-w-20 text-right">
                                {formatCurrency(product.price * product.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No products selected</p>
                    )}
                  </div>

                  {/* Billing Settings */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                          <select
                            value={invoiceData.discountType}
                            onChange={(e) => setInvoiceData({ ...invoiceData, discountType: e.target.value as 'percentage' | 'fixed' })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent appearance-none cursor-pointer pr-8"
                          >
                            <option value="fixed">Fixed Amount</option>
                            <option value="percentage">Percentage</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Discount {invoiceData.discountType === 'percentage' ? '(%)' : '($)'}
                          </label>
                          <input
                            type="number"
                            value={invoiceData.discountValue}
                            onChange={(e) => setInvoiceData({ ...invoiceData, discountValue: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                          <input
                            type="number"
                            value={invoiceData.taxRate}
                            onChange={(e) => setInvoiceData({ ...invoiceData, taxRate: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Fee ($)</label>
                          <input
                            type="number"
                            value={invoiceData.shippingFee}
                            onChange={(e) => setInvoiceData({ ...invoiceData, shippingFee: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview Total */}
                  {selectedProducts.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Total</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal:</span>
                          <span>{formatCurrency(calculateSubtotal())}</span>
                        </div>
                        {calculateDiscount() > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Discount:</span>
                            <span className="text-green-600">-{formatCurrency(calculateDiscount())}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax:</span>
                          <span>{formatCurrency(calculateTax())}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Shipping:</span>
                          <span>{formatCurrency(invoiceData.shippingFee)}</span>
                        </div>
                        <div className="border-t border-blue-200 pt-2">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-lime-600">{formatCurrency(calculateTotal())}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Invoice Summary */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Retailer:</span>
                        <span className="font-medium">{invoiceData.retailerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">{new Date(invoiceData.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Products:</span>
                        <span className="font-medium">{selectedProducts.length} item{selectedProducts.length > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-bold text-lg text-lime-600">{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Notes</h3>
                    <textarea
                      value={invoiceData.notes}
                      onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="Add any additional notes or special instructions..."
                      rows={4}
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Product List */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800">Products</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {selectedProducts.map((product) => (
                          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-800">{product.name}</h4>
                              <p className="text-sm text-gray-600">Qty: {product.quantity} × {formatCurrency(product.price)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">{formatCurrency(product.price * product.quantity)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Final Billing Breakdown */}
                  <div className="bg-gradient-to-br from-lime-50 to-green-100 rounded-xl p-6 border border-lime-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Final Billing</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-900">{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      {calculateDiscount() > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Discount {invoiceData.discountType === 'percentage' ? `(${invoiceData.discountValue}%)` : ''}
                          </span>
                          <span className="text-green-600">-{formatCurrency(calculateDiscount())}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax ({invoiceData.taxRate}%):</span>
                        <span className="text-gray-900">{formatCurrency(calculateTax())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping Fee:</span>
                        <span className="text-gray-900">{formatCurrency(invoiceData.shippingFee)}</span>
                      </div>
                      <div className="border-t border-lime-300 pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                          <span className="text-xl font-bold text-lime-600">{formatCurrency(calculateTotal())}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                Save as Draft
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={currentStep === 1 && (!invoiceData.retailerName || !invoiceData.retailerEmail || !invoiceData.dueDate)}
                  className="px-6 py-3 bg-lime-500 hover:bg-lime-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={selectedProducts.length === 0}
                  className="px-6 py-3 bg-lime-500 hover:bg-lime-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  Submit Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
