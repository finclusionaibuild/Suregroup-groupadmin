import React, { useState } from 'react';
import { Key, Plus, Eye, EyeOff, Copy, Check, Trash2, Shield, Clock, AlertTriangle, BarChart3, TrendingUp, X } from 'lucide-react';
import { APIKey } from '../../types';

export const APIKeyManagement: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_prod_1234567890abcdef',
      permissions: ['users:read', 'groups:read', 'transactions:read'],
      status: 'active',
      createdAt: '2025-01-01T00:00:00Z',
      lastUsed: '2025-01-14T10:30:00Z',
      expiresAt: '2025-12-31T23:59:59Z'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk_dev_abcdef1234567890',
      permissions: ['users:read', 'groups:read'],
      status: 'active',
      createdAt: '2025-01-10T00:00:00Z',
      lastUsed: '2025-01-14T08:15:00Z'
    },
    {
      id: '3',
      name: 'Testing Key (Revoked)',
      key: 'sk_test_revoked123456',
      permissions: ['users:read'],
      status: 'revoked',
      createdAt: '2025-01-05T00:00:00Z',
      lastUsed: '2025-01-08T16:45:00Z'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  const [newKey, setNewKey] = useState({
    name: '',
    permissions: [] as string[],
    expiresAt: ''
  });

  const availablePermissions = [
    { id: 'users:read', name: 'Read Users', description: 'View user information' },
    { id: 'users:write', name: 'Write Users', description: 'Create and update users' },
    { id: 'groups:read', name: 'Read Groups', description: 'View group information' },
    { id: 'groups:write', name: 'Write Groups', description: 'Create and update groups' },
    { id: 'transactions:read', name: 'Read Transactions', description: 'View transaction data' },
    { id: 'transactions:write', name: 'Write Transactions', description: 'Process transactions' },
    { id: 'events:read', name: 'Read Events', description: 'View event information' },
    { id: 'events:write', name: 'Write Events', description: 'Create and manage events' },
    { id: 'marketplace:read', name: 'Read Marketplace', description: 'View marketplace data' },
    { id: 'marketplace:write', name: 'Write Marketplace', description: 'Manage marketplace items' }
  ];

  const handleCreateKey = () => {
    const key: APIKey = {
      id: Date.now().toString(),
      ...newKey,
      key: `sk_${newKey.name.toLowerCase().includes('prod') ? 'prod' : 'dev'}_${Math.random().toString(36).substr(2, 16)}`,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    setApiKeys([key, ...apiKeys]);
    setNewKey({ name: '', permissions: [], expiresAt: '' });
    setShowCreateModal(false);
  };

  const handleRevokeKey = (keyId: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? { ...key, status: 'revoked' } : key
    ));
  };

  const handleDeleteKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '•'.repeat(8) + key.substring(key.length - 4);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'revoked': return 'bg-red-100 text-red-700';
      case 'expired': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Check className="w-4 h-4" />;
      case 'revoked': return <X className="w-4 h-4" />;
      case 'expired': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const activeKeys = apiKeys.filter(key => key.status === 'active').length;
  const totalRequests = 12400; // Mock data
  const lastMonthUsage = 8900; // Mock data

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">API Key Management</h1>
        <p className="text-gray-600">Generate and manage API keys for secure platform access</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Keys</p>
              <p className="text-2xl font-bold text-green-600">{activeKeys}</p>
            </div>
            <Key className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Keys</p>
              <p className="text-2xl font-bold text-gray-900">{apiKeys.length}</p>
            </div>
            <Shield className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-blue-600">{totalRequests.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Growth</p>
              <p className="text-2xl font-bold text-purple-600">+39%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* API Keys List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your API Keys</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New Key</span>
          </button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(apiKey.status)}`}>
                      {getStatusIcon(apiKey.status)}
                      <span className="ml-1">{apiKey.status}</span>
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-700">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {visibleKeys.has(apiKey.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {copiedKey === apiKey.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Created</p>
                      <p className="text-sm text-gray-600">{new Date(apiKey.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Last Used</p>
                      <p className="text-sm text-gray-600">
                        {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Expires</p>
                      <p className="text-sm text-gray-600">
                        {apiKey.expiresAt ? new Date(apiKey.expiresAt).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.map((permission, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {apiKey.status === 'active' && (
                    <button
                      onClick={() => handleRevokeKey(apiKey.id)}
                      className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Revoke</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteKey(apiKey.id)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          <div>
            <h3 className="text-sm font-medium text-yellow-900">Security Best Practices</h3>
            <p className="text-xs text-yellow-700">
              Keep your API keys secure. Never share them publicly or commit them to version control. 
              Rotate keys regularly and use the minimum required permissions.
            </p>
          </div>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate New API Key</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                <input
                  type="text"
                  value={newKey.name}
                  onChange={(e) => setNewKey({...newKey, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Production API Key"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availablePermissions.map(permission => (
                    <label key={permission.id} className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        checked={newKey.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKey({...newKey, permissions: [...newKey.permissions, permission.id]});
                          } else {
                            setNewKey({...newKey, permissions: newKey.permissions.filter(p => p !== permission.id)});
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                      />
                      <div>
                        <span className="text-sm text-gray-700">{permission.name}</span>
                        <p className="text-xs text-gray-500">{permission.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date (Optional)</label>
                <input
                  type="date"
                  value={newKey.expiresAt}
                  onChange={(e) => setNewKey({...newKey, expiresAt: e.target.value})}
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
                onClick={handleCreateKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};