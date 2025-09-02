import React, { useState } from 'react';
import { Database, Download, Upload, Clock, CheckCircle, AlertTriangle, Play, Pause, Settings } from 'lucide-react';

interface BackupRecord {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: string;
  status: 'completed' | 'in-progress' | 'failed' | 'scheduled';
  createdAt: string;
  duration: string;
  location: string;
}

interface RecoveryPoint {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  size: string;
  verified: boolean;
  retentionDays: number;
}

interface BackupSchedule {
  id: string;
  name: string;
  type: 'full' | 'incremental';
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  time: string;
  enabled: boolean;
  lastRun?: string;
  nextRun: string;
}

export const BackupRecovery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'backups' | 'recovery' | 'schedule' | 'settings'>('backups');

  const [backupRecords, setBackupRecords] = useState<BackupRecord[]>([
    {
      id: '1',
      name: 'Daily Full Backup - 2025-01-14',
      type: 'full',
      size: '2.4 GB',
      status: 'completed',
      createdAt: '2025-01-14T02:00:00Z',
      duration: '45 minutes',
      location: 'AWS S3 - us-east-1'
    },
    {
      id: '2',
      name: 'Incremental Backup - 2025-01-14',
      type: 'incremental',
      size: '156 MB',
      status: 'completed',
      createdAt: '2025-01-14T08:00:00Z',
      duration: '8 minutes',
      location: 'AWS S3 - us-east-1'
    },
    {
      id: '3',
      name: 'Manual Backup - Emergency',
      type: 'full',
      size: '2.3 GB',
      status: 'in-progress',
      createdAt: '2025-01-14T10:30:00Z',
      duration: '15 minutes',
      location: 'AWS S3 - us-east-1'
    },
    {
      id: '4',
      name: 'Weekly Full Backup - 2025-01-13',
      type: 'full',
      size: '2.2 GB',
      status: 'completed',
      createdAt: '2025-01-13T02:00:00Z',
      duration: '42 minutes',
      location: 'AWS S3 - us-east-1'
    }
  ]);

  const [recoveryPoints] = useState<RecoveryPoint[]>([
    {
      id: '1',
      name: 'Pre-Migration Snapshot',
      description: 'System state before major feature deployment',
      timestamp: '2025-01-14T00:00:00Z',
      size: '2.4 GB',
      verified: true,
      retentionDays: 90
    },
    {
      id: '2',
      name: 'Weekly Checkpoint',
      description: 'Weekly system checkpoint with all user data',
      timestamp: '2025-01-13T02:00:00Z',
      size: '2.2 GB',
      verified: true,
      retentionDays: 30
    },
    {
      id: '3',
      name: 'Emergency Recovery Point',
      description: 'Created before security incident investigation',
      timestamp: '2025-01-12T16:00:00Z',
      size: '2.1 GB',
      verified: true,
      retentionDays: 60
    }
  ]);

  const [backupSchedules, setBackupSchedules] = useState<BackupSchedule[]>([
    {
      id: '1',
      name: 'Daily Full Backup',
      type: 'full',
      frequency: 'daily',
      time: '02:00',
      enabled: true,
      lastRun: '2025-01-14T02:00:00Z',
      nextRun: '2025-01-15T02:00:00Z'
    },
    {
      id: '2',
      name: 'Hourly Incremental',
      type: 'incremental',
      frequency: 'hourly',
      time: '00',
      enabled: true,
      lastRun: '2025-01-14T10:00:00Z',
      nextRun: '2025-01-14T11:00:00Z'
    },
    {
      id: '3',
      name: 'Weekly Archive',
      type: 'full',
      frequency: 'weekly',
      time: '01:00',
      enabled: false,
      nextRun: '2025-01-20T01:00:00Z'
    }
  ]);

  const handleManualBackup = () => {
    const newBackup: BackupRecord = {
      id: Date.now().toString(),
      name: `Manual Backup - ${new Date().toLocaleDateString()}`,
      type: 'full',
      size: 'Calculating...',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
      duration: 'In progress...',
      location: 'AWS S3 - us-east-1'
    };
    setBackupRecords([newBackup, ...backupRecords]);
    
    // Simulate backup completion
    setTimeout(() => {
      setBackupRecords(prev => prev.map(backup => 
        backup.id === newBackup.id 
          ? { ...backup, status: 'completed', size: '2.5 GB', duration: '38 minutes' }
          : backup
      ));
    }, 3000);
  };

  const handleRestore = (recoveryPointId: string) => {
    const recoveryPoint = recoveryPoints.find(rp => rp.id === recoveryPointId);
    if (recoveryPoint) {
      const confirmed = confirm(`Are you sure you want to restore from "${recoveryPoint.name}"? This action cannot be undone.`);
      if (confirmed) {
        alert('System restore initiated. This may take several minutes.');
      }
    }
  };

  const toggleSchedule = (scheduleId: string) => {
    setBackupSchedules(schedules => 
      schedules.map(schedule => 
        schedule.id === scheduleId 
          ? { ...schedule, enabled: !schedule.enabled }
          : schedule
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'scheduled': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full': return 'bg-blue-100 text-blue-700';
      case 'incremental': return 'bg-green-100 text-green-700';
      case 'differential': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const completedBackups = backupRecords.filter(b => b.status === 'completed').length;
  const totalBackupSize = backupRecords
    .filter(b => b.status === 'completed')
    .reduce((sum, backup) => {
      const size = parseFloat(backup.size.replace(/[^\d.]/g, ''));
      return sum + (backup.size.includes('GB') ? size : size / 1000);
    }, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Backup & Recovery</h1>
        <p className="text-gray-600">Manage system backups and disaster recovery</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Backups</p>
              <p className="text-2xl font-bold text-gray-900">{backupRecords.length}</p>
            </div>
            <Database className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedBackups}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-blue-600">{totalBackupSize.toFixed(1)} GB</p>
            </div>
            <Database className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recovery Points</p>
              <p className="text-2xl font-bold text-purple-600">{recoveryPoints.length}</p>
            </div>
            <Upload className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('backups')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'backups'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Backup History
            </button>
            <button
              onClick={() => setActiveTab('recovery')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recovery'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recovery Points
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Backup Schedule
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Backup History Tab */}
      {activeTab === 'backups' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Backup History</h2>
            <button
              onClick={handleManualBackup}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Database className="w-4 h-4" />
              <span>Create Manual Backup</span>
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Backup</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {backupRecords.map((backup) => (
                    <tr key={backup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                        <div className="text-xs text-gray-500">{backup.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(backup.type)}`}>
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
                              <button 
                                onClick={() => handleRestore(backup.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Upload className="w-4 h-4" />
                              </button>
                            </>
                          )}
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

      {/* Recovery Points Tab */}
      {activeTab === 'recovery' && (
        <div className="space-y-4">
          {recoveryPoints.map((point) => (
            <div key={point.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{point.name}</h3>
                    {point.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{point.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Created</p>
                      <p className="font-medium text-gray-900">{new Date(point.timestamp).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Size</p>
                      <p className="font-medium text-gray-900">{point.size}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Retention</p>
                      <p className="font-medium text-gray-900">{point.retentionDays} days</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleRestore(point.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Restore</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Backup Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          {backupSchedules.map((schedule) => (
            <div key={schedule.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{schedule.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(schedule.type)}`}>
                      {schedule.type}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Frequency</p>
                      <p className="font-medium text-gray-900 capitalize">{schedule.frequency}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time</p>
                      <p className="font-medium text-gray-900">{schedule.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Run</p>
                      <p className="font-medium text-gray-900">
                        {schedule.lastRun ? new Date(schedule.lastRun).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Run</p>
                      <p className="font-medium text-gray-900">{new Date(schedule.nextRun).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <button
                    onClick={() => toggleSchedule(schedule.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      schedule.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      schedule.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                  <span className={`text-sm font-medium ${schedule.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                    {schedule.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Backup Settings</h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">Storage Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Storage Provider</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="aws-s3">AWS S3</option>
                      <option value="google-cloud">Google Cloud Storage</option>
                      <option value="azure">Azure Blob Storage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Retention (days)</label>
                    <input
                      type="number"
                      defaultValue={30}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Compression Level</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="low">Low (Faster)</option>
                      <option value="medium">Medium (Balanced)</option>
                      <option value="high">High (Smaller Size)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                      <p className="text-xs text-gray-500">Get notified of backup status</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Slack Notifications</p>
                      <p className="text-xs text-gray-500">Send alerts to Slack channel</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Failure Alerts</p>
                      <p className="text-xs text-gray-500">Immediate alerts for failed backups</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
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