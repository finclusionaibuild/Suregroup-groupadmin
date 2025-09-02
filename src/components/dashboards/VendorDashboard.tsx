import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Sidebar } from '../common/Sidebar';
import { MetricCard } from '../common/MetricCard';
import { FeatureRouter } from '../common/FeatureRouter';
import { getVendorNavigation } from '../../config/navigation';
import { DashboardMetric } from '../../types';
import { 
  Plus,
  ShoppingCart,
  TrendingUp,
  Star,
  DollarSign,
  Package,
  Users,
  Bell,
  Calendar,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  const navigation = getVendorNavigation();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  const metrics: DashboardMetric[] = [
    { title: 'Active Services', value: '8', change: '+2', trend: 'up' },
    { title: 'Total Orders', value: '156', change: '+23', trend: 'up' },
    { title: 'Monthly Revenue', value: '$4,250', change: '+18%', trend: 'up' },
    { title: 'Customer Rating', value: '4.8/5', change: '+0.2', trend: 'up' },
    { title: 'Pending Orders', value: '12', change: '+5', trend: 'up' },
    { title: 'Completion Rate', value: '96%', change: '+3%', trend: 'up' }
  ];

  const quickActions = [
    { 
      id: 'add-service', 
      label: 'Add Service', 
      icon: Plus, 
      color: 'bg-blue-500',
      action: () => setActiveFeature('services')
    },
    { 
      id: 'manage-orders', 
      label: 'Manage Orders', 
      icon: ShoppingCart, 
      color: 'bg-green-500',
      action: () => setActiveFeature('orders')
    },
    { 
      id: 'view-transactions', 
      label: 'View Transactions', 
      icon: DollarSign, 
      color: 'bg-purple-500',
      action: () => setActiveFeature('transactions')
    },
    { 
      id: 'marketing-tools', 
      label: 'Marketing Tools', 
      icon: TrendingUp, 
      color: 'bg-orange-500',
      action: () => setActiveFeature('marketing')
    },
    { 
      id: 'customer-reviews', 
      label: 'Customer Reviews', 
      icon: Star, 
      color: 'bg-yellow-500',
      action: () => setActiveFeature('ratings-reviews')
    },
    { 
      id: 'vendor-support', 
      label: 'Support Center', 
      icon: MessageSquare, 
      color: 'bg-red-500',
      action: () => setActiveFeature('support')
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'new_order',
      title: 'New order for Health Screening Service',
      customer: 'Sarah Johnson',
      amount: '$125.00',
      time: '2 hours ago',
      icon: ShoppingCart,
      color: 'text-blue-600',
      status: 'pending'
    },
    {
      id: '2',
      type: 'payment_received',
      title: 'Payment received for Professional Consultation',
      customer: 'Mike Wilson',
      amount: '$75.00',
      time: '4 hours ago',
      icon: DollarSign,
      color: 'text-green-600',
      status: 'completed'
    },
    {
      id: '3',
      type: 'review_received',
      title: 'New 5-star review received',
      customer: 'Emily Davis',
      amount: '5 stars',
      time: '6 hours ago',
      icon: Star,
      color: 'text-yellow-600',
      status: 'new'
    },
    {
      id: '4',
      type: 'service_approved',
      title: 'Digital Marketing Course approved',
      customer: 'Group Admin',
      amount: 'Approved',
      time: '8 hours ago',
      icon: CheckCircle,
      color: 'text-emerald-600',
      status: 'approved'
    },
    {
      id: '5',
      type: 'dispute_opened',
      title: 'Dispute opened for delayed service',
      customer: 'John Smith',
      amount: 'Dispute',
      time: '1 day ago',
      icon: AlertTriangle,
      color: 'text-red-600',
      status: 'urgent'
    }
  ];

  const serviceCards = [
    {
      id: '1',
      name: 'Health Screening Package',
      price: '$125.00',
      rating: 4.9,
      reviews: 23,
      status: 'active',
      orders: 45,
      revenue: '$5,625'
    },
    {
      id: '2',
      name: 'Professional Consultation',
      price: '$75.00',
      rating: 4.8,
      reviews: 18,
      status: 'active',
      orders: 32,
      revenue: '$2,400'
    },
    {
      id: '3',
      name: 'Digital Marketing Course',
      price: '$149.00',
      rating: 4.7,
      reviews: 15,
      status: 'pending',
      orders: 0,
      revenue: '$0'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-l-green-500 bg-green-50';
      case 'pending': return 'border-l-blue-500 bg-blue-50';
      case 'new': return 'border-l-yellow-500 bg-yellow-50';
      case 'approved': return 'border-l-emerald-500 bg-emerald-50';
      case 'urgent': return 'border-l-red-500 bg-red-50';
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
        <Header title={activeFeature ? "Vendor Portal" : "Vendor Dashboard"} />
        
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Vendor Dashboard</h2>
                <p className="text-gray-600">Manage your services, orders, and customer relationships</p>
              </div>

              {/* Notification Bar */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">You have 3 new orders and 2 pending reviews</p>
                      <p className="text-xs text-blue-700">Last payment: $125.00 received 2 hours ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveFeature('notifications')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All →
                  </button>
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

              {/* Service Cards & Recent Activity */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">My Services</h3>
                    <button 
                      onClick={() => setActiveFeature('services')}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Manage All <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {serviceCards.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900">{service.name}</h4>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                              {service.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{service.price}</span>
                            <span>⭐ {service.rating} ({service.reviews})</span>
                            <span>{service.orders} orders</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveFeature('services')}
                    className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add New Service
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <button 
                      onClick={() => setActiveFeature('notifications')}
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
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-500">{activity.customer} • {activity.time}</p>
                            <span className="text-xs font-medium text-gray-700">{activity.amount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                    <p className="text-sm text-gray-600">Active Services</p>
                    <p className="text-xs text-green-600 mt-1">+2 this month</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-xs text-green-600 mt-1">+23 this month</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                    <p className="text-sm text-gray-600">Customer Rating</p>
                    <p className="text-xs text-green-600 mt-1">+0.2 improvement</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">$4.2K</p>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-xs text-green-600 mt-1">+18% growth</p>
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