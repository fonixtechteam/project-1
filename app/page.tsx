'use client';

import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import QuickActionCard from '../components/QuickActionCard';
import RecentOrderItem from '../components/RecentOrderItem';
import Link from 'next/link';

export default function Home() {
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
                <h1 className="text-2xl font-semibold text-gray-900">Brand Dashboard</h1>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                  Live
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 italic">Monitor your performance and manage your B2B operations</p>
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

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Retailer Requests"
              value="24"
              description="View Requests"
              icon="ri-user-add-line"
              iconBg="bg-red-400"
            />
            <StatsCard
              title="Open Orders"
              value="24"
              description="Go to Orders"
              icon="ri-shopping-cart-line"
              iconBg="bg-red-400"
            />
            <StatsCard
              title="Expiring Docs"
              value="24"
              description="Compliance Center"
              icon="ri-file-list-line"
              iconBg="bg-red-400"
            />
            <StatsCard
              title="Unread Messages"
              value="24"
              description="Open Conversations"
              icon="ri-message-line"
              iconBg="bg-red-400"
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <QuickActionCard
                title="Add New SKU"
                description="Create and configure new product listings"
                icon="ri-add-line"
                iconBg="bg-orange-400"
              />
              <QuickActionCard
                title="Upload New Asset"
                description="Add images, documents, and marketing materials"
                icon="ri-upload-line"
                iconBg="bg-orange-400"
              />
              <QuickActionCard
                title="Edit Company Profile"
                description="Update brand information and settings"
                icon="ri-settings-line"
                iconBg="bg-red-400"
              />
              <QuickActionCard
                title="Build New Kit"
                description="Create product bundles and promotional packages"
                icon="ri-add-line"
                iconBg="bg-orange-400"
              />
              <QuickActionCard
                title="View Pending Compliance"
                description="Review and submit required documentation"
                icon="ri-file-list-line"
                iconBg="bg-orange-400"
              />
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                <Link href="/orders" className="text-sm text-red-600 hover:text-red-700">
                  View All Orders
                </Link>
              </div>
            </div>
            <div className="p-6">
              <RecentOrderItem
                type="request"
                title="New Retailer Access Request"
                description="Mountain Peak Outdoors has requested access to your product catalog"
                category="Retailer Requests"
                time="1 min ago"
                status="active"
              />
              <RecentOrderItem
                type="order"
                title="Order #SP-2024-1136 Confirmed"
                description="Summit Sports confirmed their order for 150 units of Trail Runner Pro"
                category="Orders"
                time="43m ago"
                status="confirmed"
              />
              <RecentOrderItem
                type="message"
                title="New Message from Alpine Gear Co."
                description="Question about bulk pricing for Q2 seasonal order"
                category="Conversations"
                time="2h ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}