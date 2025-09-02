import React, { useState } from 'react';
import { Database, Server, Play, Eye, Download, Upload, Settings, AlertTriangle, CheckCircle, Clock, BarChart3 } from 'lucide-react';

interface DatabaseConnection {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql' | 'mongodb' | 'redis';
  host: string;
  port: number;
  database: string;
  status: 'connected' | 'disconnected' | 'error';
  lastChecked: string;
  responseTime: number;
  connections: number;
  maxConnections: number;
}

interface DatabaseQuery {
  id: string;
  query: string;
  database: string;
  executedBy: string;
  executionTime: number;
  rowsAffected: number;
  status: 'success' | 'error';
  timestamp: string;
  error?: string;
}

interface DatabaseBackup {
  id: string;
  database: string;
  type: 'full' | 'incremental';
  size: string;
  status: 'completed' | 'in-progress' | 'failed';
  createdAt: string;
  duration: string;
  location: string;
}

export const DatabaseManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'connections' | 'queries' | 'backups' | 'monitoring'>('connections');
  
  const [connections, setConnections] = useState<DatabaseConnection[]>([
    {
      id: '1',
      name: 'Primary Database',
      type: 'postgresql',
      host: 'db-primary.suregroups.com',
      port: 5432,
      database: 'suregroups_prod',
      status: 'connected',
      lastChecked: '2025-01-14T10:30:00Z',
      responseTime: 23,
      connections: 45,
      maxConnections: 100
    },
    {
      id: '2',
      name: 'Analytics Database',
      type: 'postgresql',
      host: 'db-analytics.suregroups.com',
      port: 5432,
      database: 'suregroups_analytics',
      status: 'connected',
      lastChecked: '2025-01-14T10:29:00Z',
      responseTime: 18,
      connections: 12,
      maxConnections: 50
    },
    {
      id: '3',
      name: 'Cache Database',
      type: 'redis',
      host: 'cache.suregroups.com',
      port: 6379,
      database: 'cache',
      status: 'connected',
      lastChecked: '2025-01-14T10:28:00Z',
      responseTime: 5,
      connections: 234,
      maxConnections: 1000
    },
    {
      id: '4',
      name: 'Backup Database',
      type: 'postgresql',
      host: 'db-backup.suregroups.com',
      port: 5432,
      database: 'suregroups_backup',
      status: 'error',
      lastChecked: '2025-01-14T10:25:00Z',
      responseTime: 0,
      connections: 0,
      maxConnections: 25
    }
  ]);

  const [recentQueries] = useState<DatabaseQuery[]>([
    {
      id: '1',
      query: 'SELECT COUNT(*) FROM users WHERE status = \'active\'',
      database: 'suregroups_prod',
      executedBy: 'system',
      executionTime: 45,
      rowsAffected: 1,
      status: 'success',
      timestamp: '2025-01-14T10:30:00Z'
    },
    {
      id: '2',
      query: 'UPDATE groups SET member_count = member_count + 1 WHERE id = $1',
      database: 'suregroups_prod',
      executedBy: 'admin_user',
      executionTime: 12,
      rowsAffected: 1,
      status: 'success',
      timestamp: '2025-01-14T10:25:00Z'
    },
    {
      id: '3',
      query: 'SELECT * FROM transactions WHERE amount > 1000 ORDER BY created_at DESC',
      database: 'suregroups_prod',
      executedBy: 'analytics_user',
      executionTime: 2340,
      rowsAffected: 156,
      status: 'success',
      timestamp: '2025-01-14T10:20:00Z'
    },
    {
      id: '4',
      query: 'DELETE FROM expired_sessions WHERE expires_at < NOW()',
      database: 'suregroups_prod',
      executedBy: 'system',
      executionTime: 89,
      rowsAffected: 234,
      status: 'success',
      timestamp: '2025-01-14T10:15:00Z'
    }
  ]);

  const [backups] = useState<DatabaseBackup[]>([
    {
      id: '1',
      database: 'suregroups_prod',
      type: 'full',
      size: '2.4 GB',
      status: 'completed',
      createdAt: '2025-01-14T02:00:00Z',
      duration: '45 minutes',
      location: 'AWS S3'
    },
    {
      id: '2',
      database: 'suregroups_analytics',
      type: 'incremental',
      size: '156 MB',
      status: 'completed',
      createdAt: '2025-01-14T08:00:00Z',
      duration: '8 minutes',
      location: 'AWS S3'
    },
    {
      id: '3',
      database: 'suregroups_prod',
      type: 'full',
      size: 'In progress...',
      status: 'in-progress',
      createdAt: '2025-01-14T10:30:00Z',
      duration: 'In progress...',
      location: 'AWS S3'
    }
  ]);

  const [queryInput, setQueryInput] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('suregroups_prod');

  const handleExecuteQuery = () => {
    if (!queryInput.trim()) {
      alert('Please enter a query');
      return;
    }

    // Simulate query execution
    alert(`Executing query on ${selectedDatabase}:\n${queryInput}`);
    setQueryInput('');
  };

  const handleTestConnection = (connectionId: string) => {
    const connection = connections.find(c => c.id === connectionId);
    if (connection) {
      alert(`Testing connection to ${connection.name}...`);
      // Simulate connection test
      setTimeout(() => {
        setConnections(connections.map(c => 
          c.id === connectionId 
            ? { ...c, status: 'connected', lastChecked: new Date().toISOString(), responseTime: Math.floor(Math.random() * 50) + 10 }
            : c
        ));
      }, 1000);
    }
  };

  const handleCreateBackup = (database: string) => {
    alert(`Creating backup for ${database}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700';
      case 'disconnected': return 'bg-gray-100 text-gray-700';
      case 'error': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'success': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'disconnected': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'postgresql': return '🐘';
      case 'mysql': return '🐬';
      case 'mongodb': return '🍃';
      case 'redis': return '🔴';
      default: return '💾';
    }
  };

  const connectedDatabases = connections.filter(c => c.status === 'connected').length;
  const totalConnections = connections.reduce((sum, c) => sum + c.connections, 0);
  const avgResponseTime = Math.round(connections.reduce((sum, c) => sum + c.responseTime, 0) / connections.length);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Database Management</h1>
        <p className="text-gray-600">Monitor and manage database connections, queries, and backups</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connected DBs</p>
              <p className="text-2xl font-bold text-green-600">{connectedDatabases}</p>
            </div>
            <Database className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Connections</p>
              <p className="text-2xl font-bold text-blue-600">{totalConnections}</p>
            </div>
            <Server className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-purple-600">{avgResponseTime}ms</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Backups</p>
              <p className="text-2xl font-bold text-orange-600">{backups.length}</p>
            </div>
            <Upload className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('connections')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'connections'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Database Connections
            </button>
            <button
              onClick={() => setActiveTab('queries')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'queries'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Query Console
            </button>
            <button
              onClick={() => setActiveTab('backups')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'backups'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Backups ({backups.length})
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'monitoring'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Performance Monitoring
            </button>
          </nav>
        </div>
      </div>

      {/* Database Connections Tab */}
      {activeTab === 'connections' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Database</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connections</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {connections.map((connection) => (
                  <tr key={connection.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(connection.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{connection.name}</div>
                          <div className="text-sm text-gray-500">{connection.database}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {connection.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{connection.host}</div>
                      <div className="text-sm text-gray-500">Port: {connection.port}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(connection.status)}`}>
                        {getStatusIcon(connection.status)}
                        <span className="ml-1">{connection.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{connection.connections}/{connection.maxConnections}</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${(connection.connections / connection.maxConnections) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {connection.responseTime}ms
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleTestConnection(connection.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Query Console Tab */}
      {activeTab === 'queries' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Execute Query</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Database</label>
                <select
                  value={selectedDatabase}
                  onChange={(e) => setSelectedDatabase(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {connections.filter(c => c.status === 'connected').map(connection => (
                    <option key={connection.id} value={connection.database}>
                      {connection.name} ({connection.database})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SQL Query</label>
                <textarea
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  rows={8}
                  placeholder="SELECT * FROM users WHERE status = 'active';"
                />
              </div>

              <button
                onClick={handleExecuteQuery}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Execute Query</span>
              </button>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-900">Warning</h4>
                  <p className="text-xs text-yellow-700">
                    Be careful when executing queries on production databases. Always test on staging first.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Queries</h3>
            <div className="space-y-3">
              {recentQueries.map((query) => (
                <div key={query.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <code className="text-xs text-gray-700 bg-gray-50 p-2 rounded block">
                        {query.query}
                      </code>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(query.status)}`}>
                      {getStatusIcon(query.status)}
                      <span className="ml-1">{query.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{query.database} • {query.executedBy}</span>
                    <span>{query.executionTime}ms • {query.rowsAffected} rows</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(query.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backups Tab */}
      {activeTab === 'backups' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Database Backups</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleCreateBackup('suregroups_prod')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Create Backup</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Database</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {backups.map((backup) => (
                    <tr key={backup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{backup.database}</div>
                        <div className="text-sm text-gray-500">{backup.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          backup.type === 'full' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {backup.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {backup.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(backup.status)}`}>
                          {getStatusIcon(backup.status)}
                          <span className="ml-1">{backup.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {backup.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(backup.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {backup.status === 'completed' && (
                            <>
                              <button className="text-blue-600 hover:text-blue-900">
                                <Download className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Upload className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="text-gray-600 hover:text-gray-900">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Performance Monitoring Tab */}
      {activeTab === 'monitoring' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Performance</h3>
            <div className="space-y-4">
              {connections.filter(c => c.status === 'connected').map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getTypeIcon(connection.type)}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{connection.name}</p>
                      <p className="text-xs text-gray-500">{connection.database}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">{connection.responseTime}ms</p>
                    <p className="text-xs text-gray-500">{connection.connections} connections</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Performance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Query Time</span>
                <span className="text-sm text-gray-900">
                  {Math.round(recentQueries.reduce((sum, q) => sum + q.executionTime, 0) / recentQueries.length)}ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Slow Queries ({">"}1s)</span>
                <span className="text-sm text-red-600">
                  {recentQueries.filter(q => q.executionTime > 1000).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Queries Today</span>
                <span className="text-sm text-gray-900">{recentQueries.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm text-green-600">
                  {Math.round((recentQueries.filter(q => q.status === 'success').length / recentQueries.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};