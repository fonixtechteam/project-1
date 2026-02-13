
'use client';

import { useState } from 'react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (document: any) => void;
  products?: { id: string; name: string }[];
}

interface ProductFolder {
  id: string;
  name: string;
}

export default function UploadDocumentModal({
  isOpen,
  onClose,
  onUploadSuccess,
  products = [],
}: UploadDocumentModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    certificationType: '',
    associatedProduct: '',
    expirationDate: '',
    description: '',
    issuingAuthority: '',
    certificateNumber: '',
  });

  const [selectedProduct, setSelectedProduct] = useState('');
  const [documentCategory, setDocumentCategory] = useState<'certificates' | 'regulatory' | 'product-info'>('certificates');

  const allowedTypes = {
    'application/pdf': '.pdf',
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  };

  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const maxFiles = 10;

  const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
    const errors: string[] = [];
    const valid: File[] = [];

    if (files.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed at once`);
      return { valid, errors };
    }

    files.forEach((file, index) => {
      // Check file type
      if (!Object.keys(allowedTypes).includes(file.type)) {
        errors.push(`File ${index + 1} (${file.name}): Unsupported file type. Only PDF, JPG, PNG, DOC, DOCX allowed.`);
        return;
      }

      // Check file size
      if (file.size > maxFileSize) {
        errors.push(`File ${index + 1} (${file.name}): File too large. Maximum size is 10MB.`);
        return;
      }

      // Check filename length
      if (file.name.length > 100) {
        errors.push(`File ${index + 1} (${file.name}): Filename too long. Maximum 100 characters.`);
        return;
      }

      valid.push(file);
    });

    return { valid, errors };
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

    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      const { valid, errors } = validateFiles(files);

      setValidationErrors(errors);
      if (valid.length > 0) {
        setSelectedFiles((prev) => [...prev, ...valid]);
        if (!formData.name && valid[0].name) {
          setFormData((prev) => ({ ...prev, name: valid[0].name.split('.')[0] }));
        }
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const { valid, errors } = validateFiles(files);

      setValidationErrors(errors);
      if (valid.length > 0) {
        setSelectedFiles((prev) => [...prev, ...valid]);
        if (!formData.name && valid[0].name) {
          setFormData((prev) => ({ ...prev, name: valid[0].name.split('.')[0] }));
        }
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setValidationErrors([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return 'ri-image-line text-blue-600';
    if (file.type === 'application/pdf') return 'ri-file-pdf-line text-red-600';
    return 'ri-file-text-line text-gray-600';
  };

  const simulateUpload = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
      }, 200);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setValidationErrors(['Please select at least one file to upload.']);
      return;
    }

    if (!selectedProduct) {
      setValidationErrors(['Please select a product.']);
      return;
    }

    if (!formData.certificationType || !formData.associatedProduct || !formData.expirationDate) {
      setValidationErrors(['Please fill in all required fields.']);
      return;
    }

    // Simulate upload process
    for (const file of selectedFiles) {
      await simulateUpload(file);
    }

    // Create document entries
    const selectedProductData = products.find((p) => p.id === selectedProduct);
    const newDocument = {
      id: Date.now().toString(),
      name: formData.name,
      productName: selectedProductData?.name || 'Unknown Product',
      category: documentCategory,
      certificationType: formData.certificationType,
      uploadDate: new Date().toISOString(),
      expirationDate: formData.expirationDate,
      status: 'pending',
      fileSize: formatFileSize(selectedFiles[0].size),
      fileType: selectedFiles[0].type.includes('pdf') ? 'PDF' : selectedFiles[0].type.includes('image') ? 'Image' : 'Document',
      complianceScore: Math.floor(Math.random() * 20) + 80,
      description: formData.description,
      issuingAuthority: formData.issuingAuthority,
      certificateNumber: formData.certificateNumber,
      fileName: selectedFiles[0].name,
      mimeType: selectedFiles[0].type,
    };

    onUploadSuccess(newDocument);

    // Reset form
    setSelectedFiles([]);
    setFormData({
      name: '',
      certificationType: '',
      associatedProduct: '',
      expirationDate: '',
      description: '',
      issuingAuthority: '',
      certificateNumber: '',
    });
    setUploadProgress({});
    setValidationErrors([]);
  };

  if (!isOpen) return null;

  const isUploading = Object.keys(uploadProgress).length > 0 && Object.values(uploadProgress).some((p) => p < 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Upload Compliance Documents</h2>
              <p className="text-gray-600 mt-1">Add new certifications or legal documents to your compliance library</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <i className="ri-error-warning-line w-5 h-5 flex items-center justify-center text-red-600 mr-2 mt-0.5"></i>
                  <div>
                    <h4 className="text-sm font-medium text-red-800 mb-2">Upload Validation Errors:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Document Files *{' '}
                <span className="text-xs text-gray-500 ml-2">(PDF, JPG, PNG, DOC, DOCX - Max 10MB each, {maxFiles} files max)</span>
              </label>

              {/* Drag & Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive ? 'border-blue-400 bg-blue-50 scale-105' : 'border-gray-300 hover:border-blue-300'
                } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
              >
                <div className="space-y-4">
                  <i className="ri-upload-cloud-2-line w-16 h-16 flex items-center justify-center text-gray-400 mx-auto"></i>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Drag & Drop Multiple Files Here</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Or click to browse and select multiple documents at once
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                    <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">JPG</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">PNG</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">DOC</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">DOCX</span>
                  </div>

                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                    className="hidden"
                    id="document-upload"
                  />
                  <label
                    htmlFor="document-upload"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-folder-open-line w-5 h-5 flex items-center justify-center mr-2"></i>
                    Browse Files
                  </label>
                </div>
              </div>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Selected Files ({selectedFiles.length}/{maxFiles})
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center flex-1 min-w-0">
                        <i className={`w-8 h-8 flex items-center justify-center mr-3 rounded-lg bg-white ${getFileIcon(file)}`}></i>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{formatFileSize(file.size)}</span>
                            <span className="capitalize">{file.type.split('/')[1]}</span>
                            {uploadProgress[file.name] !== undefined && (
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress[file.name]}%` }}
                                  ></div>
                                </div>
                                <span>{Math.round(uploadProgress[file.name])}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        disabled={isUploading}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ml-3"
                      >
                        <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Product *</label>
              <select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  setValidationErrors([]);
                }}
                className={`w-full px-3 py-3 pr-8 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  validationErrors.includes('Please select a product.') ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Choose a product...</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              {validationErrors.includes('Please select a product.') && (
                <p className="mt-1 text-sm text-red-600">Please select a product.</p>
              )}
            </div>

            {/* Document Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Category *</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDocumentCategory('certificates')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    documentCategory === 'certificates'
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-award-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Certificates
                </button>
                <button
                  type="button"
                  onClick={() => setDocumentCategory('regulatory')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    documentCategory === 'regulatory'
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-file-shield-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Regulatory
                </button>
                <button
                  type="button"
                  onClick={() => setDocumentCategory('product-info')}
                  className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                    documentCategory === 'product-info'
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-file-text-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Product Info
                </button>
              </div>
            </div>

            {/* Document Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., FDA Registration Certificate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certification Type *</label>
                <select
                  name="certificationType"
                  value={formData.certificationType}
                  onChange={handleInputChange}
                  className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  required
                >
                  <option value="">Select type...</option>
                  <option value="FDA">FDA Certification</option>
                  <option value="USDA Organic">USDA Organic</option>
                  <option value="ISO">ISO Certification</option>
                  <option value="GMP">GMP Certificate</option>
                  <option value="COA">Certificate of Analysis</option>
                  <option value="Safety Testing">Safety Testing Report</option>
                  <option value="Allergen Testing">Allergen Testing</option>
                  <option value="Kosher">Kosher Certification</option>
                  <option value="Halal">Halal Certification</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Associated Product *</label>
                <select
                  name="associatedProduct"
                  value={formData.associatedProduct}
                  onChange={handleInputChange}
                  className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  required
                >
                  <option value="">Select product...</option>
                  <option value="Vitamin C Brightening Serum">Vitamin C Brightening Serum</option>
                  <option value="Omega-3 Fish Oil Capsules">Omega-3 Fish Oil Capsules</option>
                  <option value="Premium Collagen Powder">Premium Collagen Powder</option>
                  <option value="Daily Probiotic Capsules">Daily Probiotic Capsules</option>
                  <option value="Biotin Hair Growth Supplements">Biotin Hair Growth Supplements</option>
                  <option value="All Products">All Products</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date *</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Authority</label>
                <input
                  type="text"
                  name="issuingAuthority"
                  value={formData.issuingAuthority}
                  onChange={handleInputChange}
                  placeholder="e.g., FDA, USDA, ISO"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
                <input
                  type="text"
                  name="certificateNumber"
                  value={formData.certificateNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., FDA-12345678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Add any additional notes or description about this document..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
            </div>

            {/* Upload Settings */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Upload Settings</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Submit for admin review immediately</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Send expiration reminder notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <span className="ml-2 text-sm text-gray-700">Make visible to retailers (approved documents only)</span>
                </label>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFiles.length || !selectedProduct || !formData.certificationType || !formData.associatedProduct || !formData.expirationDate}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap"
            >
              Upload Documents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
