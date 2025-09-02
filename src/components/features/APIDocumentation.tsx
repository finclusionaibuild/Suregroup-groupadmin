import React, { useState } from 'react';
import { Search, Code, Copy, Check, Play, FileText, Download, ExternalLink, Shield, Zap } from 'lucide-react';
import { APIEndpoint } from '../../types';

export const APIDocumentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'sdks' | 'examples'>('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
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
      id: '3',
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
      id: '4',
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
    }
  ];

  const categories = ['all', 'Users', 'Groups', 'Transactions', 'Events', 'Marketplace', 'Webhooks'];

  const sdks = [
    {
      name: 'JavaScript/Node.js',
      description: 'Official SDK for JavaScript and Node.js applications',
      version: '2.1.0',
      downloadUrl: '#',
      docsUrl: '#'
    },
    {
      name: 'Python',
      description: 'Python SDK with async support',
      version: '1.8.0',
      downloadUrl: '#',
      docsUrl: '#'
    },
    {
      name: 'PHP',
      description: 'PHP SDK for web applications',
      version: '1.5.2',
      downloadUrl: '#',
      docsUrl: '#'
    },
    {
      name: 'Java',
      description: 'Java SDK for enterprise applications',
      version: '1.3.0',
      downloadUrl: '#',
      docsUrl: '#'
    }
  ];

  const codeExamples = {
    javascript: `// Initialize SureGroups SDK
const SureGroups = require('@suregroups/sdk');
const client = new SureGroups('your-api-key');

// Get user profile
const user = await client.users.get('user_123');
console.log(user);

// Create a transaction
const transaction = await client.transactions.create({
  amount: 100.00,
  currency: 'USD',
  description: 'Payment for service',
  recipient_id: 'user_456'
});`,
    python: `# Initialize SureGroups SDK
from suregroups import SureGroups
client = SureGroups('your-api-key')

# Get user profile
user = client.users.get('user_123')
print(user)

# Create a transaction
transaction = client.transactions.create(
    amount=100.00,
    currency='USD',
    description='Payment for service',
    recipient_id='user_456'
)`,
    curl: `# Get user profile
curl -X GET "https://api.suregroups.com/v1/users/user_123" \\
  -H "Authorization: Bearer your-api-key"

# Create a transaction
curl -X POST "https://api.suregroups.com/v1/transactions" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100.00,
    "currency": "USD",
    "description": "Payment for service",
    "recipient_id": "user_456"
  }'`
  };

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || endpoint.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">API Documentation</h1>
        <p className="text-gray-600">Comprehensive guide to integrating with SureGroups APIs</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('endpoints')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'endpoints'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              API Endpoints
            </button>
            <button
              onClick={() => setActiveTab('sdks')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sdks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              SDKs & Libraries
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'examples'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Code Examples
            </button>
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">SureGroups API v1.0</h2>
            <p className="text-gray-600 mb-6">
              The SureGroups API allows you to integrate group management, user authentication, 
              payment processing, and marketplace functionality into your applications.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Started</h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. Generate an API key from the API Keys section</li>
                  <li>2. Include the key in your request headers</li>
                  <li>3. Make your first API call to test connectivity</li>
                  <li>4. Explore endpoints and build your integration</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Base URL</h3>
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <code className="text-sm">https://api.suregroups.com/v1</code>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication</h3>
                <div className="bg-gray-50 rounded-lg p-3">
                  <code className="text-sm">Authorization: Bearer your-api-key</code>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">RESTful API</h3>
              <p className="text-sm text-gray-600">Standard REST endpoints with JSON responses</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-sm text-gray-600">OAuth 2.0 and API key authentication</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time</h3>
              <p className="text-sm text-gray-600">Webhooks for real-time event notifications</p>
            </div>
          </div>
        </div>
      )}

      {/* Endpoints Tab */}
      {activeTab === 'endpoints' && (
        <>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
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

          <div className="space-y-4">
            {filteredEndpoints.map((endpoint) => (
              <div key={endpoint.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">{endpoint.name}</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <code className="text-sm text-gray-700">{endpoint.path}</code>
                    </div>
                    <p className="text-gray-600 mb-3">{endpoint.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <Play className="w-4 h-4" />
                    <span>Try It</span>
                  </button>
                </div>

                {endpoint.parameters.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Parameters</h4>
                    <div className="space-y-2">
                      {endpoint.parameters.map((param, index) => (
                        <div key={index} className="flex items-center space-x-4 text-sm">
                          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">{param.name}</code>
                          <span className="text-gray-600">{param.type}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            param.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {param.required ? 'Required' : 'Optional'}
                          </span>
                          <span className="text-gray-500">{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* SDKs Tab */}
      {activeTab === 'sdks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sdks.map((sdk, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{sdk.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{sdk.description}</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    v{sdk.version}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Docs</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">JavaScript/Node.js</h2>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{codeExamples.javascript}</code>
              </pre>
              <button
                onClick={() => copyCode(codeExamples.javascript, 'js')}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              >
                {copiedCode === 'js' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Python</h2>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{codeExamples.python}</code>
              </pre>
              <button
                onClick={() => copyCode(codeExamples.python, 'py')}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              >
                {copiedCode === 'py' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">cURL</h2>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{codeExamples.curl}</code>
              </pre>
              <button
                onClick={() => copyCode(codeExamples.curl, 'curl')}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              >
                {copiedCode === 'curl' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Endpoint Details Modal */}
      {selectedEndpoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedEndpoint.name}</h3>
              <button
                onClick={() => setSelectedEndpoint(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(selectedEndpoint.method)}`}>
                    {selectedEndpoint.method}
                  </span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{selectedEndpoint.path}</code>
                </div>
                
                <p className="text-gray-600 mb-4">{selectedEndpoint.description}</p>
                
                <h4 className="text-md font-semibold text-gray-900 mb-3">Parameters</h4>
                <div className="space-y-2">
                  {selectedEndpoint.parameters.map((param, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="text-sm font-medium">{param.name}</code>
                        <span className="text-xs text-gray-500">{param.type}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          param.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {param.required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{param.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Response Example</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{selectedEndpoint.responseExample}</code>
                  </pre>
                  <button
                    onClick={() => copyCode(selectedEndpoint.responseExample, selectedEndpoint.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                  >
                    {copiedCode === selectedEndpoint.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};