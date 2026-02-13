'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'system';
}

interface LiveChatWidgetProps {
  onClose: () => void;
}

export default function LiveChatWidget({ onClose }: LiveChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      senderName: 'Alex - Support Agent',
      message: 'Hello! Welcome to Synergy B2B Support. I\'m Alex, and I\'m here to help you with any questions or issues you might have. How can I assist you today?',
      timestamp: new Date().toISOString(),
      type: 'text'
    },
    {
      id: '2',
      sender: 'agent',
      senderName: 'System',
      message: 'Average response time: 2 minutes',
      timestamp: new Date().toISOString(),
      type: 'system'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { text: 'I need help with orders', icon: 'ri-shopping-cart-line' },
    { text: 'Product upload issues', icon: 'ri-upload-line' },
    { text: 'Compliance questions', icon: 'ri-shield-check-line' },
    { text: 'Billing inquiry', icon: 'ri-bill-line' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'You',
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        senderName: 'Alex - Support Agent',
        message: 'Thank you for reaching out! I understand your concern. Let me look into this for you right away. Could you provide me with some additional details to better assist you?',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (actionText: string) => {
    setNewMessage(actionText);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-customer-service-2-line w-5 h-5 flex items-center justify-center"></i>
            </div>
            <div>
              <h3 className="font-semibold">Live Support</h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-300' : 'bg-red-300'}`}></div>
                <span className="text-xs opacity-90">
                  {isConnected ? 'Online - Typically replies in minutes' : 'Connecting...'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === 'system' ? (
              <div className="text-center">
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                  {message.message}
                </span>
              </div>
            ) : (
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                }`}>
                  {message.sender === 'agent' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <i className="ri-customer-service-2-line w-3 h-3 flex items-center justify-center text-green-600"></i>
                      </div>
                      <span className="text-xs font-medium text-green-600">{message.senderName}</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-customer-service-2-line w-3 h-3 flex items-center justify-center text-green-600"></i>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-gray-500">Alex is typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <p className="text-xs text-gray-600 mb-3">Quick actions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.text)}
                className="flex items-center gap-2 p-2 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className={`${action.icon} w-3 h-3 flex items-center justify-center`}></i>
                <span className="truncate">{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={!isConnected}
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim() || !isConnected}
            className="flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-send-plane-2-line w-5 h-5 flex items-center justify-center"></i>
          </button>
        </form>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-attachment-2 w-4 h-4 flex items-center justify-center"></i>
            </button>
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-emotion-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          </div>
          <span className="text-xs text-gray-500">
            Press Enter to send
          </span>
        </div>
      </div>

      {/* Powered By */}
      <div className="px-4 py-2 text-center border-t border-gray-100 bg-gray-50">
        <span className="text-xs text-gray-400">
          Powered by Synergy Support • Available 24/7
        </span>
      </div>
    </div>
  );
}