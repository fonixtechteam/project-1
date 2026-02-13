
'use client';

import { useState } from 'react';
import { Order } from './page';

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: 'pending' | 'shipped' | 'delivered') => void;
}

export default function OrdersTable({ orders, onViewOrder, onUpdateStatus }: OrdersTableProps) {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      shipped: 'bg-blue-100 text-blue-800 border-blue-200',
      delivered: 'bg-green-100 text-green-800 border-green-200'
    };

    const icons = {
      pending: 'ri-time-line',
      shipped: 'ri-truck-line',
      delivered: 'ri-check-line'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full ${badges[status as keyof typeof badges]}`}>
        <i className={`${icons[status as keyof typeof icons]} w-3 h-3 flex items-center justify-center mr-1`}></i>
        {status.charAt(0).toUpperCase() + status.slice(1)}
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

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'shipped' | 'delivered') => {
    onUpdateStatus(orderId, newStatus);
    setDropdownOpen(null);
  };

  const getStatusOptions = (currentStatus: string) => {
    const allStatuses = [
      { value: 'pending', label: 'Pending', icon: 'ri-time-line' },
      { value: 'shipped', label: 'Shipped', icon: 'ri-truck-line' },
      { value: 'delivered', label: 'Delivered', icon: 'ri-check-line' }
    ];
    return allStatuses.filter(status => status.value !== currentStatus);
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="text-center py-12">
          <i className="ri-shopping-cart-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500 mb-4">No orders match your current search criteria.</p>
          <button className="flex items-center mx-auto px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer">
            <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Create New Order
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
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Order ID</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Buyer</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Order Date</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Total Amount</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">Status</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
                  >
                    {order.id}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{order.buyerName}</div>
                  <div className="text-xs text-gray-500">{order.products.length} item{order.products.length > 1 ? 's' : ''}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(order.orderDate)}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {formatCurrency(order.totalAmount)}
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === order.id ? null : order.id)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      {getStatusBadge(order.status)}
                      <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center text-gray-400"></i>
                    </button>

                    {dropdownOpen === order.id && (
                      <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {getStatusOptions(order.status).map((status) => (
                          <button
                            key={status.value}
                            onClick={() => handleStatusChange(order.id, status.value as 'pending' | 'shipped' | 'delivered')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                          >
                            <i className={`${status.icon} w-4 h-4 flex items-center justify-center text-gray-400`}></i>
                            {status.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewOrder(order)}
                      className="flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      View Details
                    </button>
                    
                    <button
                      onClick={() => console.log('Generate invoice for:', order.id)}
                      className="flex items-center px-3 py-1.5 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-file-text-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      Invoice
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setDropdownOpen(null)}
        ></div>
      )}
    </div>
  );
}
