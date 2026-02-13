'use client';

import { useState } from 'react';

interface Conversation {
  id: string;
  participantName: string;
  participantType: 'buyer' | 'admin';
  participantCompany?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
  lastMessageSender: 'brand' | 'participant';
}

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
  searchTerm: string;
  filter: string;
}

export default function ConversationsList({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation, 
  searchTerm, 
  filter 
}: ConversationsListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredConversations = conversations.filter(conversation => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        conversation.participantName.toLowerCase().includes(searchLower) ||
        conversation.participantCompany?.toLowerCase().includes(searchLower) ||
        conversation.lastMessage.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filter === 'unread' && conversation.unreadCount === 0) return false;
    if (filter === 'archived') return false; // Add archived logic if needed

    return true;
  });

  if (filteredConversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-message-3-line w-8 h-8 flex items-center justify-center text-gray-400"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No conversations found' : 'No conversations yet'}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria' : 'Start a conversation with a buyer or admin'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="divide-y divide-gray-100">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            onMouseEnter={() => setHoveredId(conversation.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`p-4 cursor-pointer transition-all duration-150 ${
              selectedConversationId === conversation.id
                ? 'bg-lime-50 border-r-2 border-lime-500'
                : hoveredId === conversation.id
                ? 'bg-gray-50'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
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

              {/* Conversation Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-sm font-medium truncate ${
                      conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {conversation.participantName}
                    </h3>
                    {conversation.participantType === 'admin' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {conversation.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-lime-500 rounded-full">
                        {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                      </span>
                    )}
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                </div>

                {conversation.participantCompany && (
                  <p className="text-xs text-gray-500 mb-1">{conversation.participantCompany}</p>
                )}

                <div className="flex items-start justify-between">
                  <p className={`text-sm truncate pr-2 ${
                    conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                  }`}>
                    {conversation.lastMessageSender === 'brand' && (
                      <span className="text-gray-500 mr-1">You:</span>
                    )}
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}