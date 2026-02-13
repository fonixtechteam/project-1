
'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import CompanyProfileHeader from './CompanyProfileHeader';
import ProfileTabSlider from './ProfileTabSlider';
import GeneralInfoCard from './GeneralInfoCard';
import LegalInfoCard from './LegalInfoCard';
import TeamAccessCard from './TeamAccessCard';
import NotificationsCard from './NotificationsCard';

export default function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  const tabs = [
    { id: 0, label: 'General Info', icon: 'ri-building-line' },
    { id: 1, label: 'Legal & Internal', icon: 'ri-file-text-line' },
    { id: 2, label: 'Team Access', icon: 'ri-team-line' },
    { id: 3, label: 'Notifications', icon: 'ri-notification-3-line' }
  ];

  const renderActiveCard = () => {
    switch (activeTab) {
      case 0:
        return <GeneralInfoCard isEditMode={isEditMode} />;
      case 1:
        return <LegalInfoCard isEditMode={isEditMode} />;
      case 2:
        return <TeamAccessCard isEditMode={isEditMode} />;
      case 3:
        return <NotificationsCard isEditMode={isEditMode} />;
      default:
        return <GeneralInfoCard isEditMode={isEditMode} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <CompanyProfileHeader 
            isEditMode={isEditMode}
            onToggleEdit={() => setIsEditMode(!isEditMode)}
          />
          
          <div className="mt-8">
            <ProfileTabSlider 
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            
            <div className="mt-6">
              {renderActiveCard()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
