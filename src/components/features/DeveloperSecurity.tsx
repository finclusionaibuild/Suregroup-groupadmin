import React, { useState } from 'react';
import { Shield, CheckCircle, Clock, X, Upload, Eye, EyeOff, Key, Smartphone, Users } from 'lucide-react';

interface KYCVerification {
  tier: 'tier1' | 'tier2' | 'tier3';
  name: string;
  description: string;
  requirements: string[];
  status: 'pending' | 'verified' | 'rejected';
  completedAt?: string;
  documents?: string[];
}

export const DeveloperSecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kyc' | 'permissions' | 'compliance' | 'auth'>('kyc');
  
  const [kycVerifications, setKycVerifications] = useState<KYCVerification[]>([
    {
      tier: 'tier1',
      name: 'Tier 1 - Basic Verification',
      description: 'BVN verification with liveliness and selfie check',
      requirements: ['Valid BVN', 'Selfie verification', 'Liveliness check'],
      status: 'verified',
      completedAt: '2025-01-01T00:00:00Z',
      documents: ['BVN Certificate', 'Selfie Photo', 'Liveliness Video']
    },
    {
      tier: 'tier2',
      name: 'Tier 2 - Identity Verification',
      description: 'NIN verification for enhanced identity confirmation',
      requirements: ['Valid NIN', 'Government-issued ID', 'Address verification'],
      status: 'verified',
      completedAt: '2025-01-01T00:00:00Z',
      documents: ['NIN Certificate', 'National ID', 'Utility Bill']
    },
    {
      tier: 'tier3',
      name: 'Tier 3 - Business Verification',
      description: 'Business registration and corporate verification',
      requirements: ['CAC Registration', 'Tax ID', 'Business Address', 'Director Information'],
      status: 'pending',
      documents: ['CAC Certificate (Pending)', 'Tax Certificate (Pending)']
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    pinLoginEnabled: false,
    biometricEnabled: true,
    apiKeyRotation: true,
    sessionTimeout: 30,
    ipWhitelist: false
  });

  const [apiPermissions] = useState([
    { scope: 'users:read', description: 'Read user information', granted: true },
    { scope: 'users:write', description: 'Create and update users', granted: false },
    { scope: 'groups:read', description: 'Read group information', granted: true },
    { scope: 'groups:write', description: 'Create and update groups', granted: false },
    { scope: 'transactions:read', description: 'Read transaction data', granted: true },
    { scope: 'transactions:write', description: 'Process transactions', granted: false },
    { scope: 'events:read', description: 'Read event information', granted: true },
    { scope: 'events:write', description: 'Create and manage events', granted: false }
  ]);

  const [complianceItems] = useState([
    { 
      id: '1', 
      title: 'Data Protection Agreement', 
      description: 'GDPR and local data protection compliance',
      status: 'signed',
      signedDate: '2025-01-01'
    },
    { 
      id: '2', 
      title: 'Terms of Service', 
      description: 'Developer terms and conditions',
      status: 'signed',
      signedDate: '2025-01-01'
    },
    { 
      id: '3', 
      title: 'Security Audit', 
      description: 'Annual security compliance review',
      status: 'pending',
      dueDate: '2025-06-01'
    }
  ]);

  const handleUploadDocument = (tier: string) => {
    alert(`Document upload for ${tier} initiated. In production, this would open a file picker.`);
  };

  const handleToggleSetting = (setting: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-5 h-5" />;
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'rejected': return <X className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'expired': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const verifiedTiers = kycVerifications.filter(kyc => kyc.status === 'verified').length;
  const pendingTiers = kycVerifications.filter(kyc => kyc.status === 'pending').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security & Compliance</h1>
        <p className="text-gray-600">Manage KYC verification, API permissions, and security settings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Tiers</p>
              <p className="text-2xl font-bold text-green-600">{verifiedTiers}/3</p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingTiers}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">API Permissions</p>
              <p className="text-2xl font-bold text-blue-600">{apiPermissions.filter(p => p.granted).length}</p>
            </div>
            <Key className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-purple-600">95/100</p>
            </div>
            <Shield className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('kyc')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'kyc'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              KYC Verification
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'permissions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              API Permissions
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'compliance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Compliance
            </button>
            <button
              onClick={() => setActiveTab('auth')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'auth'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Authentication
            </button>
          </nav>
        </div>
      </div>

      {/* KYC Verification Tab */}
      {activeTab === 'kyc' && (
        <div className="space-y-6">
          {kycVerifications.map((kyc) => (
            <div key={kyc.tier} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    kyc.status === 'verified' ? 'bg-green-100' : 
                    kyc.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {getVerificationIcon(kyc.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{kyc.name}</h3>
                    <p className="text-sm text-gray-600">{kyc.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getVerificationStatusColor(kyc.status)}`}>
                  {getVerificationIcon(kyc.status)}
                  <span className="ml-2 capitalize">{kyc.status}</span>
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {kyc.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Documents</h4>
                  <div className="space-y-2">
                    {kyc.documents?.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{doc}</span>
                        {kyc.status === 'verified' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {kyc.status === 'pending' && (
                <div className="mt-4">
                  <button
                    onClick={() => handleUploadDocument(kyc.tier)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Documents</span>
                  </button>
                </div>
              )}

              {kyc.completedAt && (
                <div className="mt-4 text-xs text-gray-500">
                  Verified on {new Date(kyc.completedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* API Permissions Tab */}
      {activeTab === 'permissions' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">API Access Permissions</h2>
          
          <div className="space-y-4">
            {apiPermissions.map((permission, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    permission.granted ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {permission.granted ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <code className="text-sm font-medium text-gray-900">{permission.scope}</code>
                    <p className="text-xs text-gray-500">{permission.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  permission.granted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {permission.granted ? 'Granted' : 'Not Granted'}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Permission Levels</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• <strong>Read permissions:</strong> Available to all verified developers</p>
              <p>• <strong>Write permissions:</strong> Require Tier 2+ verification and approval</p>
              <p>• <strong>Admin permissions:</strong> Require Tier 3 verification and special approval</p>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h2>
            <div className="space-y-4">
              {complianceItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                    {item.signedDate && (
                      <p className="text-xs text-green-600">Signed on {new Date(item.signedDate).toLocaleDateString()}</p>
                    )}
                    {item.dueDate && (
                      <p className="text-xs text-orange-600">Due by {new Date(item.dueDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getComplianceStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Logs</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">API key generated</p>
                  <p className="text-xs text-gray-500">Production key created</p>
                </div>
                <span className="text-xs text-gray-500">2025-01-14 10:30</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">KYC Tier 2 completed</p>
                  <p className="text-xs text-gray-500">NIN verification successful</p>
                </div>
                <span className="text-xs text-gray-500">2025-01-01 00:00</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Account created</p>
                  <p className="text-xs text-gray-500">Developer account registered</p>
                </div>
                <span className="text-xs text-gray-500">2025-01-01 00:00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Tab */}
      {activeTab === 'auth' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Authentication Settings</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-500">Add an extra layer of security</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleSetting('twoFactorEnabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securitySettings.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">PIN Login</p>
                  <p className="text-xs text-gray-500">Quick login with 4-digit PIN</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleSetting('pinLoginEnabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securitySettings.pinLoginEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.pinLoginEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Biometric Login</p>
                  <p className="text-xs text-gray-500">Fingerprint or face recognition</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleSetting('biometricEnabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securitySettings.biometricEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.biometricEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Automatic API Key Rotation</p>
                  <p className="text-xs text-gray-500">Rotate keys every 90 days</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleSetting('apiKeyRotation')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securitySettings.apiKeyRotation ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.apiKeyRotation ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Session Timeout</p>
                  <p className="text-xs text-gray-500">Auto-logout after inactivity</p>
                </div>
              </div>
              <select
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings(prev => ({...prev, sessionTimeout: parseInt(e.target.value)}))}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};