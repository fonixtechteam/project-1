
'use client';

interface BuyerPreviewDrawerProps {
  retailer: {
    id: number;
    buyerName: string;
    businessType: string;
    market: string;
    requestDate: string;
    status: string;
    details: {
      companyName: string;
      yearsInBusiness: string;
      outlets: string;
      certifications: string[];
    };
  };
  onClose: () => void;
}

export default function BuyerPreviewDrawer({ retailer, onClose }: BuyerPreviewDrawerProps) {
  const handleDownloadProfile = () => {
    console.log('Downloading profile for:', retailer.buyerName);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Buyer Details</h2>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
                  >
                    <i className="ri-close-line w-5 h-5 flex items-center justify-center text-gray-600"></i>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                {/* Company Info */}
                <div className="mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Company Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Company Name</label>
                      <p className="text-sm text-gray-900 mt-1">{retailer.details.companyName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Business Type</label>
                      <p className="text-sm text-gray-900 mt-1">{retailer.businessType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Market/Country</label>
                      <p className="text-sm text-gray-900 mt-1">{retailer.market}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Years in Business</label>
                      <p className="text-sm text-gray-900 mt-1">{retailer.details.yearsInBusiness}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Number of Outlets</label>
                      <p className="text-sm text-gray-900 mt-1">{retailer.details.outlets}</p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Certifications</h3>
                  <div className="space-y-2">
                    {retailer.details.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Request Details */}
                <div className="mb-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Request Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Request Date</label>
                      <p className="text-sm text-gray-900 mt-1">{new Date(retailer.requestDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Current Status</label>
                      <div className="mt-1">
                        {retailer.status === 'pending' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending Review
                          </span>
                        )}
                        {retailer.status === 'approved' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Approved
                          </span>
                        )}
                        {retailer.status === 'rejected' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Rejected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownloadProfile}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-line w-4 h-4 flex items-center justify-center"></i>
                  <span>Download Full Profile (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
