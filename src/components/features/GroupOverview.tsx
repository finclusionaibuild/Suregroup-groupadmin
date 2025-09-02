import React, { useState } from 'react';
import { Users, Calendar, MessageSquare, TrendingUp, Settings, Eye, ExternalLink, Edit, BarChart3 } from 'lucide-react';

interface GroupStats {
  totalMembers: number;
  activeMembers: number;
  pendingMembers: number;
  monthlyGrowth: number;
  engagementRate: number;
  eventAttendance: number;
  messageActivity: number;
  contributionTotal: number;
}

interface GroupInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  createdDate: string;
  adminName: string;
  website?: string;
  contactEmail: string;
  profileImage?: string;
  coverImage?: string;
  rules: string[];
  tags: string[];
  visibility: 'public' | 'private' | 'invite-only';
}

export const GroupOverview: React.FC = () => {
  const [groupInfo] = useState<GroupInfo>({
    id: '1',
    name: 'Community Church',
    description: 'A welcoming community focused on faith, fellowship, and service to others.',
    category: 'Religious',
    location: 'Lagos, Nigeria',
    createdDate: '2024-12-01',
    adminName: 'Pastor John',
    website: 'https://communitychurch.org',
    contactEmail: 'info@communitychurch.org',
    profileImage: 'https://images.pexels.com/photos/208359/pexels-photo-208359.jpeg?auto=compress&cs=tinysrgb&w=400',
    rules: [
      'Treat all members with respect and kindness',
      'No offensive language or inappropriate content',
      'Stay on topic in discussions',
      'Respect privacy and confidentiality',
      'Follow community guidelines at all times'
    ],
    tags: ['Faith', 'Community', 'Service', 'Fellowship'],
    visibility: 'public'
  });

  const [groupStats] = useState<GroupStats>({
    totalMembers: 1247,
    activeMembers: 1156,
    pendingMembers: 15,
    monthlyGrowth: 18.5,
    engagementRate: 94,
    eventAttendance: 87,
    messageActivity: 3420,
    contributionTotal: 12500
  });

  const [recentActivity] = useState([
    {
      id: '1',
      type: 'member_joined',
      title: '5 new members joined this week',
      time: '2 hours ago',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'event_created',
      title: 'Sunday Service scheduled for this week',
      time: '4 hours ago',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'content_posted',
      title: '12 new posts in community discussions',
      time: '6 hours ago',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'contribution_received',
      title: 'Monthly contributions received',
      time: '1 day ago',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]);

  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Group Overview</h1>
        <p className="text-gray-600">Comprehensive view of your group's profile and performance</p>
      </div>

      {/* Group Header */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center -mt-10 border-4 border-white">
                {groupInfo.profileImage ? (
                  <img 
                    src={groupInfo.profileImage} 
                    alt={`${groupInfo.name} profile`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-white font-bold text-2xl">CC</span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{groupInfo.name}</h2>
                <p className="text-gray-600">{groupInfo.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>{groupInfo.category}</span>
                  <span>•</span>
                  <span>{groupInfo.location}</span>
                  <span>•</span>
                  <span>Created {new Date(groupInfo.createdDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Group</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {groupInfo.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{groupStats.totalMembers.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+{groupStats.monthlyGrowth}% this month</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-green-600">{groupStats.activeMembers.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{Math.round((groupStats.activeMembers / groupStats.totalMembers) * 100)}% of total</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
              <p className="text-2xl font-bold text-purple-600">{groupStats.engagementRate}%</p>
              <p className="text-xs text-green-600 mt-1">Above average</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-orange-600">${groupStats.contributionTotal.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+24% increase</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Group Details and Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Category</p>
                <p className="text-gray-600">{groupInfo.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Visibility</p>
                <p className="text-gray-600 capitalize">{groupInfo.visibility}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Location</p>
                <p className="text-gray-600">{groupInfo.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-gray-600">{groupInfo.adminName}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Contact Information</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Email: {groupInfo.contactEmail}</p>
                {groupInfo.website && <p>Website: {groupInfo.website}</p>}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Group Rules</p>
              <ul className="space-y-1 text-sm text-gray-600">
                {groupInfo.rules.slice(0, 3).map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>{rule}</span>
                  </li>
                ))}
                {groupInfo.rules.length > 3 && (
                  <li className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    +{groupInfo.rules.length - 3} more rules
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 bg-white rounded-full flex items-center justify-center ${activity.color} shadow-sm`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{groupStats.engagementRate}%</p>
            <p className="text-sm text-gray-600">Member Engagement</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{groupStats.eventAttendance}%</p>
            <p className="text-sm text-gray-600">Event Attendance</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{groupStats.messageActivity.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Messages This Month</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">+{groupStats.monthlyGrowth}%</p>
            <p className="text-sm text-gray-600">Monthly Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};