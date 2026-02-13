
'use client';

import { useState } from 'react';
import { Kit } from './page';
import KitDetailModal from './KitDetailModal';

interface KitHistoryModalProps {
  onClose: () => void;
  onLoadKit: (kit: Kit) => void;
}

export default function KitHistoryModal({ onClose, onLoadKit }: KitHistoryModalProps) {
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for previous kits
  const mockKits: Kit[] = [
    {
      id: '1',
      name: 'Summer Skincare Bundle',
      description: 'Perfect skincare routine for summer with SPF protection and hydrating serums',
      products: [
        {
          id: '1',
          name: 'Hydrating Face Serum',
          category: 'Skincare',
          price: 45.99,
          image: 'https://readdy.ai/api/search-image?query=luxury%20hydrating%20face%20serum%20bottle%20with%20dropper%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20minimalist%20skincare%20packaging%20design&width=400&height=400&seq=serum1&orientation=squarish',
          description: 'Deep hydrating serum with hyaluronic acid',
          inStock: 25,
          quantity: 2
        },
        {
          id: '2',
          name: 'Daily SPF Moisturizer',
          category: 'Skincare',
          price: 32.99,
          image: 'https://readdy.ai/api/search-image?query=premium%20SPF%20moisturizer%20tube%2C%20clean%20white%20background%2C%20professional%20skincare%20product%20photography%2C%20elegant%20packaging%20design&width=400&height=400&seq=spf1&orientation=squarish',
          description: 'Lightweight moisturizer with broad-spectrum SPF 30',
          inStock: 30,
          quantity: 1
        }
      ],
      retailPrice: 124.97,
      discount: 15,
      finalPrice: 106.22,
      expirationDate: '2024-08-31',
      marketingAssets: [
        'https://readdy.ai/api/search-image?query=summer%20skincare%20routine%20lifestyle%20image%2C%20bright%20natural%20lighting%2C%20fresh%20clean%20aesthetic%2C%20skincare%20products%20arranged%20beautifully&width=600&height=400&seq=summer1&orientation=landscape'
      ],
      status: 'approved',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z'
    },
    {
      id: '2',
      name: 'Hair Care Essentials',
      description: 'Complete hair care routine with shampoo, conditioner, and styling products',
      products: [
        {
          id: '11',
          name: 'Nourishing Shampoo',
          category: 'Haircare',
          price: 28.99,
          image: 'https://readdy.ai/api/search-image?query=premium%20shampoo%20bottle%20with%20pump%2C%20clean%20white%20background%2C%20professional%20haircare%20product%20photography%2C%20elegant%20bottle%20design&width=400&height=400&seq=shampoo1&orientation=squarish',
          description: 'Sulfate-free shampoo for all hair types',
          inStock: 20,
          quantity: 1
        },
        {
          id: '12',
          name: 'Repairing Conditioner',
          category: 'Haircare',
          price: 31.99,
          image: 'https://readdy.ai/api/search-image?query=luxury%20conditioner%20bottle%20with%20pump%2C%20clean%20white%20background%2C%20professional%20haircare%20product%20photography%2C%20premium%20packaging%20design&width=400&height=400&seq=conditioner1&orientation=squarish',
          description: 'Deep conditioning treatment for damaged hair',
          inStock: 18,
          quantity: 1
        }
      ],
      retailPrice: 60.98,
      discount: 10,
      finalPrice: 54.88,
      marketingAssets: [],
      status: 'draft',
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-12T16:20:00Z'
    },
    {
      id: '3',
      name: 'Anti-Aging Power Kit',
      description: 'Advanced anti-aging routine with retinol and vitamin C',
      products: [
        {
          id: '3',
          name: 'Vitamin C Brightening Serum',
          category: 'Skincare',
          price: 52.99,
          image: 'https://readdy.ai/api/search-image?query=vitamin%20C%20serum%20bottle%20with%20dropper%2C%20clean%20white%20background%2C%20professional%20skincare%20product%20photography%2C%20amber%20glass%20bottle%20design&width=400&height=400&seq=vitc1&orientation=squarish',
          description: 'Powerful antioxidant serum for brighter skin',
          inStock: 15,
          quantity: 1
        },
        {
          id: '4',
          name: 'Retinol Night Treatment',
          category: 'Skincare',
          price: 68.99,
          image: 'https://readdy.ai/api/search-image?query=retinol%20night%20treatment%20bottle%2C%20clean%20white%20background%2C%20professional%20skincare%20product%20photography%2C%20dark%20glass%20bottle%20design&width=400&height=400&seq=retinol1&orientation=squarish',
          description: 'Advanced retinol formula for anti-aging',
          inStock: 12,
          quantity: 1
        }
      ],
      retailPrice: 121.98,
      discount: 20,
      finalPrice: 97.58,
      expirationDate: '2024-12-31',
      marketingAssets: [
        'https://readdy.ai/api/search-image?query=anti-aging%20skincare%20routine%20setup%2C%20elegant%20lifestyle%20photography%2C%20luxury%20skincare%20products%2C%20clean%20modern%20aesthetic&width=600&height=400&seq=antiaging1&orientation=landscape'
      ],
      status: 'submitted',
      createdAt: '2024-01-08T14:22:00Z',
      updatedAt: '2024-01-08T14:22:00Z'
    },
    {
      id: '4',
      name: 'Travel Size Essentials',
      description: 'Perfect travel-sized skincare essentials for on-the-go beauty',
      products: [
        {
          id: '5',
          name: 'Travel Cleanser',
          category: 'Skincare',
          price: 15.99,
          image: 'https://readdy.ai/api/search-image?query=travel%20size%20cleanser%20bottle%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20compact%20travel%20packaging&width=400&height=400&seq=travel1&orientation=squarish',
          description: 'Gentle travel-size facial cleanser',
          inStock: 35,
          quantity: 2
        }
      ],
      retailPrice: 31.98,
      discount: 0,
      finalPrice: 31.98,
      marketingAssets: [],
      status: 'template',
      createdAt: '2024-01-05T11:45:00Z',
      updatedAt: '2024-01-05T11:45:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'template':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return 'ri-check-line';
      case 'submitted':
        return 'ri-upload-line';
      case 'draft':
        return 'ri-draft-line';
      case 'template':
        return 'ri-bookmark-line';
      default:
        return 'ri-file-line';
    }
  };

  const filteredKits = mockKits.filter(kit => {
    const matchesStatus = filterStatus === 'all' || kit.status === filterStatus;
    const matchesSearch = kit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kit.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Kit History</h3>
            <p className="text-gray-600 mt-1">View and manage your previous kits</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                <input
                  type="text"
                  placeholder="Search kits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'draft', 'submitted', 'approved', 'template'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    filterStatus === status
                      ? 'bg-lime-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kit List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredKits.length === 0 ? (
            <div className="text-center py-12">
              <i className="ri-package-line text-6xl text-gray-400 mb-4 w-full flex justify-center"></i>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">No kits found</h4>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredKits.map((kit) => (
                <div
                  key={kit.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-semibold text-gray-900">{kit.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(kit.status)}`}>
                          <i className={`${getStatusIcon(kit.status)} mr-1 w-3 h-3 inline-flex items-center justify-center`}></i>
                          {kit.status.charAt(0).toUpperCase() + kit.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{kit.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>{kit.products.length} products</span>
                        <span>Created {formatDate(kit.createdAt)}</span>
                        <span className="font-semibold text-lime-600">${kit.finalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setSelectedKit(kit)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors whitespace-nowrap"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onLoadKit(kit)}
                        className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                      >
                        Load Kit
                      </button>
                    </div>
                  </div>

                  {/* Product Preview */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Products:</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {kit.products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-6 h-6 object-cover rounded-full"
                          />
                          <span className="text-sm text-gray-600">{product.name}</span>
                          {product.quantity > 1 && (
                            <span className="text-xs text-gray-500">×{product.quantity}</span>
                          )}
                        </div>
                      ))}
                      {kit.products.length > 3 && (
                        <span className="text-sm text-gray-500">+{kit.products.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Kit Detail Modal */}
      {selectedKit && (
        <KitDetailModal
          kit={selectedKit}
          onClose={() => setSelectedKit(null)}
          onLoadKit={onLoadKit}
        />
      )}
    </div>
  );
}
