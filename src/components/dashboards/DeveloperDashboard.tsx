import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Sidebar } from '../common/Sidebar';
import { MetricCard } from '../common/MetricCard';
import { FeatureRouter } from '../common/FeatureRouter';
import { getDeveloperNavigation } from '../../config/navigation';
import { DashboardMetric } from '../../types';
import { 
  Code,
  Key,
  FileText,
  BarChart3,
  Shield,
  CreditCard,
  MessageSquare,
  Settings,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Zap,
  Target,
  Award
} from 'lucide-react';

export const DeveloperDashboard: React.FC = () => {
  const navigation = getDeveloperNavigation();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  const metrics: DashboardMetric[] = [
    { title: 'API Requests', value: '12.4K', change: '+23%', trend: 'up' },
    { title: 'Success Rate', value: '99.2%', change: '+0.5%', trend: 'up' },
    { title: 'Avg Response Time', value: '145ms', change: '-12ms', trend: 'up' },
    { title: 'Active Keys', value: '3', change: '+1', trend: 'up' },
    { title: 'Monthly Usage', value: '85%', change: '+15%', trend: 'up' },
    { title: 'Error Rate', value: '0.8%', change: '-0.3%', trend: 'up' }
  ];

  const quickActions = [
    { 
      id: 'generate-api-key', 
      label: 'Generate API Key', 
      icon: Key, 
      color: 'bg-blue-500',
      action: () => setActiveFeature('api-keys')
    },
    { 
      id: 'view-docs', 
      label: 'View Documentation', 
      icon: FileText, 
      color: 'bg-green-500',
      action: () => setActiveFeature('documentation')
    },
    { 
      id: 'test-sandbox', 
      label: 'Test in Sandbox', 
      icon: Settings, 
      color: 'bg-purple-500',
      action: () => setActiveFeature('sandbox')
    },
    { 
      id: 'view-analytics', 
      label: 'View Analytics', 
      icon: BarChart3, 
      color: 'bg-orange-500',
      action: () => setActiveFeature('analytics')
    },
    { 
      id: 'check-diagnostics', 
      label: 'Check Diagnostics', 
      icon: TrendingUp, 
      color: 'bg-red-500',
      action: () => setActiveFeature('diagnostics')
    },
    { 
      id: 'get-support', 
      label: 'Get Support', 
      icon: MessageSquare, 
      color: 'bg-indigo-500',
      action: () => setActiveFeature('support-tickets')
    }
  ];

  const onboardingChecklist = [
    { id: '1', task: 'Complete KYC Verification', completed: true, description: 'Tier 1 & 2 verification completed' },
    { id: '2', task: 'Generate First API Key', completed: true, description: 'Production API key created' },
    { id: '3', task: 'Read API Documentation', completed: false, description: 'Review comprehensive API docs' },
    { id: '4', task: 'Test in Sandbox', completed: false, description: 'Make your first API call' },
    { id: '5', task: 'Setup Webhooks', completed: false, description: 'Configure webhook endpoints' },
    { id: '6', task: 'Configure Billing', completed: false, description: 'Add payment method' }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'api_call',
      title: 'API call to /users endpoint',
      details: '200 OK • 142ms response time',
      time: '2 minutes ago',
      icon: Code,
      color: 'text-blue-600',
      status: 'success'
    },
    {
      id: '2',
      type: 'webhook',
      title: 'Webhook delivery successful',
      details: 'user.created event delivered',
      time: '15 minutes ago',
      icon: Zap,
      color: 'text-green-600',
      status: 'success'
    },
    {
      id: '3',
      type: 'error',
      title: 'API rate limit exceeded',
      details: '429 Too Many Requests',
      time: '1 hour ago',
      icon: AlertTriangle,
      color: 'text-red-600',
      status: 'error'
    },
    {
      id: '4',
      type: 'billing',
      title: 'Monthly usage report generated',
      details: '$45.20 for 12.4K requests',
      time: '2 hours ago',
      icon: CreditCard,
      color: 'text-purple-600',
      status: 'info'
    },
    {
      id: '5',
      type: 'security',
      title: 'New API key generated',
      details: 'Production key: sk_prod_***1234',
      time: '1 day ago',
      icon: Shield,
      color: 'text-orange-600',
      status: 'info'
    }
  ];

  const systemStatus = [
    { service: 'API Gateway', status: 'operational', uptime: '99.9%' },
    { service: 'Authentication', status: 'operational', uptime: '100%' },
    { service: 'Database', status: 'operational', uptime: '99.8%' },
    { service: 'Webhooks', status: 'degraded', uptime: '98.5%' },
    { service: 'Documentation', status: 'operational', uptime: '100%' }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700';
      case 'degraded': return 'bg-yellow-100 text-yellow-700';
      case 'outage': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const completedTasks = onboardingChecklist.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / onboardingChecklist.length) * 100;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        groups={navigation} 
        onFeatureSelect={handleFeatureSelect}
        activeFeature={activeFeature || undefined}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header title={activeFeature ? "Developer Portal" : "Developer Dashboard"} />
        
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Developer Dashboard</h2>
                <p className="text-gray-600">Build and integrate with the SureGroups platform</p>
              </div>

              {/* Onboarding Checklist */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Getting Started</h3>
                  <span className="text-sm text-gray-500">{completedTasks} of {onboardingChecklist.length} completed</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {onboardingChecklist.map((item) => (
                    <div 
                      key={item.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        item.completed 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-white hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          item.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {item.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.task}</h4>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

              {/* Recent Activity & System Status */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <button 
                      onClick={() => setActiveFeature('diagnostics')}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      View All <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 ${getActivityStatusColor(activity.status)} hover:shadow-sm transition-shadow cursor-pointer`}>
                        <div className={`w-8 h-8 bg-white rounded-full flex items-center justify-center ${activity.color} shadow-sm`}>
                          <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.details} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                    <button 
                      onClick={() => setActiveFeature('diagnostics')}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {systemStatus.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{service.service}</p>
                          <p className="text-xs text-gray-500">Uptime: {service.uptime}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* API Overview */}
              <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">API Access Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Key className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-sm text-gray-600">Active API Keys</p>
                    <p className="text-xs text-green-600 mt-1">All operational</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">12.4K</p>
                    <p className="text-sm text-gray-600">Monthly Requests</p>
                    <p className="text-xs text-green-600 mt-1">+23% increase</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">99.2%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-xs text-green-600 mt-1">Above target</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">145ms</p>
                    <p className="text-sm text-gray-600">Avg Response</p>
                    <p className="text-xs text-green-600 mt-1">-12ms improvement</p>
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