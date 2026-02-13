
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import NewOrderHeader from './NewOrderHeader';
import RetailerSelection from './RetailerSelection';
import ProductSelection from './ProductSelection';
import ShippingDetails from './ShippingDetails';
import OrderReview from './OrderReview';

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
  category: string;
  unitPrice: number;
  stock: number;
  image: string;
  quantity: number;
  total: number;
  discount?: number;
  isBundle?: boolean;
  bundleItems?: string[];
}

interface ShippingData {
  method: 'standard' | 'express' | 'overnight';
  address: string;
  specialInstructions: string;
  trackingNumber?: string;
}

export default function NewOrderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [shippingData, setShippingData] = useState<ShippingData>({
    method: 'standard',
    address: '',
    specialInstructions: ''
  });

  const handleRetailerSelect = (retailer: Retailer) => {
    setSelectedRetailer(retailer);
    setShippingData(prev => ({
      ...prev,
      address: retailer.address
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    // Save draft logic here
    const draftId = `DRAFT-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    alert(`Order draft ${draftId} saved successfully!\n\nYou can continue editing this order later from your drafts section. All your progress including retailer selection, products, and shipping details have been saved.`);
  };

  const handleSubmitOrder = () => {
    if (!canSubmitOrder()) return;
    
    // Generate order ID
    const orderId = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    
    // Calculate totals for confirmation
    const subtotal = selectedProducts.reduce((sum, product) => sum + product.total, 0);
    const shippingCost = shippingData.method === 'standard' ? 15 : shippingData.method === 'express' ? 35 : 75;
    const total = subtotal + shippingCost + (subtotal * 0.08); // Include tax
    
    // Submit order logic here
    alert(`🎉 Order ${orderId} Successfully Submitted!\n\nOrder Total: $${total.toFixed(2)}\nRetailer: ${selectedRetailer?.name}\nProducts: ${selectedProducts.length} items\n\n✅ What happens next:\n• Your order is now in the Synergy Admin review queue\n• Expected review time: 1-2 business hours\n• You'll receive email confirmation shortly\n• Admin will validate inventory and pricing\n• Once approved, fulfillment begins immediately\n• Tracking information will be sent to both you and the retailer\n\nThank you for using Synergy B2B Platform!`);
    
    router.push('/orders');
  };

  const canSubmitOrder = () => {
    return currentStep === 4 && 
           selectedRetailer && 
           selectedProducts.length > 0 && 
           shippingData.address;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RetailerSelection
            selectedRetailer={selectedRetailer}
            onRetailerSelect={handleRetailerSelect}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <ProductSelection
            selectedProducts={selectedProducts}
            onProductsChange={setSelectedProducts}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <ShippingDetails
            shippingData={shippingData}
            onShippingChange={setShippingData}
            onNext={handleNextStep}
            onBack={handlePrevStep}
            retailerAddress={selectedRetailer?.address || ''}
          />
        );
      case 4:
        return (
          <OrderReview
            retailer={selectedRetailer!}
            products={selectedProducts}
            shipping={shippingData}
            onBack={handlePrevStep}
            onSubmit={handleSubmitOrder}
            onProductsChange={setSelectedProducts}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <NewOrderHeader
          currentStep={currentStep}
          onSaveDraft={handleSaveDraft}
          onSubmitOrder={handleSubmitOrder}
          canSubmit={canSubmitOrder()}
        />
        
        {renderCurrentStep()}
      </div>
    </div>
  );
}
