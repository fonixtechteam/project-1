'use client';

import { useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
}

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I upload products to my inventory?',
      answer: 'To upload products to your inventory: 1) Navigate to the Inventory section from your dashboard, 2) Click "Add New SKU" button, 3) Fill in all required product information including basic details, variants, compliance documents, and assets, 4) Submit for review. Your products will be available for buyers once approved.',
      category: 'inventory',
      tags: ['products', 'upload', 'inventory', 'sku'],
      helpful: 45,
      notHelpful: 2
    },
    {
      id: '2',
      question: 'What file formats are supported for product images?',
      answer: 'We support the following image formats: JPG, JPEG, PNG, and WebP. Images should be at least 800x800 pixels for optimal quality. The maximum file size is 5MB per image. We recommend using high-resolution images with a white or transparent background for the best presentation.',
      category: 'inventory',
      tags: ['images', 'formats', 'upload', 'specifications'],
      helpful: 32,
      notHelpful: 1
    },
    {
      id: '3',
      question: 'How do I update order status for buyers?',
      answer: 'To update order status: 1) Go to the Orders section, 2) Find the specific order using the search or filter options, 3) Click on the order ID to open details, 4) Use the status dropdown or "Update Status" button, 5) Select the new status (Processing, Shipped, Delivered), 6) Add any relevant notes. The buyer will be automatically notified via email and platform notification.',
      category: 'orders',
      tags: ['orders', 'status', 'update', 'notifications'],
      helpful: 28,
      notHelpful: 3
    },
    {
      id: '4',
      question: 'What compliance documents are required for my products?',
      answer: 'Required compliance documents vary by product type but typically include: Certificate of Analysis (COA), FDA registration (for applicable products), Safety Data Sheets (SDS), Product liability insurance, Manufacturing licenses, and any relevant certifications (organic, cruelty-free, etc.). Upload all documents in PDF format to the Compliance Center.',
      category: 'compliance',
      tags: ['compliance', 'documents', 'certification', 'requirements'],
      helpful: 38,
      notHelpful: 5
    },
    {
      id: '5',
      question: 'How do I communicate with buyers who placed orders?',
      answer: 'You can communicate with buyers through: 1) The built-in messaging system in the Orders section - click "Chat with Buyer" on any order, 2) The Conversations section for ongoing discussions, 3) Automatic email notifications for order updates. All communication is tracked for record-keeping and dispute resolution.',
      category: 'communication',
      tags: ['messaging', 'buyers', 'communication', 'orders'],
      helpful: 25,
      notHelpful: 1
    },
    {
      id: '6',
      question: 'What are the platform fees and payment processing charges?',
      answer: 'Platform fees include: Transaction fee of 2.5% per successful sale, Payment processing fee of 2.9% + $0.30 per transaction, Monthly subscription fee of $29/month for basic plan ($99/month for premium). Additional fees may apply for premium features like priority support or advanced analytics. All fees are clearly outlined in your billing dashboard.',
      category: 'billing',
      tags: ['fees', 'pricing', 'payment', 'billing'],
      helpful: 42,
      notHelpful: 8
    },
    {
      id: '7',
      question: 'How do I set up bulk pricing for wholesale buyers?',
      answer: 'To set up bulk pricing: 1) Go to Inventory > Select your product > Pricing section, 2) Enable "Bulk Pricing" option, 3) Set quantity tiers (e.g., 10-49 units, 50-99 units, 100+ units), 4) Set discounted prices for each tier, 5) Save changes. Buyers will automatically see bulk prices when they add larger quantities to their cart.',
      category: 'pricing',
      tags: ['bulk pricing', 'wholesale', 'discounts', 'quantities'],
      helpful: 33,
      notHelpful: 2
    },
    {
      id: '8',
      question: 'How do I track my product performance and sales analytics?',
      answer: 'Access your analytics through the Dashboard: View total sales, revenue trends, top-performing products, buyer demographics, and order patterns. You can filter data by date ranges, product categories, and buyer segments. Premium users get access to advanced analytics including conversion rates, seasonal trends, and competitive insights.',
      category: 'analytics',
      tags: ['analytics', 'performance', 'sales', 'tracking'],
      helpful: 29,
      notHelpful: 3
    },
    {
      id: '9',
      question: 'What should I do if a buyer reports a product issue?',
      answer: 'When a buyer reports an issue: 1) Respond promptly through the messaging system, 2) Document the issue in the order notes, 3) If it\'s a quality issue, request photos or samples, 4) Offer appropriate solutions (replacement, refund, partial credit), 5) Update your quality control processes if needed, 6) Follow up to ensure buyer satisfaction.',
      category: 'support',
      tags: ['issues', 'complaints', 'resolution', 'quality'],
      helpful: 22,
      notHelpful: 1
    },
    {
      id: '10',
      question: 'How do I manage inventory levels and stock alerts?',
      answer: 'Manage inventory in the Inventory section: 1) Set stock quantities for each SKU, 2) Enable low-stock alerts (recommended at 10% of normal stock), 3) Set automatic notifications for out-of-stock items, 4) Use bulk import/export for large inventory updates, 5) Track inventory movements and adjustments in the inventory log.',
      category: 'inventory',
      tags: ['stock', 'inventory', 'alerts', 'management'],
      helpful: 35,
      notHelpful: 4
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'ri-folder-line', count: faqs.length },
    { value: 'inventory', label: 'Inventory & Products', icon: 'ri-archive-line', count: faqs.filter(f => f.category === 'inventory').length },
    { value: 'orders', label: 'Order Management', icon: 'ri-shopping-cart-line', count: faqs.filter(f => f.category === 'orders').length },
    { value: 'compliance', label: 'Compliance & Documents', icon: 'ri-shield-check-line', count: faqs.filter(f => f.category === 'compliance').length },
    { value: 'communication', label: 'Communication', icon: 'ri-chat-3-line', count: faqs.filter(f => f.category === 'communication').length },
    { value: 'billing', label: 'Billing & Payments', icon: 'ri-bill-line', count: faqs.filter(f => f.category === 'billing').length },
    { value: 'pricing', label: 'Pricing & Discounts', icon: 'ri-price-tag-3-line', count: faqs.filter(f => f.category === 'pricing').length },
    { value: 'analytics', label: 'Analytics & Reports', icon: 'ri-bar-chart-line', count: faqs.filter(f => f.category === 'analytics').length },
    { value: 'support', label: 'Customer Support', icon: 'ri-customer-service-2-line', count: faqs.filter(f => f.category === 'support').length }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleFeedback = (faqId: string, type: 'helpful' | 'notHelpful') => {
    // Handle feedback logic here
    console.log(`FAQ ${faqId} marked as ${type}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600">Find quick answers to common questions about using the Synergy B2B platform</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line w-5 h-5 flex items-center justify-center text-gray-400"></i>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search FAQs by keyword, topic, or question..."
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === category.value
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <i className={`${category.icon} w-4 h-4 flex items-center justify-center`}></i>
                {category.label}
                <span className="bg-white/80 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ List */}
      {filteredFAQs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="text-center py-12">
            <i className="ri-question-answer-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? 'No FAQs match your search criteria. Try different keywords.'
                : 'No FAQs available in this category.'}
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
            >
              Clear filters and show all FAQs
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="p-6">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <i className={`w-6 h-6 flex items-center justify-center text-gray-400 transition-transform ${
                        expandedFAQ === faq.id ? 'ri-subtract-line' : 'ri-add-line'
                      }`}></i>
                    </div>
                  </div>
                </button>

                {expandedFAQ === faq.id && (
                  <div className="mt-4 space-y-4">
                    <div className="prose prose-sm text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {faq.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Feedback */}
                    <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-600">Was this helpful?</span>
                      
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleFeedback(faq.id, 'helpful')}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors cursor-pointer"
                        >
                          <i className="ri-thumb-up-line w-4 h-4 flex items-center justify-center"></i>
                          Yes ({faq.helpful})
                        </button>
                        
                        <button
                          onClick={() => handleFeedback(faq.id, 'notHelpful')}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                        >
                          <i className="ri-thumb-down-line w-4 h-4 flex items-center justify-center"></i>
                          No ({faq.notHelpful})
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Need More Help Section */}
      <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Still need help?</h3>
            <p className="text-gray-600">
              Can't find the answer you're looking for? Our support team is here to help you 24/7.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-chat-3-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Live Chat
            </button>
            <button className="flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-ticket-2-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Create Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}