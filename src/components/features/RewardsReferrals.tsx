import React, { useState } from 'react';
import { Gift, Users, Share2, Trophy, Copy, Check, Star, TrendingUp } from 'lucide-react';

interface Referral {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'active' | 'completed';
  joinDate: string;
  reward: number;
  level: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'cash' | 'discount' | 'service' | 'badge';
  value: string;
  category: string;
  isAvailable: boolean;
  expiryDate?: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  referrals: number;
  earnings: number;
  badge: string;
}

export const RewardsReferrals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'rewards' | 'leaderboard'>('overview');
  const [referralCode] = useState('SURE-REF-2025');
  const [copied, setCopied] = useState(false);
  const [totalEarnings] = useState(245.50);
  const [totalReferrals] = useState(8);
  const [availablePoints] = useState(1250);

  const [referrals] = useState<Referral[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
      status: 'completed',
      joinDate: '2025-01-10',
      reward: 25.00,
      level: 2
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.s@example.com',
      status: 'active',
      joinDate: '2025-01-12',
      reward: 15.00,
      level: 1
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.d@example.com',
      status: 'pending',
      joinDate: '2025-01-14',
      reward: 0.00,
      level: 0
    }
  ]);

  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      title: '$10 Cash Reward',
      description: 'Instant cash reward for your wallet',
      points: 500,
      type: 'cash',
      value: '$10.00',
      category: 'Cash',
      isAvailable: true
    },
    {
      id: '2',
      title: '20% Health Checkup Discount',
      description: 'Discount on comprehensive health screening',
      points: 300,
      type: 'discount',
      value: '20% OFF',
      category: 'Health',
      isAvailable: true,
      expiryDate: '2025-03-31'
    },
    {
      id: '3',
      title: 'Premium Group Badge',
      description: 'Exclusive badge showing your contribution level',
      points: 750,
      type: 'badge',
      value: 'Premium Status',
      category: 'Recognition',
      isAvailable: true
    },
    {
      id: '4',
      title: 'Free Professional Consultation',
      description: '1-hour consultation with certified professionals',
      points: 1000,
      type: 'service',
      value: '1 Hour Session',
      category: 'Professional',
      isAvailable: false
    }
  ]);

  const [leaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, name: 'Sarah Wilson', referrals: 23, earnings: 575.00, badge: '🏆' },
    { rank: 2, name: 'Mike Johnson', referrals: 19, earnings: 475.00, badge: '🥈' },
    { rank: 3, name: 'Emily Davis', referrals: 15, earnings: 375.00, badge: '🥉' },
    { rank: 4, name: 'You', referrals: 8, earnings: 245.50, badge: '⭐' },
    { rank: 5, name: 'John Brown', referrals: 7, earnings: 175.00, badge: '🌟' }
  ]);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRedeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && availablePoints >= reward.points) {
      alert(`Redeemed: ${reward.title}`);
    } else {
      alert('Insufficient points for this reward');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRewardTypeColor = (type: string) => {
    switch (type) {
      case 'cash': return 'bg-green-100 text-green-700';
      case 'discount': return 'bg-blue-100 text-blue-700';
      case 'service': return 'bg-purple-100 text-purple-700';
      case 'badge': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const completedReferrals = referrals.filter(r => r.status === 'completed').length;
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Rewards & Referrals</h1>
        <p className="text-gray-600">Invite friends and earn rewards for growing our community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
            </div>
            <Gift className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Referrals</p>
              <p className="text-2xl font-bold text-blue-600">{totalReferrals}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Points</p>
              <p className="text-2xl font-bold text-purple-600">{availablePoints}</p>
            </div>
            <Star className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Leaderboard Rank</p>
              <p className="text-2xl font-bold text-orange-600">#4</p>
            </div>
            <Trophy className="w-8 h-8 text-orange-500" />
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
              onClick={() => setActiveTab('referrals')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'referrals'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Referrals ({totalReferrals})
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rewards'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rewards Store
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'leaderboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Leaderboard
            </button>
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite & Earn</h3>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Earn $25 per referral</h4>
              <p className="text-gray-600 text-sm">
                Invite friends to join SureGroups and earn rewards when they complete their first transaction
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Your Referral Code</p>
                  <p className="text-lg font-bold text-blue-600">{referralCode}</p>
                </div>
                <button
                  onClick={handleCopyReferralCode}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share Referral Link</span>
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Progress</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Completed Referrals</p>
                  <p className="text-xs text-green-600">Earned rewards</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{completedReferrals}</p>
                  <p className="text-xs text-green-500">${(completedReferrals * 25).toFixed(2)} earned</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-900">Pending Referrals</p>
                  <p className="text-xs text-yellow-600">Awaiting completion</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-600">{pendingReferrals}</p>
                  <p className="text-xs text-yellow-500">${(pendingReferrals * 25).toFixed(2)} potential</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-900">Reward Points</p>
                  <p className="text-xs text-purple-600">Available to redeem</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600">{availablePoints}</p>
                  <p className="text-xs text-purple-500">Ready to use</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Referrals Tab */}
      {activeTab === 'referrals' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Referrals</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {referral.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{referral.name}</div>
                            <div className="text-sm text-gray-500">{referral.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(referral.status)}`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(referral.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-900">Level {referral.level}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${referral.reward.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <div key={reward.id} className={`bg-white rounded-lg border border-gray-200 p-6 ${!reward.isAvailable ? 'opacity-60' : 'hover:shadow-lg'} transition-shadow`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRewardTypeColor(reward.type)}`}>
                      {reward.type}
                    </span>
                    <span className="text-sm text-gray-500">{reward.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Points Required</p>
                  <p className="text-lg font-bold text-purple-600">{reward.points}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Value</p>
                  <p className="text-lg font-bold text-green-600">{reward.value}</p>
                </div>
              </div>

              {reward.expiryDate && (
                <div className="text-xs text-orange-600 mb-4">
                  Expires: {new Date(reward.expiryDate).toLocaleDateString()}
                </div>
              )}

              <button
                onClick={() => handleRedeemReward(reward.id)}
                disabled={!reward.isAvailable || availablePoints < reward.points}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  reward.isAvailable && availablePoints >= reward.points
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}
              >
                {!reward.isAvailable ? 'Coming Soon' : 
                 availablePoints < reward.points ? 'Insufficient Points' : 'Redeem Reward'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Referral Leaderboard</h2>
            <p className="text-sm text-gray-600">Top referrers in the community</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className={`flex items-center justify-between p-4 rounded-lg ${
                  entry.name === 'You' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{entry.badge}</div>
                    <div className="text-lg font-bold text-gray-600">#{entry.rank}</div>
                    <div>
                      <p className={`text-sm font-medium ${entry.name === 'You' ? 'text-blue-900' : 'text-gray-900'}`}>
                        {entry.name}
                      </p>
                      <p className="text-xs text-gray-500">{entry.referrals} referrals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${entry.name === 'You' ? 'text-blue-600' : 'text-green-600'}`}>
                      ${entry.earnings.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">Total earned</p>
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