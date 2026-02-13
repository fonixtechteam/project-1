'use client';

import { useState } from 'react';

interface FormData {
  primaryImage: File | null;
  additionalImages: File[];
  productPDFs: { file: File; description: string }[];
  productVideos: { url: string; description: string }[];
  [key: string]: any;
}

interface AssetsVisualsProps {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export default function AssetsVisuals({ formData, updateFormData }: AssetsVisualsProps) {
  const [dragActive, setDragActive] = useState(false);
  const [pdfDescription, setPdfDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDescription, setVideoDescription] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'primary' | 'additional') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        if (type === 'primary') {
          updateFormData('primaryImage', file);
        } else {
          updateFormData('additionalImages', [...formData.additionalImages, file]);
        }
      }
    }
  };

  const handleImageUpload = (files: FileList, type: 'primary' | 'additional') => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      if (type === 'primary') {
        updateFormData('primaryImage', file);
      } else {
        updateFormData('additionalImages', [...formData.additionalImages, file]);
      }
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = formData.additionalImages.filter((_, i) => i !== index);
    updateFormData('additionalImages', newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...formData.additionalImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    updateFormData('additionalImages', newImages);
  };

  const handlePDFUpload = (files: FileList) => {
    const file = files[0];
    if (file && file.type === 'application/pdf') {
      const newPDF = { file, description: pdfDescription };
      updateFormData('productPDFs', [...formData.productPDFs, newPDF]);
      setPdfDescription('');
    }
  };

  const removePDF = (index: number) => {
    const newPDFs = formData.productPDFs.filter((_, i) => i !== index);
    updateFormData('productPDFs', newPDFs);
  };

  const addVideoLink = () => {
    if (videoUrl.trim()) {
      const newVideo = { url: videoUrl, description: videoDescription };
      updateFormData('productVideos', [...formData.productVideos, newVideo]);
      setVideoUrl('');
      setVideoDescription('');
    }
  };

  const removeVideo = (index: number) => {
    const newVideos = formData.productVideos.filter((_, i) => i !== index);
    updateFormData('productVideos', newVideos);
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
        <div className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-600 rounded-full mr-4">
          <i className="ri-image-line w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Assets & Visuals</h2>
          <p className="text-gray-600 mt-1">Product images, documents, and multimedia content</p>
        </div>
      </div>

      {/* Primary Image Upload */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Primary Product Image <span className="text-red-500">*</span>
        </label>
        
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={(e) => handleDrop(e, 'primary')}
          className={`relative border-2 border-dashed rounded-lg transition-colors ${
            dragActive ? 'border-pink-300 bg-pink-50' : 'border-gray-300'
          }`}
        >
          {formData.primaryImage ? (
            <div className="relative p-4">
              <img
                src={URL.createObjectURL(formData.primaryImage)}
                alt="Primary product"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={() => updateFormData('primaryImage', null)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer"
              >
                <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
              </button>
            </div>
          ) : (
            <div className="p-8 text-center">
              <i className="ri-image-add-line w-12 h-12 flex items-center justify-center text-gray-400 mx-auto mb-4"></i>
              <p className="text-lg font-medium text-gray-700 mb-2">Upload Primary Image</p>
              <p className="text-sm text-gray-500 mb-4">High-quality product image (recommended: 1200x1200px)</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files, 'primary')}
                className="hidden"
                id="primary-image-upload"
              />
              <label
                htmlFor="primary-image-upload"
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 cursor-pointer whitespace-nowrap"
              >
                Choose Image
              </label>
              <p className="text-xs text-gray-400 mt-2">JPG, PNG, WEBP (Max 5MB)</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Images */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Additional Product Images
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {formData.additionalImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(image)}
                alt={`Product ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                <button
                  onClick={() => index > 0 && moveImage(index, index - 1)}
                  disabled={index === 0}
                  className="w-8 h-8 flex items-center justify-center bg-white/80 rounded-full text-gray-700 hover:bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
                </button>
                <button
                  onClick={() => removeAdditionalImage(index)}
                  className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer"
                >
                  <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                </button>
                <button
                  onClick={() => index < formData.additionalImages.length - 1 && moveImage(index, index + 1)}
                  disabled={index === formData.additionalImages.length - 1}
                  className="w-8 h-8 flex items-center justify-center bg-white/80 rounded-full text-gray-700 hover:bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
                </button>
              </div>
            </div>
          ))}
          
          {/* Add More Button */}
          <div
            onDrop={(e) => handleDrop(e, 'additional')}
            onDragOver={handleDrag}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-pink-300 hover:bg-pink-50 transition-colors cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && Array.from(e.target.files).forEach(file => {
                if (file.type.startsWith('image/')) {
                  updateFormData('additionalImages', [...formData.additionalImages, file]);
                }
              })}
              className="hidden"
              id="additional-images-upload"
            />
            <label htmlFor="additional-images-upload" className="flex flex-col items-center cursor-pointer">
              <i className="ri-add-line w-8 h-8 flex items-center justify-center text-gray-400 mb-1"></i>
              <span className="text-sm text-gray-500">Add More</span>
            </label>
          </div>
        </div>
        
        <p className="text-xs text-gray-500">Drag images to reorder. Hover over images for controls.</p>
      </div>

      {/* Product PDFs */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Product PDFs & Info Sheets
        </label>
        
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={pdfDescription}
              onChange={(e) => setPdfDescription(e.target.value)}
              placeholder="Document description (e.g., Product Catalog, User Manual)"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => e.target.files && handlePDFUpload(e.target.files)}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer whitespace-nowrap"
            >
              Upload PDF
            </label>
          </div>
          
          {formData.productPDFs.length > 0 && (
            <div className="space-y-2">
              {formData.productPDFs.map((pdf, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-file-pdf-line w-5 h-5 flex items-center justify-center text-red-600 mr-3"></i>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{pdf.file.name}</p>
                      <p className="text-xs text-gray-500">{pdf.description} • {formatFileSize(pdf.file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removePDF(index)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Videos */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Product Videos (Optional)
        </label>
        
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="YouTube or Vimeo URL"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <input
              type="text"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              placeholder="Video description (optional)"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <button
            onClick={addVideoLink}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 cursor-pointer whitespace-nowrap"
          >
            Add Video Link
          </button>
          
          {formData.productVideos.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.productVideos.map((video, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-video-line w-5 h-5 flex items-center justify-center text-pink-600 mr-3"></i>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{video.url}</p>
                      {video.description && (
                        <p className="text-xs text-gray-500">{video.description}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeVideo(index)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Assets Summary */}
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Media Assets Summary</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Primary Image:</span>
            <span className={`ml-2 font-medium ${formData.primaryImage ? 'text-green-600' : 'text-red-600'}`}>
              {formData.primaryImage ? '✓' : 'Required'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Additional:</span>
            <span className="ml-2 font-medium text-gray-900">{formData.additionalImages.length} images</span>
          </div>
          <div>
            <span className="text-gray-600">Documents:</span>
            <span className="ml-2 font-medium text-gray-900">{formData.productPDFs.length} PDFs</span>
          </div>
          <div>
            <span className="text-gray-600">Videos:</span>
            <span className="ml-2 font-medium text-gray-900">{formData.productVideos.length} links</span>
          </div>
        </div>
      </div>
    </div>
  );
}