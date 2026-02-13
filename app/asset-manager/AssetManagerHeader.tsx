'use client';

interface AssetManagerHeaderProps {
  onAddFolder: () => void;
  onBulkUpload: () => void;
  onSubmitForApproval: () => void;
  hasPendingAssets: boolean;
  selectedItems: number;
}

export default function AssetManagerHeader({ 
  onAddFolder, 
  onBulkUpload, 
  onSubmitForApproval, 
  hasPendingAssets,
  selectedItems 
}: AssetManagerHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-10">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Asset Manager</h1>
            <p className="text-gray-600 mt-1">Organize and manage your product images, marketing assets, and compliance documents</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onBulkUpload}
              className="flex items-center px-4 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-upload-cloud-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Bulk Upload
            </button>
            
            {hasPendingAssets && (
              <button
                onClick={onSubmitForApproval}
                className="flex items-center px-4 py-2 text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Submit for Approval
              </button>
            )}
            
            <button
              onClick={onAddFolder}
              className="flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-folder-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Add New Folder
            </button>
          </div>
        </div>

        {selectedItems > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedItems} item{selectedItems > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                  Move
                </button>
                <button className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer whitespace-nowrap">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}