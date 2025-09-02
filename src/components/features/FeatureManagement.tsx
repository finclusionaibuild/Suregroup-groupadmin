import React, { useState } from 'react';
import { Search, Plus, Settings, ToggleLeft, ToggleRight, TrendingUp, Eye, Edit } from 'lucide-react';
import { Feature } from '../../types';

export const FeatureManagement: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: '1',
      name: 'Enhanced Messaging',
      description: 'Advanced messaging features with file sharing and reactions',
      status: 'active',
      version: '2.1.0',
      rolloutPercentage: 100,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-10T00:00:00Z'
    },
    {
      id: '2',
      name: 'Marketplace V3',
      description: 'New marketplace with improved search and payment processing',
      status: 'beta',
      version: '3.0.0-beta',
      rolloutPercentage: 25,
      createdAt: '2025-01-05T00:00:00Z',
      updatedAt: '2025-01-14T00:00:00Z'
    },
    {
      id: '3',
      name: 'Dark Mode',
      description: 'Dark theme option for better user experience',
      status: 'inactive',
      version: '1.0.0',
      rolloutPercentage: 0,
      createdAt: '2025-01-12T00:00:00Z',
      updatedAt: '2025-01-12T00:00:00Z'
    },
    {
      id: '4',
      name: 'Legacy Chat System',
      description: 'Old chat system being phased out',
      status: 'deprecated',
      version: '1.5.0',
      rolloutPercentage: 5,
      createdAt: '2024-06-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'beta' | 'deprecated'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    version: '1.0.0',
    rolloutPercentage: 0
  });

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || feature.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateFeature = () => {
    const feature: Feature = {
      id: Date.now().toString(),
      ...newFeature,
      status: 'inactive',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setFeatures([feature, ...features]);
    setNewFeature({ name: '', description: '', version: '1.0.0', rolloutPercentage: 0 });
    setShowCreateModal(false);
  };

  const toggleFeatureStatus = (featureId: string) => {
    setFeatures(features.map(feature => 
      feature.id === featureId 
        ? { 
            ...feature, 
            status: feature.status === 'active' ? 'inactive' : 'active',
            rolloutPercentage: feature.status === 'active' ? 0 : 100,
            updatedAt: new Date().toISOString()
          }
        : feature
    ));
  };

  const updateRolloutPercentage = (featureId: string, percentage: number) => {
    setFeatures(features.map(feature => 
      feature.id === featureId 
        ? { ...feature, rolloutPercentage: percentage, updatedAt: new Date().toISOString() }
        : feature
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'beta': return 'bg-blue-100 text-blue-700';
      case 'deprecated': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const activeFeatures = features.filter(f => f.status === 'active').length;
  const betaFeatures = features.filter(f => f.status === 'beta').length;
  const avgRollout = features.length > 0 ? 
    Math.round(features.reduce((sum, f) => sum + f.rolloutPercentage, 0) / features.length) : 0;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Feature Management</h1>
        <p className="text-gray-600">Control feature rollouts and manage product capabilities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Features</p>
              <p className="text-2xl font-bold text-gray-900">{features.length}</p>
            </div>
            <Settings className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Features</p>
              <p className="text-2xl font-bold text-emerald-600">{activeFeatures}</p>
            </div>
            <ToggleRight className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Beta Features</p>
              <p className="text-2xl font-bold text-blue-600">{betaFeatures}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rollout</p>
              <p className="text-2xl font-bold text-purple-600">{avgRollout}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
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
                placeholder="Search features..."
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
            <option value="beta">Beta</option>
            <option value="deprecated">Deprecated</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Feature</span>
          </button>
        </div>
      </div>

      {/* Features Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rollout</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFeatures.map((feature) => (
                <tr key={feature.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                      <div className="text-sm text-gray-500">{feature.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feature.status)}`}>
                      {feature.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feature.version}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${feature.rolloutPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-10">{feature.rolloutPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(feature.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedFeature(feature)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleFeatureStatus(feature.id)}
                        className={feature.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-emerald-600 hover:text-emerald-900'}
                      >
                        {feature.status === 'active' ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Feature Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Feature</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feature Name</label>
                <input
                  type="text"
                  value={newFeature.name}
                  onChange={(e) => setNewFeature({...newFeature, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter feature name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the feature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                <input
                  type="text"
                  value={newFeature.version}
                  onChange={(e) => setNewFeature({...newFeature, version: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1.0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Rollout %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newFeature.rolloutPercentage}
                  onChange={(e) => setNewFeature({...newFeature, rolloutPercentage: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Details Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedFeature.name}</h3>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedFeature.status)}`}>
                {selectedFeature.status}
              </span>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedFeature.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Version</h4>
                  <p className="text-gray-600">{selectedFeature.version}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Rollout Percentage</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedFeature.rolloutPercentage}
                      onChange={(e) => updateRolloutPercentage(selectedFeature.id, parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-10">{selectedFeature.rolloutPercentage}%</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created</h4>
                  <p className="text-gray-600">{new Date(selectedFeature.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Last Updated</h4>
                  <p className="text-gray-600">{new Date(selectedFeature.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <button
                  onClick={() => toggleFeatureStatus(selectedFeature.id)}
                  className={`px-4 py-2 text-white rounded-lg ${
                    selectedFeature.status === 'active' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {selectedFeature.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Feature
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