'use client';

import { useState, useRef } from 'react';
import { SupportTicket, TicketAttachment } from './page';

interface NewTicketModalProps {
  onClose: () => void;
  onCreateTicket: (ticketData: Partial<SupportTicket>) => void;
}

export default function NewTicketModal({ onClose, onCreateTicket }: NewTicketModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'general' as 'technical' | 'order' | 'product' | 'billing' | 'general',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryOptions = [
    { value: 'technical', label: 'Technical Issue', icon: 'ri-tools-line', description: 'Platform bugs, login issues, technical problems' },
    { value: 'order', label: 'Order Help', icon: 'ri-shopping-cart-line', description: 'Order management, fulfillment, shipping questions' },
    { value: 'product', label: 'Product Inquiry', icon: 'ri-product-hunt-line', description: 'Product listings, compliance, catalog questions' },
    { value: 'billing', label: 'Billing', icon: 'ri-bill-line', description: 'Payment issues, fees, billing inquiries' },
    { value: 'general', label: 'General Support', icon: 'ri-question-line', description: 'Other questions and general assistance' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: 'text-blue-600', description: 'General questions, non-urgent issues' },
    { value: 'medium', label: 'Medium Priority', color: 'text-orange-600', description: 'Important issues affecting workflow' },
    { value: 'high', label: 'High Priority', color: 'text-red-600', description: 'Critical issues requiring immediate attention' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      return file.size <= maxSize && allowedTypes.includes(fileExtension);
    });
    
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 10) {
      newErrors.subject = 'Subject must be at least 10 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const ticketAttachments: TicketAttachment[] = attachments.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      fileType: file.type,
      uploadedBy: 'Brand Manager',
      uploadedAt: new Date().toISOString()
    }));

    onCreateTicket({
      ...formData,
      attachments: ticketAttachments
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-lime-50 to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Create New Support Ticket</h2>
              <p className="text-gray-600 mt-1">Describe your issue and we'll help you resolve it quickly</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors duration-150 cursor-pointer"
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent ${
                  errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                placeholder="Brief summary of your issue..."
                maxLength={150}
              />
              <div className="flex items-center justify-between mt-2">
                {errors.subject && (
                  <span className="text-red-500 text-xs">{errors.subject}</span>
                )}
                <span className="text-xs text-gray-500 ml-auto">
                  {formData.subject.length}/150 characters
                </span>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                {categoryOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.category === option.value
                        ? 'border-lime-500 bg-lime-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={option.value}
                      checked={formData.category === option.value}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.category === option.value ? 'bg-lime-500 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <i className={`${option.icon} w-5 h-5 flex items-center justify-center`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        formData.category === option.value ? 'text-lime-700' : 'text-gray-900'
                      }`}>
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Priority Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {priorityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.priority === option.value
                        ? 'border-lime-500 bg-lime-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={option.value}
                      checked={formData.priority === option.value}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="sr-only"
                    />
                    <span className={`text-lg font-semibold ${
                      formData.priority === option.value ? 'text-lime-700' : option.color
                    }`}>
                      {option.label}
                    </span>
                    <p className="text-xs text-gray-600 mt-2 text-center">{option.description}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={5}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-none ${
                  errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, or specific questions..."
                maxLength={1000}
              />
              <div className="flex items-center justify-between mt-2">
                {errors.description && (
                  <span className="text-red-500 text-xs">{errors.description}</span>
                )}
                <span className="text-xs text-gray-500 ml-auto">
                  {formData.description.length}/1000 characters
                </span>
              </div>
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Attachments (Optional)
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  className="hidden"
                />
                <i className="ri-upload-cloud-2-line w-12 h-12 flex items-center justify-center text-gray-400 mx-auto mb-3"></i>
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload files or drag and drop
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  PDF, DOC, PNG, JPG up to 10MB each (Max 5 files)
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-attachment-2 w-4 h-4 flex items-center justify-center"></i>
                  Choose Files
                </button>
              </div>

              {/* Attached Files List */}
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Attached Files:</h4>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <i className="ri-file-text-line w-5 h-5 flex items-center justify-center text-gray-400"></i>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <i className="ri-time-line w-4 h-4 flex items-center justify-center mr-1 inline"></i>
              Our support team typically responds within 2-4 hours
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-xl hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}