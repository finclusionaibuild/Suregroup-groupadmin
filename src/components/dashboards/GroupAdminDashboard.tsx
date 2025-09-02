import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Sidebar } from '../common/Sidebar';
import { MetricCard } from '../common/MetricCard';
import { FeatureRouter } from '../common/FeatureRouter';
import { getGroupAdminNavigation } from '../../config/navigation';
import { DashboardMetric } from '../../types';
import { 
  Users, 
  MessageSquare, 
  Calendar,
  Bell,
  TrendingUp,
  Settings,
  ArrowRight,
  Plus,
  Send,
  UserPlus,
  Flag
} from 'lucide-react';

export const GroupAdminDashboard: React.FC = () => {
  const navigation = getGroupAdminNavigation();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  const metrics: DashboardMetric[] = [
    { title: 'Total Members', value: '1,247', change: '+23', trend: 'up' },
    { title: 'Active Groups', value: '12', change: '+2', trend: 'up' },
    { title: 'Upcoming Events', value: '8', change: '+3', trend: 'up' },
    { title: 'Monthly Engagement', value: '94%', change: '+7%', trend: 'up' },
    { title: 'Pending Approvals', value: '15', change: '-3', trend: 'down' },
    { title: 'Group Revenue', value: '$12.5K', change: '+18%', trend: 'up' }
  ];

  const quickActions = [
    { 
      id: 'create-group', 
      label: 'Create Group', 
      icon: Plus, 
      color: 'bg-blue-500',
      action: () => setActiveFeature('group-setup')
    },
    { 
      id: 'manage-members', 
      label: 'Manage Members', 
      icon: Users, 
      color: 'bg-green-500',
      action: () => setActiveFeature('membership-management')
    },
    { 
      id: 'send-announcement', 
      label: 'Send Announcement', 
      icon: Send, 
      color: 'bg-purple-500',
      action: () => setActiveFeature('notifications-alerts')
    },
    { 
      id: 'create-event', 
      label: 'Create Event', 
      icon: Calendar, 
      color: 'bg-orange-500',
      action: () => setActiveFeature('events')
    },
    { 
      id: 'approve-members', 
      label: 'Approve Members', 
      icon: UserPlus, 
      color: 'bg-emerald-500',
      action: () => setActiveFeature('membership-management')
    },
    { 
      id: 'review-content', 
      label: 'Review Content', 
      icon: Flag, 
      color: 'bg-red-500',
      action: () => setActiveFeature('content-oversight')
    }
  ];

  const recentUpdates = [
    {
      id: '1',
      group: 'Youth Ministry',
      type: 'member_joined',
      title: '5 new members joined this week',
      time: '2 hours ago',
      icon: Users,
      color: 'text-blue-600',
      priority: 'medium'
    },
    {
      id: '2',
      group: 'Community Care',
      type: 'event_created',
      title: 'Volunteer Day event scheduled',
      time: '4 hours ago',
      icon: Calendar,
      color: 'text-green-600',
      priority: 'high'
    },
    {
      id: '3',
      group: 'Local Union Chapter',
      type: 'content_flagged',
      title: 'Content flagged for review',
      time: '6 hours ago',
      icon: Flag,
      color: 'text-red-600',
      priority: 'urgent'
    },
    {
      id: '4',
      group: 'Tech Professionals',
      type: 'payment_received',
      title: 'Monthly dues payment received',
      time: '8 hours ago',
      icon: TrendingUp,
      color: 'text-purple-600',
      priority: 'low'
    },
    {
      id: '5',
      group: 'Community Church',
      type: 'announcement',
      title: 'Weekly bulletin published',
      time: '1 day ago',
      icon: Bell,
      color: 'text-orange-600',
      priority: 'medium'
    }
  ];

  const handleFeatureSelect = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const handleBackToDashboard = () => {
    setActiveFeature(null);
  };

  const handleQuickAction = (action: () => void) => {
    action();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-blue-500 bg-blue-50';
      case 'low': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        groups={navigation} 
        onFeatureSelect={handleFeatureSelect}
        activeFeature={activeFeature || undefined}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title={activeFeature ? "Group Administration" : "Group Admin Dashboard"} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {activeFeature ? (
            <div>
              <button
                onClick={handleBackToDashboard}
                className="mb-4 text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                ← Back to Dashboard
              </button>
              <FeatureRouter featureId={activeFeature} />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Group Administration</h2>
                <p className="text-gray-600">Manage your groups and community engagement</p>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action.action)}
                      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 text-center">{action.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {metrics.map((metric, index) => (
                  <MetricCard key={index} metric={metric} />
                ))}
              </div>

              {/* Recent Group Updates */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Group Updates</h3>
                    <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      View All <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentUpdates.map((update) => (
                      <div key={update.id} className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 ${getPriorityColor(update.priority)} hover:shadow-sm transition-shadow cursor-pointer`}>
                        <div className={`w-8 h-8 bg-white rounded-full flex items-center justify-center ${update.color} shadow-sm`}>
                          <update.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{update.title}</p>
                          <p className="text-xs text-gray-500">{update.group} • {update.time}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          update.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                          update.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          update.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {update.priority}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Performance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-blue-900">Member Growth</p>
                        <p className="text-xs text-blue-600">This month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">+18%</p>
                        <p className="text-xs text-blue-500">23 new members</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-green-900">Event Attendance</p>
                        <p className="text-xs text-green-600">Average rate</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">87%</p>
                        <p className="text-xs text-green-500">Above target</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-purple-900">Engagement Score</p>
                        <p className="text-xs text-purple-600">Community activity</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-purple-600">9.2/10</p>
                        <p className="text-xs text-purple-500">Excellent</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-orange-900">Revenue Growth</p>
                        <p className="text-xs text-orange-600">Monthly increase</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-600">+24%</p>
                        <p className="text-xs text-orange-500">$12.5K total</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};