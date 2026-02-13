
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import HelpSupportHeader from './HelpSupportHeader';
import TicketsList from './TicketsList';
import TicketDetailModal from './TicketDetailModal';
import NewTicketModal from './NewTicketModal';
import FAQSection from './FAQSection';
import LiveChatWidget from './LiveChatWidget';
import HelpCenterOverview from './HelpCenterOverview';

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: 'technical' | 'order' | 'product' | 'billing' | 'general';
  dateCreated: string;
  lastUpdated: string;
  responses: TicketResponse[];
  attachments: TicketAttachment[];
}

export interface TicketResponse {
  id: string;
  sender: 'brand' | 'support';
  senderName: string;
  message: string;
  timestamp: string;
  attachments?: TicketAttachment[];
}

export interface TicketAttachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
}

const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-2024-001',
    subject: 'Unable to upload product images to inventory',
    description: 'I am experiencing issues when trying to upload product images to the inventory system. The upload fails at 80% completion and shows an error message.',
    status: 'in-progress',
    priority: 'high',
    category: 'technical',
    dateCreated: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-15T14:22:00Z',
    responses: [
      {
        id: 'resp1',
        sender: 'brand',
        senderName: 'Brand Manager',
        message: 'I am experiencing issues when trying to upload product images to the inventory system. The upload fails at 80% completion and shows an error message. This is preventing me from updating our product catalog.',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: 'resp2',
        sender: 'support',
        senderName: 'Alex Thompson - Support Team',
        message: 'Thank you for reporting this issue. I can see that there might be a file size limitation causing this problem. Can you please confirm the file size and format of the images you are trying to upload? Our system supports JPG, PNG formats with a maximum size of 5MB per image.',
        timestamp: '2024-01-15T12:15:00Z'
      },
      {
        id: 'resp3',
        sender: 'brand',
        senderName: 'Brand Manager',
        message: 'The images are in PNG format, each around 3.2MB. I have tried multiple browsers (Chrome, Firefox) and the issue persists. Screenshots attached showing the error.',
        timestamp: '2024-01-15T14:22:00Z'
      }
    ],
    attachments: [
      {
        id: 'att1',
        fileName: 'error_screenshot.png',
        fileSize: '1.2 MB',
        fileType: 'image/png',
        uploadedBy: 'Brand Manager',
        uploadedAt: '2024-01-15T14:22:00Z'
      }
    ]
  },
  {
    id: 'TKT-2024-002',
    subject: 'Order fulfillment delay notification',
    description: 'Need clarification on the process for notifying buyers about order fulfillment delays.',
    status: 'resolved',
    priority: 'medium',
    category: 'order',
    dateCreated: '2024-01-14T09:15:00Z',
    lastUpdated: '2024-01-14T16:45:00Z',
    responses: [
      {
        id: 'resp4',
        sender: 'brand',
        senderName: 'Brand Manager',
        message: 'I have an order that will be delayed by 3-5 days due to supply chain issues. What is the proper process to notify the buyer and update the order status?',
        timestamp: '2024-01-14T09:15:00Z'
      },
      {
        id: 'resp5',
        sender: 'support',
        senderName: 'Maria Garcia - Support Team',
        message: 'You can update the order status in your Orders dashboard and send an automated notification to the buyer. Go to Orders > Select Order > Update Status > Add Delay Reason. The system will automatically notify the buyer via email and in-platform notification.',
        timestamp: '2024-01-14T11:30:00Z'
      },
      {
        id: 'resp6',
        sender: 'brand',
        senderName: 'Brand Manager',
        message: 'Perfect! I found the option and successfully updated the order. The buyer has been notified. Thank you for the quick assistance!',
        timestamp: '2024-01-14T16:45:00Z'
      }
    ],
    attachments: []
  },
  {
    id: 'TKT-2024-003',
    subject: 'Compliance document upload requirements',
    description: 'Questions about the specific requirements for compliance document formats and certifications.',
    status: 'open',
    priority: 'low',
    category: 'product',
    dateCreated: '2024-01-13T15:20:00Z',
    lastUpdated: '2024-01-13T15:20:00Z',
    responses: [
      {
        id: 'resp7',
        sender: 'brand',
        senderName: 'Brand Manager',
        message: 'I need clarification on the acceptable formats for COA (Certificate of Analysis) documents. Are scanned PDFs acceptable, or do they need to be digitally signed? Also, what are the requirements for FDA registration documents?',
        timestamp: '2024-01-13T15:20:00Z'
      }
    ],
    attachments: []
  },
  {
    id: 'TKT-2024-004',
    subject: 'Payment processing fee inquiry',
    description: 'Request for detailed breakdown of platform fees and payment processing charges.',
    status: 'closed',
    priority: 'low',
    category: 'billing',
    dateCreated: '2024-01-12T11:45:00Z',
    lastUpdated: '2024-01-12T17:30:00Z',
    responses: [
      {
        id: 'resp8',
        sender: 'brand',
        senderName: 'Brand Manager',
        message: 'Could you provide a detailed breakdown of all fees associated with using the platform? I need this information for our financial planning.',
        timestamp: '2024-01-12T11:45:00Z'
      },
      {
        id: 'resp9',
        sender: 'support',
        senderName: 'Jennifer Lee - Billing Team',
        message: 'I have sent you a detailed fee structure document to your registered email address. This includes platform fees, payment processing charges, and any additional service fees. Please review and let me know if you have any questions.',
        timestamp: '2024-01-12T14:20:00Z'
      },
      {
        id: 'resp10',
        sender: 'brand',
        senderName: 'Brand Manager',
        message: 'Received the document. Everything is clear now. Thank you for the comprehensive breakdown!',
        timestamp: '2024-01-12T17:30:00Z'
      }
    ],
    attachments: []
  }
];

export default function HelpSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentView, setCurrentView] = useState<'overview' | 'tickets' | 'faqs'>('overview');

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowTicketDetail(true);
  };

  const handleCreateTicket = (ticketData: Partial<SupportTicket>) => {
    const newTicket: SupportTicket = {
      id: `TKT-2024-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: ticketData.subject || '',
      description: ticketData.description || '',
      status: 'open',
      priority: ticketData.priority || 'medium',
      category: ticketData.category || 'general',
      dateCreated: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      responses: [
        {
          id: 'initial',
          sender: 'brand',
          senderName: 'Brand Manager',
          message: ticketData.description || '',
          timestamp: new Date().toISOString()
        }
      ],
      attachments: ticketData.attachments || []
    };

    setTickets([newTicket, ...tickets]);
    setShowNewTicket(false);
  };

  const handleAddResponse = (ticketId: string, message: string, attachments?: File[]) => {
    const newResponse: TicketResponse = {
      id: Date.now().toString(),
      sender: 'brand',
      senderName: 'Brand Manager',
      message,
      timestamp: new Date().toISOString(),
      attachments: attachments?.map(file => ({
        id: Date.now().toString(),
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        fileType: file.type,
        uploadedBy: 'Brand Manager',
        uploadedAt: new Date().toISOString()
      }))
    };

    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? {
              ...ticket,
              responses: [...ticket.responses, newResponse],
              lastUpdated: new Date().toISOString()
            }
          : ticket
      )
    );

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        responses: [...selectedTicket.responses, newResponse],
        lastUpdated: new Date().toISOString()
      });
    }
  };

  const handleContactEmail = () => {
    window.location.href = 'mailto:support@synergy.com?subject=Support Request from Brand Portal';
  };

  const handleCategorySelect = (category: string) => {
    if (category === 'ticket') {
      setShowNewTicket(true);
    } else if (category === 'faqs') {
      setCurrentView('faqs');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return (
          <HelpCenterOverview
            onCategorySelect={handleCategorySelect}
            onContactEmail={handleContactEmail}
            onToggleChat={() => setShowLiveChat(!showLiveChat)}
          />
        );
      case 'tickets':
        return (
          <TicketsList
            tickets={tickets}
            onViewTicket={handleViewTicket}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            onCategoryFilter={setCategoryFilter}
          />
        );
      case 'faqs':
        return <FAQSection />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <HelpSupportHeader 
          onNewTicket={() => setShowNewTicket(true)}
          onToggleChat={() => setShowLiveChat(!showLiveChat)}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        <div className="p-8">
          {renderContent()}
        </div>
      </div>

      {showTicketDetail && selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setShowTicketDetail(false)}
          onAddResponse={handleAddResponse}
        />
      )}

      {showNewTicket && (
        <NewTicketModal
          onClose={() => setShowNewTicket(false)}
          onCreateTicket={handleCreateTicket}
        />
      )}

      {showLiveChat && (
        <LiveChatWidget
          onClose={() => setShowLiveChat(false)}
        />
      )}
    </div>
  );
}
