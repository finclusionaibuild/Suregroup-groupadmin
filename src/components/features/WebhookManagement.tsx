import React, { useState } from 'react';
import { Plus, Zap, Eye, Edit, Trash2, Play, Check, X, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'failed';
  secret: string;
  createdAt: string;
  lastDelivery?: string;
  deliveryCount: number;
  failureCount: number;
}

interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: string;
  status: 'success' | 'failed' | 'pending';
  responseCode?: number;
  responseTime?: number;
  timestamp: string;
  payload: string;
  response?: string;
  retryCount: number;
}

export const WebhookManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'webhooks' | 'deliveries' | 'events'>('webhooks');
  
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: '1',
      name: 'Production Webhook',
      url: 'https://myapp.com/webhooks/suregroups',
      events: ['user.created', 'transaction.completed', 'group.member_added'],
      status: 'active',
      secret: 'whsec_1234567890abcdef',
      createdAt: '2025-01-01T00:00:00Z',
      lastDelivery: '2025-01-14T10:30:00Z',
      deliveryCount: 1247,
      failureCount: 12
    },
    {
      id: '2',
      name: 'Development Webhook',
      url: 'https://dev.myapp.com/webhooks',
      events: ['user.created', 'user.updated'],
      status: 'active',
      secret: 'whsec_dev_abcdef123456',
      createdAt: '2025-01-10T00:00:00Z',
      lastDelivery: '2025-01-14T09:15:00Z',
      deliveryCount: 89,
      failureCount: 3
    },
    {
      id: '3',
      name: 'Failed Webhook',
      url: 'https://oldapp.com/webhook',
      events: ['transaction.failed'],
      status: 'failed',
      secret: 'whsec_old_123456789',
      createdAt: '2025-01-05T00:00:00Z',
      lastDelivery: '2025-01-12T16:45:00Z',
      deliveryCount: 45,
      failureCount: 45
    }
  ]);

  const [deliveries] = useState<WebhookDelivery[]>([
    {
      id: '1',
      webhookId: '1',
      event: 'user.created',
      status: 'success',
      responseCode: 200,
      responseTime: 142,
      timestamp: '2025-01-14T10:30:00Z',
      payload: '{"event": "user.created", "data": {"id": "user_123", "email": "john@example.com"}}',
      response: '{"received": true}',
      retryCount: 0
    },
    {
      id: '2',
      webhookId: '1',
      event: 'transaction.completed',
      status: 'failed',
      responseCode: 500,
      responseTime: 5000,
      timestamp: '2025-01-14T09:15:00Z',
      payload: '{"event": "transaction.completed", "data": {"id": "txn_456", "amount": 100.00}}',
      response: '{"error": "Internal server error"}',
      retryCount: 3
    },
    {
      id: '3',
      webhookId: '2',
      event: 'user.updated',
      status: 'success',
      responseCode: 200,
      responseTime: 89,
      timestamp: '2025-01-14T08:45:00Z',
      payload: '{"event": "user.updated", "data": {"id": "user_789", "changes": ["email"]}}',
      response: '{"received": true}',
      retryCount: 0
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<WebhookDelivery | null>(null);

  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[],
    secret: ''
  });

  const availableEvents = [
    'user.created',
    'user.updated',
    'user.deleted',
    'group.created',
    'group.member_added',
    'group.member_removed',
    'transaction.created',
    'transaction.completed',
    'transaction.failed',
    'event.created',
    'event.updated',
    'marketplace.order_created',
    'marketplace.order_completed'
  ];

  const handleCreateWebhook = () => {
    const webhook: Webhook = {
      id: Date.now().toString(),
      ...newWebhook,
      secret: newWebhook.secret || `whsec_${Math.random().toString(36).substr(2, 16)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      deliveryCount: 0,
      failureCount: 0
    };
    setWebhooks([webhook, ...webhooks]);
    setNewWebhook({ name: '', url: '', events: [], secret: '' });
    setShowCreateModal(false);
  };

  const handleTestWebhook = async (webhookId: string) => {
    const webhook = webhooks.find(w => w.id === webhookId);
    if (!webhook) return;

    // Simulate webhook test
    alert(`Testing webhook: ${webhook.name}\nSending test payload to ${webhook.url}`);
  };

  const handleDeleteWebhook = (webhookId: string) => {
    setWebhooks(webhooks.filter(w => w.id !== webhookId));
  };

  const toggleWebhookStatus = (webhookId: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === webhookId 
        ? { ...webhook, status: webhook.status === 'active' ? 'inactive' : 'active' }
        : webhook
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <Check className="w-4 h-4" />;
      case 'failed': return <X className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const activeWebhooks = webhooks.filter(w => w.status === 'active').length;
  const totalDeliveries = webhooks.reduce((sum, w) => sum + w.deliveryCount, 0);
  const totalFailures = webhooks.reduce((sum, w) => sum + w.failureCount, 0);
  const successRate = totalDeliveries > 0 ? (((totalDeliveries - totalFailures) / totalDeliveries) * 100).toFixed(1) : '100';

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Webhook Management</h1>
        <p className="text-gray-600">Configure and monitor webhook endpoints for real-time notifications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Webhooks</p>
              <p className="text-2xl font-bold text-green-600">{activeWebhooks}</p>
            </div>
            <Zap className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
              <p className="text-2xl font-bold text-blue-600">{totalDeliveries}</p>
            </div>
            <Check className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-purple-600">{successRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed Deliveries</p>
              <p className="text-2xl font-bold text-red-600">{totalFailures}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('webhooks')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'webhooks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Webhooks ({webhooks.length})
            </button>
            <button
              onClick={() => setActiveTab('deliveries')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'deliveries'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Delivery Logs ({deliveries.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Available Events
            </button>
          </nav>
        </div>
      </div>

      {/* Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Your Webhooks</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Webhook</span>
            </button>
          </div>

          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(webhook.status)}`}>
                        {webhook.status}
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <code className="text-sm text-gray-700">{webhook.url}</code>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Events</p>
                      <div className="flex flex-wrap gap-1">
                        {webhook.events.map((event, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Deliveries</p>
                        <p className="font-medium text-gray-900">{webhook.deliveryCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Failures</p>
                        <p className="font-medium text-red-600">{webhook.failureCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Success Rate</p>
                        <p className="font-medium text-green-600">
                          {webhook.deliveryCount > 0 ? (((webhook.deliveryCount - webhook.failureCount) / webhook.deliveryCount) * 100).toFixed(1) : '100'}%
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedWebhook(webhook)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleTestWebhook(webhook.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWebhookStatus(webhook.id)}
                      className={webhook.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                    >
                      {webhook.status === 'active' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDeleteWebhook(webhook.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delivery Logs Tab */}
      {activeTab === 'deliveries' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Webhook</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deliveries.map((delivery) => {
                  const webhook = webhooks.find(w => w.id === delivery.webhookId);
                  return (
                    <tr key={delivery.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{delivery.event}</div>
                        {delivery.retryCount > 0 && (
                          <div className="text-xs text-orange-600">Retry #{delivery.retryCount}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{webhook?.name}</div>
                        <div className="text-xs text-gray-500">{webhook?.url}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getDeliveryStatusColor(delivery.status)}`}>
                          {getStatusIcon(delivery.status)}
                          <span className="ml-1">{delivery.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {delivery.responseCode && `${delivery.responseCode}`}
                        </div>
                        <div className="text-xs text-gray-500">
                          {delivery.responseTime && `${delivery.responseTime}ms`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(delivery.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedDelivery(delivery)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available Events Tab */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Webhook Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableEvents.map((event) => (
              <div key={event} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <code className="text-sm font-medium text-gray-900">{event}</code>
                </div>
                <p className="text-xs text-gray-500">
                  {event.includes('user') && 'Triggered when user actions occur'}
                  {event.includes('group') && 'Triggered when group actions occur'}
                  {event.includes('transaction') && 'Triggered when transaction actions occur'}
                  {event.includes('event') && 'Triggered when event actions occur'}
                  {event.includes('marketplace') && 'Triggered when marketplace actions occur'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Webhook Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Webhook</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Production Webhook"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint URL</label>
                <input
                  type="url"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://your-app.com/webhooks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Events</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableEvents.map(event => (
                    <label key={event} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newWebhook.events.includes(event)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewWebhook({...newWebhook, events: [...newWebhook.events, event]});
                          } else {
                            setNewWebhook({...newWebhook, events: newWebhook.events.filter(e => e !== event)});
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secret (Optional)</label>
                <input
                  type="text"
                  value={newWebhook.secret}
                  onChange={(e) => setNewWebhook({...newWebhook, secret: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Auto-generated if empty"
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
                onClick={handleCreateWebhook}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Webhook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Details Modal */}
      {selectedWebhook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedWebhook.name}</h3>
              <button
                onClick={() => setSelectedWebhook(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Endpoint URL</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <code className="text-sm text-gray-700">{selectedWebhook.url}</code>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Webhook Secret</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <code className="text-sm text-gray-700">{selectedWebhook.secret}</code>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Subscribed Events</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedWebhook.events.map((event, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created</h4>
                  <p className="text-gray-600">{new Date(selectedWebhook.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Last Delivery</h4>
                  <p className="text-gray-600">
                    {selectedWebhook.lastDelivery ? new Date(selectedWebhook.lastDelivery).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <button
                  onClick={() => handleTestWebhook(selectedWebhook.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Test Webhook
                </button>
                <button
                  onClick={() => toggleWebhookStatus(selectedWebhook.id)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedWebhook.status === 'active' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {selectedWebhook.status === 'active' ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Details Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Details</h3>
              <button
                onClick={() => setSelectedDelivery(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Request Payload</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{JSON.stringify(JSON.parse(selectedDelivery.payload), null, 2)}</code>
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Response</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className={`text-sm overflow-x-auto ${
                    selectedDelivery.status === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <code>{selectedDelivery.response || 'No response'}</code>
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Status</h4>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getDeliveryStatusColor(selectedDelivery.status)}`}>
                  {getStatusIcon(selectedDelivery.status)}
                  <span className="ml-1">{selectedDelivery.status}</span>
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Response Time</h4>
                <p className="text-gray-600">{selectedDelivery.responseTime}ms</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};