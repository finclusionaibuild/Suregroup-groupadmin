import React, { useState } from 'react';
import { Search, Play, Code, Copy, Check, Filter, Book, Zap, DollarSign, Users } from 'lucide-react';
import { APIEndpoint } from '../../types';

export const EndpointExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [testRequest, setTestRequest] = useState({
    parameters: {} as Record<string, string>,
    headers: '{\n  "Authorization": "Bearer your-api-key",\n  "Content-Type": "application/json"\n}',
    body: ''
  });
  const [testResponse, setTestResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints: APIEndpoint[] = [
    {
      id: '1',
      name: 'Get User Profile',
      method: 'GET',
      path: '/api/v1/users/{id}',
      description: 'Retrieve detailed information about a specific user',
      category: 'Users',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'User ID' }
      ],
      responseExample: `{
  "id": "user_123",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "member",
  "createdAt": "2025-01-01T00:00:00Z"
}`
    },
    {
      id: '2',
      name: 'List Users',
      method: 'GET',
      path: '/api/v1/users',
      description: 'Get a paginated list of users',
      category: 'Users',
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Page number (default: 1)' },
        { name: 'limit', type: 'integer', required: false, description: 'Items per page (default: 20)' },
        { name: 'role', type: 'string', required: false, description: 'Filter by user role' }
      ],
      responseExample: `{
  "data": [
    {
      "id": "user_123",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "member"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156
  }
}`
    },
    {
      id: '3',
      name: 'Create User',
      method: 'POST',
      path: '/api/v1/users',
      description: 'Create a new user account',
      category: 'Users',
      parameters: [
        { name: 'fullName', type: 'string', required: true, description: 'User full name' },
        { name: 'email', type: 'string', required: true, description: 'User email address' },
        { name: 'role', type: 'string', required: true, description: 'User role (member, admin, etc.)' }
      ],
      responseExample: `{
  "id": "user_456",
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "role": "member",
  "createdAt": "2025-01-14T10:30:00Z"
}`
    },
    {
      id: '4',
      name: 'List Groups',
      method: 'GET',
      path: '/api/v1/groups',
      description: 'Get a list of all groups with pagination',
      category: 'Groups',
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Page number (default: 1)' },
        { name: 'limit', type: 'integer', required: false, description: 'Items per page (default: 20)' },
        { name: 'type', type: 'string', required: false, description: 'Filter by group type' }
      ],
      responseExample: `{
  "data": [
    {
      "id": "group_123",
      "name": "Community Church",
      "type": "church",
      "memberCount": 245
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156
  }
}`
    },
    {
      id: '5',
      name: 'Create Group',
      method: 'POST',
      path: '/api/v1/groups',
      description: 'Create a new group',
      category: 'Groups',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Group name' },
        { name: 'description', type: 'string', required: true, description: 'Group description' },
        { name: 'type', type: 'string', required: true, description: 'Group type (church, union, etc.)' }
      ],
      responseExample: `{
  "id": "group_456",
  "name": "New Community Group",
  "type": "community",
  "memberCount": 0,
  "createdAt": "2025-01-14T10:30:00Z"
}`
    },
    {
      id: '6',
      name: 'Create Transaction',
      method: 'POST',
      path: '/api/v1/transactions',
      description: 'Process a new transaction through SureBanker',
      category: 'Transactions',
      parameters: [
        { name: 'amount', type: 'number', required: true, description: 'Transaction amount' },
        { name: 'currency', type: 'string', required: true, description: 'Currency code (USD, NGN)' },
        { name: 'description', type: 'string', required: true, description: 'Transaction description' },
        { name: 'recipient_id', type: 'string', required: true, description: 'Recipient user ID' }
      ],
      responseExample: `{
  "id": "txn_123",
  "amount": 100.00,
  "currency": "USD",
  "status": "pending",
  "createdAt": "2025-01-14T10:30:00Z"
}`
    },
    {
      id: '7',
      name: 'Get Transaction',
      method: 'GET',
      path: '/api/v1/transactions/{id}',
      description: 'Retrieve transaction details',
      category: 'Transactions',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Transaction ID' }
      ],
      responseExample: `{
  "id": "txn_123",
  "amount": 100.00,
  "currency": "USD",
  "status": "completed",
  "description": "Payment for service",
  "createdAt": "2025-01-14T10:30:00Z",
  "completedAt": "2025-01-14T10:35:00Z"
}`
    },
    {
      id: '8',
      name: 'Create Event',
      method: 'POST',
      path: '/api/v1/events',
      description: 'Create a new event for a group',
      category: 'Events',
      parameters: [
        { name: 'title', type: 'string', required: true, description: 'Event title' },
        { name: 'description', type: 'string', required: true, description: 'Event description' },
        { name: 'date', type: 'string', required: true, description: 'Event date (ISO 8601)' },
        { name: 'group_id', type: 'string', required: true, description: 'Group ID' }
      ],
      responseExample: `{
  "id": "event_123",
  "title": "Community Service Day",
  "date": "2025-02-15T10:00:00Z",
  "status": "upcoming"
}`
    },
    {
      id: '9',
      name: 'List Events',
      method: 'GET',
      path: '/api/v1/events',
      description: 'Get a list of events with filtering options',
      category: 'Events',
      parameters: [
        { name: 'group_id', type: 'string', required: false, description: 'Filter by group ID' },
        { name: 'status', type: 'string', required: false, description: 'Filter by event status' },
        { name: 'date_from', type: 'string', required: false, description: 'Filter events from date' }
      ],
      responseExample: `{
  "data": [
    {
      "id": "event_123",
      "title": "Community Service Day",
      "date": "2025-02-15T10:00:00Z",
      "groupName": "Community Church"
    }
  ]
}`
    },
    {
      id: '10',
      name: 'List Products',
      method: 'GET',
      path: '/api/v1/marketplace/products',
      description: 'Get marketplace products with filtering',
      category: 'Marketplace',
      parameters: [
        { name: 'category', type: 'string', required: false, description: 'Filter by category' },
        { name: 'vendor_id', type: 'string', required: false, description: 'Filter by vendor' },
        { name: 'price_min', type: 'number', required: false, description: 'Minimum price filter' }
      ],
      responseExample: `{
  "data": [
    {
      "id": "product_123",
      "name": "Organic Honey",
      "price": 25.99,
      "vendor": "Local Farmers Co-op"
    }
  ]
}`
    },
    {
      id: '11',
      name: 'Setup Webhook',
      method: 'POST',
      path: '/api/v1/webhooks',
      description: 'Configure webhook endpoint for real-time notifications',
      category: 'Webhooks',
      parameters: [
        { name: 'url', type: 'string', required: true, description: 'Webhook endpoint URL' },
        { name: 'events', type: 'array', required: true, description: 'Array of event types to subscribe to' },
        { name: 'secret', type: 'string', required: false, description: 'Webhook secret for verification' }
      ],
      responseExample: `{
  "id": "webhook_123",
  "url": "https://your-app.com/webhooks",
  "events": ["user.created", "transaction.completed"],
  "status": "active",
  "createdAt": "2025-01-14T10:30:00Z"
}`
    }
  ];

  const categories = ['all', 'Users', 'Groups', 'Transactions', 'Events', 'Marketplace', 'Webhooks'];

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || endpoint.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTestEndpoint = async () => {
    if (!selectedEndpoint) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': '999'
      },
      body: selectedEndpoint.responseExample,
      responseTime: Math.floor(Math.random() * 200) + 50
    };
    
    setTestResponse(mockResponse);
    setIsLoading(false);
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-700';
      case 'POST': return 'bg-green-100 text-green-700';
      case 'PUT': return 'bg-orange-100 text-orange-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const generateCurlCommand = (endpoint: APIEndpoint) => {
    let curl = `curl -X ${endpoint.method} "https://api.suregroups.com${endpoint.path}"`;
    curl += ` \\\n  -H "Authorization: Bearer your-api-key"`;
    curl += ` \\\n  -H "Content-Type: application/json"`;
    
    if (endpoint.method === 'POST' || endpoint.method === 'PUT') {
      curl += ` \\\n  -d '${testRequest.body || '{}'}'`;
    }
    
    return curl;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Endpoint Explorer</h1>
        <p className="text-gray-600">Browse and test API endpoints interactively</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Endpoint List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search endpoints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
            {filteredEndpoints.map((endpoint) => (
              <button
                key={endpoint.id}
                onClick={() => setSelectedEndpoint(endpoint)}
                className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 ${
                  selectedEndpoint?.id === endpoint.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(endpoint.method)}`}>
                    {endpoint.method}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{endpoint.name}</span>
                </div>
                <code className="text-xs text-gray-600">{endpoint.path}</code>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{endpoint.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Endpoint Details & Testing */}
        <div className="lg:col-span-2">
          {selectedEndpoint ? (
            <div className="space-y-6">
              {/* Endpoint Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getMethodColor(selectedEndpoint.method)}`}>
                    {selectedEndpoint.method}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">{selectedEndpoint.name}</h2>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <code className="text-sm text-gray-700">{selectedEndpoint.path}</code>
                </div>
                
                <p className="text-gray-600 mb-4">{selectedEndpoint.description}</p>

                {selectedEndpoint.parameters.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Parameters</h3>
                    <div className="space-y-3">
                      {selectedEndpoint.parameters.map((param, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <code className="text-sm font-medium text-gray-900">{param.name}</code>
                            <span className="text-xs text-gray-500">{param.type}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              param.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {param.required ? 'Required' : 'Optional'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{param.description}</p>
                          <input
                            type="text"
                            placeholder={`Enter ${param.name}`}
                            value={testRequest.parameters[param.name] || ''}
                            onChange={(e) => setTestRequest(prev => ({
                              ...prev,
                              parameters: { ...prev.parameters, [param.name]: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Test Interface */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test This Endpoint</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Headers</label>
                    <textarea
                      value={testRequest.headers}
                      onChange={(e) => setTestRequest(prev => ({ ...prev, headers: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      rows={3}
                    />
                  </div>

                  {(selectedEndpoint.method === 'POST' || selectedEndpoint.method === 'PUT') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Request Body</label>
                      <textarea
                        value={testRequest.body}
                        onChange={(e) => setTestRequest(prev => ({ ...prev, body: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        rows={4}
                        placeholder='{\n  "key": "value"\n}'
                      />
                    </div>
                  )}

                  <button
                    onClick={handleTestEndpoint}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Testing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Test Endpoint</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Response */}
              {testResponse && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Response</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-green-600">
                        {testResponse.status} {testResponse.statusText}
                      </span>
                      <span className="text-sm text-gray-500">
                        {testResponse.responseTime}ms
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Response Body</h4>
                      <div className="relative">
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{testResponse.body}</code>
                        </pre>
                        <button
                          onClick={() => copyCode(testResponse.body, 'response')}
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                        >
                          {copiedCode === 'response' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Code Generation */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Example</h3>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generateCurlCommand(selectedEndpoint)}</code>
                  </pre>
                  <button
                    onClick={() => copyCode(generateCurlCommand(selectedEndpoint), 'curl')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                  >
                    {copiedCode === 'curl' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Endpoint</h3>
              <p className="text-gray-500">Choose an endpoint from the list to explore its documentation and test it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};