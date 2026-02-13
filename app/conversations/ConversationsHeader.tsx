'use client';

interface ConversationsHeaderProps {
  onNewMessage: () => void;
}

export default function ConversationsHeader({ onNewMessage }: ConversationsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold text-gray-900">Conversations</h1>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-lime-100 text-lime-800">
              <div className="w-2 h-2 bg-lime-400 rounded-full mr-1"></div>
              Active
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Manage all your conversations with buyers and Synergy Admin</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onNewMessage}
            className="flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
            New Message
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-refresh-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}