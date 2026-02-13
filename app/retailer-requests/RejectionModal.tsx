
'use client';

import { useState } from 'react';

interface RejectionModalProps {
  request: {
    id: number;
    buyerName: string;
    businessType: string;
    market: string;
  };
  onClose: () => void;
}

export default function RejectionModal({ request, onClose }: RejectionModalProps) {
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commonReasons = [
    'Does not meet minimum requirements',
    'Geographical restrictions apply',
    'Insufficient business credentials',
    'Previous compliance issues',
    'Market oversaturation',
    'Other (specify below)'
  ];

  const handleSubmit = async () => {
    if (!selectedReason && !reason) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Rejecting request for:', request.buyerName);
    console.log('Reason:', selectedReason || reason);
    
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
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <i className="ri-close-line w-6 h-6 flex items-center justify-center text-red-600"></i>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Reject Buyer Request
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You are about to reject the request from <strong>{request.buyerName}</strong>. 
                    Please provide a reason for rejection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Reason for Rejection
            </label>
            
            <div className="space-y-2 mb-4">
              {commonReasons.map((reasonOption, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="rejection-reason"
                    value={reasonOption}
                    checked={selectedReason === reasonOption}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-2 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{reasonOption}</span>
                </label>
              ))}
            </div>

            {selectedReason === 'Other (specify below)' && (
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={3}
                placeholder="Please specify the reason for rejection..."
              />
            )}
          </div>

          <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (!selectedReason && !reason)}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Rejecting...' : 'Reject Request'}
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
