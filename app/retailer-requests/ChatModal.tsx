
'use client';

import { useState } from 'react';

interface ChatModalProps {
  request: {
    id: number;
    buyerName: string;
    businessType: string;
    market: string;
  };
  onClose: () => void;
}

export default function ChatModal({ request, onClose }: ChatModalProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'admin',
      text: `Hi! I see you have a request from ${request.buyerName}. How can I assist you with this buyer onboarding?`,
      timestamp: '2 minutes ago'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      timestamp: 'Just now'
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate admin response
    setTimeout(() => {
      const adminResponse = {
        id: messages.length + 2,
        sender: 'admin',
        text: 'Got it! I\'ll review their documentation and coordinate the onboarding process. I\'ll keep you updated on the progress.',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, adminResponse]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SA</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Synergy Admin</h3>
                  <p className="text-sm text-gray-500">Re: {request.buyerName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <i className="ri-close-line w-5 h-5 flex items-center justify-center text-gray-600"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="px-6 py-4 h-80 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-red-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white px-6 py-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 cursor-pointer"
              >
                <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
