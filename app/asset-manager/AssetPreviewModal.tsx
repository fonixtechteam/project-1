'use client';

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

interface AssetPreviewModalProps {
  asset: Asset;
  onClose: () => void;
}

export default function AssetPreviewModal({ asset, onClose }: AssetPreviewModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      approved: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      submitted: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    const icons = {
      approved: 'ri-check-line',
      pending: 'ri-time-line',
      rejected: 'ri-close-line',
      submitted: 'ri-send-plane-line'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 text-sm font-medium border rounded-full ${badges[status as keyof typeof badges]}`}>
        <i className={`${icons[status as keyof typeof icons]} w-4 h-4 flex items-center justify-center mr-2`}></i>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderPreview = () => {
    if (asset.type === 'image') {
      return (
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg">
          {asset.thumbnail ? (
            <img
              src={asset.thumbnail}
              alt={asset.name}
              className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center bg-blue-100 rounded-lg">
              <i className="ri-image-line w-16 h-16 flex items-center justify-center text-blue-600"></i>
            </div>
          )}
        </div>
      );
    }

    if (asset.type === 'video') {
      return (
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="w-48 h-48 flex flex-col items-center justify-center bg-purple-100 rounded-lg">
            <i className="ri-video-line w-16 h-16 flex items-center justify-center text-purple-600 mb-4"></i>
            <p className="text-sm text-gray-600 text-center">Video Preview</p>
            <p className="text-xs text-gray-500 mt-1">{asset.size}</p>
          </div>
        </div>
      );
    }

    if (asset.type === 'document') {
      return (
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="w-48 h-48 flex flex-col items-center justify-center bg-red-100 rounded-lg">
            <i className="ri-file-pdf-line w-16 h-16 flex items-center justify-center text-red-600 mb-4"></i>
            <p className="text-sm text-gray-600 text-center">PDF Document</p>
            <p className="text-xs text-gray-500 mt-1">{asset.size}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">{asset.name}</h2>
            {getStatusBadge(asset.status)}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Preview Area */}
          <div className="flex-1 p-6">
            {renderPreview()}
          </div>

          {/* Details Sidebar */}
          <div className="w-80 border-l border-gray-200 p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">File Name</label>
                <p className="text-sm text-gray-900 break-all">{asset.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Type</label>
                <p className="text-sm text-gray-900 capitalize">{asset.type}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">File Size</label>
                <p className="text-sm text-gray-900">{asset.size}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Upload Date</label>
                <p className="text-sm text-gray-900">{formatDate(asset.uploadDate)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                <div className="mt-1">
                  {getStatusBadge(asset.status)}
                </div>
              </div>

              {asset.status === 'rejected' && asset.feedback && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Admin Feedback</label>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">{asset.feedback}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer">
                <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Download
              </button>

              {asset.type === 'image' && (
                <button className="w-full flex items-center justify-center px-4 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-edit-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Edit Image
                </button>
              )}

              <button className="w-full flex items-center justify-center px-4 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors cursor-pointer">
                <i className="ri-file-replace-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Replace File
              </button>

              {(asset.status === 'pending' || asset.status === 'rejected') && (
                <button className="w-full flex items-center justify-center px-4 py-2 text-green-700 bg-green-50 hover:bg-green-100 border border-green-300 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Submit for Review
                </button>
              )}

              <button className="w-full flex items-center justify-center px-4 py-2 text-red-700 bg-white hover:bg-red-50 border border-red-300 rounded-lg transition-colors cursor-pointer">
                <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}