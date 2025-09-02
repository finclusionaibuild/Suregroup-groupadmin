import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Globe, Github, Linkedin, Shield, Edit, Save, BarChart3, CheckCircle } from 'lucide-react';
import { DeveloperProfile as DeveloperProfileType } from '../../types';

export const DeveloperProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState<DeveloperProfileType>({
    id: 'dev_123',
    fullName: 'John Developer',
    email: 'john.dev@example.com',
    company: 'TechCorp Solutions',
    website: 'https://techcorp.com',
    github: 'https://github.com/johndeveloper',
    linkedin: 'https://linkedin.com/in/johndeveloper',
    bio: 'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about API design and developer experience.',
    tier: 'tier2',
    verificationStatus: {
      bvn: true,
      nin: true,
      business: false,
      liveliness: true
    },
    createdAt: '2025-01-01T00:00:00Z'
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'tier1': return 'bg-orange-100 text-orange-700';
      case 'tier2': return 'bg-blue-100 text-blue-700';
      case 'tier3': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case 'tier1': return 'Bronze Developer';
      case 'tier2': return 'Silver Developer';
      case 'tier3': return 'Gold Developer';
      default: return 'Unverified';
    }
  };

  const getVerificationProgress = () => {
    const total = Object.keys(profile.verificationStatus).length;
    const completed = Object.values(profile.verificationStatus).filter(Boolean).length;
    return (completed / total) * 100;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Developer Profile</h1>
        <p className="text-gray-600">Manage your developer profile and verification status</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                    className="text-2xl font-bold text-gray-900 w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  <h3 className="text-2xl font-bold text-gray-900">{profile.fullName}</h3>
                )}
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(profile.tier)}`}>
                    {getTierName(profile.tier)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Member since {new Date(profile.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profile.email}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.company || ''}
                    onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profile.company || 'Not specified'}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editForm.website || ''}
                    onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {profile.website || 'Not specified'}
                    </a>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editForm.github || ''}
                    onChange={(e) => setEditForm({...editForm, github: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Github className="w-4 h-4 text-gray-500" />
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {profile.github || 'Not specified'}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              ) : (
                <p className="text-gray-700">{profile.bio}</p>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Verification Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Verification Progress</span>
                <span className="text-sm text-gray-900">{getVerificationProgress().toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getVerificationProgress()}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">BVN Verification</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  profile.verificationStatus.bvn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {profile.verificationStatus.bvn ? 'Verified' : 'Pending'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">NIN Verification</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  profile.verificationStatus.nin ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {profile.verificationStatus.nin ? 'Verified' : 'Pending'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Business Verification</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  profile.verificationStatus.business ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {profile.verificationStatus.business ? 'Verified' : 'Pending'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Liveliness Check</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  profile.verificationStatus.liveliness ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {profile.verificationStatus.liveliness ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Developer Tier</h3>
            
            <div className="text-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                profile.tier === 'tier3' ? 'bg-purple-100' :
                profile.tier === 'tier2' ? 'bg-blue-100' : 'bg-orange-100'
              }`}>
                <Shield className={`w-8 h-8 ${
                  profile.tier === 'tier3' ? 'text-purple-600' :
                  profile.tier === 'tier2' ? 'text-blue-600' : 'text-orange-600'
                }`} />
              </div>
              <h4 className="text-lg font-bold text-gray-900">{getTierName(profile.tier)}</h4>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getTierColor(profile.tier)}`}>
                {profile.tier.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">API Rate Limit:</span>
                <span className="text-gray-900">
                  {profile.tier === 'tier3' ? '50K/month' :
                   profile.tier === 'tier2' ? '20K/month' : '5K/month'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Webhook Events:</span>
                <span className="text-gray-900">
                  {profile.tier === 'tier3' ? 'All Events' :
                   profile.tier === 'tier2' ? 'Standard Events' : 'Basic Events'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Support Level:</span>
                <span className="text-gray-900">
                  {profile.tier === 'tier3' ? 'Priority' :
                   profile.tier === 'tier2' ? 'Standard' : 'Community'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Access</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-lg font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Active API Keys</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-lg font-bold text-gray-900">12.4K</p>
                <p className="text-sm text-gray-600">Monthly Requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">API Requests</p>
                  <p className="text-xs text-blue-600">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">12.4K</p>
                  <p className="text-xs text-blue-500">+23% growth</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Success Rate</p>
                  <p className="text-xs text-green-600">API reliability</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">99.2%</p>
                  <p className="text-xs text-green-500">Excellent</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-900">Response Time</p>
                  <p className="text-xs text-purple-600">Average latency</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600">145ms</p>
                  <p className="text-xs text-purple-500">Fast</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">API key generated</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Webhook configured</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Profile updated</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};