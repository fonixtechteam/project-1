'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'brand' | 'participant';
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  fileName?: string;
  fileSize?: string;
}

interface MessageThreadProps {
  conversation: {
    id: string;
    participantName: string;
    participantType: 'buyer' | 'admin';
    participantCompany?: string;
    isOnline: boolean;
  };
  messages: Message[];
  onSendMessage: (message: string, attachments?: File[]) => void;
  onMarkAsRead: () => void;
  onArchiveConversation: () => void;
}

export default function MessageThread({
  conversation,
  messages,
  onSendMessage,
  onMarkAsRead,
  onArchiveConversation
}: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    onMarkAsRead();
  }, [conversation.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onSendMessage(newMessage);
    setNewMessage('');
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onSendMessage('', files);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* Thread Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-lime-50 to-green-50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center">
              {conversation.participantType === 'admin' ? (
                <i className="ri-admin-line w-6 h-6 flex items-center justify-center text-white"></i>
              ) : (
                <span className="text-white font-medium text-sm">
                  {conversation.participantName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            {conversation.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900">{conversation.participantName}</h2>
              {conversation.participantType === 'admin' && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  Synergy Admin
                </span>
              )}
            </div>
            {conversation.participantCompany && (
              <p className="text-sm text-gray-600">{conversation.participantCompany}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${conversation.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-xs text-gray-500">
                {conversation.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onMarkAsRead}
            className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
            title="Mark as Read"
          >
            <i className="ri-check-double-line w-5 h-5 flex items-center justify-center text-gray-600"></i>
          </button>
          <button
            onClick={onArchiveConversation}
            className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
            title="Archive Conversation"
          >
            <i className="ri-archive-line w-5 h-5 flex items-center justify-center text-gray-600"></i>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message, index) => {
          const showDate = index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
          
          return (
            <div key={message.id}>
              {showDate && (
                <div className="flex justify-center mb-4">
                  <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${message.sender === 'brand' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${message.sender === 'brand' ? 'order-2' : 'order-1'}`}>
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'brand'
                      ? 'bg-lime-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium opacity-75">
                        {message.senderName}
                      </span>
                      <span className="text-xs opacity-60">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    
                    {message.type === 'text' && (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                    
                    {message.type === 'file' && (
                      <div className="flex items-center gap-3 p-3 bg-black/10 rounded-lg">
                        <i className="ri-file-line w-5 h-5 flex items-center justify-center"></i>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{message.fileName}</p>
                          <p className="text-xs opacity-75">{message.fileSize}</p>
                        </div>
                        <button className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg transition-colors cursor-pointer">
                          <i className="ri-download-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder={`Message ${conversation.participantName}...`}
              rows={1}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-none"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          
          <div className="flex items-end gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors cursor-pointer"
              >
                <i className="ri-attachment-2 w-5 h-5 flex items-center justify-center"></i>
              </button>
              
              {showAttachmentMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-3 rounded-t-lg"
                  >
                    <i className="ri-file-line w-5 h-5 flex items-center justify-center text-gray-400"></i>
                    <span className="text-sm text-gray-700">Upload File</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-3 rounded-b-lg"
                  >
                    <i className="ri-image-line w-5 h-5 flex items-center justify-center text-gray-400"></i>
                    <span className="text-sm text-gray-700">Upload Image</span>
                  </button>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="flex items-center justify-center w-12 h-12 bg-lime-600 hover:bg-lime-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors cursor-pointer"
            >
              <i className="ri-send-plane-2-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </form>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
      </div>
      
      {/* Click outside to close attachment menu */}
      {showAttachmentMenu && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowAttachmentMenu(false)}
        ></div>
      )}
    </div>
  );
}