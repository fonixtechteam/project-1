
'use client';

interface Document {
  id: string;
  name: string;
  productName: string;
  productId: string;
  certificationType: string;
  uploadDate: string;
  expirationDate: string;
  status: 'valid' | 'expiring' | 'expired' | 'pending';
  fileSize: string;
  fileType: string;
  complianceScore: number;
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'FDA Registration Certificate',
    productName: 'Vitamin C Brightening Serum',
    productId: 'VCS-001',
    certificationType: 'FDA',
    uploadDate: '2024-01-15',
    expirationDate: '2025-01-15',
    status: 'valid',
    fileSize: '245 KB',
    fileType: 'PDF',
    complianceScore: 95
  },
  {
    id: '2',
    name: 'Organic Certification',
    productName: 'Omega-3 Fish Oil Capsules',
    productId: 'OFC-002',
    certificationType: 'USDA Organic',
    uploadDate: '2024-02-10',
    expirationDate: '2024-12-20',
    status: 'expiring',
    fileSize: '180 KB',
    fileType: 'PDF',
    complianceScore: 88
  },
  {
    id: '3',
    name: 'Third-Party Lab Analysis',
    productName: 'Premium Collagen Powder',
    productId: 'PCP-003',
    certificationType: 'COA',
    uploadDate: '2024-01-20',
    expirationDate: '2024-07-20',
    status: 'expired',
    fileSize: '320 KB',
    fileType: 'PDF',
    complianceScore: 72
  },
  {
    id: '4',
    name: 'ISO 22000 Food Safety Certificate',
    productName: 'Daily Probiotic Capsules',
    productId: 'DPC-004',
    certificationType: 'ISO',
    uploadDate: '2024-03-05',
    expirationDate: '2025-03-05',
    status: 'valid',
    fileSize: '195 KB',
    fileType: 'PDF',
    complianceScore: 92
  },
  {
    id: '5',
    name: 'GMP Manufacturing Certificate',
    productName: 'Biotin Hair Growth Supplements',
    productId: 'BHG-005',
    certificationType: 'GMP',
    uploadDate: '2024-02-28',
    expirationDate: '2024-11-15',
    status: 'expiring',
    fileSize: '210 KB',
    fileType: 'PDF',
    complianceScore: 85
  },
  {
    id: '6',
    name: 'Heavy Metal Testing Report',
    productName: 'Vitamin C Brightening Serum',
    productId: 'VCS-001',
    certificationType: 'Safety Testing',
    uploadDate: '2024-03-10',
    expirationDate: '2025-03-10',
    status: 'pending',
    fileSize: '285 KB',
    fileType: 'PDF',
    complianceScore: 78
  },
  {
    id: '7',
    name: 'Allergen Testing Certificate',
    productName: 'Premium Collagen Powder',
    productId: 'PCP-003',
    certificationType: 'Allergen Testing',
    uploadDate: '2024-01-08',
    expirationDate: '2024-10-08',
    status: 'expiring',
    fileSize: '165 KB',
    fileType: 'PDF',
    complianceScore: 90
  },
  {
    id: '8',
    name: 'Kosher Certification',
    productName: 'Omega-3 Fish Oil Capsules',
    productId: 'OFC-002',
    certificationType: 'Kosher',
    uploadDate: '2024-02-15',
    expirationDate: '2025-02-15',
    status: 'valid',
    fileSize: '125 KB',
    fileType: 'PDF',
    complianceScore: 94
  }
];

interface DocumentTableProps {
  documents: Document[];
  onDocumentClick: (document: Document) => void;
  onDocumentEdit: (document: Document) => void;
  onDocumentReplace: (document: Document) => void;
  onDocumentDelete: (document: Document) => void;
  onDocumentDownload: (document: Document) => void;
}

export default function DocumentTable({
  documents = sampleDocuments,
  onDocumentClick,
  onDocumentEdit,
  onDocumentReplace,
  onDocumentDelete,
  onDocumentDownload
}: DocumentTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysUntilExpiry = (expirationDate: string) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: string, expirationDate: string) => {
    const daysUntilExpiry = getDaysUntilExpiry(expirationDate);
    
    const badges = {
      valid: 'bg-green-100 text-green-800 border-green-200',
      expiring: 'bg-amber-100 text-amber-800 border-amber-200',
      expired: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    const icons = {
      valid: 'ri-check-line',
      expiring: 'ri-time-line',
      expired: 'ri-close-line',
      pending: 'ri-hourglass-line'
    };

    const statusText = status === 'expiring' ? `Expires in ${daysUntilExpiry}d` : 
                      status === 'expired' ? `Expired ${Math.abs(daysUntilExpiry)}d ago` :
                      status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium border rounded-full ${badges[status as keyof typeof badges]}`}>
        <i className={`${icons[status as keyof typeof icons]} w-3 h-3 flex items-center justify-center mr-1`}></i>
        {statusText}
      </span>
    );
  };

  const getComplianceScoreBadge = (score: number) => {
    const color = score >= 90 ? 'bg-green-100 text-green-800' :
                  score >= 80 ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800';
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${color}`}>
        {score}%
      </span>
    );
  };

  return (
    <div className="p-8">
      <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Document</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Product</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Expiration Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Compliance Score</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg mr-3">
                        <i className="ri-file-shield-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                      </div>
                      <div>
                        <button
                          onClick={() => onDocumentClick(doc)}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer text-left"
                        >
                          {doc.name}
                        </button>
                        <p className="text-xs text-gray-500">{doc.fileType} • {doc.fileSize}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.productName}</p>
                      <p className="text-xs text-gray-500">SKU: {doc.productId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {doc.certificationType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatDate(doc.expirationDate)}</p>
                      <p className="text-xs text-gray-500">
                        {getDaysUntilExpiry(doc.expirationDate) > 0 
                          ? `${getDaysUntilExpiry(doc.expirationDate)} days remaining`
                          : `${Math.abs(getDaysUntilExpiry(doc.expirationDate))} days overdue`
                        }
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(doc.status, doc.expirationDate)}
                  </td>
                  <td className="px-6 py-4">
                    {getComplianceScoreBadge(doc.complianceScore)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-1">
                      <button 
                        onClick={() => onDocumentClick(doc)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="View Details"
                      >
                        <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      
                      <button 
                        onClick={() => onDocumentDownload(doc)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                        title="Download"
                      >
                        <i className="ri-download-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      
                      <button 
                        onClick={() => onDocumentEdit(doc)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer"
                        title="Edit"
                      >
                        <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      
                      <button 
                        onClick={() => onDocumentDelete(doc)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Remove"
                      >
                        <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {documents.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-search-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or upload new compliance documents.</p>
            <button className="flex items-center mx-auto px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer">
              <i className="ri-upload-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Upload Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
