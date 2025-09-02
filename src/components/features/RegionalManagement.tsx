import React, { useState } from 'react';
import { Search, Plus, Globe, Users, Database, Settings, Edit, Trash2, Eye } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  code: string;
  timezone: string;
  currency: string;
  language: string;
  adminCount: number;
  userCount: number;
  status: 'active' | 'inactive';
  databaseUrl: string;
  createdAt: string;
}

export const RegionalManagement: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([
    {
      id: '1',
      name: 'North America',
      code: 'NA',
      timezone: 'America/New_York',
      currency: 'USD',
      language: 'English',
      adminCount: 12,
      userCount: 15420,
      status: 'active',
      databaseUrl: 'postgresql://na-db.suregroups.com',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Europe',
      code: 'EU',
      timezone: 'Europe/London',
      currency: 'EUR',
      language: 'English',
      adminCount: 8,
      userCount: 9850,
      status: 'active',
      databaseUrl: 'postgresql://eu-db.suregroups.com',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: '3',
      name: 'Asia Pacific',
      code: 'APAC',
      timezone: 'Asia/Singapore',
      currency: 'USD',
      language: 'English',
      adminCount: 6,
      userCount: 7230,
      status: 'active',
      databaseUrl: 'postgresql://apac-db.suregroups.com',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: '4',
      name: 'Latin America',
      code: 'LATAM',
      timezone: 'America/Sao_Paulo',
      currency: 'USD',
      language: 'Spanish',
      adminCount: 4,
      userCount: 3450,
      status: 'inactive',
      databaseUrl: 'postgresql://latam-db.suregroups.com',
      createdAt: '2025-01-01T00:00:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);

  const [newRegion, setNewRegion] = useState({
    name: '',
    code: '',
    timezone: 'UTC',
    currency: 'USD',
    language: 'English',
    databaseUrl: ''
  });

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Sao_Paulo',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Singapore',
    'Australia/Sydney'
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'BRL', 'MXN'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Japanese', 'Chinese'];

  const filteredRegions = regions.filter(region => {
    const matchesSearch = region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         region.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || region.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddRegion = () => {
    const region: Region = {
      id: Date.now().toString(),
      ...newRegion,
      adminCount: 0,
      userCount: 0,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    setRegions([...regions, region]);
    setNewRegion({ name: '', code: '', timezone: 'UTC', currency: 'USD', language: 'English', databaseUrl: '' });
    setShowAddModal(false);
  };

  const handleUpdateRegion = (updatedRegion: Region) => {
    setRegions(regions.map(region => region.id === updatedRegion.id ? updatedRegion : region));
    setEditingRegion(null);
  };

  const handleDeleteRegion = (regionId: string) => {
    setRegions(regions.filter(region => region.id !== regionId));
  };

  const toggleRegionStatus = (regionId: string) => {
    setRegions(regions.map(region => 
      region.id === regionId 
        ? { ...region, status: region.status === 'active' ? 'inactive' : 'active' }
        : region
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalUsers = regions.reduce((sum, region) => sum + region.userCount, 0);
  const totalAdmins = regions.reduce((sum, region) => sum + region.adminCount, 0);
  const activeRegions = regions.filter(r => r.status === 'active').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Regional Management</h1>
        <p className="text-gray-600">Manage regional settings, databases, and assignments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Regions</p>
              <p className="text-2xl font-bold text-gray-900">{regions.length}</p>
            </div>
            <Globe className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Regions</p>
              <p className="text-2xl font-bold text-emerald-600">{activeRegions}</p>
            </div>
            <Globe className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">{totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Admins</p>
              <p className="text-2xl font-bold text-purple-600">{totalAdmins}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Region</span>
          </button>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRegions.map((region) => (
          <div key={region.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{region.name}</h3>
                  <p className="text-sm text-gray-500">{region.code}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(region.status)}`}>
                {region.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Timezone:</span>
                <span className="text-gray-900">{region.timezone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Currency:</span>
                <span className="text-gray-900">{region.currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Language:</span>
                <span className="text-gray-900">{region.language}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Users:</span>
                <span className="text-gray-900">{region.userCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Admins:</span>
                <span className="text-gray-900">{region.adminCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedRegion(region)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingRegion(region)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteRegion(region.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => toggleRegionStatus(region.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  region.status === 'active' 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                }`}
              >
                {region.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Region Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Region</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region Name</label>
                <input
                  type="text"
                  value={newRegion.name}
                  onChange={(e) => setNewRegion({...newRegion, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., North America"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region Code</label>
                <input
                  type="text"
                  value={newRegion.code}
                  onChange={(e) => setNewRegion({...newRegion, code: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., NA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={newRegion.timezone}
                  onChange={(e) => setNewRegion({...newRegion, timezone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={newRegion.currency}
                  onChange={(e) => setNewRegion({...newRegion, currency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={newRegion.language}
                  onChange={(e) => setNewRegion({...newRegion, language: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Database URL</label>
                <input
                  type="text"
                  value={newRegion.databaseUrl}
                  onChange={(e) => setNewRegion({...newRegion, databaseUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="postgresql://region-db.suregroups.com"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRegion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Region
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Region Details Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedRegion.name} Details</h3>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Region Code</h4>
                  <p className="text-gray-600">{selectedRegion.code}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Status</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRegion.status)}`}>
                    {selectedRegion.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Timezone</h4>
                  <p className="text-gray-600">{selectedRegion.timezone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Currency</h4>
                  <p className="text-gray-600">{selectedRegion.currency}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Language</h4>
                  <p className="text-gray-600">{selectedRegion.language}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created</h4>
                  <p className="text-gray-600">{new Date(selectedRegion.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Database Connection</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-gray-500" />
                    <code className="text-sm text-gray-700">{selectedRegion.databaseUrl}</code>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-medium text-blue-900">Users</h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{selectedRegion.userCount.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h4 className="text-sm font-medium text-purple-900">Admins</h4>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{selectedRegion.adminCount}</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Switch to Region
                </button>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  Assign Admins
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};