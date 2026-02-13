'use client';

import { useState } from 'react';

interface CatalogProduct {
  id: string;
  masterSKU: string;
  category: string;
  variants: {
    id: string;
    name: string;
    attributes: string[];
    price: number;
    image: string;
    isVisible: boolean;
    status: 'draft' | 'submitted' | 'live';
  }[];
}

const mockCatalogProducts: CatalogProduct[] = [
  {
    id: '1',
    masterSKU: 'Vitamin C Serum',
    category: 'Skincare',
    variants: [
      {
        id: '1-1',
        name: 'Vitamin C Serum - 30ml',
        attributes: ['30ml', 'Glass Bottle'],
        price: 45.99,
        image: 'https://readdy.ai/api/search-image?query=Premium%20vitamin%20C%20serum%20in%20elegant%20glass%20bottle%20with%20dropper%20on%20clean%20white%20background%2C%20professional%20skincare%20product%20photography&width=300&height=300&seq=vitamin-serum-30ml&orientation=squarish',
        isVisible: true,
        status: 'live'
      },
      {
        id: '1-2',
        name: 'Vitamin C Serum - 50ml',
        attributes: ['50ml', 'Glass Bottle'],
        price: 65.99,
        image: 'https://readdy.ai/api/search-image?query=Premium%20vitamin%20C%20serum%20in%20large%20glass%20bottle%20with%20dropper%20on%20clean%20white%20background%2C%20professional%20skincare%20product%20photography&width=300&height=300&seq=vitamin-serum-50ml&orientation=squarish',
        isVisible: true,
        status: 'live'
      }
    ]
  },
  {
    id: '2',
    masterSKU: 'Omega-3 Fish Oil',
    category: 'Supplements',
    variants: [
      {
        id: '2-1',
        name: 'Omega-3 Fish Oil - 60 caps',
        attributes: ['60 capsules', 'Softgel'],
        price: 29.99,
        image: 'https://readdy.ai/api/search-image?query=Premium%20omega-3%20fish%20oil%20supplement%20bottle%20with%20capsules%20on%20clean%20white%20background%2C%20professional%20supplement%20product%20photography&width=300&height=300&seq=omega-3-60caps&orientation=squarish',
        isVisible: false,
        status: 'draft'
      }
    ]
  },
  {
    id: '3',
    masterSKU: 'Collagen Powder',
    category: 'Wellness',
    variants: [
      {
        id: '3-1',
        name: 'Collagen Powder - Vanilla 300g',
        attributes: ['300g', 'Vanilla', 'Powder'],
        price: 55.99,
        image: 'https://readdy.ai/api/search-image?query=Premium%20collagen%20protein%20powder%20container%20in%20vanilla%20flavor%20on%20clean%20white%20background%2C%20professional%20wellness%20product%20photography&width=300&height=300&seq=collagen-vanilla-300g&orientation=squarish',
        isVisible: false,
        status: 'submitted'
      },
      {
        id: '3-2',
        name: 'Collagen Powder - Unflavored 300g',
        attributes: ['300g', 'Unflavored', 'Powder'],
        price: 52.99,
        image: 'https://readdy.ai/api/search-image?query=Premium%20collagen%20protein%20powder%20container%20unflavored%20on%20clean%20white%20background%2C%20professional%20wellness%20product%20photography&width=300&height=300&seq=collagen-unflavored-300g&orientation=squarish',
        isVisible: true,
        status: 'live'
      }
    ]
  }
];

export default function CatalogViewTab() {
  const [products, setProducts] = useState(mockCatalogProducts);
  const [expandedProducts, setExpandedProducts] = useState<string[]>(['1', '3']);

  const toggleProductExpansion = (productId: string) => {
    setExpandedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleVariantVisibility = (productId: string, variantId: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? {
              ...product,
              variants: product.variants.map(variant =>
                variant.id === variantId
                  ? { ...variant, isVisible: !variant.isVisible }
                  : variant
              )
            }
          : product
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'bg-gray-100 text-gray-700',
      submitted: 'bg-blue-100 text-blue-700',
      live: 'bg-green-100 text-green-700'
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Catalog View</h3>
          <div className="flex items-center space-x-3">
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-8 cursor-pointer">
              <option>All Categories</option>
              <option>Skincare</option>
              <option>Supplements</option>
              <option>Wellness</option>
            </select>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-8 cursor-pointer">
              <option>All Visibility</option>
              <option>Visible</option>
              <option>Hidden</option>
            </select>
          </div>
        </div>
        <p className="text-gray-600 mt-1">Visual gallery of SKUs available to retailers</p>
      </div>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200">
            <div
              className="px-6 py-4 border-b border-gray-200 cursor-pointer"
              onClick={() => toggleProductExpansion(product.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <i className={`${expandedProducts.includes(product.id) ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'} w-5 h-5 flex items-center justify-center`}></i>
                  </button>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{product.masterSKU}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {expandedProducts.includes(product.id) && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="relative">
                        <img
                          src={variant.image}
                          alt={variant.name}
                          className="w-full h-48 object-cover object-top rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(variant.status)}`}>
                            {variant.status.charAt(0).toUpperCase() + variant.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-medium text-gray-900 text-sm">{variant.name}</h5>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {variant.attributes.map((attr, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white text-gray-700">
                              {attr}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3">
                          <div className="text-lg font-semibold text-gray-900">${variant.price}</div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Visible:</span>
                            <button
                              onClick={() => toggleVariantVisibility(product.id, variant.id)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                                variant.isVisible ? 'bg-green-600' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                  variant.isVisible ? 'translate-x-5' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 px-3 rounded-md transition-colors cursor-pointer whitespace-nowrap">
                            Edit
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer">
                            <i className="ri-more-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}