import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, AlertTriangle, Download, RefreshCw, X } from 'lucide-react';

interface UsageMetric {
  timestamp: string;
  requests: number;
  errors: number;
  latency: number;
  bandwidth: number;
}

interface QuotaInfo {
  current: number;
  limit: number;
  resetDate: string;
  overage: number;
  cost: number;
}

interface EndpointUsage {
  endpoint: string;
  method: string;
  requests: number;
  errors: number;
  avgLatency: number;
  lastUsed: string;
}

export const UsageMonitoring: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const [usageMetrics] = useState<UsageMetric[]>([
    { timestamp: '2025-01-14T10:00:00Z', requests: 145, errors: 2, latency: 142, bandwidth: 2.3 },
    { timestamp: '2025-01-14T09:00:00Z', requests: 167, errors: 1, latency: 156, bandwidth: 2.8 },
    { timestamp: '2025-01-14T08:00:00Z', requests: 134, errors: 0, latency: 128, bandwidth: 2.1 },
    { timestamp: '2025-01-14T07:00:00Z', requests: 89, errors: 3, latency: 189, bandwidth: 1.7 },
    { timestamp: '2025-01-14T06:00:00Z', requests: 67, errors: 1, latency: 145, bandwidth: 1.2 },
    { timestamp: '2025-01-14T05:00:00Z', requests: 45, errors: 0, latency: 134, bandwidth: 0.9 },
    { timestamp: '2025-01-14T04:00:00Z', requests: 23, errors: 0, latency: 123, bandwidth: 0.5 }
  ]);

  const [quotaInfo] = useState<QuotaInfo>({
    current: 12400,
    limit: 10000,
    resetDate: '2025-02-01T00:00:00Z',
    overage: 2400,
    cost: 45.20
  });

  const [endpointUsage] = useState<EndpointUsage[]>([
    {
      endpoint: '/api/v1/users',
      method: 'GET',
      requests: 4567,
      errors: 23,
      avgLatency: 125,
      lastUsed: '2025-01-14T10:30:00Z'
    },
    {
      endpoint: '/api/v1/groups',
      method: 'GET',
      requests: 3421,
      errors: 12,
      avgLatency: 98,
      lastUsed: '2025-01-14T10:25:00Z'
    },
    {
      endpoint: '/api/v1/transactions',
      method: 'POST',
      requests: 2890,
      errors: 8,
      avgLatency: 234,
      lastUsed: '2025-01-14T10:20:00Z'
    },
    {
      endpoint: '/api/v1/events',
      method: 'GET',
      requests: 1234,
      errors: 5,
      avgLatency: 156,
      lastUsed: '2025-01-14T10:15:00Z'
    }
  ]);

  const totalRequests = usageMetrics.reduce((sum, metric) => sum + metric.requests, 0);
  const totalErrors = usageMetrics.reduce((sum, metric) => sum + metric.errors, 0);
  const avgLatency = Math.round(usageMetrics.reduce((sum, metric) => sum + metric.latency, 0) / usageMetrics.length);
  const errorRate = totalRequests > 0 ? ((totalErrors / totalRequests) * 100).toFixed(2) : '0';

  const exportData = () => {
    const csvContent = [
      ['Timestamp', 'Requests', 'Errors', 'Latency (ms)', 'Bandwidth (MB)'].join(','),
      ...usageMetrics.map(metric => [
        metric.timestamp,
        metric.requests,
        metric.errors,
        metric.latency,
        metric.bandwidth
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usage-metrics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Usage Monitoring</h1>
        <p className="text-gray-600">Monitor API usage, quotas, and performance metrics</p>
      </div>

      {/* Time Filter & Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {(['1h', '24h', '7d', '30d'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeFilter(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeFilter === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {period === '1h' ? 'Last Hour' :
               period === '24h' ? 'Last 24 Hours' :
               period === '7d' ? 'Last 7 Days' :
               'Last 30 Days'}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoRefresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="autoRefresh" className="text-sm text-gray-700">Auto-refresh</label>
          </div>
          <button
            onClick={exportData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Quota Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">API Quota Usage</h2>
          <span className="text-sm text-gray-500">
            Resets on {new Date(quotaInfo.resetDate).toLocaleDateString()}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Current Usage</p>
            <p className="text-2xl font-bold text-gray-900">{quotaInfo.current.toLocaleString()}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${
                  quotaInfo.current > quotaInfo.limit ? 'bg-red-600' : 'bg-blue-600'
                }`}
                style={{ width: `${Math.min((quotaInfo.current / quotaInfo.limit) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {quotaInfo.current.toLocaleString()} / {quotaInfo.limit.toLocaleString()} requests
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Overage</p>
            <p className="text-2xl font-bold text-orange-600">{quotaInfo.overage.toLocaleString()}</p>
            <p className="text-xs text-orange-500 mt-1">
              Additional requests beyond quota
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Current Bill</p>
            <p className="text-2xl font-bold text-green-600">${quotaInfo.cost.toFixed(2)}</p>
            <p className="text-xs text-green-500 mt-1">
              Including overage charges
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Days Remaining</p>
            <p className="text-2xl font-bold text-purple-600">
              {Math.ceil((new Date(quotaInfo.resetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
            </p>
            <p className="text-xs text-purple-500 mt-1">
              Until quota reset
            </p>
          </div>
        </div>
      </div>

      {/* Usage Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume</h3>
          <div className="space-y-3">
            {usageMetrics.reverse().map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {new Date(metric.timestamp).toLocaleTimeString()}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(metric.requests / 200) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-900 w-12">{metric.requests}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-900">Average Latency</p>
                <p className="text-xs text-blue-600">Response time</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{avgLatency}ms</p>
                <p className="text-xs text-blue-500">Within SLA</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-900">Success Rate</p>
                <p className="text-xs text-green-600">Request success</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{(100 - parseFloat(errorRate)).toFixed(1)}%</p>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-red-900">Error Rate</p>
                <p className="text-xs text-red-600">Failed requests</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">{errorRate}%</p>
                <p className="text-xs text-red-500">{totalErrors} errors</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoint Usage Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Endpoint Usage Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Errors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Latency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {endpointUsage.map((usage, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm text-gray-900">{usage.endpoint}</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(usage.method)}`}>
                      {usage.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {usage.requests.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {usage.errors}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {usage.avgLatency}ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(usage.lastUsed).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rate Limit Warning */}
      {quotaInfo.current > quotaInfo.limit && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-sm font-medium text-red-900">Quota Exceeded</h3>
              <p className="text-xs text-red-700">
                You've exceeded your monthly quota by {quotaInfo.overage.toLocaleString()} requests. 
                Additional charges of ${(quotaInfo.overage * 0.01).toFixed(2)} will apply.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};