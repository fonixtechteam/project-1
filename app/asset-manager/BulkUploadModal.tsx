'use client';

import { useState } from 'react';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BulkUploadModal({ isOpen, onClose }: BulkUploadModalProps) {
  const [uploadMethod, setUploadMethod] = useState<'files' | 'zip'>('files');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [targetFolder, setTargetFolder] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const documentTypes = ['pdf', 'doc', 'docx'];
    const videoTypes = ['mp4', 'mov', 'avi', 'mkv'];
    
    if (imageTypes.includes(extension || '')) return 'ri-image-line text-blue-600';
    if (documentTypes.includes(extension || '')) return 'ri-file-pdf-line text-red-600';
    if (videoTypes.includes(extension || '')) return 'ri-video-line text-purple-600';
    return 'ri-file-line text-gray-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Bulk Upload Assets</h2>
            <p className="text-gray-600 mt-1">Upload multiple files to organize in your asset folders</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
          </button>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Upload Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Upload Method</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="uploadMethod"
                  value="files"
                  checked={uploadMethod === 'files'}
                  onChange={(e) => setUploadMethod(e.target.value as 'files' | 'zip')}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">Individual Files</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="uploadMethod"
                  value="zip"
                  checked={uploadMethod === 'zip'}
                  onChange={(e) => setUploadMethod(e.target.value as 'files' | 'zip')}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">ZIP Archive (with folder structure)</span>
              </label>
            </div>
          </div>

          {/* Target Folder Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Target Product Folder</label>
            <select
              value={targetFolder}
              onChange={(e) => setTargetFolder(e.target.value)}
              className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
            >
              <option value="">Select a product folder...</option>
              <option value="vitamin-c-serum">Vitamin C Brightening Serum</option>
              <option value="omega-3-capsules">Omega-3 Fish Oil Capsules</option>
              <option value="collagen-powder">Premium Collagen Powder</option>
              <option value="probiotic-capsules">Daily Probiotic Capsules</option>
              <option value="create-new">+ Create New Folder</option>
            </select>
          </div>

          {/* File Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {uploadMethod === 'files' ? 'Select Files' : 'Select ZIP File'}
            </label>
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-red-300'
              }`}
            >
              <i className="ri-upload-cloud-line w-12 h-12 flex items-center justify-center text-gray-400 mx-auto mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop files here or click to browse
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {uploadMethod === 'files' 
                  ? 'Supports: Images (JPG, PNG, WEBP), Documents (PDF), Videos (MP4, MOV)'
                  : 'Upload a ZIP file containing your organized folder structure'
                }
              </p>
              
              <input
                type="file"
                multiple={uploadMethod === 'files'}
                accept={uploadMethod === 'files' 
                  ? 'image/*,application/pdf,video/*' 
                  : '.zip,.rar'
                }
                onChange={handleFileSelect}
                className="hidden"
                id="bulk-file-upload"
              />
              <label
                htmlFor="bulk-file-upload"
                className="inline-flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-folder-open-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Browse Files
              </label>
            </div>
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Selected Files ({selectedFiles.length})
              </h3>
              <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <i className={`w-5 h-5 flex items-center justify-center mr-3 ${getFileIcon(file.name)}`}></i>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Options */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Upload Settings</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Auto-organize by file type</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer" />
                <span className="ml-2 text-sm text-gray-700">Generate thumbnails for images</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Submit for admin approval after upload</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            disabled={selectedFiles.length === 0 || !targetFolder}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap"
          >
            Upload {selectedFiles.length} Files
          </button>
        </div>
      </div>
    </div>
  );
}