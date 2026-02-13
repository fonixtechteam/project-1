'use client';

interface RecentOrderItemProps {
  type: 'request' | 'order' | 'message';
  title: string;
  description: string;
  category: string;
  time: string;
  status?: 'active' | 'confirmed';
}

export default function RecentOrderItem({ type, title, description, category, time, status }: RecentOrderItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'request':
        return 'ri-user-line';
      case 'order':
        return 'ri-shopping-cart-line';
      case 'message':
        return 'ri-message-line';
      default:
        return 'ri-file-line';
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'request':
        return 'bg-blue-500';
      case 'order':
        return 'bg-green-500';
      case 'message':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
      <div className={`w-8 h-8 ${getIconBg()} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <i className={`${getIcon()} w-4 h-4 flex items-center justify-center text-white`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          {status === 'active' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
          {status === 'confirmed' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="flex items-center space-x-4 mt-1">
          <span className="text-xs text-gray-500">{category}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
      </div>
    </div>
  );
}