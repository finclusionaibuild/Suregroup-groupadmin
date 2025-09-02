import React, { useState } from 'react';
import { Search, Users, MapPin, Calendar, Star, Send, Check, Clock } from 'lucide-react';

interface AvailableGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  location: string;
  rating: number;
  isPrivate: boolean;
  requiresApproval: boolean;
  tags: string[];
  adminName: string;
  createdDate: string;
}

interface GroupInvite {
  id: string;
  groupName: string;
  invitedBy: string;
  message: string;
  receivedDate: string;
  status: 'pending' | 'accepted' | 'declined';
}

export const GroupEnrollment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'invites' | 'requests'>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [availableGroups] = useState<AvailableGroup[]>([
    {
      id: '1',
      name: 'Tech Innovators Hub',
      description: 'A community for technology professionals and entrepreneurs',
      category: 'Professional',
      memberCount: 234,
      location: 'Lagos, Nigeria',
      rating: 4.8,
      isPrivate: false,
      requiresApproval: true,
      tags: ['Technology', 'Innovation', 'Networking'],
      adminName: 'John Doe',
      createdDate: '2024-12-01'
    },
    {
      id: '2',
      name: 'Fitness Warriors',
      description: 'Stay fit and healthy with our supportive fitness community',
      category: 'Health',
      memberCount: 156,
      location: 'Abuja, Nigeria',
      rating: 4.6,
      isPrivate: false,
      requiresApproval: false,
      tags: ['Fitness', 'Health', 'Motivation'],
      adminName: 'Sarah Johnson',
      createdDate: '2024-11-15'
    },
    {
      id: '3',
      name: 'Creative Artists Network',
      description: 'Connect with fellow artists and showcase your creativity',
      category: 'Arts',
      memberCount: 89,
      location: 'Port Harcourt, Nigeria',
      rating: 4.9,
      isPrivate: true,
      requiresApproval: true,
      tags: ['Art', 'Creativity', 'Design'],
      adminName: 'Mike Wilson',
      createdDate: '2024-10-20'
    }
  ]);

  const [invites] = useState<GroupInvite[]>([
    {
      id: '1',
      groupName: 'Young Entrepreneurs',
      invitedBy: 'Alice Brown',
      message: 'Join our entrepreneurship group to network and grow your business!',
      receivedDate: '2025-01-14T10:30:00Z',
      status: 'pending'
    },
    {
      id: '2',
      groupName: 'Book Club Society',
      invitedBy: 'David Lee',
      message: 'We meet monthly to discuss amazing books. Would love to have you!',
      receivedDate: '2025-01-13T15:20:00Z',
      status: 'pending'
    }
  ]);

  const [joinRequests, setJoinRequests] = useState<string[]>([]);

  const filteredGroups = availableGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || group.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleJoinGroup = (groupId: string) => {
    setJoinRequests([...joinRequests, groupId]);
  };

  const handleInviteResponse = (inviteId: string, response: 'accepted' | 'declined') => {
    // Handle invite response
    console.log(`Invite ${inviteId} ${response}`);
  };

  const categories = ['all', 'Professional', 'Health', 'Arts', 'Religious', 'Community', 'Sports'];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Group Enrollment</h1>
        <p className="text-gray-600">Discover and join groups that match your interests</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Browse Groups
            </button>
            <button
              onClick={() => setActiveTab('invites')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invites'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Invitations ({invites.filter(i => i.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Requests ({joinRequests.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Browse Groups Tab */}
      {activeTab === 'browse' && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search groups..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                      {group.isPrivate && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Private</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {group.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{group.memberCount} members</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>{group.rating}/5.0</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Created {new Date(group.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Admin: {group.adminName}
                  {group.requiresApproval && (
                    <span className="block mt-1 text-orange-600">Requires approval to join</span>
                  )}
                </div>

                <button
                  onClick={() => handleJoinGroup(group.id)}
                  disabled={joinRequests.includes(group.id)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    joinRequests.includes(group.id)
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {joinRequests.includes(group.id) 
                    ? (group.requiresApproval ? 'Request Sent' : 'Joined') 
                    : (group.requiresApproval ? 'Request to Join' : 'Join Group')
                  }
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Invitations Tab */}
      {activeTab === 'invites' && (
        <div className="space-y-4">
          {invites.map((invite) => (
            <div key={invite.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{invite.groupName}</h3>
                  <p className="text-sm text-gray-600 mb-2">Invited by: <strong>{invite.invitedBy}</strong></p>
                  <p className="text-gray-700 mb-4">{invite.message}</p>
                  <p className="text-xs text-gray-500">
                    Received: {new Date(invite.receivedDate).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleInviteResponse(invite.id, 'accepted')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-1"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleInviteResponse(invite.id, 'declined')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
          {invites.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No pending invitations</p>
            </div>
          )}
        </div>
      )}

      {/* My Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {joinRequests.map((requestId) => {
            const group = availableGroups.find(g => g.id === requestId);
            if (!group) return null;
            
            return (
              <div key={requestId} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-yellow-600">
                      {group.requiresApproval ? 'Pending Approval' : 'Joined'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {joinRequests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No pending requests</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};