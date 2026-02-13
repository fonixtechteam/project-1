
'use client';

interface FolderItemProps {
  id: string;
  name: string;
  thumbnail?: string;
  icon?: string;
  itemCount: number;
  dateCreated?: string;
  lastModified: string;
  status?: 'approved' | 'pending' | 'rejected' | 'submitted';
  viewMode: 'grid' | 'list';
  selected: boolean;
  onSelect: () => void;
  onClick: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  type: 'product' | 'subfolder';
}

export default function FolderItem({
  id,
  name,
  thumbnail,
  icon,
  itemCount,
  dateCreated,
  lastModified,
  status,
  viewMode,
  selected,
  onSelect,
  onClick,
  onRename,
  onDelete,
  type
}: FolderItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusColor = () => {
    if (itemCount === 0) return 'text-gray-400';
    if (itemCount < 5) return 'text-amber-600';
    return 'text-green-600';
  };

  const getStatusBadge = () => {
    if (!status) return null;
    
    const statusConfig = {
      approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: 'ri-check-line' },
      pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: 'ri-time-line' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: 'ri-close-line' },
      submitted: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: 'ri-send-plane-line' }
    };

    const config = statusConfig[status];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full ${config.color}`}>
        <i className={`${config.icon} w-3 h-3 flex items-center justify-center mr-1`}></i>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (viewMode === 'list') {
    return (
      <div
        className={`flex items-center p-4 bg-white/80 backdrop-blur-sm border rounded-lg hover:shadow-md transition-all cursor-pointer ${
          selected ? 'border-red-300 bg-red-50/80' : 'border-amber-200 hover:border-amber-300'
        }`}
        onClick={onClick}
      >
        <div className="flex items-center mr-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer"
          />
        </div>

        <div className="flex-shrink-0 mr-4">
          {type === 'product' && thumbnail ? (
            <img
              src={thumbnail}
              alt={name}
              className="w-12 h-12 rounded-lg object-cover border border-amber-200"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg border border-amber-200">
              <i className={`${icon || 'ri-folder-line'} w-6 h-6 flex items-center justify-center text-amber-600`}></i>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
            {getStatusBadge()}
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className={getStatusColor()}>
              {itemCount} {itemCount === 1 ? 'asset' : 'assets'}
            </span>
            <span>Modified {formatDate(lastModified)}</span>
            {dateCreated && <span>Created {formatDate(dateCreated)}</span>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {status === 'rejected' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('View feedback for:', id);
              }}
              className="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
              title="View feedback"
            >
              <i className="ri-information-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          )}
          {onRename && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRename();
              }}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
              title="Rename"
            >
              <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Download folder:', id);
            }}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
            title="Download"
          >
            <i className="ri-download-line w-4 h-4 flex items-center justify-center"></i>
          </button>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
              title="Delete"
            >
              <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for:', id);
            }}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <i className="ri-more-line w-4 h-4 flex items-center justify-center"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative group bg-white/80 backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${
        selected ? 'border-red-300 bg-red-50/80' : 'border-amber-200 hover:border-amber-300'
      }`}
      onClick={onClick}
    >
      <div className="absolute top-3 left-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer"
        />
      </div>

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-1">
          {status === 'rejected' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('View feedback for:', id);
              }}
              className="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-white/80 rounded-lg cursor-pointer"
              title="View feedback"
            >
              <i className="ri-information-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          )}
          {onRename && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRename();
              }}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-lg cursor-pointer"
              title="Rename"
            >
              <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Download folder:', id);
            }}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-lg cursor-pointer"
            title="Download"
          >
            <i className="ri-download-line w-4 h-4 flex items-center justify-center"></i>
          </button>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-white/80 rounded-lg cursor-pointer"
              title="Delete"
            >
              <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for:', id);
            }}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-lg cursor-pointer"
          >
            <i className="ri-more-line w-4 h-4 flex items-center justify-center"></i>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center mb-4">
        {type === 'product' && thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-20 h-20 rounded-xl object-cover border border-amber-200 mb-3"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl border border-amber-200 mb-3">
            <i className={`${icon || 'ri-folder-line'} w-8 h-8 flex items-center justify-center text-amber-600`}></i>
          </div>
        )}
      </div>

      <div className="text-center">
        <div className="flex flex-col items-center space-y-2 mb-3">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{name}</h3>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-1 text-xs text-gray-500">
          <div className={`font-medium ${getStatusColor()}`}>
            {itemCount} {itemCount === 1 ? 'asset' : 'assets'}
          </div>
          <div>Modified {formatDate(lastModified)}</div>
          {dateCreated && <div>Created {formatDate(dateCreated)}</div>}
        </div>
      </div>

      {type === 'product' && (
        <div className="mt-4 pt-4 border-t border-amber-100">
          <div className="flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center text-gray-500">
              <i className="ri-image-line w-3 h-3 flex items-center justify-center mr-1"></i>
              <span>Images</span>
            </div>
            <div className="flex items-center text-gray-500">
              <i className="ri-file-pdf-line w-3 h-3 flex items-center justify-center mr-1"></i>
              <span>Docs</span>
            </div>
            <div className="flex items-center text-gray-500">
              <i className="ri-video-line w-3 h-3 flex items-center justify-center mr-1"></i>
              <span>Videos</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
