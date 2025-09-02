import React, { useState } from 'react';
import { TrendingUp, Users, Calendar, DollarSign, MessageSquare, Award, BarChart3, Target } from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  change: number;
  period: string;
}

interface GroupPerformance {
  groupId: string;
  groupName: string;
  memberCount: number;
  engagementScore: number;
  attendanceRate: number;
  contributionTotal: number;
  eventsHosted: number;
  messagesCount: number;
}

interface MemberEngagement {
  memberId: string;
  memberName: string;
  attendanceRate: number;
  contributionTotal: number;
  messagesCount: number;
  eventsAttended: number;
  lastActivity: string;
  engagementScore: number;
}

export const PerformanceTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'groups' | 'members' | 'trends'>('overview');
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const [metrics] = useState<PerformanceMetric[]>([
    {
      id: '1',
      name: 'Member Growth',
      value: 1247,
      target: 1200,
      unit: 'members',
      trend: 'up',
      change: 18.5,
      period: 'this month'
    },
    {
      id: '2',
      name: 'Event Attendance',
      value: 87,
      target: 80,
      unit: '%',
      trend: 'up',
      change: 7.2,
      period: 'this month'
    },
    {
      id: '3',
      name: 'Engagement Score',
      value: 9.2,
      target: 8.5,
      unit: '/10',
      trend: 'up',
      change: 8.2,
      period: 'this month'
    },
    {
      id: '4',
      name: 'Monthly Revenue',
      value: 12500,
      target: 10000,
      unit: '$',
      trend: 'up',
      change: 25.0,
      period: 'this month'
    },
    {
      id: '5',
      name: 'Message Activity',
      value: 3420,
      target: 3000,
      unit: 'messages',
      trend: 'up',
      change: 14.0,
      period: 'this month'
    },
    {
      id: '6',
      name: 'Retention Rate',
      value: 94,
      target: 90,
      unit: '%',
      trend: 'up',
      change: 4.4,
      period: 'this month'
    }
  ]);

  const [groupPerformance] = useState<GroupPerformance[]>([
    {
      groupId: '1',
      groupName: 'Youth Ministry',
      memberCount: 67,
      engagementScore: 9.5,
      attendanceRate: 92,
      contributionTotal: 3450.00,
      eventsHosted: 8,
      messagesCount: 1240
    },
    {
      groupId: '2',
      groupName: 'Community Care',
      memberCount: 89,
      engagementScore: 8.8,
      attendanceRate: 85,
      contributionTotal: 2890.50,
      eventsHosted: 12,
      messagesCount: 890
    },
    {
      groupId: '3',
      groupName: 'Local Union Chapter',
      memberCount: 156,
      engagementScore: 8.2,
      attendanceRate: 78,
      contributionTotal: 5670.25,
      eventsHosted: 6,
      messagesCount: 1580
    }
  ]);

  const [memberEngagement] = useState<MemberEngagement[]>([
    {
      memberId: '1',
      memberName: 'Sarah Johnson',
      attendanceRate: 95,
      contributionTotal: 450.00,
      messagesCount: 234,
      eventsAttended: 18,
      lastActivity: '2025-01-14T10:30:00Z',
      engagementScore: 9.8
    },
    {
      memberId: '2',
      memberName: 'Mike Wilson',
      attendanceRate: 87,
      contributionTotal: 275.50,
      messagesCount: 156,
      eventsAttended: 15,
      lastActivity: '2025-01-14T08:15:00Z',
      engagementScore: 8.9
    },
    {
      memberId: '3',
      memberName: 'Emily Davis',
      attendanceRate: 72,
      contributionTotal: 125.00,
      messagesCount: 89,
      eventsAttended: 10,
      lastActivity: '2025-01-13T16:45:00Z',
      engagementScore: 7.5
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'Member Growth': return <Users className="w-6 h-6" />;
      case 'Event Attendance': return <Calendar className="w-6 h-6" />;
      case 'Engagement Score': return <Award className="w-6 h-6" />;
      case 'Monthly Revenue': return <DollarSign className="w-6 h-6" />;
      case 'Message Activity': return <MessageSquare className="w-6 h-6" />;
      case 'Retention Rate': return <Target className="w-6 h-6" />;
      default: return <BarChart3 className="w-6 h-6" />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') return `$${value.toLocaleString()}`;
    if (unit === '%') return `${value}%`;
    if (unit === '/10') return `${value}/10`;
    return `${value.toLocaleString()} ${unit}`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Performance Tracking</h1>
        <p className="text-gray-600">Monitor group engagement, contributions, and key metrics</p>
      </div>

      {/* Time Filter */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeFilter(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeFilter === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'groups'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Group Performance
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Member Engagement
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trends'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trends & Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {getMetricIcon(metric.name)}
                  </div>
                  <h3 className="text-sm font-medium text-gray-700">{metric.name}</h3>
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div className="mb-4">
                <p className="text-2xl font-bold text-gray-900">{formatValue(metric.value, metric.unit)}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}{metric.change}%
                  </span>
                  <span className="text-xs text-gray-500">{metric.period}</span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Progress to target</span>
                  <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metric.value >= metric.target ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                Target: {formatValue(metric.target, metric.unit)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Group Performance Tab */}
      {activeTab === 'groups' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Messages</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupPerformance.map((group) => (
                  <tr key={group.groupId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{group.groupName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {group.memberCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm text-gray-900 mr-2">{group.engagementScore}/10</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(group.engagementScore / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm text-gray-900 mr-2">{group.attendanceRate}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${group.attendanceRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${group.contributionTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {group.eventsHosted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {group.messagesCount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Member Engagement Tab */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Messages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {memberEngagement.map((member) => (
                  <tr key={member.memberId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-xs">
                            {member.memberName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{member.memberName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm text-gray-900 mr-2">{member.engagementScore}/10</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${(member.engagementScore / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm text-gray-900 mr-2">{member.attendanceRate}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${member.attendanceRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${member.contributionTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.eventsAttended}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.messagesCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(member.lastActivity).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Trends & Analytics Tab */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Member Growth Rate</p>
                    <p className="text-xs text-blue-600">Monthly average</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">+18.5%</p>
                    <p className="text-xs text-blue-500">Above target</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-green-900">Engagement Increase</p>
                    <p className="text-xs text-green-600">Compared to last period</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">+12.3%</p>
                    <p className="text-xs text-green-500">Excellent</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-purple-900">Revenue Growth</p>
                    <p className="text-xs text-purple-600">Monthly increase</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">+25.0%</p>
                    <p className="text-xs text-purple-500">Outstanding</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-sm font-medium text-gray-900">High Engagement</p>
                  <p className="text-xs text-gray-600">Youth Ministry shows 95% engagement rate</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-sm font-medium text-gray-900">Growing Membership</p>
                  <p className="text-xs text-gray-600">23 new members joined this month</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-sm font-medium text-gray-900">Strong Retention</p>
                  <p className="text-xs text-gray-600">94% member retention rate</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="text-sm font-medium text-gray-900">Active Communication</p>
                  <p className="text-xs text-gray-600">3,420 messages exchanged this month</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-xs text-green-600 mt-1">+18.5% growth</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">87%</p>
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-xs text-green-600 mt-1">+7.2% increase</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-10 h-10 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">9.2/10</p>
                <p className="text-sm text-gray-600">Engagement Score</p>
                <p className="text-xs text-green-600 mt-1">+8.2% improvement</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-10 h-10 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">$12.5K</p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-xs text-green-600 mt-1">+25% increase</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};