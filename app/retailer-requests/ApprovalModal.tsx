
'use client';

import { useState } from 'react';

interface ApprovalModalProps {
  request: {
    id: number;
    buyerName: string;
    businessType: string;
    market: string;
  };
  onClose: () => void;
}

export default function ApprovalModal({ request, onClose }: ApprovalModalProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Approving request for:', request.buyerName);
    console.log('Message to admin:', message);
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-6 pt-6 pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <i className="ri-check-line w-6 h-6 flex items-center justify-center text-green-600"></i>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Approve Buyer Request
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You are about to approve <strong>{request.buyerName}</strong> for access to your product catalog. 
                    Send a message to the Synergy Admin team regarding terms and conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message to Synergy Admin
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={4}
              placeholder="Please coordinate the terms and onboarding process for this buyer..."
            />
          </div>

          <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Approving...' : 'Approve & Send'}
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
