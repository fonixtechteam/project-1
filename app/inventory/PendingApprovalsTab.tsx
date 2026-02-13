'use client';

import { useState } from 'react';

interface PendingApproval {
  id: string;
  name: string;
  type: 'master' | 'individual';
  submittedDate: string;
  adminNotes: string;
  status: 'pending' | 'in-review' | 'needs-revision';
  priority: 'high' | 'medium' | 'low';
  documents: string[];
}

const mockPendingApprovals: PendingApproval[] = [
  {
    id: '1',
    name: 'Collagen Powder',
    type: 'master',
    submittedDate: '2024-01-10',
    adminNotes: 'Need updated FDA documentation for new formulation',
    status: 'needs-revision',
    priority: 'high',
    documents: ['FDA Certificate', 'Lab Results', 'Ingredient List']
  },
  {
    id: '2',
    name: 'Vitamin D3 - 5000 IU',
    type: 'individual',
    submittedDate: '2024-01-12',
    adminNotes: 'Under compliance review',
    status: 'in-review',
    priority: 'medium',
    documents: ['Product Label', 'Certificate of Analysis']
  },
  {
    id: '3',
    name: 'Probiotic Complex',
    type: 'master',
    submittedDate: '2024-01-15',
    adminNotes: '',
    status: 'pending',
    priority: 'low',
    documents: ['Product Specifications', 'Manufacturing Certificate']
  },
  {
    id: '4',
    name: 'Magnesium Supplement - 400mg',
    type: 'individual',
    submittedDate: '2024-01-14',
    adminNotes: 'Dosage verification required',
    status: 'needs-revision',
    priority: 'medium',
    documents: ['Dosage Study', 'Safety Data']
  }
];

export default function PendingApprovalsTab() {
  const [approvals, setApprovals] = useState(mockPendingApprovals);
  const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-review': 'bg-blue-100 text-blue-800',
      'needs-revision': 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return variants[priority as keyof typeof variants] || variants.low;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: 'ri-time-line',
      'in-review': 'ri-eye-line',
      'needs-revision': 'ri-alert-line'
    };
    return icons[status as keyof typeof icons] || icons.pending;
  };

  const openChat = (approval: PendingApproval) => {
    setSelectedApproval(approval);
    setShowChatModal(true);
  };

  return (
    <div className="px-8 py-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
            <div className="flex items-center space-x-3">
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-8 cursor-pointer">
                <option>All Status</option>
                <option>Pending</option>
                <option>In Review</option>
                <option>Needs Revision</option>
              </select>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 pr-8 cursor-pointer">
                <option>All Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Submitted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Admin Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {approvals.map((approval) => (
                <tr key={approval.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{approval.name}</div>
                    <div className="text-sm text-gray-500">
                      {approval.documents.length} documents
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      approval.type === 'master' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {approval.type === 'master' ? 'Master SKU' : 'Individual SKU'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(approval.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(approval.status)}`}>
                      <i className={`${getStatusIcon(approval.status)} w-3 h-3 flex items-center justify-center mr-1`}></i>
                      {approval.status === 'needs-revision' ? 'Needs Revision' : 
                       approval.status === 'in-review' ? 'In Review' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(approval.priority)}`}>
                      {approval.priority.charAt(0).toUpperCase() + approval.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {approval.adminNotes || 'No notes yet'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                        <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                        <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <button 
                        onClick={() => openChat(approval)}
                        className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <i className="ri-message-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                        <i className="ri-file-text-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && selectedApproval && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Chat with Admin - {selectedApproval.name}
              </h3>
              <button 
                onClick={() => setShowChatModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-900 mb-2">Admin (Sarah Chen)</div>
                <div className="text-sm text-blue-800">{selectedApproval.adminNotes}</div>
                <div className="text-xs text-blue-600 mt-2">2 hours ago</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg ml-8">
                <div className="text-sm font-medium text-gray-900 mb-2">You</div>
                <div className="text-sm text-gray-800">I'll update the documentation and resubmit by tomorrow.</div>
                <div className="text-xs text-gray-600 mt-2">1 hour ago</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}