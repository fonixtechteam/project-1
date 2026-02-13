
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

interface FolderContentsProps {
  assets: Asset[];
  viewMode: 'grid' | 'list';
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onAssetPreview: (asset: Asset) => void;
  onAssetDelete: (asset: Asset) => void;
}

export default function FolderContents({
  assets,
  viewMode,
  selectedItems,
  onSelectItem,
  onAssetPreview,
  onAssetDelete
}: FolderContentsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
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
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full ${badges[status as keyof typeof badges]}`}>
        <i className={`${icons[status as keyof typeof icons]} w-3 h-3 flex items-center justify-center mr-1`}></i>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getFileIcon = (type: string) => {
    const icons = {
      image: 'ri-image-line',
      document: 'ri-file-pdf-line',
      video: 'ri-video-line'
    };
    return icons[type as keyof typeof icons] || 'ri-file-line';
  };

  const getFileIconColor = (type: string) => {
    const colors = {
      image: 'text-blue-600 bg-blue-100',
      document: 'text-red-600 bg-red-100',
      video: 'text-purple-600 bg-purple-100'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const handleAssetAction = (action: string, asset: Asset, e: React.MouseEvent) => {
    e.stopPropagation();
    
    switch (action) {
      case 'preview':
        onAssetPreview(asset);
        break;
      case 'edit':
        console.log('Edit asset:', asset.id);
        break;
      case 'replace':
        console.log('Replace asset:', asset.id);
        break;
      case 'download':
        console.log('Download asset:', asset.id);
        break;
      case 'delete':
        onAssetDelete(asset);
        break;
      case 'submit':
        console.log('Submit for review:', asset.id);
        break;
      case 'feedback':
        console.log('View feedback:', asset.feedback);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  if (assets.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="ri-folder-open-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
        <p className="text-gray-500 mb-4">This folder is empty. Upload some assets to get started.</p>
        <button className="flex items-center mx-auto px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer">
          <i className="ri-upload-line w-4 h-4 flex items-center justify-center mr-2"></i>
          Upload Assets
        </button>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
              <tr>
                <th className="w-4 px-4 py-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer"
                  />
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Size</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Upload Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-amber-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(asset.id)}
                      onChange={() => onSelectItem(asset.id)}
                      className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${getFileIconColor(asset.type)}`}>
                        <i className={`${getFileIcon(asset.type)} w-4 h-4 flex items-center justify-center`}></i>
                      </div>
                      <button
                        onClick={() => onAssetPreview(asset)}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer text-left"
                      >
                        {asset.name}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 capitalize">{asset.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{asset.size}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(asset.uploadDate)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(asset.status)}
                      {asset.status === 'rejected' && asset.feedback && (
                        <button
                          onClick={(e) => handleAssetAction('feedback', asset, e)}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                          title={asset.feedback}
                        >
                          <i className="ri-information-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end space-x-1">
                      <button 
                        onClick={(e) => handleAssetAction('preview', asset, e)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                        title="Preview"
                      >
                        <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      
                      {asset.type === 'image' && (
                        <button 
                          onClick={(e) => handleAssetAction('edit', asset, e)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                          title="Edit"
                        >
                          <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      )}
                      
                      <button 
                        onClick={(e) => handleAssetAction('replace', asset, e)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer"
                        title="Replace"
                      >
                        <i className="ri-file-replace-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      
                      <button 
                        onClick={(e) => handleAssetAction('download', asset, e)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                        title="Download"
                      >
                        <i className="ri-download-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      
                      {(asset.status === 'pending' || asset.status === 'rejected') && (
                        <button 
                          onClick={(e) => handleAssetAction('submit', asset, e)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                          title="Submit for Review"
                        >
                          <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      )}
                      
                      <button 
                        onClick={(e) => handleAssetAction('delete', asset, e)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete"
                      >
                        <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className={`relative group bg-white/80 backdrop-blur-sm border rounded-xl p-4 hover:shadow-lg transition-all ${
            selectedItems.includes(asset.id) ? 'border-red-300 bg-red-50/80' : 'border-amber-200 hover:border-amber-300'
          }`}
        >
          <div className="absolute top-3 left-3">
            <input
              type="checkbox"
              checked={selectedItems.includes(asset.id)}
              onChange={() => onSelectItem(asset.id)}
              className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer"
            />
          </div>

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-wrap gap-1 max-w-24">
              <button 
                onClick={(e) => handleAssetAction('preview', asset, e)}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-lg cursor-pointer"
                title="Preview"
              >
                <i className="ri-eye-line w-3 h-3 flex items-center justify-center"></i>
              </button>
              
              {asset.type === 'image' && (
                <button 
                  onClick={(e) => handleAssetAction('edit', asset, e)}
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-white/80 rounded-lg cursor-pointer"
                  title="Edit"
                >
                  <i className="ri-edit-line w-3 h-3 flex items-center justify-center"></i>
                </button>
              )}
              
              <button 
                onClick={(e) => handleAssetAction('replace', asset, e)}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-amber-600 hover:bg-white/80 rounded-lg cursor-pointer"
                title="Replace"
              >
                <i className="ri-file-replace-line w-3 h-3 flex items-center justify-center"></i>
              </button>
              
              <button 
                onClick={(e) => handleAssetAction('download', asset, e)}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-white/80 rounded-lg cursor-pointer"
                title="Download"
              >
                <i className="ri-download-line w-3 h-3 flex items-center justify-center"></i>
              </button>
              
              {(asset.status === 'pending' || asset.status === 'rejected') && (
                <button 
                  onClick={(e) => handleAssetAction('submit', asset, e)}
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-white/80 rounded-lg cursor-pointer"
                  title="Submit for Review"
                >
                  <i className="ri-send-plane-line w-3 h-3 flex items-center justify-center"></i>
                </button>
              )}
              
              <button 
                onClick={(e) => handleAssetAction('delete', asset, e)}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-white/80 rounded-lg cursor-pointer"
                title="Delete"
              >
                <i className="ri-delete-bin-line w-3 h-3 flex items-center justify-center"></i>
              </button>
            </div>
          </div>

          <div 
            className="flex flex-col items-center mb-3 mt-6 cursor-pointer"
            onClick={() => onAssetPreview(asset)}
          >
            {asset.type === 'image' && asset.thumbnail ? (
              <img
                src={asset.thumbnail}
                alt={asset.name}
                className="w-16 h-16 rounded-lg object-cover border border-amber-200 mb-2 hover:scale-105 transition-transform"
              />
            ) : (
              <div className={`w-16 h-16 flex items-center justify-center rounded-lg mb-2 hover:scale-105 transition-transform ${getFileIconColor(asset.type)}`}>
                <i className={`${getFileIcon(asset.type)} w-6 h-6 flex items-center justify-center`}></i>
              </div>
            )}
          </div>

          <div className="text-center">
            <h3 
              className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
              title={asset.name}
              onClick={() => onAssetPreview(asset)}
            >
              {asset.name}
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="capitalize">{asset.type}</span>
                <span>{asset.size}</span>
              </div>
              
              <div className="text-xs text-gray-500 mb-2">
                {formatDate(asset.uploadDate)}
              </div>
              
              <div className="flex flex-col items-center space-y-1">
                {getStatusBadge(asset.status)}
                {asset.status === 'rejected' && asset.feedback && (
                  <button
                    onClick={(e) => handleAssetAction('feedback', asset, e)}
                    className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                    title={asset.feedback}
                  >
                    View Feedback
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
