
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import OrdersHeader from './OrdersHeader';
import OrdersFilters from './OrdersFilters';
import OrdersTable from './OrdersTable';
import OrderDetailModal from './OrderDetailModal';
import NewOrderModal from './NewOrderModal';

export interface Order {
  id: string;
  buyerName: string;
  orderDate: string;
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered';
  products: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
    image: string;
  }[];
  buyerInfo: {
    name: string;
    address: string;
    contact: string;
    email: string;
  };
  shippingInfo: {
    address: string;
    method: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
  };
  orderHistory: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
  discrepancyLog: {
    issue: string;
    timestamp: string;
    resolved: boolean;
  }[];
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    buyerName: 'Beauty Boutique Store',
    orderDate: '2024-01-15',
    totalAmount: 1250.00,
    status: 'pending',
    products: [
      {
        id: 'p1',
        name: 'Hydrating Face Serum',
        quantity: 10,
        unitPrice: 45.00,
        total: 450.00,
        image: 'https://readdy.ai/api/search-image?query=luxury%20hydrating%20face%20serum%20bottle%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=serum001&orientation=squarish'
      },
      {
        id: 'p2',
        name: 'Vitamin C Moisturizer',
        quantity: 15,
        unitPrice: 35.00,
        total: 525.00,
        image: 'https://readdy.ai/api/search-image?query=vitamin%20c%20moisturizer%20cream%20jar%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=moisturizer001&orientation=squarish'
      }
    ],
    buyerInfo: {
      name: 'Beauty Boutique Store',
      address: '123 Fashion Ave, New York, NY 10001',
      contact: '+1 (555) 123-4567',
      email: 'orders@beautyboutique.com'
    },
    shippingInfo: {
      address: '123 Fashion Ave, New York, NY 10001',
      method: 'Express Shipping',
      estimatedDelivery: '2024-01-18'
    },
    orderHistory: [
      {
        status: 'Order Placed',
        timestamp: '2024-01-15 09:30 AM',
        note: 'Order received and payment confirmed'
      },
      {
        status: 'Processing',
        timestamp: '2024-01-15 10:15 AM',
        note: 'Order entered into fulfillment queue'
      }
    ],
    discrepancyLog: []
  },
  {
    id: 'ORD-2024-002',
    buyerName: 'Wellness Corner',
    orderDate: '2024-01-14',
    totalAmount: 875.50,
    status: 'shipped',
    products: [
      {
        id: 'p3',
        name: 'Anti-Aging Night Cream',
        quantity: 8,
        unitPrice: 65.00,
        total: 520.00,
        image: 'https://readdy.ai/api/search-image?query=anti%20aging%20night%20cream%20luxury%20jar%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=nightcream001&orientation=squarish'
      },
      {
        id: 'p4',
        name: 'Cleansing Oil',
        quantity: 12,
        unitPrice: 29.50,
        total: 354.00,
        image: 'https://readdy.ai/api/search-image?query=cleansing%20oil%20bottle%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=cleansingoil001&orientation=squarish'
      }
    ],
    buyerInfo: {
      name: 'Wellness Corner',
      address: '456 Health St, Los Angeles, CA 90210',
      contact: '+1 (555) 987-6543',
      email: 'purchasing@wellnesscorner.com'
    },
    shippingInfo: {
      address: '456 Health St, Los Angeles, CA 90210',
      method: 'Standard Shipping',
      trackingNumber: 'TRK-789456123',
      estimatedDelivery: '2024-01-20'
    },
    orderHistory: [
      {
        status: 'Order Placed',
        timestamp: '2024-01-14 02:30 PM',
        note: 'Order received and payment confirmed'
      },
      {
        status: 'Processing',
        timestamp: '2024-01-14 03:15 PM',
        note: 'Order entered into fulfillment queue'
      },
      {
        status: 'Packed',
        timestamp: '2024-01-15 11:00 AM',
        note: 'Items packed and ready for shipment'
      },
      {
        status: 'Shipped',
        timestamp: '2024-01-15 04:30 PM',
        note: 'Package handed over to shipping carrier'
      }
    ],
    discrepancyLog: []
  },
  {
    id: 'ORD-2024-003',
    buyerName: 'Premium Skincare Hub',
    orderDate: '2024-01-12',
    totalAmount: 2100.75,
    status: 'delivered',
    products: [
      {
        id: 'p5',
        name: 'Retinol Treatment Serum',
        quantity: 20,
        unitPrice: 55.00,
        total: 1100.00,
        image: 'https://readdy.ai/api/search-image?query=retinol%20treatment%20serum%20dropper%20bottle%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=retinol001&orientation=squarish'
      },
      {
        id: 'p6',
        name: 'Hyaluronic Acid Mask',
        quantity: 25,
        unitPrice: 22.50,
        total: 562.50,
        image: 'https://readdy.ai/api/search-image?query=hyaluronic%20acid%20face%20mask%20package%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=mask001&orientation=squarish'
      }
    ],
    buyerInfo: {
      name: 'Premium Skincare Hub',
      address: '789 Beauty Blvd, Miami, FL 33101',
      contact: '+1 (555) 456-7890',
      email: 'orders@premiumskincarehub.com'
    },
    shippingInfo: {
      address: '789 Beauty Blvd, Miami, FL 33101',
      method: 'Express Shipping',
      trackingNumber: 'TRK-123789456',
      estimatedDelivery: '2024-01-15'
    },
    orderHistory: [
      {
        status: 'Order Placed',
        timestamp: '2024-01-12 10:30 AM',
        note: 'Order received and payment confirmed'
      },
      {
        status: 'Processing',
        timestamp: '2024-01-12 11:15 AM',
        note: 'Initial stock shortage detected for Retinol Serum'
      },
      {
        status: 'Processing',
        timestamp: '2024-01-12 02:45 PM',
        note: 'Stock replenished, order processing resumed'
      },
      {
        status: 'Packed',
        timestamp: '2024-01-13 09:30 AM',
        note: 'Items packed and ready for shipment'
      },
      {
        status: 'Shipped',
        timestamp: '2024-01-13 02:15 PM',
        note: 'Package handed over to express carrier'
      },
      {
        status: 'Delivered',
        timestamp: '2024-01-15 10:45 AM',
        note: 'Package successfully delivered to buyer'
      }
    ],
    discrepancyLog: [
      {
        issue: 'Initial stock shortage for Retinol Serum',
        timestamp: '2024-01-12 10:30 AM',
        resolved: true
      }
    ]
  },
  {
    id: 'ORD-2024-004',
    buyerName: 'Natural Beauty Co.',
    orderDate: '2024-01-13',
    totalAmount: 650.25,
    status: 'pending',
    products: [
      {
        id: 'p7',
        name: 'Organic Face Cleanser',
        quantity: 18,
        unitPrice: 28.00,
        total: 504.00,
        image: 'https://readdy.ai/api/search-image?query=organic%20face%20cleanser%20tube%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=cleanser001&orientation=squarish'
      },
      {
        id: 'p8',
        name: 'Natural Toner Spray',
        quantity: 10,
        unitPrice: 18.50,
        total: 185.00,
        image: 'https://readdy.ai/api/search-image?query=natural%20toner%20spray%20bottle%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=toner001&orientation=squarish'
      }
    ],
    buyerInfo: {
      name: 'Natural Beauty Co.',
      address: '321 Organic Way, Portland, OR 97201',
      contact: '+1 (555) 234-5678',
      email: 'orders@naturalbeautyco.com'
    },
    shippingInfo: {
      address: '321 Organic Way, Portland, OR 97201',
      method: 'Standard Shipping',
      estimatedDelivery: '2024-01-19'
    },
    orderHistory: [
      {
        status: 'Order Placed',
        timestamp: '2024-01-13 01:30 PM',
        note: 'Order received and payment confirmed'
      },
      {
        status: 'Quality Check',
        timestamp: '2024-01-13 02:15 PM',
        note: 'Items undergoing quality inspection'
      }
    ],
    discrepancyLog: [
      {
        issue: 'Awaiting quality check completion',
        timestamp: '2024-01-13 2:15 PM',
        resolved: false
      }
    ]
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'pending' | 'shipped' | 'delivered') => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { 
        ...order, 
        status: newStatus,
        orderHistory: [
          ...order.orderHistory,
          {
            status: newStatus === 'shipped' ? 'Shipped' : newStatus === 'delivered' ? 'Delivered' : 'Processing',
            timestamp: new Date().toLocaleString(),
            note: `Status updated to ${newStatus}`
          }
        ]
      } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterOrders(term, statusFilter, dateFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterOrders(searchTerm, status, dateFilter);
  };

  const handleDateFilter = (dateRange: string) => {
    setDateFilter(dateRange);
    filterOrders(searchTerm, statusFilter, dateRange);
  };

  const filterOrders = (term: string, status: string, dateRange: string) => {
    let filtered = orders;

    if (term) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(term.toLowerCase()) ||
        order.buyerName.toLowerCase().includes(term.toLowerCase()) ||
        order.products.some(product => product.name.toLowerCase().includes(term.toLowerCase()))
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(order => order.status === status);
    }

    if (dateRange !== 'all') {
      const today = new Date();
      const orderDate = new Date();

      if (dateRange === 'today') {
        filtered = filtered.filter(order => {
          const orderDateObj = new Date(order.orderDate);
          return orderDateObj.toDateString() === today.toDateString();
        });
      } else if (dateRange === 'week') {
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(order => {
          const orderDateObj = new Date(order.orderDate);
          return orderDateObj >= weekAgo;
        });
      }
    }

    setFilteredOrders(filtered);
  };

  const handleRefresh = () => {
    setFilteredOrders(orders);
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {filteredOrders.length} Orders
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Manage and fulfill all incoming orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowNewOrder(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
                New Order
              </button>
              <button 
                onClick={handleRefresh}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-refresh-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Orders Content */}
        <div className="p-8">
          <OrdersFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onSearch={handleSearch}
            onStatusFilter={handleStatusFilter}
            onDateFilter={handleDateFilter}
          />
          
          <OrdersTable
            orders={filteredOrders}
            onViewOrder={handleViewOrder}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        </div>
      </div>

      {showOrderDetail && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setShowOrderDetail(false)}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}

      {showNewOrder && (
        <NewOrderModal
          onClose={() => setShowNewOrder(false)}
          onCreateOrder={(newOrder) => {
            setOrders([...orders, newOrder]);
            setFilteredOrders([...orders, newOrder]);
          }}
        />
      )}
    </div>
  );
}
