'use client';

import { useState, useRef, useEffect } from 'react';
import { Order } from './page';

interface Message {
  id: string;
  sender: 'buyer' | 'brand';
  message: string;
  timestamp: string;
  senderName: string;
}

interface ChatModalProps {
  order: Order;
  onClose: () => void;
}

export default function ChatModal({ order, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'buyer',
      message: `Hello! I placed order ${order.id} and wanted to check on the status. When can I expect delivery?`,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      senderName: order.buyerInfo.name
    },
    {
      id: '2',
      sender: 'brand',
      message: 'Hi there! Thanks for reaching out. Your order is currently being processed and should ship within 24 hours. I\'ll keep you updated on the tracking information.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      senderName: 'Brand Manager'
    },
    {
      id: '3',
      sender: 'buyer',
      message: 'Great! Also, I noticed one of the products in my order is the Hydrating Face Serum. Can you confirm the expiration date on these items?',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      senderName: order.buyerInfo.name
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'brand',
      message: newMessage,
      timestamp: new Date().toISOString(),
      senderName: 'Brand Manager'
    };

    setMessages([...messages, message]);
    setNewMessage('');
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Chat with {order.buyerInfo.name}</h2>
              <p className="text-sm text-gray-600 mt-1">Order: {order.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors duration-150 cursor-pointer"
              >
                <i className="ri-close-line text-xl text-gray-500"></i>
              </button>
            </div>
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
                    <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}
                
                <div className={`flex ${message.sender === 'brand' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'brand'
                      ? 'bg-blue-600 text-white'
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
                    <p className="text-sm leading-relaxed">{message.message}</p>
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
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors cursor-pointer"
            >
              <i className="ri-send-plane-2-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </form>
          
          <div className="flex items-center gap-4 mt-3">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <i className="ri-attachment-2 w-4 h-4 flex items-center justify-center"></i>
              Attach File
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <i className="ri-image-line w-4 h-4 flex items-center justify-center"></i>
              Send Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}