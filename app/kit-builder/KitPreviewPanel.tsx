
'use client';

import { useState } from 'react';
import { Kit, KitProduct } from './page';

interface KitPreviewPanelProps {
  kitDetails: Partial<Kit>;
  setKitDetails: (details: Partial<Kit>) => void;
  selectedProducts: KitProduct[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveProduct: (productId: string) => void;
}

export default function KitPreviewPanel({
  kitDetails,
  setKitDetails,
  selectedProducts,
  onUpdateQuantity,
  onRemoveProduct
}: KitPreviewPanelProps) {
  const [draggedAsset, setDraggedAsset] = useState<File | null>(null);

  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + (product.price * product.quantity),
    0
  );

  const discountAmount = (totalPrice * (kitDetails.discount || 0)) / 100;
  const finalPrice = totalPrice - discountAmount;

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newAssets = Array.from(files).map(file => URL.createObjectURL(file));
    setKitDetails({
      ...kitDetails,
      marketingAssets: [...(kitDetails.marketingAssets || []), ...newAssets]
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
    setDraggedAsset(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedAsset(e.dataTransfer.files[0] || null);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedAsset(null);
  };

  const removeAsset = (assetIndex: number) => {
    const updatedAssets = kitDetails.marketingAssets?.filter((_, index) => index !== assetIndex) || [];
    setKitDetails({ ...kitDetails, marketingAssets: updatedAssets });
  };

  return (
    <div className="h-full flex flex-col bg-white/60 backdrop-blur-sm">
      <div className="p-6 border-b border-amber-200/50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kit Preview</h2>
        
        {/* Kit Details Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kit Name</label>
            <input
              type="text"
              placeholder="Enter kit name..."
              value={kitDetails.name || ''}
              onChange={(e) => setKitDetails({ ...kitDetails, name: e.target.value })}
              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Describe your kit..."
              value={kitDetails.description || ''}
              onChange={(e) => setKitDetails({ ...kitDetails, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={kitDetails.discount || ''}
                onChange={(e) => setKitDetails({ ...kitDetails, discount: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
              <input
                type="date"
                value={kitDetails.expirationDate || ''}
                onChange={(e) => setKitDetails({ ...kitDetails, expirationDate: e.target.value })}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selected Products */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Products in Kit</h3>
            <span className="text-sm text-gray-600">
              {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {selectedProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-package-line text-4xl mb-4 w-full flex justify-center"></i>
              <p className="text-lg font-medium mb-2">No products selected</p>
              <p className="text-sm">Select products from the left panel to start building your kit</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-white/80 rounded-xl border border-amber-200/50 flex items-center gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                    <p className="text-sm text-gray-600">${product.price} each</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <i className="ri-subtract-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                    
                    <span className="min-w-[2rem] text-center font-medium">
                      {product.quantity}
                    </span>
                    
                    <button
                      onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${(product.price * product.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => onRemoveProduct(product.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                    >
                      <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pricing Summary */}
          {selectedProducts.length > 0 && (
            <div className="mt-6 p-4 bg-lime-50/80 rounded-xl border border-lime-200/50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                
                {(kitDetails.discount || 0) > 0 && (
                  <div className="flex justify-between text-coral-600">
                    <span>Discount ({kitDetails.discount}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-lime-200 pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Final Price:</span>
                    <span className="text-lime-600">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Marketing Assets */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Assets</h3>
            
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                draggedAsset
                  ? 'border-lime-500 bg-lime-50/50'
                  : 'border-amber-300 hover:border-lime-400'
              }`}
            >
              <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-3 w-full flex justify-center"></i>
              <p className="text-gray-600 mb-2">
                Drag & drop images or PDFs here, or{' '}
                <label className="text-lime-600 hover:text-lime-700 cursor-pointer font-medium">
                  browse files
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500">Upload marketing materials for your kit</p>
            </div>

            {/* Uploaded Assets */}
            {kitDetails.marketingAssets && kitDetails.marketingAssets.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {kitDetails.marketingAssets.map((asset, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={asset}
                      alt={`Marketing asset ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeAsset(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
