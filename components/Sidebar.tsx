
'use client';

import Link from 'next/link';

const menuItems = [
  { icon: 'ri-dashboard-line', label: 'Dashboard', href: '/' },
  { icon: 'ri-box-3-line', label: 'Inventory Management', href: '/inventory' },
  { icon: 'ri-hand-heart-line', label: 'Retailer Requests', href: '/retailer-requests' },
  { icon: 'ri-folder-line', label: 'Asset Manager', href: '/asset-manager' },
  { icon: 'ri-stack-line', label: 'Kit Builder', href: '/kit-builder' },
  { icon: 'ri-building-line', label: 'Company Profile', href: '/company-profile' },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-[\'Pacifico\'] text-amber-600">Synergy</div>
        </div>
        <div className="text-xs text-gray-500 mt-1">PORTAL</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {/* Overview Section */}
        <div className="mb-6">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Overview</div>
          <div className="space-y-1">
            <Link href="/" className="flex items-center px-3 py-2 text-sm bg-red-50 text-red-600 rounded-md">
              <i className="ri-dashboard-line w-5 h-5 flex items-center justify-center mr-3"></i>
              Dashboard
            </Link>
            <Link href="/company-profile" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-building-line w-5 h-5 flex items-center justify-center mr-3"></i>
              Company Profile
            </Link>
          </div>
        </div>

        {/* Catalog Management Section */}
        <div className="mb-6">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Catalog Management</div>
          <div className="space-y-1">
            <Link href="/inventory" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-archive-line w-5 h-5 flex items-center justify-center mr-3"></i>
              Inventory
            </Link>
            <Link href="/asset-manager" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-folder-line w-5 h-5 flex items-center justify-center mr-3"></i>
              Asset Manager
            </Link>
            <Link href="/kit-builder" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md pl-6">
              Kit Builder
            </Link>
          </div>
        </div>

        {/* Business Operations Section */}
        <div className="mb-6">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Business Operations</div>
          <div className="space-y-1">
            <Link href="/orders" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-shopping-cart-line w-5 h-5 flex items-center justify-center mr-3"></i>
              <span>Orders</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">14</span>
            </Link>
            <Link href="/compliance-center" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center mr-3"></i>
              <span>Compliance Center</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
            </Link>
            <Link href="/retailer-requests" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-user-add-line w-5 h-5 flex items-center justify-center mr-3"></i>
              <span>Retailer Requests</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">6</span>
            </Link>
            <Link href="/conversations" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-message-line w-5 h-5 flex items-center justify-center mr-3"></i>
              <span>Conversations</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">8</span>
            </Link>
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Account</div>
          <div className="space-y-1">
            <Link href="/billing" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-bill-line w-5 h-5 flex items-center justify-center mr-3"></i>
              Billing & Invoices
            </Link>
            <Link href="/settings" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-settings-line w-5 h-5 flex items-center justify-center mr-3"></i>
              Settings
            </Link>
            <Link href="/help" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <i className="ri-question-line w-5 h-5 flex items-center justify-center mr-3"></i>
              Help & Support
            </Link>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">John Doe</div>
            <div className="text-xs text-gray-500">Brand Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}
