'use client';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: string;
  iconBg: string;
}

export default function StatsCard({ title, value, description, icon, iconBg }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
          <i className={`${icon} w-5 h-5 flex items-center justify-center text-white`}></i>
        </div>
      </div>
    </div>
  );
}