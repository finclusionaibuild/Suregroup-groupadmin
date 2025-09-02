import React, { useState } from 'react';
import { Calendar, DollarSign, TrendingUp, Award, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  eventName: string;
  groupName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  duration: string;
}

interface PaymentRecord {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  groupName: string;
}

interface EngagementMetric {
  category: string;
  score: number;
  maxScore: number;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

export const AccountabilityTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'payments' | 'engagement' | 'contributions'>('attendance');

  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      eventName: 'Sunday Service',
      groupName: 'Community Church',
      date: '2025-01-14',
      status: 'present',
      duration: '2h 30m'
    },
    {
      id: '2',
      eventName: 'Bible Study',
      groupName: 'Youth Ministry',
      date: '2025-01-13',
      status: 'present',
      duration: '1h 45m'
    },
    {
      id: '3',
      eventName: 'Community Service',
      groupName: 'Community Care',
      date: '2025-01-12',
      status: 'late',
      duration: '3h 15m'
    },
    {
      id: '4',
      eventName: 'Union Meeting',
      groupName: 'Local Union Chapter',
      date: '2025-01-10',
      status: 'absent',
      duration: '0h 0m'
    }
  ]);

  const [paymentRecords] = useState<PaymentRecord[]>([
    {
      id: '1',
      description: 'Monthly Contribution',
      amount: 50.00,
      dueDate: '2025-01-15',
      paidDate: '2025-01-14',
      status: 'paid',
      groupName: 'Community Church'
    },
    {
      id: '2',
      description: 'Youth Camp Fee',
      amount: 125.00,
      dueDate: '2025-01-20',
      status: 'pending',
      groupName: 'Youth Ministry'
    },
    {
      id: '3',
      description: 'Union Dues',
      amount: 25.00,
      dueDate: '2025-01-10',
      status: 'overdue',
      groupName: 'Local Union Chapter'
    }
  ]);

  const [engagementMetrics] = useState<EngagementMetric[]>([
    {
      category: 'Event Attendance',
      score: 85,
      maxScore: 100,
      trend: 'up',
      description: 'Attended 17 out of 20 events this month'
    },
    {
      category: 'Community Posts',
      score: 72,
      maxScore: 100,
      trend: 'up',
      description: '12 posts and 45 interactions this month'
    },
    {
      category: 'Payment Timeliness',
      score: 90,
      maxScore: 100,
      trend: 'neutral',
      description: '9 out of 10 payments made on time'
    },
    {
      category: 'Group Participation',
      score: 78,
      maxScore: 100,
      trend: 'down',
      description: 'Active in 3 out of 5 joined groups'
    }
  ]);

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700';
      case 'late': return 'bg-yellow-100 text-yellow-700';
      case 'absent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-400" />;
    }
  };

  const attendanceRate = Math.round((attendanceRecords.filter(r => r.status === 'present').length / attendanceRecords.length) * 100);
  const paymentRate = Math.round((paymentRecords.filter(r => r.status === 'paid').length / paymentRecords.length) * 100);
  const avgEngagement = Math.round(engagementMetrics.reduce((sum, metric) => sum + metric.score, 0) / engagementMetrics.length);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Accountability Tracking</h1>
        <p className="text-gray-600">Track your attendance, payments, and engagement metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-green-600">{attendanceRate}%</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Rate</p>
              <p className="text-2xl font-bold text-blue-600">{paymentRate}%</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engagement Score</p>
              <p className="text-2xl font-bold text-purple-600">{avgEngagement}/100</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'attendance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab('engagement')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'engagement'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Engagement
            </button>
            <button
              onClick={() => setActiveTab('contributions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contributions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contributions
            </button>
          </nav>
        </div>
      </div>

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.eventName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.groupName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAttendanceStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.groupName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${record.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Engagement Tab */}
      {activeTab === 'engagement' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {engagementMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{metric.category}</h3>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Score</span>
                  <span className="text-sm font-medium text-gray-900">{metric.score}/{metric.maxScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(metric.score / metric.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">{metric.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Contributions Tab */}
      {activeTab === 'contributions' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Contribution History</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Monthly Tithe - January</p>
                  <p className="text-xs text-gray-500">Community Church • Paid on time</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">$50.00</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Youth Camp Registration</p>
                  <p className="text-xs text-gray-500">Youth Ministry • Due in 6 days</p>
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600">$125.00</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Union Dues - January</p>
                  <p className="text-xs text-gray-500">Local Union Chapter • 4 days overdue</p>
                </div>
              </div>
              <span className="text-sm font-medium text-red-600">$25.00</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};