import React, { useState } from 'react';
import { Server, Database, Zap, Globe, AlertTriangle, CheckCircle, Clock, TrendingUp, BarChart3, Users } from 'lucide-react';

interface SystemMetric {
  name: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  responseTime: number;
  lastIncident?: string;
}

interface PerformanceMetric {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkIn: number;
  networkOut: number;
  activeConnections: number;
}

export const SystemMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'performance' | 'alerts'>('overview');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  const [systemMetrics] = useState<SystemMetric[]>([
    {
      name: 'CPU Usage',
      value: '45%',
      status: 'healthy',
      trend: 'stable',
      lastUpdated: '2025-01-14T10:30:00Z'
    },
    {
      name: 'Memory Usage',
      value: '67%',
      status: 'warning',
      trend: 'up',
      lastUpdated: '2025-01-14T10:30:00Z'
    },
    {
      name: 'Disk Usage',
      value: '23%',
      status: 'healthy',
      trend: 'stable',
      lastUpdated: '2025-01-14T10:30:00Z'
    },
    {
      name: 'Active Users',
      value: '1,247',
      status: 'healthy',
      trend: 'up',
      lastUpdated: '2025-01-14T10:30:00Z'
    },
    {
      name: 'API Requests/min',
      value: '2,340',
      status: 'healthy',
      trend: 'up',
      lastUpdated: '2025-01-14T10:30:00Z'
    },
    {
      name: 'Error Rate',
      value: '0.8%',
      status: 'healthy',
      trend: 'down',
      lastUpdated: '2025-01-14T10:30:00Z'
    }
  ]);

  const [serviceStatuses] = useState<ServiceStatus[]>([
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.9%',
      responseTime: 142,
      lastIncident: '2025-01-01T00:00:00Z'
    },
    {
      name: 'API Gateway',
      status: 'operational',
      uptime: '99.8%',
      responseTime: 89,
      lastIncident: '2025-01-05T12:30:00Z'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.9%',
      responseTime: 23,
      lastIncident: '2024-12-15T08:45:00Z'
    },
    {
      name: 'Payment Processing',
      status: 'degraded',
      uptime: '98.5%',
      responseTime: 567,
      lastIncident: '2025-01-14T09:15:00Z'
    },
    {
      name: 'Email Service',
      status: 'operational',
      uptime: '99.7%',
      responseTime: 234,
      lastIncident: '2025-01-10T16:20:00Z'
    },
    {
      name: 'File Storage',
      status: 'operational',
      uptime: '99.9%',
      responseTime: 156,
      lastIncident: '2024-12-28T14:10:00Z'
    }
  ]);

  const [performanceData] = useState<PerformanceMetric[]>([
    {
      timestamp: '2025-01-14T10:00:00Z',
      cpuUsage: 45,
      memoryUsage: 67,
      diskUsage: 23,
      networkIn: 1.2,
      networkOut: 2.8,
      activeConnections: 1247
    },
    {
      timestamp: '2025-01-14T09:00:00Z',
      cpuUsage: 52,
      memoryUsage: 71,
      diskUsage: 23,
      networkIn: 1.5,
      networkOut: 3.2,
      activeConnections: 1156
    },
    {
      timestamp: '2025-01-14T08:00:00Z',
      cpuUsage: 38,
      memoryUsage: 64,
      diskUsage: 22,
      networkIn: 0.9,
      networkOut: 2.1,
      activeConnections: 1089
    }
  ]);

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700';
      case 'degraded': return 'bg-yellow-100 text-yellow-700';
      case 'outage': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'CPU Usage': return <Server className="w-6 h-6" />;
      case 'Memory Usage': return <Database className="w-6 h-6" />;
      case 'Disk Usage': return <Database className="w-6 h-6" />;
      case 'Active Users': return <Users className="w-6 h-6" />;
      case 'API Requests/min': return <Zap className="w-6 h-6" />;
      case 'Error Rate': return <AlertTriangle className="w-6 h-6" />;
      default: return <BarChart3 className="w-6 h-6" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-400" />;
    }
  };

  const operationalServices = serviceStatuses.filter(s => s.status === 'operational').length;
  const degradedServices = serviceStatuses.filter(s => s.status === 'degraded').length;
  const criticalMetrics = systemMetrics.filter(m => m.status === 'critical').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Monitoring</h1>
        <p className="text-gray-600">Monitor system health, performance, and service status</p>
      </div>

      {/* Time Range Filter */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {(['1h', '24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {range === '1h' ? 'Last Hour' :
               range === '24h' ? 'Last 24 Hours' :
               range === '7d' ? 'Last 7 Days' :
               'Last 30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-green-600">98.5%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Operational Services</p>
              <p className="text-2xl font-bold text-blue-600">{operationalServices}</p>
            </div>
            <Server className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Degraded Services</p>
              <p className="text-2xl font-bold text-yellow-600">{degradedServices}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">{criticalMetrics}</p>
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
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              System Overview
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Service Status
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
              onClick={() => setActiveTab('alerts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'alerts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Alerts & Notifications
            </button>
          </nav>
        </div>
      </div>

      {/* System Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    metric.status === 'healthy' ? 'bg-green-100 text-green-600' :
                    metric.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {getMetricIcon(metric.name)}
                  </div>
                  <h3 className="text-sm font-medium text-gray-700">{metric.name}</h3>
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div className="mb-4">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMetricStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
              
              <p className="text-xs text-gray-500">
                Updated {new Date(metric.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Service Status Tab */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Incident</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceStatuses.map((service, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          service.status === 'operational' ? 'bg-green-500' :
                          service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-900">{service.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getServiceStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.uptime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.responseTime}ms
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.lastIncident ? new Date(service.lastIncident).toLocaleDateString() : 'None'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Usage</h3>
            <div className="space-y-4">
              {performanceData[0] && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">CPU Usage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${performanceData[0].cpuUsage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{performanceData[0].cpuUsage}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Memory Usage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${performanceData[0].memoryUsage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{performanceData[0].memoryUsage}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Disk Usage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${performanceData[0].diskUsage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{performanceData[0].diskUsage}%</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Activity</h3>
            <div className="space-y-4">
              {performanceData[0] && (
                <>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Network In</p>
                      <p className="text-xs text-blue-600">Incoming traffic</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{performanceData[0].networkIn} GB/s</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-900">Network Out</p>
                      <p className="text-xs text-green-600">Outgoing traffic</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{performanceData[0].networkOut} GB/s</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-purple-900">Active Connections</p>
                      <p className="text-xs text-purple-600">Current users</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">{performanceData[0].activeConnections.toLocaleString()}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">High Memory Usage</p>
                  <p className="text-xs text-yellow-700">Memory usage at 67% - consider scaling</p>
                </div>
              </div>
              <span className="text-xs text-yellow-600">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-900">Payment Service Degraded</p>
                  <p className="text-xs text-red-700">Increased response times detected</p>
                </div>
              </div>
              <span className="text-xs text-red-600">4 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Database Backup Completed</p>
                  <p className="text-xs text-green-700">Scheduled backup completed successfully</p>
                </div>
              </div>
              <span className="text-xs text-green-600">6 hours ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};