
'use client';

import { useState } from 'react';

interface Document {
  id: string;
  name: string;
  fileType: string;
  fileSize: string;
  lastUpdate: string;
  importantDate: string;
  associatedProduct: string;
  description: string;
  issuingAuthority: string;
  status: 'valid' | 'expiring-soon' | 'expired' | 'pending';
  downloadHistory: Array<{
    buyerId: string;
    buyerName: string;
    buyerCompany: string;
    downloadDate: string;
    purpose: string;
  }>;
}

interface DocumentDetailModalProps {
  document: Document;
  onClose: () => void;
  onReupload: () => void;
}

export default function DocumentDetailModal({ document, onClose, onReupload }: DocumentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'history'>('details');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'valid': { color: 'bg-green-100 text-green-800 border-green-200', icon: 'ri-check-line' },
      'expiring-soon': { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: 'ri-time-line' },
      'expired': { color: 'bg-red-100 text-red-800 border-red-200', icon: 'ri-close-line' },
      'pending': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: 'ri-loader-line' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <span className={`inline-flex items-center px-3 py-1.5 text-sm font-medium border rounded-full ${config.color}`}>
        <i className={`${config.icon} w-4 h-4 flex items-center justify-center mr-2`}></i>
        {status === 'expiring-soon' ? 'Expiring Soon' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleDownload = () => {
    console.log('Download document:', document.id);
    // Add download logic here
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      console.log('Delete document:', document.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
              <i className="ri-file-pdf-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{document.name}</h2>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-gray-600">{document.fileType} • {document.fileSize}</span>
                {getStatusBadge(document.status)}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Document Details
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Download History ({document.downloadHistory.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Document Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{document.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{document.fileType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Size</label>
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{document.fileSize}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Last Update</label>
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{formatDate(document.lastUpdate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Important Date</label>
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{formatDate(document.importantDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Associated Product</label>
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{document.associatedProduct}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{document.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Authority</label>
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{document.issuingAuthority}</p>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                This document has been downloaded {document.downloadHistory.length} time{document.downloadHistory.length !== 1 ? 's' : ''} by buyers.
              </div>
              
              {document.downloadHistory.length === 0 ? (
                <div className="text-center py-12">
                  <i className="ri-download-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No download history</h3>
                  <p className="text-gray-500">This document hasn't been downloaded by any buyers yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {document.downloadHistory.map((download, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                              <i className="ri-user-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{download.buyerName}</h4>
                              <p className="text-sm text-gray-600">{download.buyerCompany}</p>
                            </div>
                          </div>
                          <div className="ml-13">
                            <p className="text-sm text-gray-700 mb-1"><strong>Purpose:</strong> {download.purpose}</p>
                            <p className="text-xs text-gray-500">Downloaded on {formatDate(download.downloadDate)}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          Buyer ID: {download.buyerId}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Download Document
            </button>
            <button
              onClick={onReupload}
              className="flex items-center px-4 py-2 text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-upload-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Re-upload Document
            </button>
          </div>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Delete Document
          </button>
        </div>
      </div>
    </div>
  );
}
