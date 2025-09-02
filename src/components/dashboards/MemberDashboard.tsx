import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Sidebar } from '../common/Sidebar';
import { MetricCard } from '../common/MetricCard';
import { FeatureRouter } from '../common/FeatureRouter';
import { getMemberNavigation } from '../../config/navigation';
import { DashboardMetric } from '../../types';
import { 
  Users, 
  MessageSquare, 
  ShoppingCart, 
  Calendar,
  Bell,
  TrendingUp,
  DollarSign,
  ArrowRight
} from 'lucide-react';

export const MemberDashboard: React.FC = () => {
  const navigation = getMemberNavigation();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  const metrics: DashboardMetric[] = [
    { title: 'My Groups', value: '5', change: '+1', trend: 'up' },
    { title: 'Unread Messages', value: '12', change: '+3', trend: 'up' },
    { title: 'Upcoming Events', value: '3', change: '0', trend: 'neutral' },
    { title: 'Wallet Balance', value: '$125.50', change: '+$25', trend: 'up' }
  ];

  const quickActions = [
    { id: 'my-groups', label: 'My Groups', icon: Users, color: 'bg-blue-500' },
    { id: 'browse-marketplace', label: 'Browse Marketplace', icon: ShoppingCart, color: 'bg-green-500' },
    { id: 'send-money', label: 'Send Money', icon: DollarSign, color: 'bg-purple-500' },
    { id: 'browse-events', label: 'Browse Events', icon: Calendar, color: 'bg-purple-500' },
    { id: 'my-orders', label: 'My Orders', icon: ShoppingCart, color: 'bg-orange-500' },
    { id: 'vendor-services', label: 'Find Services', icon: Users, color: 'bg-indigo-500' },
    { id: 'marketplace-deals', label: 'Special Deals', icon: TrendingUp, color: 'bg-red-500' }
  ];

  const recentUpdates = [
    {
      id: '1',
      group: 'Youth Ministry',
      type: 'event',
      title: 'Game Night - Friday 7 PM',
      time: '2 hours ago',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      id: '2',
      group: 'Community Care',
      type: 'announcement',
      title: 'Volunteer opportunity posted',
      time: '4 hours ago',
      icon: Bell,
      color: 'text-green-600'
    },
    {
      id: '3',
      group: 'Local Union Chapter',
      type: 'message',
      title: 'New discussion: Workplace Safety',
      time: '6 hours ago',
      icon: MessageSquare,
      color: 'text-purple-600'
    }
  ];

  const handleFeatureSelect = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const handleBackToDashboard = () => {
    setActiveFeature(null);
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'my-groups':
        setActiveFeature('my-groups');
        break;
      case 'browse-marketplace':
        setActiveFeature('marketplace-browse');
        break;
      case 'send-money':
        setActiveFeature('wallet');
        break;
      case 'browse-events':
        setActiveFeature('priority-invitations');
        break;
      case 'my-orders':
        setActiveFeature('marketplace-orders');
        break;
      case 'vendor-services':
        setActiveFeature('professional-services');
        break;
      case 'marketplace-deals':
        setActiveFeature('discounts-offers');
        break;
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
        <Header title={activeFeature ? "Member Portal" : "My Dashboard"} />
        
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">Stay connected with your community</p>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action.id)}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                      <div key={update.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center ${update.color}`}>
                          <update.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{update.title}</p>
                          <p className="text-xs text-gray-500">{update.group} • {update.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">My Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-blue-900">Attendance Rate</p>
                        <p className="text-xs text-blue-600">This month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">92%</p>
                        <p className="text-xs text-blue-500">+5% from last month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-green-900">Contributions</p>
                        <p className="text-xs text-green-600">Total this year</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">$450</p>
                        <p className="text-xs text-green-500">On track</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-purple-900">Engagement Score</p>
                        <p className="text-xs text-purple-600">Based on activity</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-purple-600">8.5/10</p>
                        <p className="text-xs text-purple-500">Excellent</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-orange-900">Marketplace Orders</p>
                        <p className="text-xs text-orange-600">This month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-600">3</p>
                        <p className="text-xs text-orange-500">$127 spent</p>
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