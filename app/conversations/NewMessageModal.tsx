'use client';

import { useState } from 'react';

interface Recipient {
  id: string;
  name: string;
  type: 'buyer' | 'admin';
  company?: string;
  email: string;
}

interface NewMessageModalProps {
  onClose: () => void;
  onStartConversation: (recipientId: string, message: string) => void;
}

export default function NewMessageModal({ onClose, onStartConversation }: NewMessageModalProps) {
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [recipientType, setRecipientType] = useState<'all' | 'buyers' | 'admin'>('all');

  const mockRecipients: Recipient[] = [
    {
      id: 'admin-1',
      name: 'Synergy Admin',
      type: 'admin',
      email: 'admin@synergy.com'
    },
    {
      id: 'buyer-1',
      name: 'Sarah Johnson',
      type: 'buyer',
      company: 'Beauty Boutique Store',
      email: 'sarah@beautyboutique.com'
    },
    {
      id: 'buyer-2',
      name: 'Michael Chen',
      type: 'buyer',
      company: 'Wellness Corner',
      email: 'michael@wellnesscorner.com'
    },
    {
      id: 'buyer-3',
      name: 'Emma Davis',
      type: 'buyer',
      company: 'Premium Skincare Hub',
      email: 'emma@premiumskincare.com'
    },
    {
      id: 'buyer-4',
      name: 'James Wilson',
      type: 'buyer',
      company: 'Natural Beauty Co.',
      email: 'james@naturalbeauty.com'
    }
  ];

  const filteredRecipients = mockRecipients.filter(recipient => {
    // Type filter
    if (recipientType === 'buyers' && recipient.type !== 'buyer') return false;
    if (recipientType === 'admin' && recipient.type !== 'admin') return false;
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        recipient.name.toLowerCase().includes(searchLower) ||
        recipient.company?.toLowerCase().includes(searchLower) ||
        recipient.email.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    return true;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecipient || !message.trim()) return;
    
    onStartConversation(selectedRecipient.id, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-lime-50 to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">New Message</h2>
              <p className="text-sm text-gray-600 mt-1">Start a conversation with a buyer or admin</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
        </div>

        {/* Recipient Selection */}
        <div className="flex-1 flex overflow-hidden">
          {/* Recipients List */}
          <div className="w-1/2 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Search recipients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
                
                <div className="flex gap-1">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'buyers', label: 'Buyers' },
                    { key: 'admin', label: 'Admin' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setRecipientType(tab.key as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        recipientType === tab.key
                          ? 'bg-lime-100 text-lime-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredRecipients.map((recipient) => (
                <div
                  key={recipient.id}
                  onClick={() => setSelectedRecipient(recipient)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedRecipient?.id === recipient.id
                      ? 'bg-lime-50 border-l-2 border-l-lime-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center">
                      {recipient.type === 'admin' ? (
                        <i className="ri-admin-line w-5 h-5 flex items-center justify-center text-white"></i>
                      ) : (
                        <span className="text-white font-medium text-sm">
                          {recipient.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{recipient.name}</p>
                        {recipient.type === 'admin' && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Admin
                          </span>
                        )}
                      </div>
                      {recipient.company && (
                        <p className="text-xs text-gray-600 truncate">{recipient.company}</p>
                      )}
                      <p className="text-xs text-gray-500 truncate">{recipient.email}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredRecipients.length === 0 && (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <i className="ri-user-search-line w-12 h-12 flex items-center justify-center text-gray-300 mx-auto mb-2"></i>
                    <p className="text-sm text-gray-500">No recipients found</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message Composition */}
          <div className="w-1/2 flex flex-col">
            {selectedRecipient ? (
              <>
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center">
                      {selectedRecipient.type === 'admin' ? (
                        <i className="ri-admin-line w-5 h-5 flex items-center justify-center text-white"></i>
                      ) : (
                        <span className="text-white font-medium text-sm">
                          {selectedRecipient.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{selectedRecipient.name}</p>
                        {selectedRecipient.type === 'admin' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Admin
                          </span>
                        )}
                      </div>
                      {selectedRecipient.company && (
                        <p className="text-xs text-gray-600">{selectedRecipient.company}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSendMessage} className="flex-1 flex flex-col">
                  <div className="flex-1 p-4">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full h-full resize-none border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      style={{ minHeight: '200px' }}
                    />
                  </div>
                  
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <i className="ri-attachment-2 w-4 h-4 flex items-center justify-center"></i>
                          Attach
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!message.trim()}
                          className="flex items-center gap-2 px-4 py-2 bg-lime-600 hover:bg-lime-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-send-plane-2-line w-4 h-4 flex items-center justify-center"></i>
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-user-add-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
                  <p className="text-gray-500">Select a recipient to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}