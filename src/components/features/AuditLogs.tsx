import React, { useState } from 'react';
import { Search, Download, Eye, Filter, FileText, User, Settings, Database, Shield } from 'lucide-react';

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'authentication' | 'user_management' | 'system_config' | 'data_access' | 'security';
}

export const AuditLogs: React.FC = () => {
  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      userId: '1',
      userName: 'John Admin',
      userRole: 'super-admin',
      action: 'USER_CREATED',
      resource: 'User Management',
      details: 'Created new admin user: sarah.admin@suregroups.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      timestamp: '2025-01-14T10:30:00Z',
      severity: 'medium',
      category: 'user_management'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sarah Admin',
      userRole: 'product-admin',
      action: 'FEATURE_TOGGLED',
      resource: 'Feature Management',
      details: 'Enabled "Enhanced Messaging" feature for all users',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (macOS)',
      timestamp: '2025-01-14T09:15:00Z',
      severity: 'high',
      category: 'system_config'
    },
    {
      id: '3',
      userId: '1',
      userName: 'John Admin',
      userRole: 'super-admin',
      action: 'LOGIN_SUCCESS',
      resource: 'Authentication',
      details: 'Successful admin login',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      timestamp: '2025-01-14T08:45:00Z',
      severity: 'low',
      category: 'authentication'
    },
    {
      id: '4',
      userId: 'unknown',
      userName: 'Unknown User',
      userRole: 'unknown',
      action: 'LOGIN_FAILED',
      resource: 'Authentication',
      details: 'Failed login attempt with invalid credentials',
      ipAddress: '10.0.0.50',
      userAgent: 'Unknown',
      timestamp: '2025-01-13T22:30:00Z',
      severity: 'high',
      category: 'security'
    },
    {
      id: '5',
      userId: '3',
      userName: 'Mike Admin',
      userRole: 'group-admin',
      action: 'DATA_EXPORT',
      resource: 'User Data',
      details: 'Exported user data for group: Community Church',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Linux)',
      timestamp: '2025-01-13T16:20:00Z',
      severity: 'medium',
      category: 'data_access'
    },
    {
      id: '6',
      userId: '1',
      userName: 'John Admin',
      userRole: 'super-admin',
      action: 'SYSTEM_CONFIG_CHANGED',
      resource: 'System Settings',
      details: 'Updated email configuration settings',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      timestamp: '2025-01-13T14:10:00Z',
      severity: 'high',
      category: 'system_config'
    },
    {
      id: '7',
      userId: '2',
      userName: 'Sarah Admin',
      userRole: 'product-admin',
      action: 'USER_SUSPENDED',
      resource: 'User Management',
      details: 'Suspended user account: problematic.user@example.com',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (macOS)',
      timestamp: '2025-01-12T11:45:00Z',
      severity: 'medium',
      category: 'user_management'
    },
    {
      id: '8',
      userId: '1',
      userName: 'John Admin',
      userRole: 'super-admin',
      action: 'DATABASE_BACKUP',
      resource: 'Database',
      details: 'Manual database backup initiated',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      timestamp: '2025-01-12T02:00:00Z',
      severity: 'low',
      category: 'system_config'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | AuditLog['severity']>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | AuditLog['category']>('all');
  const [userFilter, setUserFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesUser = userFilter === 'all' || log.userName === userFilter;
    return matchesSearch && matchesSeverity && matchesCategory && matchesUser;
  });

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Role', 'Action', 'Resource', 'Details', 'IP Address', 'Severity'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.userName,
        log.userRole,
        log.action,
        log.resource,
        `"${log.details}"`,
        log.ipAddress,
        log.severity
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-logs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return <User className="w-4 h-4" />;
      case 'user_management': return <User className="w-4 h-4" />;
      case 'system_config': return <Settings className="w-4 h-4" />;
      case 'data_access': return <Database className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const uniqueUsers = [...new Set(auditLogs.map(log => log.userName))];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Audit Logs</h1>
        <p className="text-gray-600">Track all system activities and administrative actions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Events</p>
              <p className="text-2xl font-bold text-red-600">
                {auditLogs.filter(log => log.severity === 'critical').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed Logins</p>
              <p className="text-2xl font-bold text-orange-600">
                {auditLogs.filter(log => log.action === 'LOGIN_FAILED').length}
              </p>
            </div>
            <User className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-blue-600">{uniqueUsers.length}</p>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="authentication">Authentication</option>
            <option value="user_management">User Management</option>
            <option value="system_config">System Config</option>
            <option value="data_access">Data Access</option>
            <option value="security">Security</option>
          </select>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
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

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-xs">
                          {log.userName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                        <div className="text-xs text-gray-500">{log.userRole}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.resource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(log.category)}
                      <span className="text-sm text-gray-900 capitalize">{log.category.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
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

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Audit Log Details</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedLog.severity)}`}>
                  {selectedLog.severity}
                </span>
                <span className="text-sm text-gray-500">{new Date(selectedLog.timestamp).toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">User</h4>
                  <p className="text-gray-600">{selectedLog.userName} ({selectedLog.userRole})</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Action</h4>
                  <p className="text-gray-600">{selectedLog.action}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Resource</h4>
                  <p className="text-gray-600">{selectedLog.resource}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Category</h4>
                  <p className="text-gray-600 capitalize">{selectedLog.category.replace('_', ' ')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">IP Address</h4>
                  <p className="text-gray-600">{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">User Agent</h4>
                  <p className="text-gray-600 text-xs">{selectedLog.userAgent}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
                <p className="text-gray-600">{selectedLog.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};