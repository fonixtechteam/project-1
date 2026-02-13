
'use client';

interface CompanyProfileHeaderProps {
  isEditMode: boolean;
  onToggleEdit: () => void;
}

export default function CompanyProfileHeader({ isEditMode, onToggleEdit }: CompanyProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        <p className="text-gray-600 mt-2">Manage your brand identity, legal details, and team access</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleEdit}
          className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
            isEditMode
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center inline-block mr-2">
            <i className={isEditMode ? 'ri-save-line' : 'ri-edit-line'}></i>
          </div>
          {isEditMode ? 'Exit Edit' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
}
