import React, { useState } from 'react';
import { Search, UserPlus, UserMinus, Crown, Shield, Eye, Check, X, Mail, Phone, Users } from 'lucide-react';

interface Member {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'pending' | 'suspended' | 'inactive';
  joinDate: string;
  lastActivity: string;
  contributionTotal: number;
  attendanceRate: number;
  groupsCount: number;
  avatar: string;
}

interface MembershipRequest {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  requestDate: string;
  referredBy?: string;
}

export const MembershipManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'requests' | 'roles'>('members');
  
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      fullName: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      role: 'moderator',
      status: 'active',
      joinDate: '2024-12-01',
      lastActivity: '2025-01-14T10:30:00Z',
      contributionTotal: 450.00,
      attendanceRate: 92,
      groupsCount: 3,
      avatar: 'SJ'
    },
    {
      id: '2',
      fullName: 'Mike Wilson',
      email: 'mike.w@example.com',
      phone: '+1 (555) 234-5678',
      role: 'member',
      status: 'active',
      joinDate: '2024-11-15',
      lastActivity: '2025-01-14T08:15:00Z',
      contributionTotal: 275.50,
      attendanceRate: 87,
      groupsCount: 2,
      avatar: 'MW'
    },
    {
      id: '3',
      fullName: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'member',
      status: 'suspended',
      joinDate: '2024-10-20',
      lastActivity: '2025-01-10T16:45:00Z',
      contributionTotal: 125.00,
      attendanceRate: 45,
      groupsCount: 1,
      avatar: 'ED'
    },
    {
      id: '4',
      fullName: 'David Brown',
      email: 'david.b@example.com',
      phone: '+1 (555) 345-6789',
      role: 'member',
      status: 'pending',
      joinDate: '2025-01-12',
      lastActivity: '2025-01-12T14:20:00Z',
      contributionTotal: 0,
      attendanceRate: 0,
      groupsCount: 0,
      avatar: 'DB'
    }
  ]);

  const [membershipRequests, setMembershipRequests] = useState<MembershipRequest[]>([
    {
      id: '1',
      fullName: 'Alice Cooper',
      email: 'alice.c@example.com',
      phone: '+1 (555) 456-7890',
      message: 'I would love to join your community and contribute to the youth ministry programs.',
      requestDate: '2025-01-14T09:30:00Z',
      referredBy: 'Sarah Johnson'
    },
    {
      id: '2',
      fullName: 'Robert Taylor',
      email: 'robert.t@example.com',
      message: 'Interested in joining the community service initiatives.',
      requestDate: '2025-01-13T15:20:00Z'
    },
    {
      id: '3',
      fullName: 'Lisa Martinez',
      email: 'lisa.m@example.com',
      phone: '+1 (555) 567-8901',
      message: 'Looking forward to participating in group activities and events.',
      requestDate: '2025-01-12T11:45:00Z',
      referredBy: 'Mike Wilson'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | Member['role']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Member['status']>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleApproveRequest = (requestId: string) => {
    const request = membershipRequests.find(r => r.id === requestId);
    if (request) {
      const newMember: Member = {
        id: Date.now().toString(),
        fullName: request.fullName,
        email: request.email,
        phone: request.phone,
        role: 'member',
        status: 'active',
        joinDate: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        contributionTotal: 0,
        attendanceRate: 0,
        groupsCount: 1,
        avatar: request.fullName.split(' ').map(n => n[0]).join('')
      };
      setMembers([...members, newMember]);
      setMembershipRequests(membershipRequests.filter(r => r.id !== requestId));
    }
  };

  const handleRejectRequest = (requestId: string) => {
    setMembershipRequests(membershipRequests.filter(r => r.id !== requestId));
  };

  const handleUpdateMemberRole = (memberId: string, newRole: Member['role']) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  const handleUpdateMemberStatus = (memberId: string, newStatus: Member['status']) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, status: newStatus } : member
    ));
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'moderator': return 'bg-purple-100 text-purple-700';
      case 'member': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'moderator': return <Shield className="w-4 h-4" />;
      case 'member': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'active').length;
  const pendingRequests = membershipRequests.length;
  const suspendedMembers = members.filter(m => m.status === 'suspended').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Membership Management</h1>
        <p className="text-gray-600">Manage group members, roles, and membership requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
            </div>
            <Users className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-green-600">{activeMembers}</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
            </div>
            <UserPlus className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-red-600">{suspendedMembers}</p>
            </div>
            <UserMinus className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('members')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Members ({totalMembers})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Requests ({pendingRequests})
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'roles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Roles & Permissions
            </button>
          </nav>
        </div>
      </div>

      {/* Members Tab */}
      {activeTab === 'members' && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                </div>
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="member">Member</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">{member.avatar}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.fullName}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                            <div className="text-xs text-gray-400">
                              Joined {new Date(member.joinDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(member.role)}`}>
                            {getRoleIcon(member.role)}
                            <span className="ml-1">{member.role}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.attendanceRate}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${member.attendanceRate}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${member.contributionTotal.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedMember(member)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <select
                            value={member.role}
                            onChange={(e) => handleUpdateMemberRole(member.id, e.target.value as Member['role'])}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="member">Member</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            onClick={() => handleUpdateMemberStatus(
                              member.id, 
                              member.status === 'active' ? 'suspended' : 'active'
                            )}
                            className={member.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                          >
                            {member.status === 'active' ? <UserMinus className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Membership Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {membershipRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {request.fullName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.fullName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{request.email}</span>
                        </div>
                        {request.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{request.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
                    <p className="text-gray-600 text-sm">{request.message}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                    {request.referredBy && <span>Referred by: {request.referredBy}</span>}
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleApproveRequest(request.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {membershipRequests.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Requests</h3>
              <p className="text-gray-500">All membership requests have been processed.</p>
            </div>
          )}
        </div>
      )}

      {/* Roles & Permissions Tab */}
      {activeTab === 'roles' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Crown className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Admin</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Full control over group settings and members</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Manage all group settings</li>
              <li>• Add/remove members and moderators</li>
              <li>• Create and manage events</li>
              <li>• Access financial reports</li>
              <li>• Moderate all content</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Current Admins: {members.filter(m => m.role === 'admin').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Moderator</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Help manage content and member interactions</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Moderate posts and comments</li>
              <li>• Manage member disputes</li>
              <li>• Send group announcements</li>
              <li>• View member activity</li>
              <li>• Assist with events</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Current Moderators: {members.filter(m => m.role === 'moderator').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Member</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Standard group participation and access</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Participate in discussions</li>
              <li>• Attend group events</li>
              <li>• Access group resources</li>
              <li>• Use marketplace features</li>
              <li>• Receive notifications</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Current Members: {members.filter(m => m.role === 'member').length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Member Details</h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{selectedMember.avatar}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedMember.fullName}</h4>
                  <p className="text-gray-600">{selectedMember.email}</p>
                  {selectedMember.phone && <p className="text-gray-600">{selectedMember.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Role</h4>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedMember.role)}`}>
                    {getRoleIcon(selectedMember.role)}
                    <span className="ml-1">{selectedMember.role}</span>
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Status</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMember.status)}`}>
                    {selectedMember.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Join Date</h4>
                  <p className="text-gray-600">{new Date(selectedMember.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Last Activity</h4>
                  <p className="text-gray-600">{new Date(selectedMember.lastActivity).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedMember.attendanceRate}%</p>
                  <p className="text-xs text-blue-600">Attendance Rate</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">${selectedMember.contributionTotal}</p>
                  <p className="text-xs text-green-600">Total Contributions</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedMember.groupsCount}</p>
                  <p className="text-xs text-purple-600">Groups Joined</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Send Message
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  View Activity
                </button>
                <button
                  onClick={() => handleUpdateMemberStatus(
                    selectedMember.id, 
                    selectedMember.status === 'active' ? 'suspended' : 'active'
                  )}
                  className={`px-4 py-2 rounded-lg ${
                    selectedMember.status === 'active' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {selectedMember.status === 'active' ? 'Suspend' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};