
'use client';
import { useState } from 'react';

interface LegalInfoCardProps {
  isEditMode: boolean;
}

export default function LegalInfoCard({ isEditMode }: LegalInfoCardProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    legalEntityName: 'Lumina Beauty Inc.',
    businessType: 'Corporation',
    taxId: 'VAT-123456789',
    registrationNumber: 'REG-2019-456789',
    headOfficeAddress: '1234 Beauty Boulevard\nSuite 567\nLos Angeles, CA 90210\nUnited States',
    timezone: 'America/Los_Angeles',
    warehouseInfo: {
      location: '5678 Industrial Drive, Carson, CA 90746',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'warehouse@luminabeauty.com',
      contactPhone: '+1 (555) 123-4567'
    }
  });

  const [documents] = useState([
    { name: 'Business License', status: 'Approved', date: '2024-01-15', type: 'PDF' },
    { name: 'FDA Registration', status: 'Pending Review', date: '2024-02-20', type: 'PDF' },
    { name: 'Organic Certification', status: 'Approved', date: '2024-01-10', type: 'PDF' },
    { name: 'ISO 9001 Certificate', status: 'Expired', date: '2023-12-31', type: 'PDF' }
  ]);

  const businessTypes = [
    'Corporation',
    'Limited Liability Company (LLC)',
    'Partnership',
    'Sole Proprietorship',
    'Private Limited Company'
  ];

  const timezones = [
    'America/New_York',
    'America/Chicago', 
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleWarehouseChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      warehouseInfo: {
        ...prev.warehouseInfo,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    // Save logic here
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Approved': 'bg-green-100 text-green-800',
      'Pending Review': 'bg-yellow-100 text-yellow-800',
      'Expired': 'bg-red-100 text-red-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Legal & Internal Information</h3>
        <span className="text-sm bg-red-50 text-red-700 px-2 py-1 rounded-full">
          <div className="w-4 h-4 flex items-center justify-center inline-block mr-1">
            <i className="ri-lock-line"></i>
          </div>
          Admin Only
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Company Details */}
        <div className="space-y-6">
          <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">Company Details</h4>
          
          {/* Legal Entity Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Legal Entity Name</label>
            {isEditMode ? (
              <input
                type="text"
                value={formData.legalEntityName}
                onChange={(e) => handleInputChange('legalEntityName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            ) : (
              <p className="text-gray-900">{formData.legalEntityName}</p>
            )}
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            {isEditMode ? (
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-8"
              >
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            ) : (
              <p className="text-gray-900">{formData.businessType}</p>
            )}
          </div>

          {/* Tax ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID (GST/VAT)</label>
            {isEditMode ? (
              <input
                type="text"
                value={formData.taxId}
                onChange={(e) => handleInputChange('taxId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            ) : (
              <p className="text-gray-900 font-mono">{formData.taxId}</p>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
            {isEditMode ? (
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            ) : (
              <p className="text-gray-900 font-mono">{formData.registrationNumber}</p>
            )}
          </div>

          {/* Head Office Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Head Office Address</label>
            {isEditMode ? (
              <textarea
                value={formData.headOfficeAddress}
                onChange={(e) => handleInputChange('headOfficeAddress', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            ) : (
              <div className="text-gray-900 whitespace-pre-line">{formData.headOfficeAddress}</div>
            )}
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            {isEditMode ? (
              <select
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-8"
              >
                {timezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            ) : (
              <p className="text-gray-900">{formData.timezone}</p>
            )}
          </div>
        </div>

        {/* Right Column - Warehouse & Documents */}
        <div className="space-y-6">
          {/* Warehouse Information */}
          <div>
            <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Warehouse Information</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.warehouseInfo.location}
                    onChange={(e) => handleWarehouseChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.warehouseInfo.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.warehouseInfo.contactPerson}
                    onChange={(e) => handleWarehouseChange('contactPerson', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.warehouseInfo.contactPerson}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                {isEditMode ? (
                  <input
                    type="email"
                    value={formData.warehouseInfo.contactEmail}
                    onChange={(e) => handleWarehouseChange('contactEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.warehouseInfo.contactEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                {isEditMode ? (
                  <input
                    type="tel"
                    value={formData.warehouseInfo.contactPhone}
                    onChange={(e) => handleWarehouseChange('contactPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.warehouseInfo.contactPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div>
            <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">
              Documents & Certifications
            </h4>
            
            {/* Upload Zone */}
            {isEditMode && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors cursor-pointer mb-4">
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  <i className="ri-file-upload-line text-2xl text-gray-400"></i>
                </div>
                <p className="text-sm text-gray-600">Upload certificates or licenses</p>
                <p className="text-xs text-gray-500 mt-1">PDF files up to 10MB</p>
              </div>
            )}

            {/* Document List */}
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded">
                      <i className="ri-file-pdf-line text-red-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">Uploaded {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(doc.status)}`}>
                      {doc.status}
                    </span>
                    <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                      <i className="ri-download-line"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditMode && hasChanges && (
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
