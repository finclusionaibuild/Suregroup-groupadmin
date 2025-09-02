import React, { useState } from 'react';
import { CreditCard, Download, DollarSign, TrendingUp, Award, Star, Trophy, Save } from 'lucide-react';

interface Invoice {
  id: string;
  period: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  requests: number;
  breakdown: {
    baseRequests: number;
    overageRequests: number;
    baseAmount: number;
    overageAmount: number;
  };
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  last4: string;
  brand?: string;
  isDefault: boolean;
  expiryDate?: string;
}

export const DeveloperBilling: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payment-methods' | 'rewards'>('overview');
  
  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-2025-001',
      period: 'January 2025',
      amount: 45.20,
      status: 'paid',
      dueDate: '2025-02-01',
      paidDate: '2025-01-28',
      requests: 12400,
      breakdown: {
        baseRequests: 10000,
        overageRequests: 2400,
        baseAmount: 29.99,
        overageAmount: 15.21
      }
    },
    {
      id: 'INV-2024-012',
      period: 'December 2024',
      amount: 29.99,
      status: 'paid',
      dueDate: '2025-01-01',
      paidDate: '2024-12-30',
      requests: 8900,
      breakdown: {
        baseRequests: 8900,
        overageRequests: 0,
        baseAmount: 29.99,
        overageAmount: 0
      }
    },
    {
      id: 'INV-2024-011',
      period: 'November 2024',
      amount: 67.45,
      status: 'paid',
      dueDate: '2024-12-01',
      paidDate: '2024-11-28',
      requests: 15600,
      breakdown: {
        baseRequests: 10000,
        overageRequests: 5600,
        baseAmount: 29.99,
        overageAmount: 37.46
      }
    }
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
      expiryDate: '12/26'
    },
    {
      id: '2',
      type: 'wallet',
      last4: '7890',
      isDefault: false
    },
    {
      id: '3',
      type: 'bank',
      last4: '1234',
      isDefault: false
    }
  ]);

  const [rewardsData] = useState({
    totalPoints: 2450,
    currentTier: 'Gold',
    nextTier: 'Platinum',
    pointsToNext: 550,
    monthlyEarned: 340,
    lifetimeEarned: 8920
  });

  const [leaderboard] = useState([
    { rank: 1, name: 'TechCorp Dev Team', points: 15420, tier: 'Platinum' },
    { rank: 2, name: 'Innovation Labs', points: 12890, tier: 'Platinum' },
    { rank: 3, name: 'StartupXYZ', points: 9650, tier: 'Gold' },
    { rank: 4, name: 'You', points: 2450, tier: 'Gold' },
    { rank: 5, name: 'DevStudio Pro', points: 2100, tier: 'Silver' }
  ]);

  const currentUsage = {
    requests: 12400,
    limit: 10000,
    overage: 2400,
    resetDate: '2025-02-01'
  };

  const downloadInvoice = (invoiceId: string) => {
    alert(`Downloading invoice ${invoiceId}. In production, this would generate a PDF.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'card': return '💳';
      case 'bank': return '🏦';
      case 'wallet': return '👛';
      default: return '💳';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-purple-600';
      case 'Gold': return 'text-yellow-600';
      case 'Silver': return 'text-gray-600';
      case 'Bronze': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Platinum': return <Trophy className="w-4 h-4" />;
      case 'Gold': return <Award className="w-4 h-4" />;
      case 'Silver': return <Star className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Rewards</h1>
        <p className="text-gray-600">Manage billing, payment methods, and developer rewards</p>
      </div>

      {/* Current Usage Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Current Usage</h2>
          <span className="text-sm text-gray-500">Resets on {new Date(currentUsage.resetDate).toLocaleDateString()}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">API Requests</p>
            <p className="text-2xl font-bold text-gray-900">{currentUsage.requests.toLocaleString()}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${Math.min((currentUsage.requests / currentUsage.limit) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {currentUsage.requests.toLocaleString()} / {currentUsage.limit.toLocaleString()} included
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Overage</p>
            <p className="text-2xl font-bold text-orange-600">{currentUsage.overage.toLocaleString()}</p>
            <p className="text-xs text-orange-500 mt-1">
              ${(currentUsage.overage * 0.01).toFixed(2)} additional charges
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Estimated Bill</p>
            <p className="text-2xl font-bold text-green-600">$45.20</p>
            <p className="text-xs text-green-500 mt-1">
              Based on current usage
            </p>
          </div>
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
              onClick={() => setActiveTab('invoices')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invoices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Invoices ({invoices.length})
            </button>
            <button
              onClick={() => setActiveTab('payment-methods')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payment-methods'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rewards'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rewards & Points
            </button>
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Current Plan</p>
                  <p className="text-xs text-blue-600">Developer Pro</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">$29.99</p>
                  <p className="text-xs text-blue-500">per month</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">This Month</p>
                  <p className="text-xs text-green-600">Total charges</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">$45.20</p>
                  <p className="text-xs text-green-500">Including overage</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-900">Reward Points</p>
                  <p className="text-xs text-purple-600">Available balance</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600">{rewardsData.totalPoints}</p>
                  <p className="text-xs text-purple-500">{rewardsData.currentTier} tier</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Base Plan (10K requests)</span>
                <span className="text-sm text-gray-900">$29.99</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overage (2.4K requests)</span>
                <span className="text-sm text-gray-900">$15.21</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SureBanker Processing</span>
                <span className="text-sm text-gray-900">$0.00</span>
              </div>
              <hr />
              <div className="flex items-center justify-between font-medium">
                <span className="text-sm text-gray-900">Total</span>
                <span className="text-sm text-gray-900">$45.20</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.requests.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => downloadInvoice(invoice.id)}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment-methods' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add Payment Method
              </button>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getPaymentMethodIcon(method.type)}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {method.brand || method.type.charAt(0).toUpperCase() + method.type.slice(1)} 
                        ending in {method.last4}
                      </p>
                      {method.expiryDate && (
                        <p className="text-xs text-gray-500">Expires {method.expiryDate}</p>
                      )}
                      {method.isDefault && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Default</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Set Default
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-sm font-medium text-blue-900">SureBanker Integration</h3>
                <p className="text-xs text-blue-700">
                  All payments are processed securely through SureBanker with enterprise-grade encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Developer Rewards Program</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  rewardsData.currentTier === 'Platinum' ? 'bg-purple-100' :
                  rewardsData.currentTier === 'Gold' ? 'bg-yellow-100' :
                  rewardsData.currentTier === 'Silver' ? 'bg-gray-100' : 'bg-orange-100'
                }`}>
                  <div className={getTierColor(rewardsData.currentTier)}>
                    {getTierIcon(rewardsData.currentTier)}
                  </div>
                </div>
                <h3 className={`text-xl font-bold ${getTierColor(rewardsData.currentTier)}`}>
                  {rewardsData.currentTier} Tier
                </h3>
                <p className="text-sm text-gray-600">{rewardsData.totalPoints} points</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Progress to {rewardsData.nextTier}</h4>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-purple-600 h-3 rounded-full" 
                    style={{ width: `${((rewardsData.totalPoints % 1000) / 1000) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {rewardsData.pointsToNext} points to {rewardsData.nextTier}
                </p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">This Month:</span>
                    <span className="text-gray-900">+{rewardsData.monthlyEarned} points</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lifetime:</span>
                    <span className="text-gray-900">{rewardsData.lifetimeEarned.toLocaleString()} points</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">How to Earn Points</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 1 point per API request</li>
                <li>• 50 bonus points for first integration</li>
                <li>• 100 points for completing KYC tiers</li>
                <li>• 200 points for referring other developers</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Developer Leaderboard</h3>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className={`flex items-center justify-between p-4 rounded-lg ${
                  entry.name === 'You' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold text-gray-600">#{entry.rank}</div>
                    <div>
                      <p className={`text-sm font-medium ${entry.name === 'You' ? 'text-blue-900' : 'text-gray-900'}`}>
                        {entry.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className={getTierColor(entry.tier)}>
                          {getTierIcon(entry.tier)}
                        </div>
                        <span className={`text-xs ${getTierColor(entry.tier)}`}>{entry.tier}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${entry.name === 'You' ? 'text-blue-600' : 'text-gray-900'}`}>
                      {entry.points.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};