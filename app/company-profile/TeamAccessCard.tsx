
'use client';
import { useState } from 'react';

interface TeamAccessCardProps {
  isEditMode: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  avatar?: string;
}

export default function TeamAccessCard({ isEditMode }: TeamAccessCardProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Emily Rodriguez',
      email: 'emily@luminabeauty.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-02-15 10:30 AM',
      avatar: 'professional headshot of business woman with dark hair in modern office setting'
    },
    {
      id: '2',
      name: 'Marcus Chen',
      email: 'marcus@luminabeauty.com',
      role: 'Product Manager',
      status: 'Active',
      lastLogin: '2024-02-14 3:45 PM',
      avatar: 'professional headshot of asian business man in suit with confident smile'
    },
    {
      id: '3',
      name: 'Sofia Patel',
      email: 'sofia@luminabeauty.com',
      role: 'Sales Manager',
      status: 'Active',
      lastLogin: '2024-02-13 9:15 AM',
      avatar: 'professional headshot of indian business woman with professional attire'
    },
    {
      id: '4',
      name: 'James Wilson',
      email: 'james@luminabeauty.com',
      role: 'Viewer',
      status: 'Pending',
      lastLogin: 'Never',
      avatar: 'professional headshot of caucasian business man with brown hair in business casual'
    }
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newInvite, setNewInvite] = useState({
    email: '',
    role: 'Viewer'
  });

  const roles = [
    { value: 'Admin', label: 'Admin', description: 'Full access to all features and settings' },
    { value: 'Product Manager', label: 'Product Manager', description: 'Manage products, inventory, and orders' },
    { value: 'Sales Manager', label: 'Sales Manager', description: 'View analytics, manage customer relationships' },
    { value: 'Viewer', label: 'Viewer', description: 'Read-only access to dashboards and reports' }
  ];

  const handleRoleChange = (memberId: string, newRole: string) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleStatusChange = (memberId: string, newStatus: 'Active' | 'Inactive' | 'Pending') => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, status: newStatus } : member
      )
    );
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleSendInvite = () => {
    if (newInvite.email) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: newInvite.email.split('@')[0],
        email: newInvite.email,
        role: newInvite.role,
        status: 'Pending',
        lastLogin: 'Never'
      };
      setTeamMembers(prev => [...prev, newMember]);
      setNewInvite({ email: '', role: 'Viewer' });
      setShowInviteModal(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Team Access Management</h3>
          <p className="text-gray-600 mt-1">Control who can access your Synergy portal and their permissions</p>
        </div>
        {isEditMode && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <div className="w-4 h-4 flex items-center justify-center inline-block mr-2">
              <i className="ri-user-add-line"></i>
            </div>
            Invite Member
          </button>
        )}
      </div>

      {/* Team Members Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Team Member</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
              {isEditMode && <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    {member.avatar ? (
                      <img
                        src={`https://readdy.ai/api/search-image?query=$%7Bmember.avatar%7D&width=40&height=40&seq=avatar-${member.id}&orientation=squarish`}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <i className="ri-user-line text-gray-500"></i>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {isEditMode ? (
                    <select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-8"
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  ) : (
                    <div>
                      <p className="font-medium text-gray-900">{member.role}</p>
                      <p className="text-xs text-gray-500">
                        {roles.find(r => r.value === member.role)?.description}
                      </p>
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">
                  {isEditMode && member.status !== 'Pending' ? (
                    <select
                      value={member.status}
                      onChange={(e) => handleStatusChange(member.id, e.target.value as 'Active' | 'Inactive' | 'Pending')}
                      className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-8"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(member.status)}`}>
                      {member.status}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {member.lastLogin}
                </td>
                {isEditMode && (
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {member.status === 'Pending' && (
                        <button className="text-blue-600 hover:text-blue-700 cursor-pointer">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-mail-send-line"></i>
                          </div>
                        </button>
                      )}
                      <button 
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-delete-bin-line"></i>
                        </div>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Descriptions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Permission Levels</h4>
          <div className="space-y-2">
            {roles.map((role) => (
              <div key={role.value} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{role.label}</p>
                  <p className="text-xs text-gray-600">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3">Security Notice</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Team members with Admin access can modify company settings</p>
            <p>• All access is logged and monitored for security</p>
            <p>• Inactive members can be reactivated at any time</p>
            <p>• Pending invitations expire after 7 days</p>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Invite Team Member</h4>
              <button
                onClick={() => setShowInviteModal(false)}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={newInvite.email}
                  onChange={(e) => setNewInvite(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="colleague@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={newInvite.role}
                  onChange={(e) => setNewInvite(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-8"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {roles.find(r => r.value === newInvite.role)?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvite}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
