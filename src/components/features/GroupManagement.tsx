import React, { useEffect, useState } from 'react';
import { Search, Users, Calendar, Settings, Eye, Edit, Trash2 } from 'lucide-react';
import { GroupData } from '../../types';

export const GroupManagement: React.FC = () => {
  const [groups, setGroups] = useState<GroupData[]>([
    {
      id: '1',
      name: 'Community Church',
      description: 'Main church community group for worship and fellowship',
      type: 'church',
      memberCount: 245,
      status: 'active',
      createdBy: 'Pastor John',
      createdAt: '2025-01-01T00:00:00Z',
      profileImage: 'https://images.pexels.com/photos/208359/pexels-photo-208359.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '2',
      name: 'Youth Ministry',
      description: 'Youth group for teenagers and young adults',
      type: 'church',
      memberCount: 67,
      status: 'active',
      createdBy: 'Youth Pastor Sarah',
      createdAt: '2025-01-05T00:00:00Z',
      profileImage: 'https://images.pexels.com/photos/1682499/pexels-photo-1682499.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '3',
      name: 'Local Union Chapter',
      description: 'Workers union for local manufacturing employees',
      type: 'union',
      memberCount: 156,
      status: 'active',
      createdBy: 'Union Rep Mike',
      createdAt: '2025-01-10T00:00:00Z',
      profileImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ]);

  // Persist groups to localStorage and hydrate on load
  useEffect(() => {
    try {
      const raw = localStorage.getItem('groups');
      if (raw) {
        const parsed = JSON.parse(raw) as GroupData[];
        if (Array.isArray(parsed)) {
          setGroups(parsed);
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('groups', JSON.stringify(groups));
    } catch {}
  }, [groups]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'church' | 'union' | 'association' | 'community'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || group.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || group.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  const toggleGroupStatus = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, status: group.status === 'active' ? 'inactive' : 'active' }
        : group
    ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'church': return 'bg-blue-100 text-blue-700';
      case 'union': return 'bg-red-100 text-red-700';
      case 'association': return 'bg-purple-100 text-purple-700';
      case 'community': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalMembers = groups.reduce((sum, group) => sum + group.memberCount, 0);
  const activeGroups = groups.filter(g => g.status === 'active').length;

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    const letters = parts.slice(0, 2).map(p => p[0]).join('');
    return letters.toUpperCase();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Group Management</h1>
        <p className="text-gray-600">Manage community groups</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Groups</p>
              <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
            </div>
            <Users className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Groups</p>
              <p className="text-2xl font-bold text-emerald-600">{activeGroups}</p>
            </div>
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-blue-600">{totalMembers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Members/Group</p>
              <p className="text-2xl font-bold text-purple-600">
                {groups.length > 0 ? Math.round(totalMembers / groups.length) : 0}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="church">Church</option>
            <option value="union">Union</option>
            <option value="association">Association</option>
            <option value="community">Community</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              {group.profileImage ? (
                <img src={group.profileImage} alt={`${group.name} profile`} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
                  {getInitials(group.name)}
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(group.status)}`}>
                  {group.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(group.type)}`}>
                  {group.type}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(group.status)}`}>
                  {group.status}
                </span>
              </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{group.memberCount} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(group.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="text-xs text-gray-400 mb-4">
              Created by {group.createdBy}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedGroup(group)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteGroup(group.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => toggleGroupStatus(group.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  group.status === 'active' 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                }`}
              >
                {group.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>

      

      {/* Group Details Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedGroup!.name}</h3>
              <button
                onClick={() => setSelectedGroup(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedGroup!.type)}`}>
                  {selectedGroup!.type}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedGroup!.status)}`}>
                  {selectedGroup!.status}
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedGroup!.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Members</h4>
                  <p className="text-gray-600">{selectedGroup!.memberCount}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created By</h4>
                  <p className="text-gray-600">{selectedGroup!.createdBy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created Date</h4>
                  <p className="text-gray-600">{new Date(selectedGroup!.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Status</h4>
                  <p className="text-gray-600 capitalize">{selectedGroup!.status}</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Manage Members
                </button>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  View Events
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Group Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};