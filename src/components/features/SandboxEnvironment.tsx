import React, { useState } from 'react';
import { Play, Code, Copy, Check, Settings, Database, Zap, AlertCircle, DollarSign, Users } from 'lucide-react';

interface SandboxRequest {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  headers: Record<string, string>;
  body?: string;
  timestamp: string;
}

interface SandboxResponse {
  id: string;
  requestId: string;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  responseTime: number;
  timestamp: string;
}

export const SandboxEnvironment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'console' | 'history' | 'mock-data'>('console');
  const [selectedMethod, setSelectedMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [endpoint, setEndpoint] = useState('/api/v1/users/user_123');
  const [requestBody, setRequestBody] = useState('');
  const [headers, setHeaders] = useState('{\n  "Authorization": "Bearer your-api-key",\n  "Content-Type": "application/json"\n}');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [requests, setRequests] = useState<SandboxRequest[]>([
    {
      id: '1',
      method: 'GET',
      endpoint: '/api/v1/users/user_123',
      headers: { 'Authorization': 'Bearer sk_test_123', 'Content-Type': 'application/json' },
      timestamp: '2025-01-14T10:30:00Z'
    },
    {
      id: '2',
      method: 'POST',
      endpoint: '/api/v1/transactions',
      headers: { 'Authorization': 'Bearer sk_test_123', 'Content-Type': 'application/json' },
      body: '{"amount": 100.00, "currency": "USD", "description": "Test payment"}',
      timestamp: '2025-01-14T09:15:00Z'
    }
  ]);

  const [responses, setResponses] = useState<SandboxResponse[]>([
    {
      id: '1',
      requestId: '1',
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json', 'X-RateLimit-Remaining': '999' },
      body: '{\n  "id": "user_123",\n  "fullName": "John Doe",\n  "email": "john@example.com",\n  "role": "member"\n}',
      responseTime: 142,
      timestamp: '2025-01-14T10:30:01Z'
    },
    {
      id: '2',
      requestId: '2',
      status: 201,
      statusText: 'Created',
      headers: { 'Content-Type': 'application/json', 'X-RateLimit-Remaining': '998' },
      body: '{\n  "id": "txn_456",\n  "amount": 100.00,\n  "status": "pending",\n  "createdAt": "2025-01-14T09:15:00Z"\n}',
      responseTime: 89,
      timestamp: '2025-01-14T09:15:01Z'
    }
  ]);

  const [currentResponse, setCurrentResponse] = useState<SandboxResponse | null>(responses[0]);

  const mockData = {
    users: [
      { id: 'user_123', name: 'John Doe', email: 'john@example.com', role: 'member' },
      { id: 'user_456', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
      { id: 'user_789', name: 'Bob Wilson', email: 'bob@example.com', role: 'moderator' }
    ],
    groups: [
      { id: 'group_123', name: 'Community Church', type: 'church', memberCount: 245 },
      { id: 'group_456', name: 'Youth Ministry', type: 'church', memberCount: 67 },
      { id: 'group_789', name: 'Local Union', type: 'union', memberCount: 156 }
    ],
    transactions: [
      { id: 'txn_123', amount: 100.00, currency: 'USD', status: 'completed' },
      { id: 'txn_456', amount: 50.00, currency: 'USD', status: 'pending' },
      { id: 'txn_789', amount: 25.50, currency: 'USD', status: 'failed' }
    ]
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const request: SandboxRequest = {
      id: Date.now().toString(),
      method: selectedMethod,
      endpoint,
      headers: JSON.parse(headers),
      body: requestBody || undefined,
      timestamp: new Date().toISOString()
    };

    const response: SandboxResponse = {
      id: Date.now().toString(),
      requestId: request.id,
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json', 'X-RateLimit-Remaining': '999' },
      body: JSON.stringify({
        message: 'Sandbox response',
        endpoint: endpoint,
        method: selectedMethod,
        timestamp: new Date().toISOString()
      }, null, 2),
      responseTime: Math.floor(Math.random() * 200) + 50,
      timestamp: new Date().toISOString()
    };

    setRequests([request, ...requests]);
    setResponses([response, ...responses]);
    setCurrentResponse(response);
    setIsLoading(false);
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 400 && status < 500) return 'text-orange-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sandbox Environment</h1>
        <p className="text-gray-600">Test API calls safely with mock data</p>
      </div>

      {/* Sandbox Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Sandbox Mode</h3>
            <p className="text-xs text-blue-700">
              You're in a safe testing environment. All API calls use mock data and won't affect production.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('console')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'console'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              API Console
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Request History
            </button>
            <button
              onClick={() => setActiveTab('mock-data')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'mock-data'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mock Data
            </button>
          </nav>
        </div>
      </div>

      {/* API Console Tab */}
      {activeTab === 'console' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Builder</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">HTTP Method</label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endpoint</label>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/api/v1/users/{id}"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Headers</label>
                <textarea
                  value={headers}
                  onChange={(e) => setHeaders(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  rows={4}
                />
              </div>

              {(selectedMethod === 'POST' || selectedMethod === 'PUT') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Request Body</label>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    rows={6}
                    placeholder='{\n  "key": "value"\n}'
                  />
                </div>
              )}

              <button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Response</h2>
            
            {currentResponse ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className={`text-lg font-bold ${getStatusColor(currentResponse.status)}`}>
                    {currentResponse.status} {currentResponse.statusText}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentResponse.responseTime}ms
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Response Headers</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <pre className="text-xs text-gray-700">
                      {JSON.stringify(currentResponse.headers, null, 2)}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">Response Body</h4>
                    <button
                      onClick={() => copyCode(currentResponse.body, 'response')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {copiedCode === 'response' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{currentResponse.body}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Send a request to see the response</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Request History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Request History</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {requests.map((request) => {
              const response = responses.find(r => r.requestId === request.id);
              return (
                <div key={request.id} className="p-6 hover:bg-gray-50 cursor-pointer" onClick={() => setCurrentResponse(response || null)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        request.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                        request.method === 'POST' ? 'bg-green-100 text-green-700' :
                        request.method === 'PUT' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {request.method}
                      </span>
                      <code className="text-sm text-gray-700">{request.endpoint}</code>
                    </div>
                    <div className="flex items-center space-x-4">
                      {response && (
                        <span className={`text-sm font-medium ${getStatusColor(response.status)}`}>
                          {response.status}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(request.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mock Data Tab */}
      {activeTab === 'mock-data' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Users</h3>
            </div>
            <div className="space-y-2">
              {mockData.users.map((user) => (
                <div key={user.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email} • {user.role}</div>
                  <code className="text-xs text-blue-600">{user.id}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Groups</h3>
            </div>
            <div className="space-y-2">
              {mockData.groups.map((group) => (
                <div key={group.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">{group.name}</div>
                  <div className="text-xs text-gray-500">{group.type} • {group.memberCount} members</div>
                  <code className="text-xs text-blue-600">{group.id}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
            </div>
            <div className="space-y-2">
              {mockData.transactions.map((transaction) => (
                <div key={transaction.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">${transaction.amount}</div>
                  <div className="text-xs text-gray-500">{transaction.currency} • {transaction.status}</div>
                  <code className="text-xs text-blue-600">{transaction.id}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};