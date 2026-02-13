'use client';

import { useState } from 'react';

interface RenameFolderModalProps {
  type: 'folder' | 'subfolder';
  item: any;
  onClose: () => void;
  onSave: (newName: string) => void;
}

export default function RenameFolderModal({ type, item, onClose, onSave }: RenameFolderModalProps) {
  const [newName, setNewName] = useState(item.name);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!newName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    if (newName.trim() === item.name) {
      onClose();
      return;
    }

    onSave(newName.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-lg">
              <i className="ri-edit-line w-5 h-5 flex items-center justify-center text-amber-600"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Rename {type === 'folder' ? 'Product Folder' : 'Subfolder'}
            </h2>
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
          <div className="mb-4">
            <label htmlFor="folderName" className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'folder' ? 'Product' : 'Subfolder'} Name
            </label>
            <input
              id="folderName"
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder={`Enter ${type} name`}
              autoFocus
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <div className="flex">
              <i className="ri-information-line w-5 h-5 flex items-center justify-center text-amber-600 mr-2 mt-0.5"></i>
              <div>
                <p className="text-sm text-amber-800 font-medium">Renaming Guidelines</p>
                <p className="text-sm text-amber-700 mt-1">
                  Choose a descriptive name that clearly identifies your {type === 'folder' ? 'product' : 'asset category'}. 
                  This will help you organize and find your assets more easily.
                </p>
              </div>
            </div>
          </div>
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
            onClick={handleSave}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}