import React, { useState } from 'react';
import { Search, Plus, Gift, Edit, Trash2, Eye, Tag, Calendar, Users, Star } from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'service' | 'access' | 'reward';
  category: string;
  provider: string;
  value: string;
  eligibility: string[];
  validFrom: string;
  validUntil?: string;
  maxRedemptions?: number;
  currentRedemptions: number;
  isActive: boolean;
  groupsEligible: string[];
  memberTierRequired?: string;
  imageUrl: string;
}

interface BenefitRedemption {
  id: string;
  benefitId: string;
  memberName: string;
  memberEmail: string;
  redeemedAt: string;
  status: 'pending' | 'approved' | 'used' | 'expired';
}

export const BenefitManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'redemptions' | 'analytics'>('benefits');
  
  const [benefits, setBenefits] = useState<Benefit[]>([
    {
      id: '1',
      title: '20% Health Checkup Discount',
      description: 'Comprehensive health screening with certified medical professionals',
      type: 'discount',
      category: 'Health',
      provider: 'MediCare Plus',
      value: '20% OFF',
      eligibility: ['Active member for 3+ months', 'Good standing'],
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
      maxRedemptions: 100,
      currentRedemptions: 23,
      isActive: true,
      groupsEligible: ['Community Church', 'Youth Ministry'],
      memberTierRequired: 'Bronze',
      imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '2',
      title: 'Free Professional Consultation',
      description: '1-hour consultation with certified financial advisors',
      type: 'service',
      category: 'Financial',
      provider: 'SureBank Financial',
      value: '1 Hour Session',
      eligibility: ['Premium member', 'Completed financial literacy course'],
      validFrom: '2025-01-01',
      validUntil: '2025-06-30',
      maxRedemptions: 50,
      currentRedemptions: 12,
      isActive: true,
      groupsEligible: ['Local Union Chapter', 'Community Church'],
      memberTierRequired: 'Silver',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '3',
      title: 'Exclusive Event Access',
      description: 'Priority access to special community events and workshops',
      type: 'access',
      category: 'Events',
      provider: 'SureGroups Events',
      value: 'VIP Access',
      eligibility: ['Active member', 'Event attendance >80%'],
      validFrom: '2025-01-01',
      currentRedemptions: 45,
      isActive: true,
      groupsEligible: ['All Groups'],
      imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '4',
      title: 'Monthly Cash Reward',
      description: 'Cash reward for top contributing members each month',
      type: 'reward',
      category: 'Recognition',
      provider: 'SureGroups',
      value: '$50 Cash',
      eligibility: ['Top 10 contributors', 'Active participation'],
      validFrom: '2025-01-01',
      maxRedemptions: 10,
      currentRedemptions: 8,
      isActive: false,
      groupsEligible: ['Community Care', 'Youth Ministry'],
      memberTierRequired: 'Gold',
      imageUrl: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ]);

  const [redemptions] = useState<BenefitRedemption[]>([
    {
      id: '1',
      benefitId: '1',
      memberName: 'Sarah Johnson',
      memberEmail: 'sarah.j@example.com',
      redeemedAt: '2025-01-14T10:30:00Z',
      status: 'approved'
    },
    {
      id: '2',
      benefitId: '2',
      memberName: 'Mike Wilson',
      memberEmail: 'mike.w@example.com',
      redeemedAt: '2025-01-13T16:45:00Z',
      status: 'used'
    },
    {
      id: '3',
      benefitId: '1',
      memberName: 'Emily Davis',
      memberEmail: 'emily.d@example.com',
      redeemedAt: '2025-01-12T14:20:00Z',
      status: 'pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | Benefit['type']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newBenefit, setNewBenefit] = useState({
    title: '',
    description: '',
    type: 'discount' as Benefit['type'],
    category: '',
    provider: '',
    value: '',
    validFrom: '',
    validUntil: '',
    maxRedemptions: ''
  });

  const filteredBenefits = benefits.filter(benefit => {
    const matchesSearch = benefit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefit.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || benefit.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && benefit.isActive) ||
                         (statusFilter === 'inactive' && !benefit.isActive);
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateBenefit = () => {
    const benefit: Benefit = {
      id: Date.now().toString(),
      ...newBenefit,
      eligibility: ['Active member'],
      currentRedemptions: 0,
      isActive: true,
      groupsEligible: ['All Groups'],
      maxRedemptions: newBenefit.maxRedemptions ? parseInt(newBenefit.maxRedemptions) : undefined,
      imageUrl: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=600'
    };
    setBenefits([benefit, ...benefits]);
    setNewBenefit({
      title: '', description: '', type: 'discount', category: '', provider: '', 
      value: '', validFrom: '', validUntil: '', maxRedemptions: ''
    });
    setShowCreateModal(false);
  };

  const toggleBenefitStatus = (benefitId: string) => {
    setBenefits(benefits.map(benefit => 
      benefit.id === benefitId ? { ...benefit, isActive: !benefit.isActive } : benefit
    ));
  };

  const handleDeleteBenefit = (benefitId: string) => {
    setBenefits(benefits.filter(benefit => benefit.id !== benefitId));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discount': return 'bg-blue-100 text-blue-700';
      case 'service': return 'bg-green-100 text-green-700';
      case 'access': return 'bg-purple-100 text-purple-700';
      case 'reward': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'used': return 'bg-blue-100 text-blue-700';
      case 'expired': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const activeBenefits = benefits.filter(b => b.isActive).length;
  const totalRedemptions = benefits.reduce((sum, b) => sum + b.currentRedemptions, 0);
  const pendingRedemptions = redemptions.filter(r => r.status === 'pending').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Benefit Management</h1>
        <p className="text-gray-600">Manage group benefits, discounts, and member perks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Benefits</p>
              <p className="text-2xl font-bold text-blue-600">{activeBenefits}</p>
            </div>
            <Gift className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Redemptions</p>
              <p className="text-2xl font-bold text-green-600">{totalRedemptions}</p>
            </div>
            <Tag className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingRedemptions}</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Benefits</p>
              <p className="text-2xl font-bold text-purple-600">{benefits.length}</p>
            </div>
            <Star className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('benefits')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'benefits'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Benefits ({benefits.length})
            </button>
            <button
              onClick={() => setActiveTab('redemptions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'redemptions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Redemptions ({redemptions.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Benefits Tab */}
      {activeTab === 'benefits' && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search benefits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                </div>
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="discount">Discounts</option>
                <option value="service">Services</option>
                <option value="access">Access</option>
                <option value="reward">Rewards</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Benefit</span>
              </button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit) => (
              <div key={benefit.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={benefit.imageUrl} 
                    alt={benefit.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(benefit.type)}`}>
                      {benefit.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      benefit.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {benefit.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{benefit.title}</h3>
                    <div className="text-right ml-2">
                      <p className="text-lg font-bold text-green-600">{benefit.value}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{benefit.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-500">
                      <p className="font-medium">{benefit.provider}</p>
                      <p>{benefit.category}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-gray-600">
                        {benefit.currentRedemptions}
                        {benefit.maxRedemptions && ` / ${benefit.maxRedemptions}`} used
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    Valid: {new Date(benefit.validFrom).toLocaleDateString()}
                    {benefit.validUntil && ` - ${new Date(benefit.validUntil).toLocaleDateString()}`}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedBenefit(benefit)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBenefit(benefit.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleBenefitStatus(benefit.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        benefit.isActive 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {benefit.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Redemptions Tab */}
      {activeTab === 'redemptions' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redeemed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {redemptions.map((redemption) => {
                  const benefit = benefits.find(b => b.id === redemption.benefitId);
                  return (
                    <tr key={redemption.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{redemption.memberName}</div>
                          <div className="text-sm text-gray-500">{redemption.memberEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{benefit?.title}</div>
                        <div className="text-sm text-gray-500">{benefit?.provider}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(redemption.redeemedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(redemption.status)}`}>
                          {redemption.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          {redemption.status === 'pending' && (
                            <>
                              <button className="text-green-600 hover:text-green-900">
                                <Check className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefit Performance</h3>
            <div className="space-y-4">
              {benefits.slice(0, 4).map((benefit) => (
                <div key={benefit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{benefit.title}</p>
                    <p className="text-xs text-gray-500">{benefit.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">{benefit.currentRedemptions}</p>
                    <p className="text-xs text-gray-500">redemptions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Health</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Financial</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Events</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">10%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Recognition</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Benefit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Benefit</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newBenefit.title}
                  onChange={(e) => setNewBenefit({...newBenefit, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newBenefit.description}
                  onChange={(e) => setNewBenefit({...newBenefit, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newBenefit.type}
                  onChange={(e) => setNewBenefit({...newBenefit, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="discount">Discount</option>
                  <option value="service">Service</option>
                  <option value="access">Access</option>
                  <option value="reward">Reward</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newBenefit.category}
                  onChange={(e) => setNewBenefit({...newBenefit, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                <input
                  type="text"
                  value={newBenefit.provider}
                  onChange={(e) => setNewBenefit({...newBenefit, provider: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={newBenefit.value}
                  onChange={(e) => setNewBenefit({...newBenefit, value: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 20% OFF, $50, Free Session"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                  <input
                    type="date"
                    value={newBenefit.validFrom}
                    onChange={(e) => setNewBenefit({...newBenefit, validFrom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                  <input
                    type="date"
                    value={newBenefit.validUntil}
                    onChange={(e) => setNewBenefit({...newBenefit, validUntil: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Redemptions (Optional)</label>
                <input
                  type="number"
                  value={newBenefit.maxRedemptions}
                  onChange={(e) => setNewBenefit({...newBenefit, maxRedemptions: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBenefit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Benefit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Benefit Details Modal */}
      {selectedBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedBenefit.imageUrl} 
                alt={selectedBenefit.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedBenefit(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedBenefit.title}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedBenefit.type)}`}>
                      {selectedBenefit.type}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedBenefit.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedBenefit.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{selectedBenefit.value}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{selectedBenefit.description}</p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider:</span>
                      <span className="text-gray-900">{selectedBenefit.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="text-gray-900">{selectedBenefit.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid From:</span>
                      <span className="text-gray-900">{new Date(selectedBenefit.validFrom).toLocaleDateString()}</span>
                    </div>
                    {selectedBenefit.validUntil && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valid Until:</span>
                        <span className="text-gray-900">{new Date(selectedBenefit.validUntil).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Usage</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Redemptions:</span>
                      <span className="text-gray-900">
                        {selectedBenefit.currentRedemptions}
                        {selectedBenefit.maxRedemptions && ` / ${selectedBenefit.maxRedemptions}`}
                      </span>
                    </div>
                    {selectedBenefit.maxRedemptions && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(selectedBenefit.currentRedemptions / selectedBenefit.maxRedemptions) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Eligibility Requirements</h4>
                <ul className="space-y-1">
                  {selectedBenefit.eligibility.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedBenefit(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => toggleBenefitStatus(selectedBenefit.id)}
                  className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                    selectedBenefit.isActive 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {selectedBenefit.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Benefit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};