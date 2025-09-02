import React, { useState } from 'react';
import { Upload, Save, Eye, Settings, Users, Globe, Shield, Image } from 'lucide-react';

interface GroupSettings {
  name: string;
  description: string;
  category: string;
  visibility: 'public' | 'private' | 'invite-only';
  location: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  logo: string;
  coverImage: string;
  rules: string[];
  tags: string[];
  maxMembers: number;
  requireApproval: boolean;
  allowInvites: boolean;
  enableChat: boolean;
  enableEvents: boolean;
  enableMarketplace: boolean;
}

export const GroupSetup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'settings' | 'rules' | 'features'>('basic');
  const [hasChanges, setHasChanges] = useState(false);
  
  const [groupSettings, setGroupSettings] = useState<GroupSettings>({
    name: 'Community Church',
    description: 'A welcoming community focused on faith, fellowship, and service to others.',
    category: 'Religious',
    visibility: 'public',
    location: 'Lagos, Nigeria',
    website: 'https://communitychurch.org',
    contactEmail: 'info@communitychurch.org',
    contactPhone: '+234 123 456 7890',
    logo: '',
    coverImage: '',
    rules: [
      'Treat all members with respect and kindness',
      'No offensive language or inappropriate content',
      'Stay on topic in discussions',
      'Respect privacy and confidentiality',
      'Follow community guidelines at all times'
    ],
    tags: ['Faith', 'Community', 'Service', 'Fellowship'],
    maxMembers: 500,
    requireApproval: true,
    allowInvites: true,
    enableChat: true,
    enableEvents: true,
    enableMarketplace: false
  });

  const [newRule, setNewRule] = useState('');
  const [newTag, setNewTag] = useState('');

  const categories = [
    'Religious', 'Professional', 'Educational', 'Social', 'Sports', 
    'Health', 'Technology', 'Arts', 'Community Service', 'Other'
  ];

  const handleSettingChange = (key: keyof GroupSettings, value: any) => {
    setGroupSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      handleSettingChange('rules', [...groupSettings.rules, newRule.trim()]);
      setNewRule('');
    }
  };

  const handleRemoveRule = (index: number) => {
    const updatedRules = groupSettings.rules.filter((_, i) => i !== index);
    handleSettingChange('rules', updatedRules);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !groupSettings.tags.includes(newTag.trim())) {
      handleSettingChange('tags', [...groupSettings.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = groupSettings.tags.filter(t => t !== tag);
    handleSettingChange('tags', updatedTags);
  };

  const handleSave = () => {
    // Simulate saving
    console.log('Saving group settings:', groupSettings);
    setHasChanges(false);
    alert('Group settings saved successfully!');
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      const url = URL.createObjectURL(file);
      handleSettingChange('logo', url);
    }
  };

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      const url = URL.createObjectURL(file);
      handleSettingChange('coverImage', url);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Group Setup</h1>
        <p className="text-gray-600">Configure your group settings, rules, and features</p>
      </div>

      {/* Save Changes Banner */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-yellow-800">You have unsaved changes</span>
            </div>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('basic')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'basic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Basic Information
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Group Settings
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rules & Guidelines
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'features'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Features & Permissions
            </button>
          </nav>
        </div>
      </div>

      {/* Basic Information Tab */}
      {activeTab === 'basic' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Group Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                <input
                  type="text"
                  value={groupSettings.name}
                  onChange={(e) => handleSettingChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={groupSettings.description}
                  onChange={(e) => handleSettingChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={groupSettings.category}
                  onChange={(e) => handleSettingChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={groupSettings.location}
                  onChange={(e) => handleSettingChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={groupSettings.website}
                  onChange={(e) => handleSettingChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={groupSettings.contactEmail}
                    onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={groupSettings.contactPhone}
                    onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Visual Identity</h2>
            
            <div className="space-y-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Logo</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    {groupSettings.logo ? (
                      <img src={groupSettings.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Image className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                      Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-2">
                  {groupSettings.coverImage ? (
                    <img src={groupSettings.coverImage} alt="Cover" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-center">
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Cover Image</p>
                    </div>
                  )}
                </div>
                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-sm">
                  Upload Cover Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {groupSettings.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <button
                    onClick={handleAddTag}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Group Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Group Settings</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                <select
                  value={groupSettings.visibility}
                  onChange={(e) => handleSettingChange('visibility', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">Public - Anyone can find and join</option>
                  <option value="private">Private - Invitation only</option>
                  <option value="invite-only">Invite Only - Members can invite others</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Members</label>
                <input
                  type="number"
                  value={groupSettings.maxMembers}
                  onChange={(e) => handleSettingChange('maxMembers', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Require Approval for New Members</p>
                    <p className="text-xs text-gray-500">Admin must approve all join requests</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('requireApproval', !groupSettings.requireApproval)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      groupSettings.requireApproval ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      groupSettings.requireApproval ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Allow Member Invitations</p>
                    <p className="text-xs text-gray-500">Members can invite others to join</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('allowInvites', !groupSettings.allowInvites)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      groupSettings.allowInvites ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      groupSettings.allowInvites ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900">Privacy & Security</h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm font-medium text-gray-900">Content Moderation</h4>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700">Auto-moderate inappropriate content</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700">Require admin approval for posts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Allow anonymous feedback</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rules & Guidelines Tab */}
      {activeTab === 'rules' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Group Rules & Guidelines</h2>
          
          <div className="space-y-4 mb-6">
            {groupSettings.rules.map((rule, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-500 mt-1">{index + 1}.</span>
                <p className="flex-1 text-sm text-gray-700">{rule}</p>
                <button
                  onClick={() => handleRemoveRule(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a new rule or guideline"
              onKeyPress={(e) => e.key === 'Enter' && handleAddRule()}
            />
            <button
              onClick={handleAddRule}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Rule
            </button>
          </div>
        </div>
      )}

      {/* Features & Permissions Tab */}
      {activeTab === 'features' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Features & Permissions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Group Chat</p>
                    <p className="text-xs text-gray-500">Enable messaging between members</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('enableChat', !groupSettings.enableChat)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    groupSettings.enableChat ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    groupSettings.enableChat ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Events</p>
                    <p className="text-xs text-gray-500">Allow event creation and management</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('enableEvents', !groupSettings.enableEvents)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    groupSettings.enableEvents ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    groupSettings.enableEvents ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Marketplace</p>
                    <p className="text-xs text-gray-500">Enable marketplace for group commerce</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('enableMarketplace', !groupSettings.enableMarketplace)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    groupSettings.enableMarketplace ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    groupSettings.enableMarketplace ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-3">Group Preview</h3>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    {groupSettings.logo ? (
                      <img src={groupSettings.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Users className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{groupSettings.name}</h4>
                    <p className="text-xs text-gray-500">{groupSettings.category} • {groupSettings.location}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{groupSettings.description}</p>
                <div className="flex flex-wrap gap-1">
                  {groupSettings.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};