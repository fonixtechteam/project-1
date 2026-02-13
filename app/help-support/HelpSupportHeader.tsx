
'use client';

interface HelpSupportHeaderProps {
  onNewTicket: () => void;
  onToggleChat: () => void;
  currentView: 'tickets' | 'faqs' | 'overview';
  onViewChange: (view: 'tickets' | 'faqs' | 'overview') => void;
}

export default function HelpSupportHeader({ 
  onNewTicket, 
  onToggleChat, 
  currentView, 
  onViewChange 
}: HelpSupportHeaderProps) {
  const handleContactEmail = () => {
    window.location.href = 'mailto:support@synergy.com?subject=Support Request from Brand Portal';
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold text-gray-900">Help & Support</h1>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <i className="ri-customer-service-2-line w-3 h-3 flex items-center justify-center mr-1"></i>
              24/7 Available
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Get assistance with any issues related to your account, orders, or products</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleContactEmail}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2"></i>
            📧 Contact Us
          </button>
          <button 
            onClick={onToggleChat}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-chat-3-line w-4 h-4 flex items-center justify-center mr-2"></i>
            💬 Chat with Support
          </button>
          <button 
            onClick={onNewTicket}
            className="flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Create Ticket
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1">
        {[
          { key: 'overview', label: 'Help Center Overview', icon: 'ri-home-4-line' },
          { key: 'tickets', label: 'My Support Tickets', icon: 'ri-ticket-2-line' },
          { key: 'faqs', label: 'Frequently Asked Questions', icon: 'ri-question-answer-line' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => onViewChange(tab.key as 'tickets' | 'faqs' | 'overview')}
            className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              currentView === tab.key
                ? 'bg-lime-100 text-lime-700 border border-lime-200'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            <i className={`${tab.icon} w-4 h-4 flex items-center justify-center mr-2`}></i>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
