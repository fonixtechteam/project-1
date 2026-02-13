
'use client';

import { Kit } from './page';

interface KitDetailModalProps {
  kit: Kit;
  onClose: () => void;
  onLoadKit: (kit: Kit) => void;
}

export default function KitDetailModal({ kit, onClose, onLoadKit }: KitDetailModalProps) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{kit.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(kit.status)}`}>
                <i className={`${getStatusIcon(kit.status)} mr-1 w-4 h-4 inline-flex items-center justify-center`}></i>
                {kit.status.charAt(0).toUpperCase() + kit.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-600">{kit.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onLoadKit(kit)}
              className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Load Kit
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Kit Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Kit Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{formatDate(kit.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">{formatDate(kit.updatedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Products Count:</span>
                    <span className="font-medium">{kit.products.length} items</span>
                  </div>
                  {kit.expirationDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span className="font-medium">{new Date(kit.expirationDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Pricing Details</h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Retail Price:</span>
                    <span className="font-medium">${kit.retailPrice.toFixed(2)}</span>
                  </div>
                  {kit.discount > 0 && (
                    <div className="flex justify-between text-coral-600">
                      <span>Discount ({kit.discount}%):</span>
                      <span>-${((kit.retailPrice * kit.discount) / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Final Price:</span>
                      <span className="text-lime-600">${kit.finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Products in Kit</h4>
              <div className="space-y-3">
                {kit.products.map((product) => (
                  <div key={product.id} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 truncate">{product.name}</h5>
                      <p className="text-sm text-gray-600 truncate">{product.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">{product.category}</span>
                        <span className="text-sm font-medium text-gray-700">${product.price} each</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Quantity</div>
                      <div className="text-lg font-semibold">{product.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Subtotal</div>
                      <div className="text-lg font-semibold text-lime-600">
                        ${(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marketing Assets */}
            {kit.marketingAssets && kit.marketingAssets.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Marketing Assets</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {kit.marketingAssets.map((asset, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={asset}
                        alt={`Marketing asset ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button className="px-3 py-2 bg-white text-gray-900 rounded-lg font-medium">
                          View Full Size
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Close
              </button>
              <button
                onClick={() => onLoadKit(kit)}
                className="px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                Load Kit for Editing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
