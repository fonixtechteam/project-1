
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ComplianceCenterHeader from './ComplianceCenterHeader';
import ProductFolderGrid from './ProductFolderGrid';
import FolderViewModal from './FolderViewModal';
import DocumentDetailModal from './DocumentDetailModal';
import UploadDocumentModal from './UploadDocumentModal';
import AlertsPanel from './AlertsPanel';

const sampleProducts = [
  {
    id: '1',
    name: 'Vitamin C Brightening Serum',
    image: 'https://readdy.ai/api/search-image?query=vitamin%20c%20serum%20bottle%20with%20dropper%20elegant%20professional%20product%20photography%20clean%20white%20background%20minimalist%20lighting&width=300&height=300&seq=1&orientation=squarish',
    totalDocuments: 8,
    categories: {
      certificates: 3,
      regulatory: 3,
      'product-info': 2,
    },
    status: 'compliant' as const,
    complianceScore: 95,
    lastUpdated: '2024-01-15',
    documents: []
  },
  {
    id: '2',
    name: 'Omega-3 Fish Oil Capsules',
    image: 'https://readdy.ai/api/search-image?query=omega%203%20fish%20oil%20supplement%20bottle%20capsules%20clean%20professional%20product%20photography%20white%20background%20health%20supplement&width=300&height=300&seq=2&orientation=squarish',
    totalDocuments: 6,
    categories: {
      certificates: 2,
      regulatory: 2,
      'product-info': 2,
    },
    status: 'expiring' as const,
    complianceScore: 78,
    lastUpdated: '2024-01-12',
    documents: []
  },
  {
    id: '3',
    name: 'Premium Collagen Powder',
    image: 'https://readdy.ai/api/search-image?query=collagen%20protein%20powder%20container%20jar%20clean%20professional%20product%20photography%20white%20background%20vanilla%20flavor%20supplement&width=300&height=300&seq=3&orientation=squarish',
    totalDocuments: 4,
    categories: {
      certificates: 1,
      regulatory: 2,
      'product-info': 1,
    },
    status: 'non-compliant' as const,
    complianceScore: 45,
    lastUpdated: '2024-01-08',
    documents: []
  },
  {
    id: '4',
    name: 'Daily Probiotic Capsules',
    image: 'https://readdy.ai/api/search-image?query=probiotic%20supplement%20bottle%20capsules%20clean%20professional%20product%20photography%20white%20background%20health%20gut%20health&width=300&height=300&seq=4&orientation=squarish',
    totalDocuments: 7,
    categories: {
      certificates: 3,
      regulatory: 2,
      'product-info': 2,
    },
    status: 'compliant' as const,
    complianceScore: 88,
    lastUpdated: '2024-01-10',
    documents: []
  },
  {
    id: '5',
    name: 'Turmeric Curcumin Extract',
    image: 'https://readdy.ai/api/search-image?query=turmeric%20curcumin%20supplement%20bottle%20capsules%20clean%20professional%20product%20photography%20white%20background%20anti-inflammatory&width=300&height=300&seq=5&orientation=squarish',
    totalDocuments: 5,
    categories: {
      certificates: 2,
      regulatory: 2,
      'product-info': 1,
    },
    status: 'expiring' as const,
    complianceScore: 72,
    lastUpdated: '2024-01-06',
    documents: []
  }
];

export default function ComplianceCenterPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAlertsPanel, setShowAlertsPanel] = useState(true);

  const handleProductClick = (product: any) => {
    setSelectedFolder(product);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ComplianceCenterHeader
          onUpload={() => setShowUploadModal(true)}
          onRefresh={() => console.log('Refresh documents')}
          onToggleAlerts={() => setShowAlertsPanel(!showAlertsPanel)}
          hasAlerts={showAlertsPanel}
        />

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto">
            <ProductFolderGrid
              products={sampleProducts}
              onProductClick={handleProductClick}
              viewMode={viewMode}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onViewModeChange={setViewMode}
              onSearchChange={setSearchQuery}
              onStatusFilterChange={setStatusFilter}
              onFolderClick={setSelectedFolder}
            />
          </div>

          {showAlertsPanel && (
            <div className="w-80 border-l border-blue-200 bg-white/50 backdrop-blur-sm">
              <AlertsPanel 
                isOpen={showAlertsPanel}
                onClose={() => setShowAlertsPanel(false)}
                onAlertAction={(alertId, action) => console.log('Alert action:', alertId, action)}
              />
            </div>
          )}
        </div>
      </div>

      {selectedFolder && (
        <FolderViewModal
          folder={selectedFolder}
          onClose={() => setSelectedFolder(null)}
          onDocumentClick={setSelectedDocument}
          onUploadDocument={() => setShowUploadModal(true)}
        />
      )}

      {selectedDocument && (
        <DocumentDetailModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          onReupload={() => {
            setSelectedDocument(null);
            setShowUploadModal(true);
          }}
        />
      )}

      {showUploadModal && (
        <UploadDocumentModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={(doc) => console.log('Upload success:', doc)}
        />
      )}
    </div>
  );
}
