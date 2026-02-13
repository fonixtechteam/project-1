
'use client';

interface OrdersHeaderProps {
  onNewOrder: () => void;
  onRefresh: () => void;
}

export default function OrdersHeader({ onNewOrder, onRefresh }: OrdersHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Order Management</h2>
          <p className="text-gray-600">Track and fulfill your B2B orders efficiently</p>
        </div>
      </div>
    </div>
  );
}