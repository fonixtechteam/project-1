
'use client';

import { useState } from 'react';
import { Kit } from './page';

interface SaveKitModalProps {
  kit: Partial<Kit>;
  onClose: () => void;
  onSave: (kit: Partial<Kit>) => void;
}

export default function SaveKitModal({ kit, onClose, onSave }: SaveKitModalProps) {
  const [kitName, setKitName] = useState(kit.name || '');
  const [saveAs, setSaveAs] = useState<'draft' | 'template'>('draft');

  const handleSave = () => {
    const updatedKit = {
      ...kit,
      name: kitName,
      status: saveAs === 'draft' ? 'draft' : 'template',
      id: Date.now().toString() // Simple ID generation
    };
    
    onSave(updatedKit);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Save Kit</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kit Name
            </label>
            <input
              type="text"
              value={kitName}
              onChange={(e) => setKitName(e.target.value)}
              placeholder="Enter kit name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Save Options
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="saveAs"
                  value="draft"
                  checked={saveAs === 'draft'}
                  onChange={(e) => setSaveAs(e.target.value as 'draft' | 'template')}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">Save as Draft</div>
                  <div className="text-sm text-gray-500">Continue editing later</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="saveAs"
                  value="template"
                  checked={saveAs === 'template'}
                  onChange={(e) => setSaveAs(e.target.value as 'draft' | 'template')}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">Save as Template</div>
                  <div className="text-sm text-gray-500">Reuse this kit structure</div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">Kit Summary</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Products: {kit.products?.length || 0}</div>
              <div>Total Value: ${kit.retailPrice?.toFixed(2) || '0.00'}</div>
              {(kit.discount || 0) > 0 && (
                <div>Discount: {kit.discount}%</div>
              )}
              <div className="font-medium text-lime-600">
                Final Price: ${kit.finalPrice?.toFixed(2) || '0.00'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!kitName.trim()}
            className="flex-1 px-4 py-3 bg-lime-600 hover:bg-lime-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            Save Kit
          </button>
        </div>
      </div>
    </div>
  );
}
