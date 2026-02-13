'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import BillingHeader from './BillingHeader';
import InvoiceFilters from './InvoiceFilters';
import InvoiceTable from './InvoiceTable';
import InvoiceDetailModal from './InvoiceDetailModal';
import CreateInvoiceModal from './CreateInvoiceModal';

export interface Invoice {
  id: string;
  retailerName: string;
  orderId: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  remainingBalance: number;
  status: 'paid' | 'unpaid' | 'pending' | 'overdue' | 'partial';
  products: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
    image: string;
  }[];
  retailerInfo: {
    name: string;
    address: string;
    contact: string;
    email: string;
  };
  billing: {
    subtotal: number;
    discount: number;
    discountType: 'percentage' | 'fixed';
    taxRate: number;
    taxAmount: number;
    shippingFee: number;
    totalAmount: number;
  };
  payment: {
    status: 'paid' | 'unpaid' | 'pending' | 'overdue' | 'partial';
    method?: string;
    paidDate?: string;
    transactionId?: string;
    paymentHistory: {
      date: string;
      amount: number;
      method: string;
      transactionId: string;
    }[];
  };
  notes?: string;
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    retailerName: 'Beauty Boutique Store',
    orderId: 'ORD-2024-001',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-14',
    totalAmount: 1250.00,
    paidAmount: 1250.00,
    remainingBalance: 0,
    status: 'paid',
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
    retailerInfo: {
      name: 'Beauty Boutique Store',
      address: '123 Fashion Ave, New York, NY 10001',
      contact: '+1 (555) 123-4567',
      email: 'orders@beautyboutique.com'
    },
    billing: {
      subtotal: 975.00,
      discount: 50.00,
      discountType: 'fixed',
      taxRate: 8.25,
      taxAmount: 80.44,
      shippingFee: 25.00,
      totalAmount: 1250.00
    },
    payment: {
      status: 'paid',
      method: 'Credit Card',
      paidDate: '2024-01-20',
      transactionId: 'TXN-789456123',
      paymentHistory: [
        {
          date: '2024-01-20',
          amount: 1250.00,
          method: 'Credit Card',
          transactionId: 'TXN-789456123'
        }
      ]
    }
  },
  {
    id: 'INV-2024-002',
    retailerName: 'Wellness Corner',
    orderId: 'ORD-2024-002',
    invoiceDate: '2024-01-14',
    dueDate: '2024-02-13',
    totalAmount: 875.50,
    paidAmount: 400.00,
    remainingBalance: 475.50,
    status: 'partial',
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
    retailerInfo: {
      name: 'Wellness Corner',
      address: '456 Health St, Los Angeles, CA 90210',
      contact: '+1 (555) 987-6543',
      email: 'purchasing@wellnesscorner.com'
    },
    billing: {
      subtotal: 774.00,
      discount: 0,
      discountType: 'fixed',
      taxRate: 7.25,
      taxAmount: 56.11,
      shippingFee: 45.39,
      totalAmount: 875.50
    },
    payment: {
      status: 'partial',
      method: 'Bank Transfer',
      paymentHistory: [
        {
          date: '2024-01-18',
          amount: 400.00,
          method: 'Bank Transfer',
          transactionId: 'TXN-456789123'
        }
      ]
    }
  },
  {
    id: 'INV-2024-003',
    retailerName: 'Premium Skincare Hub',
    orderId: 'ORD-2024-003',
    invoiceDate: '2024-01-12',
    dueDate: '2024-01-27',
    totalAmount: 2100.75,
    paidAmount: 0,
    remainingBalance: 2100.75,
    status: 'overdue',
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
    retailerInfo: {
      name: 'Premium Skincare Hub',
      address: '789 Beauty Blvd, Miami, FL 33101',
      contact: '+1 (555) 456-7890',
      email: 'orders@premiumskincarehub.com'
    },
    billing: {
      subtotal: 1662.50,
      discount: 100.00,
      discountType: 'fixed',
      taxRate: 6.00,
      taxAmount: 99.75,
      shippingFee: 75.00,
      totalAmount: 2100.75
    },
    payment: {
      status: 'overdue',
      paymentHistory: []
    }
  },
  {
    id: 'INV-2024-004',
    retailerName: 'Natural Beauty Co.',
    orderId: 'ORD-2024-004',
    invoiceDate: '2024-01-13',
    dueDate: '2024-02-12',
    totalAmount: 650.25,
    paidAmount: 0,
    remainingBalance: 650.25,
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
    retailerInfo: {
      name: 'Natural Beauty Co.',
      address: '321 Organic Way, Portland, OR 97201',
      contact: '+1 (555) 234-5678',
      email: 'orders@naturalbeautyco.com'
    },
    billing: {
      subtotal: 589.00,
      discount: 30.00,
      discountType: 'fixed',
      taxRate: 0.00,
      taxAmount: 0.00,
      shippingFee: 91.25,
      totalAmount: 650.25
    },
    payment: {
      status: 'pending',
      paymentHistory: []
    }
  },
  {
    id: 'INV-2024-005',
    retailerName: 'Eco Beauty Store',
    orderId: 'ORD-2024-005',
    invoiceDate: '2024-01-16',
    dueDate: '2024-02-15',
    totalAmount: 950.00,
    paidAmount: 0,
    remainingBalance: 950.00,
    status: 'unpaid',
    products: [
      {
        id: 'p9',
        name: 'Botanical Face Oil',
        quantity: 15,
        unitPrice: 42.00,
        total: 630.00,
        image: 'https://readdy.ai/api/search-image?query=botanical%20face%20oil%20dropper%20bottle%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=faceoil001&orientation=squarish'
      },
      {
        id: 'p10',
        name: 'Herbal Exfoliating Scrub',
        quantity: 12,
        unitPrice: 25.00,
        total: 300.00,
        image: 'https://readdy.ai/api/search-image?query=herbal%20exfoliating%20scrub%20jar%20with%20clean%20white%20background%20skincare%20product%20photography%20professional%20lighting&width=200&height=200&seq=scrub001&orientation=squarish'
      }
    ],
    retailerInfo: {
      name: 'Eco Beauty Store',
      address: '654 Green Ave, Seattle, WA 98101',
      contact: '+1 (555) 345-6789',
      email: 'orders@ecobeautystore.com'
    },
    billing: {
      subtotal: 930.00,
      discount: 50.00,
      discountType: 'fixed',
      taxRate: 7.50,
      taxAmount: 70.00,
      shippingFee: 0.00,
      totalAmount: 950.00
    },
    payment: {
      status: 'unpaid',
      paymentHistory: []
    }
  }
];

export default function BillingInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetail(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterInvoices(term, statusFilter, dateFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterInvoices(searchTerm, status, dateFilter);
  };

  const handleDateFilter = (dateRange: string) => {
    setDateFilter(dateRange);
    filterInvoices(searchTerm, statusFilter, dateRange);
  };

  const filterInvoices = (term: string, status: string, dateRange: string) => {
    let filtered = invoices;

    if (term) {
      filtered = filtered.filter(invoice =>
        invoice.id.toLowerCase().includes(term.toLowerCase()) ||
        invoice.retailerName.toLowerCase().includes(term.toLowerCase()) ||
        invoice.orderId.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === status);
    }

    if (dateRange !== 'all') {
      const today = new Date();
      
      if (dateRange === 'today') {
        filtered = filtered.filter(invoice => {
          const invoiceDate = new Date(invoice.invoiceDate);
          return invoiceDate.toDateString() === today.toDateString();
        });
      } else if (dateRange === 'week') {
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(invoice => {
          const invoiceDate = new Date(invoice.invoiceDate);
          return invoiceDate >= weekAgo;
        });
      } else if (dateRange === 'month') {
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(invoice => {
          const invoiceDate = new Date(invoice.invoiceDate);
          return invoiceDate >= monthAgo;
        });
      }
    }

    setFilteredInvoices(filtered);
  };

  const handleRefresh = () => {
    setFilteredInvoices(invoices);
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
  };

  const handleCreateInvoice = (newInvoice: Invoice) => {
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    setFilteredInvoices(updatedInvoices);
  };

  const getTotalStats = () => {
    const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    const paidAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0);
    const pendingAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.remainingBalance, 0);
    const overdueCount = filteredInvoices.filter(invoice => invoice.status === 'overdue').length;

    return { totalAmount, paidAmount, pendingAmount, overdueCount };
  };

  const stats = getTotalStats();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <BillingHeader 
          stats={stats}
          onCreateInvoice={() => setShowCreateInvoice(true)}
          onRefresh={handleRefresh}
        />

        {/* Billing Content */}
        <div className="p-8">
          <InvoiceFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onSearch={handleSearch}
            onStatusFilter={handleStatusFilter}
            onDateFilter={handleDateFilter}
          />
          
          <InvoiceTable
            invoices={filteredInvoices}
            onViewInvoice={handleViewInvoice}
          />
        </div>
      </div>

      {showInvoiceDetail && selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          onClose={() => setShowInvoiceDetail(false)}
        />
      )}

      {showCreateInvoice && (
        <CreateInvoiceModal
          onClose={() => setShowCreateInvoice(false)}
          onCreateInvoice={handleCreateInvoice}
        />
      )}
    </div>
  );
}