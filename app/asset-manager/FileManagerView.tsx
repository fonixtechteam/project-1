
'use client';

import { useState } from 'react';
import FolderItem from './FolderItem';
import FolderContents from './FolderContents';
import AssetPreviewModal from './AssetPreviewModal';
import RenameFolderModal from './RenameFolderModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  size: string;
  uploadDate: string;
  status: 'approved' | 'pending' | 'rejected' | 'submitted';
  thumbnail?: string;
  feedback?: string;
}

interface Subfolder {
  id: string;
  name: string;
  icon: string;
  assets: Asset[];
  lastModified: string;
  status: 'approved' | 'pending' | 'rejected' | 'submitted';
}

interface ProductFolder {
  id: string;
  name: string;
  thumbnail?: string;
  subfolders: Subfolder[];
  dateCreated: string;
  lastModified: string;
  totalAssets: number;
  status: 'approved' | 'pending' | 'rejected' | 'submitted';
}

const sampleFolders: ProductFolder[] = [
  {
    id: '1',
    name: 'Vitamin C Brightening Serum',
    thumbnail: 'https://readdy.ai/api/search-image?query=vitamin%20c%20serum%20bottle%20with%20dropper%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20minimal%20shadows&width=120&height=120&seq=1&orientation=squarish',
    dateCreated: '2024-01-15',
    lastModified: '2024-01-25',
    totalAssets: 18,
    status: 'approved',
    subfolders: [
      {
        id: '1-1',
        name: 'Product Images',
        icon: 'ri-image-line',
        lastModified: '2024-01-25',
        status: 'approved',
        assets: [
          {
            id: 'img-1',
            name: 'serum-main-product.jpg',
            type: 'image',
            size: '2.4 MB',
            uploadDate: '2024-01-25',
            status: 'approved',
            thumbnail: 'https://readdy.ai/api/search-image?query=vitamin%20c%20serum%20bottle%20dropper%20elegant%20lighting%20professional%20product%20photography&width=150&height=150&seq=2&orientation=squarish'
          },
          {
            id: 'img-2',
            name: 'serum-lifestyle-01.jpg',
            type: 'image',
            size: '3.1 MB',
            uploadDate: '2024-01-24',
            status: 'approved',
            thumbnail: 'https://readdy.ai/api/search-image?query=woman%20applying%20vitamin%20c%20serum%20skincare%20routine%20lifestyle%20photography%20natural%20lighting&width=150&height=150&seq=3&orientation=squarish'
          },
          {
            id: 'img-3',
            name: 'serum-ingredients-infographic.jpg',
            type: 'image',
            size: '1.8 MB',
            uploadDate: '2024-01-23',
            status: 'pending',
            thumbnail: 'https://readdy.ai/api/search-image?query=vitamin%20c%20ingredients%20infographic%20skincare%20benefits%20chart%20clean%20design&width=150&height=150&seq=4&orientation=squarish'
          },
          {
            id: 'img-4',
            name: 'serum-texture-closeup.jpg',
            type: 'image',
            size: '2.2 MB',
            uploadDate: '2024-01-22',
            status: 'rejected',
            feedback: 'Image quality needs improvement. Please provide higher resolution.',
            thumbnail: 'https://readdy.ai/api/search-image?query=serum%20drop%20texture%20closeup%20macro%20photography%20golden%20liquid&width=150&height=150&seq=5&orientation=squarish'
          }
        ]
      },
      {
        id: '1-2',
        name: 'Marketing Assets',
        icon: 'ri-megaphone-line',
        lastModified: '2024-01-22',
        status: 'pending',
        assets: [
          {
            id: 'mkt-1',
            name: 'serum-banner-1200x400.jpg',
            type: 'image',
            size: '850 KB',
            uploadDate: '2024-01-22',
            status: 'submitted',
            thumbnail: 'https://readdy.ai/api/search-image?query=vitamin%20c%20serum%20marketing%20banner%20clean%20design%20professional%20layout&width=150&height=100&seq=6&orientation=landscape'
          },
          {
            id: 'mkt-2',
            name: 'social-media-post-square.jpg',
            type: 'image',
            size: '420 KB',
            uploadDate: '2024-01-21',
            status: 'approved',
            thumbnail: 'https://readdy.ai/api/search-image?query=vitamin%20c%20skincare%20social%20media%20post%20square%20format%20lifestyle&width=150&height=150&seq=7&orientation=squarish'
          },
          {
            id: 'vid-1',
            name: 'product-demo-30sec.mp4',
            type: 'video',
            size: '5.2 MB',
            uploadDate: '2024-01-20',
            status: 'pending'
          }
        ]
      },
      {
        id: '1-3',
        name: 'Compliance Documents',
        icon: 'ri-shield-check-line',
        lastModified: '2024-01-20',
        status: 'approved',
        assets: [
          {
            id: 'doc-1',
            name: 'COA-Certificate.pdf',
            type: 'document',
            size: '145 KB',
            uploadDate: '2024-01-20',
            status: 'approved'
          },
          {
            id: 'doc-2',
            name: 'Safety-Data-Sheet.pdf',
            type: 'document',
            size: '230 KB',
            uploadDate: '2024-01-18',
            status: 'approved'
          },
          {
            id: 'doc-3',
            name: 'Product-Specifications.pdf',
            type: 'document',
            size: '180 KB',
            uploadDate: '2024-01-16',
            status: 'rejected',
            feedback: 'Missing required certifications. Please include FDA approval.'
          }
        ]
      },
      {
        id: '1-4',
        name: 'Videos',
        icon: 'ri-video-line',
        lastModified: '2024-01-15',
        status: 'submitted',
        assets: [
          {
            id: 'vid-2',
            name: 'product-tutorial-full.mp4',
            type: 'video',
            size: '12.5 MB',
            uploadDate: '2024-01-15',
            status: 'submitted'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Omega-3 Fish Oil Capsules',
    thumbnail: 'https://readdy.ai/api/search-image?query=omega%203%20fish%20oil%20supplement%20bottle%20capsules%20clean%20white%20background%20professional%20product%20photography&width=120&height=120&seq=3&orientation=squarish',
    dateCreated: '2024-01-10',
    lastModified: '2024-01-23',
    totalAssets: 12,
    status: 'pending',
    subfolders: [
      {
        id: '2-1',
        name: 'Product Images',
        icon: 'ri-image-line',
        lastModified: '2024-01-23',
        status: 'pending',
        assets: [
          {
            id: 'img-4',
            name: 'omega3-bottle-main.jpg',
            type: 'image',
            size: '2.1 MB',
            uploadDate: '2024-01-23',
            status: 'pending'
          },
          {
            id: 'img-5',
            name: 'omega3-capsules-detail.jpg',
            type: 'image',
            size: '1.9 MB',
            uploadDate: '2024-01-22',
            status: 'submitted'
          }
        ]
      },
      {
        id: '2-2',
        name: 'Marketing Assets',
        icon: 'ri-megaphone-line',
        lastModified: '2024-01-20',
        status: 'approved',
        assets: [
          {
            id: 'mkt-3',
            name: 'omega3-health-benefits-infographic.jpg',
            type: 'image',
            size: '1.2 MB',
            uploadDate: '2024-01-20',
            status: 'approved'
          }
        ]
      },
      {
        id: '2-3',
        name: 'Compliance Documents',
        icon: 'ri-shield-check-line',
        lastModified: '2024-01-15',
        status: 'rejected',
        assets: [
          {
            id: 'doc-3',
            name: 'Third-Party-Testing.pdf',
            type: 'document',
            size: '180 KB',
            uploadDate: '2024-01-15',
            status: 'rejected',
            feedback: 'Test results are outdated. Please provide recent testing within 6 months.'
          }
        ]
      },
      {
        id: '2-4',
        name: 'Videos',
        icon: 'ri-video-line',
        lastModified: '2024-01-12',
        status: 'pending',
        assets: []
      }
    ]
  },
  {
    id: '3',
    name: 'Premium Collagen Powder',
    thumbnail: 'https://readdy.ai/api/search-image?query=collagen%20protein%20powder%20container%20jar%20clean%20background%20professional%20product%20photography%20vanilla%20flavor&width=120&height=120&seq=4&orientation=squarish',
    dateCreated: '2024-01-08',
    lastModified: '2024-01-19',
    totalAssets: 8,
    status: 'approved',
    subfolders: [
      {
        id: '3-1',
        name: 'Product Images',
        icon: 'ri-image-line',
        lastModified: '2024-01-19',
        status: 'approved',
        assets: [
          {
            id: 'img-6',
            name: 'collagen-powder-jar.jpg',
            type: 'image',
            size: '2.8 MB',
            uploadDate: '2024-01-19',
            status: 'approved'
          }
        ]
      },
      {
        id: '3-2',
        name: 'Marketing Assets',
        icon: 'ri-megaphone-line',
        lastModified: '2024-01-17',
        status: 'approved',
        assets: [
          {
            id: 'mkt-4',
            name: 'collagen-benefits-banner.jpg',
            type: 'image',
            size: '950 KB',
            uploadDate: '2024-01-17',
            status: 'approved'
          }
        ]
      },
      {
        id: '3-3',
        name: 'Compliance Documents',
        icon: 'ri-shield-check-line',
        lastModified: '2024-01-12',
        status: 'rejected',
        assets: [
          {
            id: 'doc-4',
            name: 'Product-Specification.pdf',
            type: 'document',
            size: '95 KB',
            uploadDate: '2024-01-12',
            status: 'rejected',
            feedback: 'Missing nutritional information panel. Please include complete facts.'
          }
        ]
      },
      {
        id: '3-4',
        name: 'Videos',
        icon: 'ri-video-line',
        lastModified: '2024-01-10',
        status: 'pending',
        assets: []
      }
    ]
  },
  {
    id: '4',
    name: 'Daily Probiotic Capsules',
    thumbnail: 'https://readdy.ai/api/search-image?query=probiotic%20supplement%20bottle%20capsules%20clean%20white%20background%20professional%20product%20photography%20health%20supplement&width=120&height=120&seq=5&orientation=squarish',
    dateCreated: '2024-01-05',
    lastModified: '2024-01-18',
    totalAssets: 15,
    status: 'submitted',
    subfolders: [
      {
        id: '4-1',
        name: 'Product Images',
        icon: 'ri-image-line',
        lastModified: '2024-01-18',
        status: 'submitted',
        assets: [
          {
            id: 'img-7',
            name: 'probiotic-bottle-front.jpg',
            type: 'image',
            size: '2.2 MB',
            uploadDate: '2024-01-18',
            status: 'submitted'
          },
          {
            id: 'img-8',
            name: 'probiotic-lifestyle-kitchen.jpg',
            type: 'image',
            size: '3.4 MB',
            uploadDate: '2024-01-17',
            status: 'submitted'
          }
        ]
      },
      {
        id: '4-2',
        name: 'Marketing Assets',
        icon: 'ri-megaphone-line',
        lastModified: '2024-01-15',
        status: 'approved',
        assets: [
          {
            id: 'mkt-5',
            name: 'gut-health-infographic.jpg',
            type: 'image',
            size: '1.1 MB',
            uploadDate: '2024-01-15',
            status: 'approved'
          }
        ]
      },
      {
        id: '4-3',
        name: 'Compliance Documents',
        icon: 'ri-shield-check-line',
        lastModified: '2024-01-10',
        status: 'rejected',
        assets: [
          {
            id: 'doc-5',
            name: 'Potency-Testing.pdf',
            type: 'document',
            size: '210 KB',
            uploadDate: '2024-01-10',
            status: 'rejected',
            feedback: 'Potency levels below required standards. Please provide updated testing.'
          },
          {
            id: 'doc-6',
            name: 'Stability-Study.pdf',
            type: 'document',
            size: '165 KB',
            uploadDate: '2024-01-08',
            status: 'pending'
          }
        ]
      },
      {
        id: '4-4',
        name: 'Videos',
        icon: 'ri-video-line',
        lastModified: '2024-01-07',
        status: 'approved',
        assets: [
          {
            id: 'vid-3',
            name: 'probiotic-benefits-explainer.mp4',
            type: 'video',
            size: '8.9 MB',
            uploadDate: '2024-01-07',
            status: 'approved'
          }
        ]
      }
    ]
  }
];

interface FileManagerViewProps {
  viewMode: 'grid' | 'list';
  searchQuery: string;
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
}

export default function FileManagerView({ 
  viewMode, 
  searchQuery, 
  selectedItems, 
  onSelectItem, 
  onSelectAll 
}: FileManagerViewProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);
  const [showRenameModal, setShowRenameModal] = useState<{ type: 'folder' | 'subfolder', item: any } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<{ type: 'folder' | 'subfolder' | 'asset', item: any } | null>(null);
  const [bulkSelectedAssets, setBulkSelectedAssets] = useState<string[]>([]);

  const filteredFolders = sampleFolders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFolderClick = (folderId: string, folderName: string) => {
    if (currentPath.length === 0) {
      setCurrentPath([folderId, folderName]);
    }
  };

  const handleSubfolderClick = (subfolderId: string, subfolderName: string) => {
    if (currentPath.length === 2) {
      setCurrentPath([...currentPath, subfolderId, subfolderName]);
    }
  };

  const handleBackClick = () => {
    if (currentPath.length === 4) {
      setCurrentPath(currentPath.slice(0, 2));
    } else if (currentPath.length === 2) {
      setCurrentPath([]);
    }
  };

  const getCurrentFolder = () => {
    if (currentPath.length >= 2) {
      return sampleFolders.find(folder => folder.id === currentPath[0]);
    }
    return null;
  };

  const getCurrentSubfolder = () => {
    const folder = getCurrentFolder();
    if (folder && currentPath.length >= 4) {
      return folder.subfolders.find(subfolder => subfolder.id === currentPath[2]);
    }
    return null;
  };

  const handleAssetPreview = (asset: Asset) => {
    setPreviewAsset(asset);
  };

  const handleRename = (type: 'folder' | 'subfolder', item: any) => {
    setShowRenameModal({ type, item });
  };

  const handleDelete = (type: 'folder' | 'subfolder' | 'asset', item: any) => {
    setShowDeleteModal({ type, item });
  };

  const handleBulkAssetSelect = (assetId: string) => {
    setBulkSelectedAssets(prev =>
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleBulkAction = (action: 'move' | 'delete' | 'download') => {
    console.log(`Bulk ${action} for assets:`, bulkSelectedAssets);
    setBulkSelectedAssets([]);
  };

  const renderBreadcrumb = () => (
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <button
        onClick={() => setCurrentPath([])}
        className="hover:text-gray-900 cursor-pointer"
      >
        Asset Manager
      </button>
      {currentPath.length >= 2 && (
        <>
          <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
          <button
            onClick={() => setCurrentPath(currentPath.slice(0, 2))}
            className="hover:text-gray-900 cursor-pointer"
          >
            {currentPath[1]}
          </button>
        </>
      )}
      {currentPath.length >= 4 && (
        <>
          <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
          <span className="text-gray-900 font-medium">{currentPath[3]}</span>
        </>
      )}
    </div>
  );

  const renderBulkActionBar = () => {
    if (bulkSelectedAssets.length === 0) return null;

    return (
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-700 font-medium">
            {bulkSelectedAssets.length} asset{bulkSelectedAssets.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleBulkAction('move')}
              className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-folder-transfer-line w-4 h-4 flex items-center justify-center mr-1"></i>
              Move
            </button>
            <button
              onClick={() => handleBulkAction('download')}
              className="flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-1"></i>
              Download
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="flex items-center px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center mr-1"></i>
              Delete
            </button>
            <button
              onClick={() => setBulkSelectedAssets([])}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Show assets in subfolder
  if (currentPath.length >= 4) {
    const subfolder = getCurrentSubfolder();
    const folder = getCurrentFolder();

    return (
      <div className="p-6">
        {renderBreadcrumb()}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackClick}
              className="flex items-center px-4 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Back
            </button>
            <h2 className="text-xl font-semibold text-gray-900">{currentPath[3]}</h2>
            <div className="ml-4">
              {subfolder && (
                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                  subfolder.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-200' :
                  subfolder.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  subfolder.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                  'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {subfolder.status === 'approved' && <i className="ri-check-line w-3 h-3 flex items-center justify-center mr-1"></i>}
                  {subfolder.status === 'pending' && <i className="ri-time-line w-3 h-3 flex items-center justify-center mr-1"></i>}
                  {subfolder.status === 'rejected' && <i className="ri-close-line w-3 h-3 flex items-center justify-center mr-1"></i>}
                  {subfolder.status === 'submitted' && <i className="ri-send-plane-line w-3 h-3 flex items-center justify-center mr-1"></i>}
                  {subfolder.status.charAt(0).toUpperCase() + subfolder.status.slice(1)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => subfolder && handleRename('subfolder', subfolder)}
              className="flex items-center px-3 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-edit-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Rename
            </button>
            <button
              onClick={() => subfolder && handleDelete('subfolder', subfolder)}
              className="flex items-center px-3 py-2 text-red-700 bg-white hover:bg-red-50 border border-red-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Delete
            </button>
            <button className="flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-upload-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Add Assets
            </button>
          </div>
        </div>
        
        {renderBulkActionBar()}
        
        <FolderContents
          assets={subfolder?.assets || []}
          viewMode={viewMode}
          selectedItems={bulkSelectedAssets}
          onSelectItem={handleBulkAssetSelect}
          onAssetPreview={handleAssetPreview}
          onAssetDelete={(asset) => handleDelete('asset', asset)}
        />

        {previewAsset && (
          <AssetPreviewModal
            asset={previewAsset}
            onClose={() => setPreviewAsset(null)}
          />
        )}
      </div>
    );
  }

  // Show subfolders in product folder
  if (currentPath.length >= 2) {
    const folder = getCurrentFolder();
    return (
      <div className="p-6">
        {renderBreadcrumb()}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackClick}
              className="flex items-center px-4 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Back
            </button>
            <h2 className="text-xl font-semibold text-gray-900">{currentPath[1]}</h2>
            <div className="ml-4">
              {folder && (
                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                  folder.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-200' :
                  folder.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  folder.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                  'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {folder.status === 'approved' && <i className="ri-check-line w-3 h-3 flex items-center justify-center mr-1"></i>}
                  {folder.status === 'pending' && <i className="ri-time-line w-3 h-3 flex items-center justify-center mr-1"></i>}
                  {folder.status === 'rejected' && <i className="ri-close-line w-3 h-3 flex items-center justify-center mr-1"></i>}
                  {folder.status === 'submitted' && <i className="ri-send-plane-line w-3 h-3 flex items-center justify-center mr-1"></i>}
                  {folder.status.charAt(0).toUpperCase() + folder.status.slice(1)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => folder && handleRename('folder', folder)}
              className="flex items-center px-3 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-edit-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Rename
            </button>
            <button
              onClick={() => folder && handleDelete('folder', folder)}
              className="flex items-center px-3 py-2 text-red-700 bg-white hover:bg-red-50 border border-red-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Delete
            </button>
          </div>
        </div>
        
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-2'}>
          {folder?.subfolders.map((subfolder) => (
            <FolderItem
              key={subfolder.id}
              id={subfolder.id}
              name={subfolder.name}
              icon={subfolder.icon}
              itemCount={subfolder.assets.length}
              lastModified={subfolder.lastModified}
              status={subfolder.status}
              viewMode={viewMode}
              selected={selectedItems.includes(subfolder.id)}
              onSelect={() => onSelectItem(subfolder.id)}
              onClick={() => handleSubfolderClick(subfolder.id, subfolder.name)}
              onRename={() => handleRename('subfolder', subfolder)}
              onDelete={() => handleDelete('subfolder', subfolder)}
              type="subfolder"
            />
          ))}
        </div>
      </div>
    );
  }

  // Show main product folders
  return (
    <div className="p-6">
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-2'}>
        {filteredFolders.map((folder) => (
          <FolderItem
            key={folder.id}
            id={folder.id}
            name={folder.name}
            thumbnail={folder.thumbnail}
            itemCount={folder.totalAssets}
            dateCreated={folder.dateCreated}
            lastModified={folder.lastModified}
            status={folder.status}
            viewMode={viewMode}
            selected={selectedItems.includes(folder.id)}
            onSelect={() => onSelectItem(folder.id)}
            onClick={() => handleFolderClick(folder.id, folder.name)}
            onRename={() => handleRename('folder', folder)}
            onDelete={() => handleDelete('folder', folder)}
            type="product"
          />
        ))}
      </div>

      {showRenameModal && (
        <RenameFolderModal
          type={showRenameModal.type}
          item={showRenameModal.item}
          onClose={() => setShowRenameModal(null)}
          onSave={(newName) => {
            console.log(`Rename ${showRenameModal.type}:`, showRenameModal.item.id, 'to', newName);
            setShowRenameModal(null);
          }}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          type={showDeleteModal.type}
          item={showDeleteModal.item}
          onClose={() => setShowDeleteModal(null)}
          onConfirm={() => {
            console.log(`Delete ${showDeleteModal.type}:`, showDeleteModal.item.id);
            setShowDeleteModal(null);
          }}
        />
      )}
    </div>
  );
}
