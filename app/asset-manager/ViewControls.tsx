'use client';

interface ViewControlsProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  selectedCount: number;
  totalCount: number;
  onSelectAll: (selected: boolean) => void;
}

export default function ViewControls({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCount,
  totalCount,
  onSelectAll
}: ViewControlsProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-amber-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <i className="ri-search-line w-4 h-4 flex items-center justify-center absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search folders and assets..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white cursor-pointer"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
            <option value="size">Sort by Size</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-2">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={selectedCount === totalCount && totalCount > 0}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 mr-2 cursor-pointer"
              />
              {selectedCount > 0 ? `${selectedCount} selected` : `${totalCount} items`}
            </label>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-grid-line w-4 h-4 flex items-center justify-center"></i>
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-list-unordered w-4 h-4 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}