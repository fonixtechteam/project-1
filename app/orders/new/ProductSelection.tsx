
'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitPrice: number;
  stock: number;
  image: string;
}

interface SelectedProduct extends Product {
  quantity: number;
  total: number;
  discount?: number;
}

interface ProductSelectionProps {
  selectedProducts: SelectedProduct[];
  onProductsChange: (products: SelectedProduct[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Hydrating Face Serum',
    sku: 'HFS-001',
    category: 'Serums',
    unitPrice: 45.00,
    stock: 150,
    image: 'https://readdy.ai/api/search-image?query=luxury%20hydrating%20face%20serum%20bottle%20with%20dropper%20clean%20white%20background%20professional%20skincare%20product%20photography%20modern%20elegant%20design&width=200&height=200&seq=serum001&orientation=squarish'
  },
  {
    id: 'p2',
    name: 'Vitamin C Moisturizer',
    sku: 'VCM-002',
    category: 'Moisturizers',
    unitPrice: 35.00,
    stock: 200,
    image: 'https://readdy.ai/api/search-image?query=vitamin%20c%20moisturizer%20cream%20jar%20with%20pump%20clean%20white%20background%20professional%20skincare%20product%20photography%20modern%20elegant%20design&width=200&height=200&seq=moisturizer001&orientation=squarish'
  },
  {
    id: 'p3',
    name: 'Anti-Aging Night Cream',
    sku: 'ANC-003',
    category: 'Night Care',
    unitPrice: 65.00,
    stock: 80,
    image: 'https://readdy.ai/api/search-image?query=anti%20aging%20night%20cream%20luxury%20jar%20with%20gold%20accents%20clean%20white%20background%20professional%20skincare%20product%20photography%20elegant%20design&width=200&height=200&seq=nightcream001&orientation=squarish'
  },
  {
    id: 'p4',
    name: 'Cleansing Oil',
    sku: 'CO-004',
    category: 'Cleansers',
    unitPrice: 29.50,
    stock: 120,
    image: 'https://readdy.ai/api/search-image?query=cleansing%20oil%20bottle%20with%20pump%20dispenser%20clean%20white%20background%20professional%20skincare%20product%20photography%20modern%20minimalist%20design&width=200&height=200&seq=cleansingoil001&orientation=squarish'
  },
  {
    id: 'p5',
    name: 'Retinol Treatment Serum',
    sku: 'RTS-005',
    category: 'Serums',
    unitPrice: 55.00,
    stock: 90,
    image: 'https://readdy.ai/api/search-image?query=retinol%20treatment%20serum%20dark%20bottle%20with%20dropper%20clean%20white%20background%20professional%20skincare%20product%20photography%20premium%20elegant%20design&width=200&height=200&seq=retinol001&orientation=squarish'
  },
  {
    id: 'p6',
    name: 'Hyaluronic Acid Mask',
    sku: 'HAM-006',
    category: 'Masks',
    unitPrice: 22.50,
    stock: 180,
    image: 'https://readdy.ai/api/search-image?query=hyaluronic%20acid%20face%20mask%20tube%20with%20flip%20cap%20clean%20white%20background%20professional%20skincare%20product%20photography%20fresh%20modern%20design&width=200&height=200&seq=mask001&orientation=squarish'
  },
  {
    id: 'p7',
    name: 'Organic Face Cleanser',
    sku: 'OFC-007',
    category: 'Cleansers',
    unitPrice: 28.00,
    stock: 160,
    image: 'https://readdy.ai/api/search-image?query=organic%20face%20cleanser%20tube%20with%20natural%20ingredients%20clean%20white%20background%20professional%20skincare%20product%20photography%20eco%20friendly%20design&width=200&height=200&seq=cleanser007&orientation=squarish'
  },
  {
    id: 'p8',
    name: 'Natural Toner Spray',
    sku: 'NTS-008',
    category: 'Toners',
    unitPrice: 18.50,
    stock: 140,
    image: 'https://readdy.ai/api/search-image?query=natural%20toner%20spray%20bottle%20with%20mist%20dispenser%20clean%20white%20background%20professional%20skincare%20product%20photography%20fresh%20minimalist%20design&width=200&height=200&seq=toner008&orientation=squarish'
  }
];

const categories = ['All', 'Serums', 'Moisturizers', 'Night Care', 'Cleansers', 'Masks', 'Toners'];

export default function ProductSelection({ selectedProducts, onProductsChange, onNext, onBack }: ProductSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductAdd = (product: Product) => {
    const existing = selectedProducts.find(p => p.id === product.id);
    if (existing) {
      const updated = selectedProducts.map(p =>
        p.id === product.id 
          ? { ...p, quantity: p.quantity + 1, total: (p.quantity + 1) * p.unitPrice }
          : p
      );
      onProductsChange(updated);
    } else {
      const newProduct: SelectedProduct = {
        ...product,
        quantity: 1,
        total: product.unitPrice
      };
      onProductsChange([...selectedProducts, newProduct]);
    }
    setIsProductDropdownOpen(false);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      onProductsChange(selectedProducts.filter(p => p.id !== productId));
    } else {
      const updated = selectedProducts.map(p =>
        p.id === productId 
          ? { ...p, quantity, total: quantity * p.unitPrice }
          : p
      );
      onProductsChange(updated);
    }
  };

  const calculateSubtotal = () => {
    return selectedProducts.reduce((sum, product) => sum + product.total, 0);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Step 2: Product Selection</h2>
            <p className="text-gray-600 mt-1">Select products from your inventory to add to the order</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg">
            <i className="ri-shopping-bag-line w-4 h-4 flex items-center justify-center text-blue-600"></i>
            <span className="text-sm text-blue-700 font-medium">{selectedProducts.length} Products Selected</span>
          </div>
        </div>

        {/* Product Selection Dropdown */}
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Products to Order
            </label>
            <button
              type="button"
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Search and select products...</span>
                <i className={`ri-arrow-${isProductDropdownOpen ? 'up' : 'down'}-s-line text-gray-400 transition-transform`}></i>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProductDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-96 overflow-hidden">
                {/* Search and Filter Bar */}
                <div className="p-4 border-b border-gray-100 space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-search-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Search by product name or SKU..."
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer pr-8"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Product List */}
                <div className="max-h-80 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleProductAdd(product)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{product.name}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600">SKU: {product.sku}</span>
                            <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                            <span className="text-sm font-medium text-red-600">${product.unitPrice.toFixed(2)}</span>
                          </div>
                          <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full mt-1">
                            {product.category}
                          </span>
                        </div>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <i className="ri-add-line text-red-600"></i>
                        </div>
                      </div>
                    </button>
                  ))}

                  {filteredProducts.length === 0 && (
                    <div className="px-4 py-8 text-center">
                      <i className="ri-search-line w-12 h-12 flex items-center justify-center text-gray-300 mx-auto mb-3"></i>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No products found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Selected Products */}
          {selectedProducts.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Products</h3>
              <div className="space-y-4">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{product.name}</h4>
                      <p className="text-sm text-gray-600">SKU: {product.sku} | Stock: {product.stock}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600">Unit Price:</span>
                        <span className="font-medium text-red-600">${product.unitPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                        >
                          <i className="ri-subtract-line text-sm"></i>
                        </button>
                        <div className="w-16">
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                            className="w-full text-center border border-gray-200 rounded-lg py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            min="1"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                        >
                          <i className="ri-add-line text-sm"></i>
                        </button>
                      </div>
                      
                      <div className="text-right min-w-0">
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="font-bold text-red-600">${product.total.toFixed(2)}</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, 0)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Remove product"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Subtotal */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Order Subtotal</span>
                    <span className="text-2xl font-bold text-red-600">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {selectedProducts.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <i className="ri-shopping-cart-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products selected</h3>
              <p className="text-gray-500">Click the dropdown above to search and select products for this order</p>
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
          Back to Retailer
        </button>
        
        <button
          onClick={onNext}
          disabled={selectedProducts.length === 0}
          className={`flex items-center px-8 py-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap font-semibold text-lg shadow-lg ${
            selectedProducts.length > 0
              ? 'bg-lime-600 text-white hover:bg-lime-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Shipping
          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-3"></i>
        </button>
      </div>

      {/* Click outside to close dropdown */}
      {isProductDropdownOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsProductDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
}
