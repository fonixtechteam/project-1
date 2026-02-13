
'use client';
import { useState } from 'react';

interface NotificationsCardProps {
  isEditMode: boolean;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  category: 'orders' | 'products' | 'payments' | 'marketing' | 'system';
  email: boolean;
  push: boolean;
  sms: boolean;
}

export default function NotificationsCard({ isEditMode }: NotificationsCardProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'New Order Received',
      description: 'When a retailer places a new order',
      category: 'orders',
      email: true,
      push: true,
      sms: false
    },
    {
      id: '2',
      title: 'Order Status Updates',
      description: 'When order status changes (shipped, delivered, etc.)',
      category: 'orders',
      email: true,
      push: false,
      sms: false
    },
    {
      id: '3',
      title: 'Low Stock Alerts',
      description: 'When product inventory falls below threshold',
      category: 'products',
      email: true,
      push: true,
      sms: true
    },
    {
      id: '4',
      title: 'Product Approval Status',
      description: 'When products are approved or rejected by admin',
      category: 'products',
      email: true,
      push: false,
      sms: false
    },
    {
      id: '5',
      title: 'Payment Received',
      description: 'When payments are processed successfully',
      category: 'payments',
      email: true,
      push: false,
      sms: false
    },
    {
      id: '6',
      title: 'Payment Failed',
      description: 'When payment processing fails',
      category: 'payments',
      email: true,
      push: true,
      sms: true
    },
    {
      id: '7',
      title: 'New Retailer Request',
      description: 'When a new retailer requests access to your products',
      category: 'marketing',
      email: true,
      push: true,
      sms: false
    },
    {
      id: '8',
      title: 'Weekly Sales Report',
      description: 'Summary of weekly sales performance',
      category: 'marketing',
      email: true,
      push: false,
      sms: false
    },
    {
      id: '9',
      title: 'System Maintenance',
      description: 'Scheduled maintenance and system updates',
      category: 'system',
      email: true,
      push: false,
      sms: false
    },
    {
      id: '10',
      title: 'Security Alerts',
      description: 'Account security notifications and login alerts',
      category: 'system',
      email: true,
      push: true,
      sms: true
    }
  ]);

  const categories = {
    orders: { name: 'Orders', icon: 'ri-shopping-bag-line', color: 'text-blue-600 bg-blue-100' },
    products: { name: 'Products', icon: 'ri-product-hunt-line', color: 'text-green-600 bg-green-100' },
    payments: { name: 'Payments', icon: 'ri-money-dollar-circle-line', color: 'text-yellow-600 bg-yellow-100' },
    marketing: { name: 'Marketing', icon: 'ri-megaphone-line', color: 'text-purple-600 bg-purple-100' },
    system: { name: 'System', icon: 'ri-settings-3-line', color: 'text-gray-600 bg-gray-100' }
  };

  const handleNotificationChange = (settingId: string, type: 'email' | 'push' | 'sms', value: boolean) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === settingId ? { ...setting, [type]: value } : setting
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    // Save logic here
  };

  const getCategorySettings = (category: keyof typeof categories) => {
    return settings.filter(setting => setting.category === category);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Notification Preferences</h3>
          <p className="text-gray-600 mt-1">Choose how you want to be notified about important events</p>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(categories).map(([categoryKey, category]) => {
          const categorySettings = getCategorySettings(categoryKey as keyof typeof categories);
          
          if (categorySettings.length === 0) return null;

          return (
            <div key={categoryKey}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${category.color}`}>
                  <i className={category.icon}></i>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 font-medium text-gray-900">Notification</th>
                        <th className="text-center py-3 font-medium text-gray-900 min-w-20">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-mail-line"></i>
                            </div>
                            <span>Email</span>
                          </div>
                        </th>
                        <th className="text-center py-3 font-medium text-gray-900 min-w-20">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-notification-3-line"></i>
                            </div>
                            <span>Push</span>
                          </div>
                        </th>
                        <th className="text-center py-3 font-medium text-gray-900 min-w-20">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-message-3-line"></i>
                            </div>
                            <span>SMS</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {categorySettings.map((setting) => (
                        <tr key={setting.id}>
                          <td className="py-4 pr-4">
                            <div>
                              <p className="font-medium text-gray-900">{setting.title}</p>
                              <p className="text-sm text-gray-500">{setting.description}</p>
                            </div>
                          </td>
                          <td className="py-4 text-center">
                            {isEditMode ? (
                              <input
                                type="checkbox"
                                checked={setting.email}
                                onChange={(e) => handleNotificationChange(setting.id, 'email', e.target.checked)}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                              />
                            ) : (
                              <div className="w-4 h-4 flex items-center justify-center mx-auto">
                                {setting.email ? (
                                  <i className="ri-checkbox-circle-fill text-green-600"></i>
                                ) : (
                                  <i className="ri-checkbox-blank-circle-line text-gray-300"></i>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="py-4 text-center">
                            {isEditMode ? (
                              <input
                                type="checkbox"
                                checked={setting.push}
                                onChange={(e) => handleNotificationChange(setting.id, 'push', e.target.checked)}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                              />
                            ) : (
                              <div className="w-4 h-4 flex items-center justify-center mx-auto">
                                {setting.push ? (
                                  <i className="ri-checkbox-circle-fill text-green-600"></i>
                                ) : (
                                  <i className="ri-checkbox-blank-circle-line text-gray-300"></i>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="py-4 text-center">
                            {isEditMode ? (
                              <input
                                type="checkbox"
                                checked={setting.sms}
                                onChange={(e) => handleNotificationChange(setting.id, 'sms', e.target.checked)}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                              />
                            ) : (
                              <div className="w-4 h-4 flex items-center justify-center mx-auto">
                                {setting.sms ? (
                                  <i className="ri-checkbox-circle-fill text-green-600"></i>
                                ) : (
                                  <i className="ri-checkbox-blank-circle-line text-gray-300"></i>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Settings */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-3">Contact Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-2">Notification Email</label>
            <input
              type="email"
              value="notifications@luminabeauty.com"
              disabled={!isEditMode}
              className={`w-full px-3 py-2 border border-blue-200 rounded-md text-sm ${
                isEditMode 
                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                  : 'bg-blue-50 text-blue-700'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-2">SMS Number</label>
            <input
              type="tel"
              value="+1 (555) 123-4567"
              disabled={!isEditMode}
              className={`w-full px-3 py-2 border border-blue-200 rounded-md text-sm ${
                isEditMode 
                  ? 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                  : 'bg-blue-50 text-blue-700'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditMode && hasChanges && (
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Save Preferences
          </button>
        </div>
      )}

      {/* Information */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 flex items-center justify-center text-yellow-600 mt-0.5">
            <i className="ri-information-line"></i>
          </div>
          <div>
            <p className="text-sm text-yellow-800 font-medium">Notification Information</p>
            <div className="text-sm text-yellow-700 mt-1 space-y-1">
              <p>• Email notifications are sent instantly</p>
              <p>• Push notifications require the mobile app to be installed</p>
              <p>• SMS notifications may incur additional charges</p>
              <p>• Critical security alerts cannot be disabled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
