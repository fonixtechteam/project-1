'use client';

import { useState } from 'react';
import { SupportTicket } from './page';

interface TicketsListProps {
  tickets: SupportTicket[];
  onViewTicket: (ticket: SupportTicket) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
  statusFilter: string;
  onStatusFilter: (status: string) => void;
  categoryFilter: string;
  onCategoryFilter: (category: string) => void;
}

export default function TicketsList({
  tickets,
  onViewTicket,
  searchTerm,
  onSearch,
  statusFilter,
  onStatusFilter,
  categoryFilter,
  onCategoryFilter
}: TicketsListProps) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status', count: tickets.length },
    { value: 'open', label: 'Open', count: tickets.filter(t => t.status === 'open').length },
    { value: 'in-progress', label: 'In Progress', count: tickets.filter(t => t.status === 'in-progress').length },
    { value: 'resolved', label: 'Resolved', count: tickets.filter(t => t.status === 'resolved').length },
    { value: 'closed', label: 'Closed', count: tickets.filter(t => t.status === 'closed').length }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories', icon: 'ri-folder-line' },
    { value: 'technical', label: 'Technical Issue', icon: 'ri-tools-line' },
    { value: 'order', label: 'Order Help', icon: 'ri-shopping-cart-line' },
    { value: 'product', label: 'Product Inquiry', icon: 'ri-product-hunt-line' },
    { value: 'billing', label: 'Billing', icon: 'ri-bill-line' },
    { value: 'general', label: 'General', icon: 'ri-question-line' }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      'open': 'bg-red-100 text-red-800 border-red-200',
      'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'resolved': 'bg-green-100 text-green-800 border-green-200',
      'closed': 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const icons = {
      'open': 'ri-error-warning-line',
      'in-progress': 'ri-time-line',
      'resolved': 'ri-check-line',
      'closed': 'ri-close-circle-line'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full ${badges[status as keyof typeof badges]}`}>
        <i className={`${icons[status as keyof typeof icons]} w-3 h-3 flex items-center justify-center mr-1`}></i>
        {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      'low': 'bg-blue-100 text-blue-800',
      'medium': 'bg-orange-100 text-orange-800',
      'high': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${badges[priority as keyof typeof badges]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'technical': 'ri-tools-line',
      'order': 'ri-shopping-cart-line',
      'product': 'ri-product-hunt-line',
      'billing': 'ri-bill-line',
      'general': 'ri-question-line'
    };

    return icons[category as keyof typeof icons] || 'ri-question-line';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredTickets = tickets.filter(ticket => {
    if (searchTerm && !ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ticket.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && ticket.status !== statusFilter) {
      return false;
    }
    if (categoryFilter !== 'all' && ticket.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  const getStatusLabel = () => {
    return statusOptions.find(option => option.value === statusFilter)?.label || 'All Status';
  };

  const getCategoryLabel = () => {
    return categoryOptions.find(option => option.value === categoryFilter)?.label || 'All Categories';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line w-5 h-5 flex items-center justify-center text-gray-400"></i>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Search by ticket ID or subject..."
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-filter-line w-4 h-4 flex items-center justify-center"></i>
                {getStatusLabel()}
                <i className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`}></i>
              </button>

              {showStatusDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onStatusFilter(option.value);
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between ${
                        statusFilter === option.value ? 'bg-lime-50 text-lime-700 font-medium' : 'text-gray-700'
                      } ${option === statusOptions[0] ? 'rounded-t-xl' : ''} ${
                        option === statusOptions[statusOptions.length - 1] ? 'rounded-b-xl' : 'border-b border-gray-100'
                      }`}
                    >
                      <span>{option.label}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowStatusDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-apps-line w-4 h-4 flex items-center justify-center"></i>
                {getCategoryLabel()}
                <i className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`}></i>
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {categoryOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onCategoryFilter(option.value);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2 ${
                        categoryFilter === option.value ? 'bg-lime-50 text-lime-700 font-medium' : 'text-gray-700'
                      } ${option === categoryOptions[0] ? 'rounded-t-xl' : ''} ${
                        option === categoryOptions[categoryOptions.length - 1] ? 'rounded-b-xl' : 'border-b border-gray-100'
                      }`}
                    >
                      <i className={`${option.icon} w-4 h-4 flex items-center justify-center`}></i>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(statusFilter !== 'all' || categoryFilter !== 'all' || searchTerm) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Active filters:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-lime-100 text-lime-800 text-xs rounded-full">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearch('')}
                  className="w-3 h-3 flex items-center justify-center hover:bg-lime-200 rounded-full cursor-pointer"
                >
                  <i className="ri-close-line text-xs"></i>
                </button>
              </span>
            )}
            
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Status: {getStatusLabel()}
                <button
                  onClick={() => onStatusFilter('all')}
                  className="w-3 h-3 flex items-center justify-center hover:bg-blue-200 rounded-full cursor-pointer"
                >
                  <i className="ri-close-line text-xs"></i>
                </button>
              </span>
            )}
            
            {categoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Category: {getCategoryLabel()}
                <button
                  onClick={() => onCategoryFilter('all')}
                  className="w-3 h-3 flex items-center justify-center hover:bg-purple-200 rounded-full cursor-pointer"
                >
                  <i className="ri-close-line text-xs"></i>
                </button>
              </span>
            )}
            
            <button
              onClick={() => {
                onSearch('');
                onStatusFilter('all');
                onCategoryFilter('all');
              }}
              className="text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="text-center py-12">
            <i className="ri-ticket-2-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'No tickets match your current search criteria.'
                : 'You haven\'t created any support tickets yet.'}
            </p>
            <button className="flex items-center mx-auto px-4 py-2 text-white bg-lime-600 hover:bg-lime-700 rounded-lg transition-colors cursor-pointer">
              <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Create Your First Ticket
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Ticket ID</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Subject</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Priority</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Date Created</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Last Updated</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onViewTicket(ticket)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
                      >
                        {ticket.id}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {ticket.subject}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {ticket.responses.length} response{ticket.responses.length !== 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <i className={`${getCategoryIcon(ticket.category)} w-4 h-4 flex items-center justify-center text-gray-400`}></i>
                        <span className="text-sm text-gray-600 capitalize">
                          {ticket.category === 'technical' ? 'Technical' : ticket.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getPriorityBadge(ticket.priority)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(ticket.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(ticket.dateCreated)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTime(ticket.dateCreated)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(ticket.lastUpdated)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTime(ticket.lastUpdated)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onViewTicket(ticket)}
                        className="flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-1"></i>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showStatusDropdown || showCategoryDropdown) && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => {
            setShowStatusDropdown(false);
            setShowCategoryDropdown(false);
          }}
        ></div>
      )}
    </div>
  );
}