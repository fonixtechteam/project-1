'use client';

import { useState } from 'react';

interface HelpCenterOverviewProps {
  onCategorySelect: (category: string) => void;
  onContactEmail: () => void;
  onToggleChat: () => void;
}

export default function HelpCenterOverview({ 
  onCategorySelect, 
  onContactEmail, 
  onToggleChat 
}: HelpCenterOverviewProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const supportCategories = [
    {
      id: 'account',
      title: 'Account Issues',
      icon: 'ri-user-settings-line',
      description: 'Login problems, profile settings, password reset',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      iconColor: 'text-blue-600',
      commonQuestions: [
        'How do I reset my password?',
        'Unable to login to my account',
        'How to update my profile information?',
        'Two-factor authentication setup'
      ]
    },
    {
      id: 'orders',
      title: 'Order Management',
      icon: 'ri-shopping-cart-2-line',
      description: 'Order status, tracking, returns, and modifications',
      color: 'bg-green-50 border-green-200 text-green-700',
      iconColor: 'text-green-600',
      commonQuestions: [
        'How to track my order status?',
        'Modifying or canceling orders',
        'Return and refund process',
        'Order fulfillment delays'
      ]
    },
    {
      id: 'products',
      title: 'Product Issues',
      icon: 'ri-product-hunt-line',
      description: 'Product information, inventory, and catalog management',
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      iconColor: 'text-purple-600',
      commonQuestions: [
        'How to upload product images?',
        'Managing product inventory',
        'Product approval process',
        'Updating product information'
      ]
    },
    {
      id: 'payments',
      title: 'Payments and Billing',
      icon: 'ri-bill-line',
      description: 'Invoices, payment issues, and billing inquiries',
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      iconColor: 'text-orange-600',
      commonQuestions: [
        'Understanding platform fees',
        'Payment processing issues',
        'Invoice and billing questions',
        'Setting up payment methods'
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: 'ri-tools-line',
      description: 'Platform bugs, errors, and technical difficulties',
      color: 'bg-red-50 border-red-200 text-red-700',
      iconColor: 'text-red-600',
      commonQuestions: [
        'Website loading issues',
        'Upload and download problems',
        'Browser compatibility',
        'Mobile app troubleshooting'
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Submit a Support Request',
      description: 'Create a detailed ticket for complex issues',
      icon: 'ri-customer-service-2-line',
      action: () => onCategorySelect('ticket'),
      color: 'bg-lime-600 hover:bg-lime-700'
    },
    {
      title: 'Browse Knowledge Base',
      description: 'Find answers in our comprehensive FAQ section',
      icon: 'ri-book-open-line',
      action: () => onCategorySelect('faqs'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Live Chat Support',
      description: 'Get immediate help from our support team',
      icon: 'ri-chat-3-line',
      action: onToggleChat,
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How can we help you today?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to the Synergy B2B Help Center. Find quick solutions to common issues or get personalized support from our team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onContactEmail}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors cursor-pointer font-medium"
            >
              <i className="ri-mail-line w-5 h-5 flex items-center justify-center mr-2"></i>
              📧 Email Support
              <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded-full">24h response</span>
            </button>
            <button 
              onClick={onToggleChat}
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors cursor-pointer font-medium"
            >
              <i className="ri-chat-3-line w-5 h-5 flex items-center justify-center mr-2"></i>
              💬 Live Chat
              <span className="ml-2 text-xs bg-green-500 px-2 py-1 rounded-full">Instant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Support Categories */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Browse by Category</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportCategories.map((category) => (
            <div
              key={category.id}
              className={`border-2 rounded-xl p-6 transition-all cursor-pointer hover:shadow-lg ${category.color}`}
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center ${category.iconColor}`}>
                  <i className={`${category.icon} w-6 h-6 flex items-center justify-center`}></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{category.title}</h4>
                  <p className="text-sm opacity-80">{category.description}</p>
                </div>
                <i className={`ri-arrow-down-s-line w-5 h-5 flex items-center justify-center transition-transform ${
                  expandedCategory === category.id ? 'rotate-180' : ''
                }`}></i>
              </div>

              {expandedCategory === category.id && (
                <div className="border-t border-white/30 pt-4 mt-4">
                  <h5 className="font-medium mb-3 text-sm">Common Questions:</h5>
                  <ul className="space-y-2">
                    {category.commonQuestions.map((question, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <i className="ri-question-line w-4 h-4 flex items-center justify-center mt-0.5 opacity-60"></i>
                        <span className="opacity-80">{question}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onCategorySelect('faqs');
                    }}
                    className="mt-4 text-sm font-medium underline hover:no-underline"
                  >
                    View all {category.title.toLowerCase()} FAQs →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-6 rounded-xl transition-all hover:shadow-lg cursor-pointer text-left group`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <i className={`${action.icon} w-6 h-6 flex items-center justify-center`}></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg group-hover:translate-x-1 transition-transform">
                    {action.title}
                  </h4>
                </div>
              </div>
              <p className="text-white/90 text-sm">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Contact Information</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-mail-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email Support</h4>
                  <p className="text-sm text-gray-600">Get detailed assistance via email</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Email:</strong> <a href="mailto:support@synergy.com" className="text-blue-600 hover:underline cursor-pointer">support@synergy.com</a></p>
                <p><strong>Response Time:</strong> We typically respond within 24 hours</p>
                <p><strong>Available:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
              <button 
                onClick={onContactEmail}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Send Email
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-chat-3-line w-5 h-5 flex items-center justify-center text-green-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Live Chat</h4>
                  <p className="text-sm text-gray-600">Get immediate help from our team</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Availability:</strong> 24/7 Support Available</p>
                <p><strong>Average Response:</strong> Under 2 minutes</p>
                <p><strong>Languages:</strong> English, Spanish, French</p>
              </div>
              <button 
                onClick={onToggleChat}
                className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
              >
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}