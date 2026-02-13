
'use client';

import React from 'react';

interface ComplianceCenterHeaderProps {
  onUpload: () => void;
  onRefresh: () => void;
  onToggleAlerts: () => void;
  hasAlerts: boolean;
}

export default function ComplianceCenterHeader({ 
  onUpload, 
  onRefresh, 
  onToggleAlerts, 
  hasAlerts 
}: ComplianceCenterHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Center</h1>
          <p className="text-gray-600">Manage your product compliance documents</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Alert Button */}
          <button
            onClick={onToggleAlerts}
            className={`relative flex items-center px-4 py-2 border rounded-lg transition-colors whitespace-nowrap ${
              hasAlerts 
                ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' 
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <i className={`w-4 h-4 flex items-center justify-center mr-2 ${
              hasAlerts ? 'ri-error-warning-fill' : 'ri-notification-line'
            }`}></i>
            Alerts
            {hasAlerts && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <i className="ri-refresh-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Refresh
          </button>
          
          {/* Upload Document Button */}
          <button
            onClick={onUpload}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
          >
            <i className="ri-upload-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
}
