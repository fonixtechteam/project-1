'use client';

interface ConfirmDeleteModalProps {
  type: 'folder' | 'subfolder' | 'asset';
  item: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ type, item, onClose, onConfirm }: ConfirmDeleteModalProps) {
  const getTypeInfo = () => {
    switch (type) {
      case 'folder':
        return {
          title: 'Delete Product Folder',
          icon: 'ri-folder-line',
          iconColor: 'text-red-600 bg-red-100',
          description: `Are you sure you want to delete the product folder "${item.name}"?`,
          warning: 'This will permanently delete the folder and ALL assets inside it, including images, documents, and videos. This action cannot be undone.'
        };
      case 'subfolder':
        return {
          title: 'Delete Subfolder',
          icon: 'ri-folder-open-line',
          iconColor: 'text-red-600 bg-red-100',
          description: `Are you sure you want to delete the subfolder "${item.name}"?`,
          warning: 'This will permanently delete the subfolder and all assets inside it. This action cannot be undone.'
        };
      case 'asset':
        return {
          title: 'Delete Asset',
          icon: item.type === 'image' ? 'ri-image-line' : item.type === 'video' ? 'ri-video-line' : 'ri-file-pdf-line',
          iconColor: 'text-red-600 bg-red-100',
          description: `Are you sure you want to delete "${item.name}"?`,
          warning: 'This will permanently remove this asset from your library. This action cannot be undone.'
        };
      default:
        return {
          title: 'Delete Item',
          icon: 'ri-delete-bin-line',
          iconColor: 'text-red-600 bg-red-100',
          description: 'Are you sure you want to delete this item?',
          warning: 'This action cannot be undone.'
        };
    }
  };

  const typeInfo = getTypeInfo();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${typeInfo.iconColor}`}>
              <i className={`${typeInfo.icon} w-5 h-5 flex items-center justify-center`}></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{typeInfo.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-900 mb-4">{typeInfo.description}</p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex">
              <i className="ri-alert-line w-5 h-5 flex items-center justify-center text-red-600 mr-3 mt-0.5"></i>
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">Warning</p>
                <p className="text-sm text-red-700">{typeInfo.warning}</p>
              </div>
            </div>
          </div>

          {type === 'folder' && item.totalAssets && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                This folder contains <strong>{item.totalAssets} assets</strong> across multiple subfolders.
              </p>
            </div>
          )}

          {type === 'subfolder' && item.assets && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                This subfolder contains <strong>{item.assets.length} asset{item.assets.length !== 1 ? 's' : ''}</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
          >
            Delete {type === 'folder' ? 'Folder' : type === 'subfolder' ? 'Subfolder' : 'Asset'}
          </button>
        </div>
      </div>
    </div>
  );
}