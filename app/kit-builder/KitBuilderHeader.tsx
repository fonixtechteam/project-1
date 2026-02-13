
'use client';

interface KitBuilderHeaderProps {
  onSaveKit: () => void;
  onSubmitKit: () => void;
  onViewPreviousKits: () => void;
  hasProducts: boolean;
  kitName: string;
}

export default function KitBuilderHeader({ 
  onSaveKit, 
  onSubmitKit, 
  onViewPreviousKits,
  hasProducts, 
  kitName 
}: KitBuilderHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-amber-200/50 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kit Builder</h1>
          <p className="text-gray-600">
            Create custom product bundles by selecting individual products and organizing them efficiently
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onViewPreviousKits}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            <i className="ri-history-line w-5 h-5 flex items-center justify-center"></i>
            Previous Kits
          </button>
          
          <button
            onClick={onSaveKit}
            disabled={!hasProducts || !kitName}
            className="px-6 py-3 bg-coral-500 hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            <i className="ri-save-line w-5 h-5 flex items-center justify-center"></i>
            Save Kit
          </button>
          
          <button
            onClick={onSubmitKit}
            disabled={!hasProducts || !kitName}
            className="px-6 py-3 bg-lime-600 hover:bg-lime-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            <i className="ri-upload-line w-5 h-5 flex items-center justify-center"></i>
            Submit Kit
          </button>
        </div>
      </div>
    </div>
  );
}
