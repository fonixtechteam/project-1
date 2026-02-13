
'use client';

interface Alert {
  id: string;
  type: 'expiring' | 'expired' | 'missing' | 'rejected';
  title: string;
  description: string;
  daysLeft?: number;
  productName: string;
  documentName: string;
  urgency: 'high' | 'medium' | 'low';
  actionRequired: boolean;
  date: string;
}

interface AlertsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAlertAction: (alertId: string, action: string) => void;
}

const sampleAlerts: Alert[] = [
  {
    id: '1',
    type: 'expired',
    title: 'FDA Certificate Expired',
    description: 'FDA registration certificate has expired and requires immediate renewal.',
    productName: 'Vitamin C Brightening Serum',
    documentName: 'FDA Registration Certificate',
    urgency: 'high',
    actionRequired: true,
    date: '2024-01-20'
  },
  {
    id: '2',
    type: 'expiring',
    title: 'COA Expires in 15 Days',
    description: 'Certificate of Analysis will expire soon. Please prepare renewal documentation.',
    daysLeft: 15,
    productName: 'Omega-3 Fish Oil Capsules',
    documentName: 'Certificate of Analysis',
    urgency: 'high',
    actionRequired: true,
    date: '2024-02-15'
  },
  {
    id: '3',
    type: 'expiring',
    title: 'ISO Certificate Expires in 45 Days',
    description: 'ISO 9001 certification approaching expiration date.',
    daysLeft: 45,
    productName: 'Premium Collagen Powder',
    documentName: 'ISO 9001 Certificate',
    urgency: 'medium',
    actionRequired: true,
    date: '2024-03-15'
  },
  {
    id: '4',
    type: 'missing',
    title: 'Missing Organic Certification',
    description: 'USDA Organic certification required for marketplace listing approval.',
    productName: 'Daily Probiotic Capsules',
    documentName: 'USDA Organic Certificate',
    urgency: 'medium',
    actionRequired: true,
    date: '2024-01-25'
  },
  {
    id: '5',
    type: 'rejected',
    title: 'Safety Testing Report Rejected',
    description: 'Submitted document was rejected due to incomplete testing panel. Admin feedback available.',
    productName: 'Biotin Hair Growth Supplements',
    documentName: 'Safety Testing Report',
    urgency: 'high',
    actionRequired: true,
    date: '2024-01-22'
  },
  {
    id: '6',
    type: 'expiring',
    title: 'GMP Certificate Expires in 90 Days',
    description: 'Good Manufacturing Practices certificate scheduled for renewal.',
    daysLeft: 90,
    productName: 'All Products',
    documentName: 'GMP Certificate',
    urgency: 'low',
    actionRequired: false,
    date: '2024-04-20'
  }
];

export default function AlertsPanel({ isOpen, onClose, onAlertAction }: AlertsPanelProps) {
  const getAlertIcon = (type: string) => {
    const icons = {
      expired: 'ri-error-warning-fill text-red-600',
      expiring: 'ri-time-fill text-amber-600',
      missing: 'ri-file-warning-fill text-orange-600',
      rejected: 'ri-close-circle-fill text-red-600'
    };
    return icons[type as keyof typeof icons] || 'ri-information-fill text-blue-600';
  };

  const getAlertBg = (urgency: string) => {
    const backgrounds = {
      high: 'bg-red-50 border-red-200',
      medium: 'bg-amber-50 border-amber-200',
      low: 'bg-blue-50 border-blue-200'
    };
    return backgrounds[urgency as keyof typeof backgrounds] || 'bg-gray-50 border-gray-200';
  };

  const getUrgencyBadge = (urgency: string) => {
    const badges = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-amber-100 text-amber-800 border-amber-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return badges[urgency as keyof typeof badges] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleAction = (alertId: string, action: string) => {
    onAlertAction(alertId, action);
    
    if (action === 'dismiss' || action === 'resolve') {
      // Remove alert from UI or mark as resolved
      console.log(`${action} alert:`, alertId);
    }
  };

  if (!isOpen) return null;

  const criticalAlerts = sampleAlerts.filter(alert => alert.urgency === 'high');
  const otherAlerts = sampleAlerts.filter(alert => alert.urgency !== 'high');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-lg">
              <i className="ri-notification-3-fill w-5 h-5 flex items-center justify-center text-amber-600"></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Compliance Alerts</h2>
              <p className="text-sm text-gray-600">{sampleAlerts.length} active notifications requiring attention</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
          </button>
        </div>

        {/* Alerts Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Critical Alerts Section */}
          {criticalAlerts.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <i className="ri-alarm-warning-fill w-5 h-5 flex items-center justify-center text-red-600 mr-2"></i>
                <h3 className="text-lg font-semibold text-gray-900">Critical Actions Required</h3>
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 rounded-full">
                  {criticalAlerts.length}
                </span>
              </div>
              
              <div className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-xl p-5 ${getAlertBg(alert.urgency)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg">
                          <i className={`w-5 h-5 flex items-center justify-center ${getAlertIcon(alert.type)}`}></i>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-base font-semibold text-gray-900">{alert.title}</h4>
                            <span className={`px-2 py-1 text-xs font-medium border rounded-full ${getUrgencyBadge(alert.urgency)}`}>
                              {alert.urgency.toUpperCase()} PRIORITY
                            </span>
                            {alert.daysLeft !== undefined && (
                              <span className="px-2 py-1 text-xs font-bold bg-red-600 text-white rounded-full">
                                {alert.daysLeft} days left
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-3">{alert.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <i className="ri-product-hunt-line w-4 h-4 flex items-center justify-center mr-1"></i>
                              <span>{alert.productName}</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-file-text-line w-4 h-4 flex items-center justify-center mr-1"></i>
                              <span>{alert.documentName}</span>
                            </div>
                            <div className="flex items-center">
                              <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-1"></i>
                              <span>{formatDate(alert.date)}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {alert.type === 'expired' && (
                              <button
                                onClick={() => handleAction(alert.id, 'renew')}
                                className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap"
                              >
                                <i className="ri-refresh-line w-3 h-3 flex items-center justify-center mr-1"></i>
                                Renew Now
                              </button>
                            )}
                            
                            {alert.type === 'expiring' && (
                              <button
                                onClick={() => handleAction(alert.id, 'schedule_renewal')}
                                className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 cursor-pointer whitespace-nowrap"
                              >
                                <i className="ri-calendar-schedule-line w-3 h-3 flex items-center justify-center mr-1"></i>
                                Schedule Renewal
                              </button>
                            )}
                            
                            {alert.type === 'missing' && (
                              <button
                                onClick={() => handleAction(alert.id, 'upload')}
                                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                              >
                                <i className="ri-upload-line w-3 h-3 flex items-center justify-center mr-1"></i>
                                Upload Document
                              </button>
                            )}
                            
                            {alert.type === 'rejected' && (
                              <>
                                <button
                                  onClick={() => handleAction(alert.id, 'view_feedback')}
                                  className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                                >
                                  <i className="ri-feedback-line w-3 h-3 flex items-center justify-center mr-1"></i>
                                  View Feedback
                                </button>
                                <button
                                  onClick={() => handleAction(alert.id, 'resubmit')}
                                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                                >
                                  <i className="ri-file-upload-line w-3 h-3 flex items-center justify-center mr-1"></i>
                                  Resubmit
                                </button>
                              </>
                            )}
                            
                            <button
                              onClick={() => handleAction(alert.id, 'view_document')}
                              className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-eye-line w-3 h-3 flex items-center justify-center mr-1"></i>
                              View Details
                            </button>
                            
                            <button
                              onClick={() => handleAction(alert.id, 'dismiss')}
                              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-close-line w-3 h-3 flex items-center justify-center mr-1"></i>
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Alerts Section */}
          {otherAlerts.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <i className="ri-information-line w-5 h-5 flex items-center justify-center text-blue-600 mr-2"></i>
                <h3 className="text-lg font-semibold text-gray-900">Other Notifications</h3>
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 rounded-full">
                  {otherAlerts.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {otherAlerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${getAlertBg(alert.urgency)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg">
                          <i className={`w-4 h-4 flex items-center justify-center ${getAlertIcon(alert.type)}`}></i>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{alert.title}</h4>
                            {alert.daysLeft !== undefined && (
                              <span className="px-2 py-0.5 text-xs bg-amber-200 text-amber-800 rounded-full whitespace-nowrap">
                                {alert.daysLeft} days
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 truncate">{alert.productName} • {alert.documentName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-3">
                        <button
                          onClick={() => handleAction(alert.id, 'view_document')}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg cursor-pointer"
                          title="View Details"
                        >
                          <i className="ri-eye-line w-3 h-3 flex items-center justify-center"></i>
                        </button>
                        <button
                          onClick={() => handleAction(alert.id, 'dismiss')}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg cursor-pointer"
                          title="Dismiss"
                        >
                          <i className="ri-close-line w-3 h-3 flex items-center justify-center"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{criticalAlerts.length}</span> critical alerts • 
            <span className="font-medium ml-1">{otherAlerts.length}</span> other notifications
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleAction('all', 'mark_all_read')}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
            >
              Mark All Read
            </button>
            <button
              onClick={() => handleAction('all', 'export')}
              className="px-4 py-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer whitespace-nowrap"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
