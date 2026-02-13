'use client';

import { useState, useRef, useEffect } from 'react';
import { SupportTicket, TicketResponse } from './page';

interface TicketDetailModalProps {
  ticket: SupportTicket;
  onClose: () => void;
  onAddResponse: (ticketId: string, message: string, attachments?: File[]) => void;
}

export default function TicketDetailModal({ ticket, onClose, onAddResponse }: TicketDetailModalProps) {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [ticket.responses]);

  const getStatusBadge = (status: string) => {
    const badges = {
      'open': 'bg-red-100 text-red-800 border-red-200',
      'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'resolved': 'bg-green-100 text-green-800 border-green-200',
      'closed': 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const icons = {
      'open': 'ri-error-warning-line',
      'in-progress': 'ri-time-line',
      'resolved': 'ri-check-line',
      'closed': 'ri-close-circle-line'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 text-sm font-medium border rounded-full ${badges[status as keyof typeof badges]}`}>
        <i className={`${icons[status as keyof typeof icons]} w-4 h-4 flex items-center justify-center mr-2`}></i>
        {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      'low': 'bg-blue-100 text-blue-800',
      'medium': 'bg-orange-100 text-orange-800',
      'high': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${badges[priority as keyof typeof badges]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </span>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'technical': 'ri-tools-line',
      'order': 'ri-shopping-cart-line',
      'product': 'ri-product-hunt-line',
      'billing': 'ri-bill-line',
      'general': 'ri-question-line'
    };

    return icons[category as keyof typeof icons] || 'ri-question-line';
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && attachments.length === 0) return;

    onAddResponse(ticket.id, newMessage, attachments);
    setNewMessage('');
    setAttachments([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-2xl font-bold text-gray-800">{ticket.subject}</h2>
                {getStatusBadge(ticket.status)}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{ticket.id}</span>
                <div className="flex items-center gap-1">
                  <i className={`${getCategoryIcon(ticket.category)} w-4 h-4 flex items-center justify-center`}></i>
                  <span className="capitalize">{ticket.category}</span>
                </div>
                {getPriorityBadge(ticket.priority)}
                <span>Created: {formatDateTime(ticket.dateCreated)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors duration-150 cursor-pointer"
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
        </div>

        {/* Ticket Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Initial Description */}
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Original Request</h3>
            <p className="text-gray-700 leading-relaxed">{ticket.description}</p>
            
            {ticket.attachments.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                <div className="space-y-2">
                  {ticket.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
                      <i className="ri-file-text-line w-5 h-5 flex items-center justify-center text-gray-400"></i>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{attachment.fileName}</p>
                        <p className="text-xs text-gray-500">{attachment.fileSize} • {formatDateTime(attachment.uploadedAt)}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm cursor-pointer">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Conversation Thread */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {ticket.responses.slice(1).map((response, index) => (
              <div key={response.id} className={`flex ${response.sender === 'brand' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl ${response.sender === 'brand' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'} border rounded-xl p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        response.sender === 'brand' ? 'bg-blue-600' : 'bg-green-600'
                      }`}>
                        {response.sender === 'brand' ? 'B' : 'S'}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{response.senderName}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDateTime(response.timestamp)}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{response.message}</p>
                  
                  {response.attachments && response.attachments.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="space-y-2">
                        {response.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center gap-2 text-sm">
                            <i className="ri-attachment-2 w-4 h-4 flex items-center justify-center text-gray-400"></i>
                            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                              {attachment.fileName}
                            </span>
                            <span className="text-gray-400">({attachment.fileSize})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply Form */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <form onSubmit={handleSubmitResponse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Reply</label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Type your response or provide additional information..."
                  maxLength={500}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {newMessage.length}/500 characters
                  </span>
                </div>
              </div>

              {/* Attachments */}
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Attachments:</label>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
                      <i className="ri-file-text-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
                      <span className="text-sm text-gray-700 flex-1">{file.name}</span>
                      <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        <i className="ri-close-line text-sm"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-attachment-2 w-4 h-4 flex items-center justify-center"></i>
                    Attach Files
                  </button>
                  <span className="text-xs text-gray-500">
                    PDF, DOC, PNG, JPG up to 10MB each
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!newMessage.trim() && attachments.length === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-send-plane-2-line w-4 h-4 flex items-center justify-center"></i>
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}