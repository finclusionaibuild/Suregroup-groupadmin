import React, { useState } from 'react';
import { Shield, Key, Lock, AlertTriangle, Eye, Settings, Users, Database } from 'lucide-react';

interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
}

interface SecurityIncident {
  id: string;
  type: 'login_attempt' | 'data_breach' | 'unauthorized_access' | 'malware' | 'ddos';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  affectedUsers: number;
  detectedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
}

interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  status: 'success' | 'failed' | 'blocked';
}

export const SecurityManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'policies' | 'incidents' | 'access-logs' | 'monitoring'>('policies');

  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>([
    {
      id: '1',
      name: 'Password Complexity',
      description: 'Enforce strong password requirements with minimum 8 characters, uppercase, lowercase, numbers, and symbols',
      enabled: true,
      severity: 'high',
      lastUpdated: '2025-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Account Lockout',
      description: 'Lock accounts after 5 failed login attempts for 30 minutes',
      enabled: true,
      severity: 'medium',
      lastUpdated: '2025-01-01T00:00:00Z'
    },
    {
      id: '3',
      name: 'Session Management',
      description: 'Automatic session timeout after 30 minutes of inactivity',
      enabled: true,
      severity: 'medium',
      lastUpdated: '2025-01-01T00:00:00Z'
    },
    {
      id: '4',
      name: 'IP Whitelisting',
      description: 'Restrict admin access to specific IP addresses',
      enabled: false,
      severity: 'high',
      lastUpdated: '2025-01-01T00:00:00Z'
    },
    {
      id: '5',
      name: 'Data Encryption',
      description: 'Encrypt all sensitive data at rest and in transit',
      enabled: true,
      severity: 'critical',
      lastUpdated: '2025-01-01T00:00:00Z'
    }
  ]);

  const [securityIncidents, setSecurityIncidents] = useState<SecurityIncident[]>([
    {
      id: '1',
      type: 'login_attempt',
      severity: 'medium',
      description: 'Multiple failed login attempts detected from suspicious IP address',
      status: 'resolved',
      affectedUsers: 1,
      detectedAt: '2025-01-14T10:30:00Z',
      resolvedAt: '2025-01-14T11:15:00Z',
      assignedTo: 'Security Team'
    },
    {
      id: '2',
      type: 'unauthorized_access',
      severity: 'high',
      description: 'Attempt to access admin panel with invalid credentials',
      status: 'investigating',
      affectedUsers: 0,
      detectedAt: '2025-01-13T22:45:00Z',
      assignedTo: 'Security Team'
    },
    {
      id: '3',
      type: 'ddos',
      severity: 'critical',
      description: 'DDoS attack detected on API endpoints',
      status: 'resolved',
      affectedUsers: 1500,
      detectedAt: '2025-01-12T16:20:00Z',
      resolvedAt: '2025-01-12T18:30:00Z',
      assignedTo: 'Infrastructure Team'
    }
  ]);

  const [accessLogs] = useState<AccessLog[]>([
    {
      id: '1',
      userId: '1',
      userName: 'John Admin',
      action: 'LOGIN',
      resource: 'Admin Dashboard',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      timestamp: '2025-01-14T10:30:00Z',
      status: 'success'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sarah Admin',
      action: 'USER_UPDATE',
      resource: 'User Management',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (macOS)',
      timestamp: '2025-01-14T09:15:00Z',
      status: 'success'
    },
    {
      id: '3',
      userId: 'unknown',
      userName: 'Unknown User',
      action: 'LOGIN_FAILED',
      resource: 'Admin Dashboard',
      ipAddress: '10.0.0.50',
      userAgent: 'Unknown',
      timestamp: '2025-01-13T22:45:00Z',
      status: 'failed'
    }
  ]);

  const togglePolicy = (policyId: string) => {
    setSecurityPolicies(policies => 
      policies.map(policy => 
        policy.id === policyId 
          ? { ...policy, enabled: !policy.enabled, lastUpdated: new Date().toISOString() }
          : policy
      )
    );
  };

  const updateIncidentStatus = (incidentId: string, status: SecurityIncident['status']) => {
    setSecurityIncidents(incidents => 
      incidents.map(incident => 
        incident.id === incidentId 
          ? { 
              ...incident, 
              status,
              resolvedAt: status === 'resolved' ? new Date().toISOString() : incident.resolvedAt
            }
          : incident
      )
    );
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700';
      case 'investigating': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAccessStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'blocked': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const enabledPolicies = securityPolicies.filter(p => p.enabled).length;
  const openIncidents = securityIncidents.filter(i => i.status === 'open' || i.status === 'investigating').length;
  const criticalIncidents = securityIncidents.filter(i => i.severity === 'critical').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security Management</h1>
        <p className="text-gray-600">Monitor and manage platform security policies and incidents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Policies</p>
              <p className="text-2xl font-bold text-green-600">{enabledPolicies}</p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Incidents</p>
              <p className="text-2xl font-bold text-red-600">{openIncidents}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Issues</p>
              <p className="text-2xl font-bold text-orange-600">{criticalIncidents}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-blue-600">94/100</p>
            </div>
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('policies')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'policies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security Policies
            </button>
            <button
              onClick={() => setActiveTab('incidents')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'incidents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security Incidents
            </button>
            <button
              onClick={() => setActiveTab('access-logs')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'access-logs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Access Logs
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'monitoring'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security Monitoring
            </button>
          </nav>
        </div>
      </div>

      {/* Security Policies Tab */}
      {activeTab === 'policies' && (
        <div className="space-y-4">
          {securityPolicies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{policy.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(policy.severity)}`}>
                      {policy.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{policy.description}</p>
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <button
                    onClick={() => togglePolicy(policy.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      policy.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      policy.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                  <span className={`text-sm font-medium ${policy.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                    {policy.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Security Incidents Tab */}
      {activeTab === 'incidents' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affected Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detected</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {securityIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{incident.description}</div>
                      {incident.assignedTo && (
                        <div className="text-xs text-gray-500">Assigned to: {incident.assignedTo}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">{incident.type.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {incident.affectedUsers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(incident.detectedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        {incident.status !== 'resolved' && (
                          <button
                            onClick={() => updateIncidentStatus(incident.id, 'resolved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Access Logs Tab */}
      {activeTab === 'access-logs' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                      <div className="text-xs text-gray-500">ID: {log.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.resource}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Security Monitoring Tab */}
      {activeTab === 'monitoring' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Monitoring</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Firewall Status</p>
                    <p className="text-xs text-green-600">All systems protected</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Database Security</p>
                    <p className="text-xs text-blue-600">Encryption enabled</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Secure</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Key className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">API Security</p>
                    <p className="text-xs text-yellow-600">Rate limiting active</p>
                  </div>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Monitoring</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Metrics</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">99.8%</p>
                <p className="text-sm text-gray-600">Security Uptime</p>
                <p className="text-xs text-green-600 mt-1">Last 30 days</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-600">2.4M</p>
                  <p className="text-xs text-gray-600">Requests Blocked</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-red-600">156</p>
                  <p className="text-xs text-gray-600">Threats Detected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};