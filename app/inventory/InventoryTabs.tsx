
'use client';

interface InventoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  skuCounts: {
    all: number;
    pending: number;
    approved: number;
    hidden: number;
  };
}

const tabs = [
  { id: 'all-skus', label: 'All SKUs', key: 'all' },
  { id: 'pending-approval', label: 'Pending Approval', key: 'pending' },
  { id: 'approved', label: 'Approved', key: 'approved' },
  { id: 'hidden-rejected', label: 'Hidden / Rejected', key: 'hidden' }
];

export default function InventoryTabs({ activeTab, onTabChange, skuCounts }: InventoryTabsProps) {
  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div className="px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition-colors flex items-center ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === tab.id
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {skuCounts[tab.key as keyof typeof skuCounts]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
