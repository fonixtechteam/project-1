'use client';

interface BillingHeaderProps {
  stats: {
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    overdueCount: number;
  };
  onCreateInvoice: () => void;
  onRefresh: () => void;
}

export default function BillingHeader({ stats, onCreateInvoice, onRefresh }: BillingHeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-semibold text-gray-900">Billing & Invoices</h1>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                Active
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Manage invoices, track payments, and generate billing reports</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCreateInvoice}
              className="flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Generate Invoice
            </button>
            <button 
              onClick={onRefresh}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Revenue</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(stats.totalAmount)}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <i className="ri-money-dollar-circle-line w-6 h-6 flex items-center justify-center text-white"></i>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Paid Amount</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(stats.paidAmount)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <i className="ri-check-double-line w-6 h-6 flex items-center justify-center text-white"></i>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pending Amount</p>
                <p className="text-2xl font-bold text-yellow-900">{formatCurrency(stats.pendingAmount)}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <i className="ri-time-line w-6 h-6 flex items-center justify-center text-white"></i>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-xl p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Overdue Invoices</p>
                <p className="text-2xl font-bold text-red-900">{stats.overdueCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <i className="ri-alarm-warning-line w-6 h-6 flex items-center justify-center text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}