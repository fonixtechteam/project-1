
'use client';

interface Tab {
  id: number;
  label: string;
  icon: string;
}

interface ProfileTabSliderProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (tabId: number) => void;
}

export default function ProfileTabSlider({ tabs, activeTab, onTabChange }: ProfileTabSliderProps) {
  return (
    <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
      <div className="flex items-center overflow-x-auto">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            <button
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-3 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={tab.icon}></i>
              </div>
              <span>{tab.label}</span>
            </button>
            {index < tabs.length - 1 && (
              <div className="mx-2 text-gray-300">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-arrow-right-s-line"></i>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
