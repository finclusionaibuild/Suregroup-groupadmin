import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, AlertTriangle, Download, Calendar } from 'lucide-react';
import { APIUsage } from '../../types';

export const DeveloperAnalytics: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [activeTab, setActiveTab] = useState<'usage' | 'performance' | 'errors' | 'endpoints'>('usage');

  const [usageData] = useState<APIUsage[]>([
    { date: '2025-01-14', requests: 1240, errors: 12, latency: 145 },
    { date: '2025-01-13', requests: 1156, errors: 8, latency: 132 },
    { date: '2025-01-12', requests: 1089, errors: 15, latency: 167 },
    { date: '2025-01-11', requests: 1345, errors: 6, latency: 128 },
    { date: '2025-01-10', requests: 1278, errors: 9, latency: 154 },
    { date: '2025-01-09', requests: 1198, errors: 11, latency: 139 },
    { date: '2025-01-08', requests: 1067, errors: 7, latency: 142 }
  ]);

  const endpointStats = [
    { endpoint: '/api/v1/users', requests: 4567, errors: 23, avgLatency: 125 },
    { endpoint: '/api/v1/groups', requests: 3421, errors: 12, avgLatency: 98 },
    { endpoint: '/api/v1/transactions', requests: 2890, errors: 8, avgLatency: 234 },
    { endpoint: '/api/v1/events', requests: 1234, errors: 5, avgLatency: 156 }
  ];

  const errorBreakdown = [
    { code: 400, name: 'Bad Request', count: 45, percentage: 45 },
    { code: 401, name: 'Unauthorized', count: 23, percentage: 23 },
    { code: 404, name: 'Not Found', count: 18, percentage: 18 },
    { code: 429, name: 'Rate Limited', count: 12, percentage: 12 },
    { code: 500, name: 'Server Error', count: 2, percentage: 2 }
  ];

  const totalRequests = usageData.reduce((sum, day) => sum + day.requests, 0);
  const totalErrors = usageData.reduce((sum, day) => sum + day.errors, 0);
  const avgLatency = Math.round(usageData.reduce((sum, day) => sum + day.latency, 0) / usageData.length);
  const errorRate = ((totalErrors / totalRequests) * 100).toFixed(2);

  const exportData = (format: 'csv' | 'json') => {
    if (format === 'csv') {
      const csvContent = [
        ['Date', 'Requests', 'Errors', 'Latency'].join(','),
        ...usageData.map(day => [day.date, day.requests, day.errors, day.latency].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'api-usage.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      const jsonContent = JSON.stringify(usageData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'api-usage.json';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Usage Analytics</h1>
        <p className="text-gray-600">Monitor API usage, performance, and error rates</p>
      </div>

      {/* Time Filter */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {(['24h', '7d', '30d', '90d'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeFilter(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeFilter === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {period === '24h' ? 'Last 24 Hours' :
               period === '7d' ? 'Last 7 Days' :
               period === '30d' ? 'Last 30 Days' :
               'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-blue-600">{totalRequests.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Error Rate</p>
              <p className="text-2xl font-bold text-red-600">{errorRate}%</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Latency</p>
              <p className="text-2xl font-bold text-green-600">{avgLatency}ms</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">{(100 - parseFloat(errorRate)).toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('usage')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'usage'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Usage Trends
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'performance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Performance
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
            <button
              onClick={() => setActiveTab('endpoints')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'endpoints'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Endpoint Stats
            </button>
          </nav>
        </div>
      </div>

      {/* Usage Trends Tab */}
      {activeTab === 'usage' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Daily Requests</h3>
              <button
                onClick={() => exportData('csv')}
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="space-y-3">
              {usageData.map((day) => (
                <div key={day.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{new Date(day.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{day.requests.toLocaleString()} requests</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{day.errors} errors</p>
                    <p className="text-xs text-gray-500">{day.latency}ms avg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Peak Day</p>
                  <p className="text-xs text-blue-600">Highest request volume</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">1,345</p>
                  <p className="text-xs text-blue-500">Jan 11, 2025</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Best Performance</p>
                  <p className="text-xs text-green-600">Lowest average latency</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">128ms</p>
                  <p className="text-xs text-green-500">Jan 11, 2025</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-orange-900">Growth Rate</p>
                  <p className="text-xs text-orange-600">Week over week</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">+23%</p>
                  <p className="text-xs text-orange-500">Trending up</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{avgLatency}ms</p>
              <p className="text-sm text-gray-600">Average Response Time</p>
              <p className="text-xs text-green-600 mt-1">-12ms improvement</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">99.2%</p>
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="text-xs text-green-600 mt-1">Above SLA</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-10 h-10 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">1.2K</p>
              <p className="text-sm text-gray-600">Daily Average</p>
              <p className="text-xs text-green-600 mt-1">+15% growth</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Analysis Tab */}
      {activeTab === 'errors' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Breakdown</h3>
            <div className="space-y-3">
              {errorBreakdown.map((error) => (
                <div key={error.code} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{error.code}</span>
                    <span className="text-sm text-gray-600">{error.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${error.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900 w-8">{error.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Errors</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-red-900">429 Rate Limited</span>
                  <span className="text-xs text-red-600">2 hours ago</span>
                </div>
                <p className="text-xs text-red-700">/api/v1/users - Too many requests</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-orange-900">400 Bad Request</span>
                  <span className="text-xs text-orange-600">4 hours ago</span>
                </div>
                <p className="text-xs text-orange-700">/api/v1/transactions - Invalid amount parameter</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-yellow-900">401 Unauthorized</span>
                  <span className="text-xs text-yellow-600">6 hours ago</span>
                </div>
                <p className="text-xs text-yellow-700">/api/v1/groups - Invalid API key</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Endpoint Stats Tab */}
      {activeTab === 'endpoints' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Endpoint Performance</h2>
              <button
                onClick={() => exportData('json')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Errors</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Latency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {endpointStats.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm text-gray-900">{stat.endpoint}</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stat.requests.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {stat.errors}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stat.avgLatency}ms
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {(((stat.requests - stat.errors) / stat.requests) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};