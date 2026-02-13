
'use client';

import { useState } from 'react';
import ApprovalModal from './ApprovalModal';
import RejectionModal from './RejectionModal';
import ChatModal from './ChatModal';

interface Request {
  id: number;
  buyerName: string;
  businessType: string;
  market: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  details: any;
}

interface RequestsTableProps {
  requests: Request[];
  onViewDetails: (buyer: Request) => void;
}

export default function RequestsTable({ requests, onViewDetails }: RequestsTableProps) {
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1"></div>
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1"></div>
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleApprove = (request: Request) => {
    setSelectedRequest(request);
    setShowApprovalModal(true);
  };

  const handleReject = (request: Request) => {
    setSelectedRequest(request);
    setShowRejectionModal(true);
  };

  const handleChat = (request: Request) => {
    setSelectedRequest(request);
    setShowChatModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Buyer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Business Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Market/Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.buyerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{request.businessType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{request.market}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{formatDate(request.requestDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewDetails(request)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer"
                        title="View Details"
                      >
                        <i className="ri-eye-line w-4 h-4 flex items-center justify-center text-gray-600"></i>
                      </button>
                      
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                            title="Approve"
                          >
                            <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                          
                          <button
                            onClick={() => handleReject(request)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                            title="Reject"
                          >
                            <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleChat(request)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer"
                        title="Chat with Admin"
                      >
                        <i className="ri-message-line w-4 h-4 flex items-center justify-center text-gray-600"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showApprovalModal && selectedRequest && (
        <ApprovalModal
          request={selectedRequest}
          onClose={() => setShowApprovalModal(false)}
        />
      )}

      {showRejectionModal && selectedRequest && (
        <RejectionModal
          request={selectedRequest}
          onClose={() => setShowRejectionModal(false)}
        />
      )}

      {showChatModal && selectedRequest && (
        <ChatModal
          request={selectedRequest}
          onClose={() => setShowChatModal(false)}
        />
      )}
    </>
  );
}
