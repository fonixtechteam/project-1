
'use client';

export default function BuyerRequestsHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold text-gray-900">Buyer Requests</h1>
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              5 Pending
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 italic">Manage access requests and track buyer engagement</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
            <i className="ri-search-line w-4 h-4 flex items-center justify-center"></i>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 text-white">
            <i className="ri-user-line w-4 h-4 flex items-center justify-center"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
