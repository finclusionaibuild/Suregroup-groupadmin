import React, { useState } from 'react';
import { Search, Users, MapPin, Calendar, Star, Send, Check, Clock, Plus, Eye, MessageSquare, Settings } from 'lucide-react';

interface MyGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  location: string;
  rating: number;
  isJoined: boolean;
  role: 'admin' | 'moderator' | 'member';
  joinDate?: string;
  lastActivity: string;
  unreadMessages: number;
  upcomingEvents: number;
}

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
  profileImage: string;
}

export const MyGroups: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-groups' | 'discover' | 'invites'>('my-groups');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [myGroups] = useState<MyGroup[]>([
    {
      id: '1',
      name: 'Community Church',
      description: 'Main church community for worship and fellowship',
      category: 'Religious',
      memberCount: 245,
      location: 'Lagos, Nigeria',
      rating: 4.9,
      isJoined: true,
      role: 'member',
      joinDate: '2024-12-01',
      lastActivity: '2025-01-14T10:30:00Z',
      unreadMessages: 5,
      upcomingEvents: 2
    },
    {
      id: '2',
      name: 'Youth Ministry',
      description: 'Youth group for teenagers and young adults',
      category: 'Religious',
      memberCount: 67,
      location: 'Lagos, Nigeria',
      rating: 4.8,
      isJoined: true,
      role: 'moderator',
      joinDate: '2024-12-15',
      lastActivity: '2025-01-14T08:15:00Z',
      unreadMessages: 3,
      upcomingEvents: 1
    },
    {
      id: '3',
      name: 'Community Care',
      description: 'Community service and volunteer activities',
      category: 'Community Service',
      memberCount: 89,
      location: 'Lagos, Nigeria',
      rating: 4.7,
      isJoined: true,
      role: 'member',
      joinDate: '2025-01-05',
      lastActivity: '2025-01-13T16:45:00Z',
      unreadMessages: 1,
      upcomingEvents: 3
    }
  ]);

  const [availableGroups] = useState<AvailableGroup[]>([
    {
      id: '4',
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
      createdDate: '2024-12-01',
      profileImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '5',
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
      createdDate: '2024-11-15',
      profileImage: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '6',
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
      createdDate: '2024-10-20',
      profileImage: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ]);

  const [joinRequests, setJoinRequests] = useState<string[]>([]);

  const filteredMyGroups = myGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || group.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const filteredAvailableGroups = availableGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || group.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleJoinGroup = (groupId: string) => {
    setJoinRequests([...joinRequests, groupId]);
  };

  const handleLeaveGroup = (groupId: string) => {
    // Handle leaving group
    console.log('Leaving group:', groupId);
    alert('Left group successfully');
  };

  const categories = ['all', 'Religious', 'Professional', 'Health', 'Arts', 'Community Service', 'Sports'];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'moderator': return 'bg-purple-100 text-purple-700';
      case 'member': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalUnreadMessages = myGroups.reduce((sum, group) => sum + group.unreadMessages, 0);
  const totalUpcomingEvents = myGroups.reduce((sum, group) => sum + group.upcomingEvents, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Groups</h1>
        <p className="text-gray-600">Manage your group memberships and discover new communities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Groups</p>
              <p className="text-2xl font-bold text-blue-600">{myGroups.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
              <p className="text-2xl font-bold text-green-600">{totalUnreadMessages}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-purple-600">{totalUpcomingEvents}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Groups</p>
              <p className="text-2xl font-bold text-orange-600">{availableGroups.length}</p>
            </div>
            <Plus className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('my-groups')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'my-groups'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Groups ({myGroups.length})
            </button>
            <button
              onClick={() => setActiveTab('discover')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'discover'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Discover Groups ({availableGroups.length})
            </button>
            <button
              onClick={() => setActiveTab('invites')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invites'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Invitations
            </button>
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
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

      {/* My Groups Tab */}
      {activeTab === 'my-groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMyGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(group.role)}`}>
                      {group.role}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
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
                  <span>Joined {group.joinDate ? new Date(group.joinDate).toLocaleDateString() : 'Recently'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">{group.unreadMessages}</p>
                  <p className="text-xs text-blue-600">Unread Messages</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">{group.upcomingEvents}</p>
                  <p className="text-xs text-green-600">Upcoming Events</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 text-sm flex items-center justify-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discover Groups Tab */}
      {activeTab === 'discover' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAvailableGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={group.profileImage} 
                  alt={group.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                    {group.isPrivate && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Private</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                </div>
              </div>
              
              <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {group.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
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
      )}

      {/* Invitations Tab */}
      {activeTab === 'invites' && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Invitations</h3>
          <p className="text-gray-500">You don't have any pending group invitations at the moment.</p>
        </div>
      )}
    </div>
  );
};