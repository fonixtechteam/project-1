'use client';

import { useState } from 'react';

interface FormData {
  certifications: string[];
  regulatoryNotes: string;
  uploadedFiles: File[];
  [key: string]: any;
}

interface ComplianceCertificationProps {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export default function ComplianceCertification({ formData, updateFormData }: ComplianceCertificationProps) {
  const [dragActive, setDragActive] = useState(false);

  const certificationOptions = [
    { id: 'fda', name: 'FDA Approved', description: 'Food and Drug Administration' },
    { id: 'usda', name: 'USDA Organic', description: 'United States Department of Agriculture' },
    { id: 'nsf', name: 'NSF Certified', description: 'National Sanitation Foundation' },
    { id: 'gmp', name: 'GMP Certified', description: 'Good Manufacturing Practice' },
    { id: 'iso', name: 'ISO 22000', description: 'Food Safety Management' },
    { id: 'haccp', name: 'HACCP', description: 'Hazard Analysis Critical Control Points' },
    { id: 'kosher', name: 'Kosher Certified', description: 'Jewish dietary laws' },
    { id: 'halal', name: 'Halal Certified', description: 'Islamic dietary laws' },
    { id: 'vegan', name: 'Vegan Society', description: 'Certified vegan product' },
    { id: 'leaping', name: 'Leaping Bunny', description: 'Cruelty-free certification' },
    { id: 'non-gmo', name: 'Non-GMO Project', description: 'Non-genetically modified' },
    { id: 'rainforest', name: 'Rainforest Alliance', description: 'Sustainable sourcing' }
  ];

  const documentTypes = [
    'Certificate of Analysis (COA)',
    'Safety Data Sheet (SDS)', 
    'Product Specification Sheet',
    'Manufacturing License',
    'Quality Assurance Documents',
    'Regulatory Compliance Letters',
    'Third-party Test Results',
    'Ingredient Supplier Certificates'
  ];

  const toggleCertification = (certId: string) => {
    if (formData.certifications.includes(certId)) {
      updateFormData('certifications', formData.certifications.filter(c => c !== certId));
    } else {
      updateFormData('certifications', [...formData.certifications, certId]);
    }
  };

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    updateFormData('uploadedFiles', [...formData.uploadedFiles, ...fileArray]);
  };

  const removeFile = (index: number) => {
    const newFiles = formData.uploadedFiles.filter((_, i) => i !== index);
    updateFormData('uploadedFiles', newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mr-4">
          <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Compliance & Certification</h2>
          <p className="text-gray-600 mt-1">Regulatory compliance, certifications, and required documentation</p>
        </div>
      </div>

      {/* Certification Badges */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Certification Badges
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificationOptions.map((cert) => (
            <button
              key={cert.id}
              onClick={() => toggleCertification(cert.id)}
              className={`p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                formData.certifications.includes(cert.id)
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{cert.name}</span>
                {formData.certifications.includes(cert.id) && (
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-600"></i>
                )}
              </div>
              <p className="text-xs text-gray-500">{cert.description}</p>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Select all applicable certifications for this product</p>
      </div>

      {/* Regulatory Notes */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Regulatory Notes
        </label>
        <textarea
          rows={4}
          value={formData.regulatoryNotes}
          onChange={(e) => updateFormData('regulatoryNotes', e.target.value)}
          placeholder="Include any specific regulatory requirements, restrictions, warnings, or compliance notes for this product..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">Additional compliance information and requirements</p>
          <span className="text-xs text-gray-400">{formData.regulatoryNotes.length}/500</span>
        </div>
      </div>

      {/* Document Upload */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Upload Compliance Documents
        </label>
        
        {/* Expected Documents List */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Required Document Types:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-blue-800">
            {documentTypes.map((docType, index) => (
              <div key={index} className="flex items-center">
                <i className="ri-file-text-line w-4 h-4 flex items-center justify-center mr-2"></i>
                {docType}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex flex-col items-center">
            <i className="ri-upload-cloud-line w-12 h-12 flex items-center justify-center text-gray-400 mb-4"></i>
            <p className="text-lg font-medium text-gray-700 mb-2">Upload Documents</p>
            <p className="text-sm text-gray-500 mb-4">Drag and drop files here, or click to browse</p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap"
            >
              Choose Files
            </label>
            <p className="text-xs text-gray-400 mt-2">
              Supported: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
            </p>
          </div>
        </div>

        {/* Uploaded Files List */}
        {formData.uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
            {formData.uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <i className="ri-file-text-line w-5 h-5 flex items-center justify-center text-gray-500 mr-3"></i>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compliance Summary */}
      <div className="p-4 bg-amber-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Compliance Status Summary</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <span className="text-gray-600">Certifications:</span>
            <span className="ml-2 font-medium text-gray-900">{formData.certifications.length}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">Documents:</span>
            <span className="ml-2 font-medium text-gray-900">{formData.uploadedFiles.length}</span>
          </div>
          <div className="flex items-center">
            <span className={`font-medium ${
              formData.certifications.length > 0 || formData.uploadedFiles.length > 0 || formData.regulatoryNotes
                ? 'text-green-600' 
                : 'text-amber-600'
            }`}>
              {formData.certifications.length > 0 || formData.uploadedFiles.length > 0 || formData.regulatoryNotes
                ? 'Ready for Review' 
                : 'Needs Attention'
              }
            </span>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          Complete compliance documentation helps speed up the approval process and ensures regulatory requirements are met.
        </div>
      </div>
    </div>
  );
}