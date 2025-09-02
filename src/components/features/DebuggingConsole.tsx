import React, { useState } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, Info, CheckCircle, Clock, X } from 'lucide-react';

interface DebugLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  responseTime?: number;
  requestId: string;
  userId?: string;
  details?: any;
}

interface RequestTrace {
  id: string;
  method: string;
  endpoint: string;
  timestamp: string;
  duration: number;
  statusCode: number;
  requestHeaders: Record<string, string>;
  requestBody?: string;
  responseHeaders: Record<string, string>;
  responseBody: string;
  errors?: string[];
}

export const DebuggingConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'logs' | 'traces' | 'errors'>('logs');
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | DebugLog['level']>('all');
  const [selectedLog, setSelectedLog] = useState<DebugLog | null>(null);
  const [selectedTrace, setSelectedTrace] = useState<RequestTrace | null>(null);

  const [debugLogs] = useState<DebugLog[]>([
    {
      id: '1',
      timestamp: '2025-01-14T10:30:15.123Z',
      level: 'error',
      message: 'API rate limit exceeded for user',
      endpoint: '/api/v1/users',
      method: 'GET',
      statusCode: 429,
      responseTime: 45,
      requestId: 'req_123456',
      userId: 'user_789',
      details: {
        rateLimit: {
          limit: 1000,
          remaining: 0,
          resetTime: '2025-01-14T11:00:00Z'
        }
      }
    },
    {
      id: '2',
      timestamp: '2025-01-14T10:29:45.567Z',
      level: 'warning',
      message: 'Slow database query detected',
      endpoint: '/api/v1/groups',
      method: 'GET',
      statusCode: 200,
      responseTime: 2340,
      requestId: 'req_123455',
      details: {
        query: 'SELECT * FROM groups WHERE status = ?',
        duration: '2.34s'
      }
    },
    {
      id: '3',
      timestamp: '2025-01-14T10:29:30.890Z',
      level: 'info',
      message: 'User authentication successful',
      endpoint: '/api/v1/auth/login',
      method: 'POST',
      statusCode: 200,
      responseTime: 156,
      requestId: 'req_123454',
      userId: 'user_456'
    },
    {
      id: '4',
      timestamp: '2025-01-14T10:28:12.234Z',
      level: 'error',
      message: 'Invalid JSON in request body',
      endpoint: '/api/v1/transactions',
      method: 'POST',
      statusCode: 400,
      responseTime: 23,
      requestId: 'req_123453',
      details: {
        error: 'SyntaxError: Unexpected token } in JSON at position 45',
        requestBody: '{"amount": 100.00, "currency": "USD",}'
      }
    },
    {
      id: '5',
      timestamp: '2025-01-14T10:27:45.678Z',
      level: 'debug',
      message: 'Cache hit for user profile request',
      endpoint: '/api/v1/users/user_123',
      method: 'GET',
      statusCode: 200,
      responseTime: 12,
      requestId: 'req_123452',
      userId: 'user_123',
      details: {
        cacheKey: 'user:profile:user_123',
        ttl: 300
      }
    }
  ]);

  const [requestTraces] = useState<RequestTrace[]>([
    {
      id: 'trace_1',
      method: 'GET',
      endpoint: '/api/v1/users/user_123',
      timestamp: '2025-01-14T10:30:00Z',
      duration: 142,
      statusCode: 200,
      requestHeaders: {
        'Authorization': 'Bearer sk_prod_***',
        'Content-Type': 'application/json',
        'User-Agent': 'SureGroups-SDK/2.1.0'
      },
      responseHeaders: {
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': '999',
        'X-Request-ID': 'req_123456'
      },
      responseBody: '{"id": "user_123", "fullName": "John Doe", "email": "john@example.com"}'
    },
    {
      id: 'trace_2',
      method: 'POST',
      endpoint: '/api/v1/transactions',
      timestamp: '2025-01-14T10:25:00Z',
      duration: 89,
      statusCode: 201,
      requestHeaders: {
        'Authorization': 'Bearer sk_prod_***',
        'Content-Type': 'application/json'
      },
      requestBody: '{"amount": 100.00, "currency": "USD", "description": "Test payment"}',
      responseHeaders: {
        'Content-Type': 'application/json',
        'Location': '/api/v1/transactions/txn_456'
      },
      responseBody: '{"id": "txn_456", "status": "pending", "amount": 100.00}'
    },
    {
      id: 'trace_3',
      method: 'GET',
      endpoint: '/api/v1/groups',
      timestamp: '2025-01-14T10:20:00Z',
      duration: 2340,
      statusCode: 200,
      requestHeaders: {
        'Authorization': 'Bearer sk_prod_***',
        'Content-Type': 'application/json'
      },
      responseHeaders: {
        'Content-Type': 'application/json',
        'X-Total-Count': '156'
      },
      responseBody: '{"data": [{"id": "group_123", "name": "Community Church"}], "pagination": {"total": 156}}',
      errors: ['Slow query detected: 2.34s execution time']
    }
  ]);

  const filteredLogs = debugLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.endpoint && log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'info': return 'bg-blue-100 text-blue-700';
      case 'debug': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      case 'debug': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getStatusCodeColor = (code: number) => {
    if (code >= 200 && code < 300) return 'text-green-600';
    if (code >= 400 && code < 500) return 'text-orange-600';
    if (code >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Level', 'Message', 'Endpoint', 'Status Code', 'Response Time'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.level,
        `"${log.message}"`,
        log.endpoint || '',
        log.statusCode || '',
        log.responseTime || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'debug-logs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const errorCount = debugLogs.filter(log => log.level === 'error').length;
  const warningCount = debugLogs.filter(log => log.level === 'warning').length;
  const avgResponseTime = Math.round(debugLogs.filter(log => log.responseTime).reduce((sum, log) => sum + (log.responseTime || 0), 0) / debugLogs.filter(log => log.responseTime).length);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Debugging Console</h1>
        <p className="text-gray-600">Monitor API requests, responses, and debug application issues</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{debugLogs.length}</p>
            </div>
            <Info className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-red-600">{errorCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-blue-600">{avgResponseTime}ms</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('logs')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'logs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Debug Logs ({debugLogs.length})
            </button>
            <button
              onClick={() => setActiveTab('traces')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'traces'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Request Traces ({requestTraces.length})
            </button>
            <button
              onClick={() => setActiveTab('errors')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'errors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Error Analysis
            </button>
          </nav>
        </div>
      </div>

      {/* Debug Logs Tab */}
      {activeTab === 'logs' && (
        <>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                </div>
              </div>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
              <button
                onClick={exportLogs}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(log.level)}`}>
                          {getLevelIcon(log.level)}
                          <span className="ml-1">{log.level}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{log.message}</div>
                        <div className="text-xs text-gray-500">Request ID: {log.requestId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.endpoint && (
                          <div>
                            <div className="text-sm text-gray-900">{log.method} {log.endpoint}</div>
                            <div className="text-xs text-gray-500">{log.responseTime}ms</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.statusCode && (
                          <span className={`text-sm font-medium ${getStatusCodeColor(log.statusCode)}`}>
                            {log.statusCode}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Request Traces Tab */}
      {activeTab === 'traces' && (
        <div className="space-y-4">
          {requestTraces.map((trace) => (
            <div key={trace.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      trace.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                      trace.method === 'POST' ? 'bg-green-100 text-green-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {trace.method}
                    </span>
                    <code className="text-sm text-gray-700">{trace.endpoint}</code>
                    <span className={`text-sm font-medium ${getStatusCodeColor(trace.statusCode)}`}>
                      {trace.statusCode}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{new Date(trace.timestamp).toLocaleString()}</span>
                    <span>{trace.duration}ms</span>
                  </div>

                  {trace.errors && trace.errors.length > 0 && (
                    <div className="mt-2">
                      {trace.errors.map((error, index) => (
                        <div key={index} className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                          {error}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedTrace(trace)}
                  className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Analysis Tab */}
      {activeTab === 'errors' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rate Limit Errors</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">3</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Validation Errors</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">2</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Errors</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Issues</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-yellow-900">Slow Query</span>
                  <span className="text-xs text-yellow-600">2.34s</span>
                </div>
                <p className="text-xs text-yellow-700">/api/v1/groups - Database query optimization needed</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-red-900">Rate Limit Hit</span>
                  <span className="text-xs text-red-600">429</span>
                </div>
                <p className="text-xs text-red-700">/api/v1/users - Consider implementing request batching</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Log Details</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(selectedLog.level)}`}>
                  {getLevelIcon(selectedLog.level)}
                  <span className="ml-1">{selectedLog.level}</span>
                </span>
                <span className="text-sm text-gray-500">{new Date(selectedLog.timestamp).toLocaleString()}</span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
                <p className="text-gray-600">{selectedLog.message}</p>
              </div>
              
              {selectedLog.endpoint && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Endpoint</h4>
                    <code className="text-sm text-gray-600">{selectedLog.method} {selectedLog.endpoint}</code>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Response</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getStatusCodeColor(selectedLog.statusCode || 0)}`}>
                        {selectedLog.statusCode}
                      </span>
                      <span className="text-sm text-gray-500">{selectedLog.responseTime}ms</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-gray-700">Request ID</h4>
                <code className="text-sm text-gray-600">{selectedLog.requestId}</code>
              </div>
              
              {selectedLog.details && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Details</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{JSON.stringify(selectedLog.details, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Request Trace Details Modal */}
      {selectedTrace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Request Trace</h3>
              <button
                onClick={() => setSelectedTrace(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Request</h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedTrace.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                        selectedTrace.method === 'POST' ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {selectedTrace.method}
                      </span>
                      <code className="text-sm text-gray-700">{selectedTrace.endpoint}</code>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Headers</h5>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <pre className="text-green-400 text-xs overflow-x-auto">
                        <code>{JSON.stringify(selectedTrace.requestHeaders, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                  
                  {selectedTrace.requestBody && (
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 mb-1">Body</h5>
                      <div className="bg-gray-900 rounded-lg p-3">
                        <pre className="text-green-400 text-xs overflow-x-auto">
                          <code>{JSON.stringify(JSON.parse(selectedTrace.requestBody), null, 2)}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Response</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className={`text-lg font-bold ${getStatusCodeColor(selectedTrace.statusCode)}`}>
                      {selectedTrace.statusCode}
                    </span>
                    <span className="text-sm text-gray-500">{selectedTrace.duration}ms</span>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Headers</h5>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <pre className="text-green-400 text-xs overflow-x-auto">
                        <code>{JSON.stringify(selectedTrace.responseHeaders, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Body</h5>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <pre className="text-green-400 text-xs overflow-x-auto">
                        <code>{JSON.stringify(JSON.parse(selectedTrace.responseBody), null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};