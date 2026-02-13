
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import KitBuilderHeader from './KitBuilderHeader';
import ProductSelectionPanel from './ProductSelectionPanel';
import KitPreviewPanel from './KitPreviewPanel';
import SaveKitModal from './SaveKitModal';
import KitHistoryModal from './KitHistoryModal';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: number;
}

export interface KitProduct extends Product {
  quantity: number;
}

export interface Kit {
  id?: string;
  name: string;
  description: string;
  products: KitProduct[];
  retailPrice: number;
  discount: number;
  finalPrice: number;
  expirationDate?: string;
  marketingAssets: string[];
  status: 'draft' | 'submitted' | 'approved' | 'template';
  createdAt: string;
  updatedAt: string;
}

export default function KitBuilderPage() {
  const [selectedProducts, setSelectedProducts] = useState<KitProduct[]>([]);
  const [kitDetails, setKitDetails] = useState<Partial<Kit>>({
    name: '',
    description: '',
    retailPrice: 0,
    discount: 0,
    finalPrice: 0,
    marketingAssets: [],
    status: 'draft'
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const handleAddProduct = (product: Product, quantity: number) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      setSelectedProducts(prev =>
        prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        )
      );
    } else {
      setSelectedProducts(prev => [...prev, { ...product, quantity }]);
    }
    
    updatePricing();
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    updatePricing();
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveProduct(productId);
      return;
    }
    
    setSelectedProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, quantity } : p
      )
    );
    updatePricing();
  };

  const updatePricing = () => {
    const totalPrice = selectedProducts.reduce(
      (sum, product) => sum + (product.price * product.quantity),
      0
    );
    
    const discountAmount = (totalPrice * (kitDetails.discount || 0)) / 100;
    const finalPrice = totalPrice - discountAmount;
    
    setKitDetails(prev => ({
      ...prev,
      retailPrice: totalPrice,
      finalPrice: finalPrice
    }));
  };

  const handleSaveKit = () => {
    setShowSaveModal(true);
  };

  const handleSubmitKit = () => {
    setKitDetails(prev => ({ ...prev, status: 'submitted' }));
    console.log('Kit submitted:', { ...kitDetails, products: selectedProducts });
  };

  const handleViewPreviousKits = () => {
    setShowHistoryModal(true);
  };

  const handleLoadKit = (kit: Kit) => {
    setKitDetails(kit);
    setSelectedProducts(kit.products);
    setShowHistoryModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <KitBuilderHeader 
          onSaveKit={handleSaveKit}
          onSubmitKit={handleSubmitKit}
          onViewPreviousKits={handleViewPreviousKits}
          hasProducts={selectedProducts.length > 0}
          kitName={kitDetails.name || ''}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 border-r border-amber-200/50">
            <ProductSelectionPanel 
              onAddProduct={handleAddProduct}
              selectedProducts={selectedProducts}
            />
          </div>
          
          <div className="w-1/2">
            <KitPreviewPanel
              kitDetails={kitDetails}
              setKitDetails={setKitDetails}
              selectedProducts={selectedProducts}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveProduct={handleRemoveProduct}
            />
          </div>
        </div>
      </div>

      {showSaveModal && (
        <SaveKitModal
          kit={{ ...kitDetails, products: selectedProducts }}
          onClose={() => setShowSaveModal(false)}
          onSave={(savedKit) => {
            setKitDetails(savedKit);
            setShowSaveModal(false);
          }}
        />
      )}

      {showHistoryModal && (
        <KitHistoryModal
          onClose={() => setShowHistoryModal(false)}
          onLoadKit={handleLoadKit}
        />
      )}
    </div>
  );
}
