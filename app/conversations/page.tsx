'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ConversationsHeader from './ConversationsHeader';
import ConversationsList from './ConversationsList';
import MessageThread from './MessageThread';
import NewMessageModal from './NewMessageModal';

interface Conversation {
  id: string;
  participantName: string;
  participantType: 'buyer' | 'admin';
  participantCompany?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  lastMessageSender: 'brand' | 'participant';
}

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

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  // Mock data
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: '1',
        participantName: 'Synergy Admin',
        participantType: 'admin',
        lastMessage: 'Your compliance documents have been reviewed and approved. You can now proceed with your product listings.',
        lastMessageTime: new Date(Date.now() - 300000).toISOString(),
        unreadCount: 2,
        isOnline: true,
        lastMessageSender: 'participant'
      },
      {
        id: '2',
        participantName: 'Sarah Johnson',
        participantType: 'buyer',
        participantCompany: 'Beauty Boutique Store',
        lastMessage: 'Thanks for the quick response! I\'ll place the order for 50 units of each product.',
        lastMessageTime: new Date(Date.now() - 1800000).toISOString(),
        unreadCount: 0,
        isOnline: true,
        lastMessageSender: 'participant'
      },
      {
        id: '3',
        participantName: 'Michael Chen',
        participantType: 'buyer',
        participantCompany: 'Wellness Corner',
        lastMessage: 'Perfect! The shipment arrived on time and everything looks great.',
        lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
        unreadCount: 0,
        isOnline: false,
        lastMessageSender: 'brand'
      },
      {
        id: '4',
        participantName: 'Emma Davis',
        participantType: 'buyer',
        participantCompany: 'Premium Skincare Hub',
        lastMessage: 'Could you provide more details about the new Retinol serum? My customers are very interested.',
        lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
        unreadCount: 1,
        isOnline: true,
        lastMessageSender: 'participant'
      },
      {
        id: '5',
        participantName: 'James Wilson',
        participantType: 'buyer',
        participantCompany: 'Natural Beauty Co.',
        lastMessage: 'The organic certification documents look perfect. When can we expect the next batch?',
        lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
        unreadCount: 0,
        isOnline: false,
        lastMessageSender: 'participant'
      }
    ];
    
    setConversations(mockConversations);
    setSelectedConversation(mockConversations[0]);
    loadMessagesForConversation(mockConversations[0].id);
  }, []);

  const loadMessagesForConversation = (conversationId: string) => {
    // Mock messages for the selected conversation
    const mockMessages: { [key: string]: Message[] } = {
      '1': [
        {
          id: 'm1',
          sender: 'brand',
          senderName: 'Brand Manager',
          content: 'Hello! I\'ve submitted our compliance documents for review. Could you please let me know the expected timeline for approval?',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          type: 'text'
        },
        {
          id: 'm2',
          sender: 'participant',
          senderName: 'Synergy Admin',
          content: 'Thank you for your submission! Our compliance team is currently reviewing your documents. The typical review process takes 3-5 business days.',
          timestamp: new Date(Date.now() - 5400000).toISOString(),
          type: 'text'
        },
        {
          id: 'm3',
          sender: 'participant',
          senderName: 'Synergy Admin',
          content: 'Your compliance documents have been reviewed and approved. You can now proceed with your product listings.',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          type: 'text'
        }
      ],
      '2': [
        {
          id: 'm4',
          sender: 'participant',
          senderName: 'Sarah Johnson',
          content: 'Hi! I\'m interested in your Hydrating Face Serum and Vitamin C Moisturizer. Can you provide bulk pricing for 50 units each?',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          type: 'text'
        },
        {
          id: 'm5',
          sender: 'brand',
          senderName: 'Brand Manager',
          content: 'Hello Sarah! Thank you for your interest. For 50 units of each product, I can offer you a 15% discount. The Hydrating Serum would be $38.25 per unit and the Vitamin C Moisturizer would be $29.75 per unit.',
          timestamp: new Date(Date.now() - 9000000).toISOString(),
          type: 'text'
        },
        {
          id: 'm6',
          sender: 'participant',
          senderName: 'Sarah Johnson',
          content: 'Thanks for the quick response! I\'ll place the order for 50 units of each product.',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          type: 'text'
        }
      ]
    };

    setMessages(mockMessages[conversationId] || []);
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    loadMessagesForConversation(conversation.id);
  };

  const handleSendMessage = (content: string, attachments?: File[]) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'brand',
      senderName: 'Brand Manager',
      content,
      timestamp: new Date().toISOString(),
      type: attachments && attachments.length > 0 ? 'file' : 'text',
      fileName: attachments?.[0]?.name,
      fileSize: attachments?.[0] ? `${(attachments[0].size / 1024).toFixed(1)} KB` : undefined
    };

    setMessages(prev => [...prev, newMessage]);

    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: content || `Sent ${attachments?.length} file(s)`,
              lastMessageTime: new Date().toISOString(),
              lastMessageSender: 'brand'
            }
          : conv
      )
    );
  };

  const handleStartConversation = (recipientId: string, message: string) => {
    // Create new conversation logic here
    console.log('Starting conversation with:', recipientId, message);
  };

  const handleMarkAsRead = () => {
    if (!selectedConversation) return;

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleArchiveConversation = () => {
    if (!selectedConversation) return;

    setConversations(prev => prev.filter(conv => conv.id !== selectedConversation.id));
    setSelectedConversation(null);
    setMessages([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ConversationsHeader onNewMessage={() => setShowNewMessage(true)} />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations Sidebar */}
          <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-100">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
                
                <div className="flex gap-1">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'unread', label: 'Unread' },
                    { key: 'archived', label: 'Archived' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setFilter(tab.key as any)}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        filter === tab.key
                          ? 'bg-lime-100 text-lime-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab.label}
                      {tab.key === 'unread' && conversations.some(c => c.unreadCount > 0) && (
                        <span className="ml-1 bg-lime-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {conversations.filter(c => c.unreadCount > 0).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <ConversationsList
              conversations={conversations}
              selectedConversationId={selectedConversation?.id || null}
              onSelectConversation={handleSelectConversation}
              searchTerm={searchTerm}
              filter={filter}
            />
          </div>

          {/* Message Thread */}
          <div className="flex-1">
            {selectedConversation ? (
              <MessageThread
                conversation={selectedConversation}
                messages={messages}
                onSendMessage={handleSendMessage}
                onMarkAsRead={handleMarkAsRead}
                onArchiveConversation={handleArchiveConversation}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-message-3-line w-10 h-10 flex items-center justify-center text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-500 mb-4">Choose a conversation from the list to start messaging</p>
                  <button
                    onClick={() => setShowNewMessage(true)}
                    className="flex items-center mx-auto px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
                    Start New Conversation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showNewMessage && (
        <NewMessageModal
          onClose={() => setShowNewMessage(false)}
          onStartConversation={handleStartConversation}
        />
      )}
    </div>
  );
}