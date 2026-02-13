'use client';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  onClick?: () => void;
}

export default function QuickActionCard({ title, description, icon, iconBg, onClick }: QuickActionCardProps) {
  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <i className={`${icon} w-5 h-5 flex items-center justify-center text-white`}></i>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}