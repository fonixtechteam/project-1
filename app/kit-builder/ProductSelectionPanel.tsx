
'use client';

import { useState } from 'react';
import { Product, KitProduct } from './page';

interface ProductSelectionPanelProps {
  onAddProduct: (product: Product, quantity: number) => void;
  selectedProducts: KitProduct[];
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Vitamin C Brightening Serum',
    category: 'Skincare',
    price: 45.99,
    image: 'https://readdy.ai/api/search-image?query=Premium%20vitamin%20C%20serum%20bottle%20with%20dropper%2C%20clean%20white%20background%2C%20professional%20skincare%20product%20photography%20with%20elegant%20lighting%20and%20minimal%20styling&width=400&height=400&seq=vitc-serum&orientation=squarish',
    description: 'Powerful antioxidant serum with 20% Vitamin C',
    inStock: 150
  },
  {
    id: '2',
    name: 'Hyaluronic Acid Moisturizer',
    category: 'Skincare',
    price: 38.50,
    image: 'https://readdy.ai/api/search-image?query=Luxurious%20hyaluronic%20acid%20moisturizer%20jar%20with%20clean%20white%20background%2C%20professional%20skincare%20product%20photography%20with%20soft%20lighting%20and%20minimal%20aesthetic&width=400&height=400&seq=ha-moisturizer&orientation=squarish',
    description: 'Deep hydrating moisturizer with hyaluronic acid',
    inStock: 200
  },
  {
    id: '3',
    name: 'Retinol Night Cream',
    category: 'Skincare',
    price: 52.00,
    image: 'https://readdy.ai/api/search-image?query=Premium%20retinol%20night%20cream%20in%20elegant%20dark%20packaging%2C%20clean%20white%20background%2C%20professional%20skincare%20product%20photography%20with%20sophisticated%20lighting&width=400&height=400&seq=retinol-cream&orientation=squarish',
    description: 'Anti-aging night cream with 0.5% retinol',
    inStock: 75
  },
  {
    id: '4',
    name: 'Nourishing Hair Oil',
    category: 'Haircare',
    price: 29.99,
    image: 'https://readdy.ai/api/search-image?query=Elegant%20hair%20oil%20bottle%20with%20dropper%2C%20amber%20glass%20container%20on%20clean%20white%20background%2C%20professional%20beauty%20product%20photography%20with%20warm%20lighting&width=400&height=400&seq=hair-oil&orientation=squarish',
    description: 'Organic argan and jojoba oil blend',
    inStock: 120
  },
  {
    id: '5',
    name: 'Keratin Repair Shampoo',
    category: 'Haircare',
    price: 24.50,
    image: 'https://readdy.ai/api/search-image?query=Professional%20keratin%20shampoo%20bottle%20with%20sleek%20design%2C%20clean%20white%20background%2C%20beauty%20product%20photography%20with%20modern%20aesthetic%20and%20soft%20shadows&width=400&height=400&seq=keratin-shampoo&orientation=squarish',
    description: 'Restorative shampoo with keratin proteins',
    inStock: 180
  },
  {
    id: '6',
    name: 'Deep Conditioning Mask',
    category: 'Haircare',
    price: 35.75,
    image: 'https://readdy.ai/api/search-image?query=Luxurious%20hair%20conditioning%20mask%20jar%20with%20premium%20packaging%2C%20clean%20white%20background%2C%20professional%20beauty%20product%20photography%20with%20elegant%20styling&width=400&height=400&seq=conditioning-mask&orientation=squarish',
    description: 'Intensive repair mask for damaged hair',
    inStock: 90
  }
];

export default function ProductSelectionPanel({ onAddProduct, selectedProducts }: ProductSelectionPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToKit = () => {
    if (selectedProduct && quantity > 0) {
      onAddProduct(selectedProduct, quantity);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/60 backdrop-blur-sm">
      <div className="p-6 border-b border-amber-200/50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Products</h2>
        
        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm pr-8"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {filteredProducts.map(product => {
            const isSelected = selectedProducts.find(p => p.id === product.id);
            const isCurrentlySelected = selectedProduct?.id === product.id;
            
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isCurrentlySelected
                    ? 'border-lime-500 bg-lime-50/80 shadow-md'
                    : 'border-amber-200/50 bg-white/80 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-lime-600">${product.price}</span>
                      <span className="text-sm text-gray-500">Stock: {product.inStock}</span>
                    </div>
                    {isSelected && (
                      <div className="mt-2 text-sm text-amber-600 font-medium">
                        Already in kit (Qty: {isSelected.quantity})
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add to Kit Section */}
      {selectedProduct && (
        <div className="p-6 border-t border-amber-200/50 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{selectedProduct.name}</h4>
              <p className="text-lime-600 font-bold">${selectedProduct.price}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Qty:</label>
              <input
                type="number"
                min="1"
                max={selectedProduct.inStock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1 border border-amber-200 rounded text-center text-sm"
              />
            </div>
            
            <button
              onClick={handleAddToKit}
              className="flex-1 px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
              Add to Kit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
