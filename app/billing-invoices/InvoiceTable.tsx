
'use client';

import { useState } from 'react';
import { Invoice } from './page';

interface InvoiceTableProps {
  invoices: Invoice[];
  onViewInvoice: (invoice: Invoice) => void;
}

export default function InvoiceTable({ invoices, onViewInvoice }: InvoiceTableProps) {
  const [sortField, setSortField] = useState<keyof Invoice>('invoiceDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getStatusBadge = (status: string, remainingBalance: number) => {
    const badges = {
      paid: 'bg-green-100 text-green-800 border-green-200',
      unpaid: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      partial: 'bg-blue-100 text-blue-800 border-blue-200',
      overdue: 'bg-red-100 text-red-800 border-red-200'
    };

    const icons = {
      paid: 'ri-check-line',
      unpaid: 'ri-close-line',
      pending: 'ri-time-line',
      partial: 'ri-pie-chart-line',
      overdue: 'ri-alarm-warning-line'
    };

    const displayText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full ${badges[status as keyof typeof badges]}`}>
        <i className={`${icons[status as keyof typeof icons]} w-3 h-3 flex items-center justify-center mr-1`}></i>
        {displayText}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedInvoices = [...invoices].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  const getDueDateStatus = (dueDate: string, status: string) => {
    if (status === 'paid') return null;
    
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { type: 'overdue', text: `${Math.abs(diffDays)} days overdue`, color: 'text-red-600' };
    } else if (diffDays <= 7) {
      return { type: 'due-soon', text: `Due in ${diffDays} days`, color: 'text-yellow-600' };
    }
    return null;
  };

  const handleDownloadPDF = (invoice: Invoice, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Downloading PDF for invoice:', invoice.id);
    // Implement PDF download logic
  };

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="text-center py-12">
          <i className="ri-file-list-3-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-500 mb-4">No invoices match your current search criteria.</p>
          <button className="flex items-center mx-auto px-4 py-2 text-white bg-lime-600 hover:bg-lime-700 rounded-lg transition-colors cursor-pointer">
            <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Generate Invoice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                className="text-left px-6 py-4 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-2">
                  Invoice ID
                  <i className={`ri-arrow-up-down-line w-4 h-4 flex items-center justify-center text-gray-400`}></i>
                </div>
              </th>
              <th 
                className="text-left px-6 py-4 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('retailerName')}
              >
                <div className="flex items-center gap-2">
                  Retailer Name
                  <i className={`ri-arrow-up-down-line w-4 h-4 flex items-center justify-center text-gray-400`}></i>
                </div>
              </th>
              <th 
                className="text-left px-6 py-4 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('orderId')}
              >
                <div className="flex items-center gap-2">
                  Order ID
                  <i className={`ri-arrow-up-down-line w-4 h-4 flex items-center justify-center text-gray-400`}></i>
                </div>
              </th>
              <th 
                className="text-left px-6 py-4 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('invoiceDate')}
              >
                <div className="flex items-center gap-2">
                  Invoice Date
                  <i className={`ri-arrow-up-down-line w-4 h-4 flex items-center justify-center text-gray-400`}></i>
                </div>
              </th>
              <th 
                className="text-left px-6 py-4 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('totalAmount')}
              >
                <div className="flex items-center gap-2">
                  Total Amount
                  <i className={`ri-arrow-up-down-line w-4 h-4 flex items-center justify-center text-gray-400`}></i>
                </div>
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Status</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedInvoices.map((invoice) => {
              const dueDateStatus = getDueDateStatus(invoice.dueDate, invoice.status);
              
              return (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewInvoice(invoice)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
                    >
                      {invoice.id}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{invoice.retailerName}</div>
                    <div className="text-xs text-gray-500">{invoice.retailerInfo.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{invoice.orderId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(invoice.invoiceDate)}
                    </div>
                    {dueDateStatus && (
                      <div className={`text-xs ${dueDateStatus.color} font-medium`}>
                        {dueDateStatus.text}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(invoice.totalAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status, invoice.remainingBalance)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onViewInvoice(invoice)}
                        className="flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-1"></i>
                        View
                      </button>
                      <button
                        onClick={(e) => handleDownloadPDF(invoice, e)}
                        className="flex items-center px-3 py-1.5 text-sm bg-lime-100 text-lime-700 rounded-lg hover:bg-lime-200 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-1"></i>
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
