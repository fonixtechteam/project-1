'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import AssetManagerHeader from './AssetManagerHeader';
import ViewControls from './ViewControls';
import FileManagerView from './FileManagerView';
import BulkUploadModal from './BulkUploadModal';

export default function AssetManagerPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      // In a real app, this would select all visible items
      setSelectedItems(['1', '2', '3', '4']);
    } else {
      setSelectedItems([]);
    }
  };

  const handleAddFolder = () => {
    console.log('Add new folder');
  };

  const handleSubmitForApproval = () => {
    console.log('Submit for approval');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AssetManagerHeader
          onAddFolder={handleAddFolder}
          onBulkUpload={() => setShowBulkUpload(true)}
          onSubmitForApproval={handleSubmitForApproval}
          hasPendingAssets={true}
          selectedItems={selectedItems.length}
        />

        <ViewControls
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedCount={selectedItems.length}
          totalCount={4}
          onSelectAll={handleSelectAll}
        />

        <div className="flex-1 overflow-auto">
          <FileManagerView
            viewMode={viewMode}
            searchQuery={searchQuery}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
          />
        </div>
      </div>

      <BulkUploadModal
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
      />
    </div>
  );
}