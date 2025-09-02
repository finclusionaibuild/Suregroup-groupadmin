import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Database, Server, Mail, Shield, Globe, Bell } from 'lucide-react';

interface SystemConfig {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  supportEmail: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailVerificationRequired: boolean;
  maxFileUploadSize: number;
  sessionTimeout: number;
  passwordMinLength: number;
  enableTwoFactor: boolean;
  enableSMS: boolean;
  defaultTimezone: string;
  defaultCurrency: string;
  defaultLanguage: string;
}

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  maxConnections: number;
  connectionTimeout: number;
  backupFrequency: string;
  retentionDays: number;
}

interface EmailConfig {
  provider: string;
  smtpHost: string;
  smtpPort: number;
  username: string;
  encryption: string;
  fromName: string;
  fromEmail: string;
}

export const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'database' | 'email' | 'security' | 'localization'>('general');
  const [hasChanges, setHasChanges] = useState(false);

  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    siteName: 'SureGroups Platform',
    siteUrl: 'https://app.suregroups.com',
    adminEmail: 'admin@suregroups.com',
    supportEmail: 'support@suregroups.com',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    maxFileUploadSize: 10,
    sessionTimeout: 30,
    passwordMinLength: 8,
    enableTwoFactor: true,
    enableSMS: true,
    defaultTimezone: 'UTC',
    defaultCurrency: 'USD',
    defaultLanguage: 'English'
  });

  const [databaseConfig, setDatabaseConfig] = useState<DatabaseConfig>({
    host: 'db.suregroups.com',
    port: 5432,
    database: 'suregroups_prod',
    maxConnections: 100,
    connectionTimeout: 30,
    backupFrequency: 'daily',
    retentionDays: 30
  });

  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    provider: 'SendGrid',
    smtpHost: 'smtp.sendgrid.net',
    smtpPort: 587,
    username: 'apikey',
    encryption: 'TLS',
    fromName: 'SureGroups',
    fromEmail: 'noreply@suregroups.com'
  });

  const handleSystemConfigChange = (key: keyof SystemConfig, value: any) => {
    setSystemConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleDatabaseConfigChange = (key: keyof DatabaseConfig, value: any) => {
    setDatabaseConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleEmailConfigChange = (key: keyof EmailConfig, value: any) => {
    setEmailConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate saving
    console.log('Saving system settings:', { systemConfig, databaseConfig, emailConfig });
    setHasChanges(false);
    alert('System settings saved successfully!');
  };

  const handleReset = () => {
    // Reset to defaults
    setHasChanges(false);
    alert('Settings reset to defaults');
  };

  const testDatabaseConnection = () => {
    alert('Database connection test successful!');
  };

  const testEmailConfiguration = () => {
    alert('Test email sent successfully!');
  };

  const timezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese'];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure platform-wide settings and preferences</p>
      </div>

      {/* Save Changes Banner */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-yellow-800">You have unsaved changes</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleReset}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'database'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Database
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'email'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('localization')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'localization'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Localization
            </button>
          </nav>
        </div>
      </div>

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={systemConfig.siteName}
                  onChange={(e) => handleSystemConfigChange('siteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                <input
                  type="url"
                  value={systemConfig.siteUrl}
                  onChange={(e) => handleSystemConfigChange('siteUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                <input
                  type="email"
                  value={systemConfig.adminEmail}
                  onChange={(e) => handleSystemConfigChange('adminEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                <input
                  type="email"
                  value={systemConfig.supportEmail}
                  onChange={(e) => handleSystemConfigChange('supportEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Maintenance Mode</p>
                  <p className="text-xs text-gray-500">Temporarily disable site access</p>
                </div>
                <button
                  onClick={() => handleSystemConfigChange('maintenanceMode', !systemConfig.maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    systemConfig.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    systemConfig.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">User Registration</p>
                  <p className="text-xs text-gray-500">Allow new user signups</p>
                </div>
                <button
                  onClick={() => handleSystemConfigChange('registrationEnabled', !systemConfig.registrationEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    systemConfig.registrationEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    systemConfig.registrationEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Email Verification</p>
                  <p className="text-xs text-gray-500">Require email verification for new users</p>
                </div>
                <button
                  onClick={() => handleSystemConfigChange('emailVerificationRequired', !systemConfig.emailVerificationRequired)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    systemConfig.emailVerificationRequired ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    systemConfig.emailVerificationRequired ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max File Upload Size (MB)</label>
                <input
                  type="number"
                  value={systemConfig.maxFileUploadSize}
                  onChange={(e) => handleSystemConfigChange('maxFileUploadSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={systemConfig.sessionTimeout}
                  onChange={(e) => handleSystemConfigChange('sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Database Settings Tab */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Database Configuration</h2>
            <button
              onClick={testDatabaseConnection}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <Database className="w-4 h-4" />
              <span>Test Connection</span>
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Database Host</label>
                <input
                  type="text"
                  value={databaseConfig.host}
                  onChange={(e) => handleDatabaseConfigChange('host', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                <input
                  type="number"
                  value={databaseConfig.port}
                  onChange={(e) => handleDatabaseConfigChange('port', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Database Name</label>
                <input
                  type="text"
                  value={databaseConfig.database}
                  onChange={(e) => handleDatabaseConfigChange('database', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Connections</label>
                <input
                  type="number"
                  value={databaseConfig.maxConnections}
                  onChange={(e) => handleDatabaseConfigChange('maxConnections', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Connection Timeout (seconds)</label>
                <input
                  type="number"
                  value={databaseConfig.connectionTimeout}
                  onChange={(e) => handleDatabaseConfigChange('connectionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                <select
                  value={databaseConfig.backupFrequency}
                  onChange={(e) => handleDatabaseConfigChange('backupFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Backup Retention (days)</label>
                <input
                  type="number"
                  value={databaseConfig.retentionDays}
                  onChange={(e) => handleDatabaseConfigChange('retentionDays', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Settings Tab */}
      {activeTab === 'email' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Email Configuration</h2>
            <button
              onClick={testEmailConfiguration}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send Test Email</span>
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Provider</label>
                <select
                  value={emailConfig.provider}
                  onChange={(e) => handleEmailConfigChange('provider', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="SendGrid">SendGrid</option>
                  <option value="Mailgun">Mailgun</option>
                  <option value="AWS SES">AWS SES</option>
                  <option value="SMTP">Custom SMTP</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                <input
                  type="text"
                  value={emailConfig.smtpHost}
                  onChange={(e) => handleEmailConfigChange('smtpHost', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                <input
                  type="number"
                  value={emailConfig.smtpPort}
                  onChange={(e) => handleEmailConfigChange('smtpPort', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={emailConfig.username}
                  onChange={(e) => handleEmailConfigChange('username', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                <select
                  value={emailConfig.encryption}
                  onChange={(e) => handleEmailConfigChange('encryption', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="TLS">TLS</option>
                  <option value="SSL">SSL</option>
                  <option value="None">None</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                <input
                  type="text"
                  value={emailConfig.fromName}
                  onChange={(e) => handleEmailConfigChange('fromName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                <input
                  type="email"
                  value={emailConfig.fromEmail}
                  onChange={(e) => handleEmailConfigChange('fromEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
              <input
                type="number"
                value={systemConfig.passwordMinLength}
                onChange={(e) => handleSystemConfigChange('passwordMinLength', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Enable 2FA for all users</p>
              </div>
              <button
                onClick={() => handleSystemConfigChange('enableTwoFactor', !systemConfig.enableTwoFactor)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  systemConfig.enableTwoFactor ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  systemConfig.enableTwoFactor ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">SMS Notifications</p>
                <p className="text-xs text-gray-500">Enable SMS for critical notifications</p>
              </div>
              <button
                onClick={() => handleSystemConfigChange('enableSMS', !systemConfig.enableSMS)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  systemConfig.enableSMS ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  systemConfig.enableSMS ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Localization Tab */}
      {activeTab === 'localization' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Localization Settings</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Timezone</label>
              <select
                value={systemConfig.defaultTimezone}
                onChange={(e) => handleSystemConfigChange('defaultTimezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
              <select
                value={systemConfig.defaultCurrency}
                onChange={(e) => handleSystemConfigChange('defaultCurrency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
              <select
                value={systemConfig.defaultLanguage}
                onChange={(e) => handleSystemConfigChange('defaultLanguage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};