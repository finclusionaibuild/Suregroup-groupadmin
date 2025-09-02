import React, { useState } from 'react';
import { TrendingUp, Target, Users, Calendar, Send, Eye, Edit, Trash2, Plus, Star, Gift, DollarSign } from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  serviceId: string;
  serviceName: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  targetGroups: string[];
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'expired' | 'rejected';
  views: number;
  clicks: number;
  conversions: number;
  requiresApproval: boolean;
}

interface SponsoredListing {
  id: string;
  serviceId: string;
  serviceName: string;
  duration: number; // days
  cost: number;
  status: 'active' | 'pending' | 'expired';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
}

export const VendorMarketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'promotions' | 'sponsored' | 'events' | 'analytics'>('promotions');
  
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      title: '20% Off Health Screening',
      description: 'Special discount for community church members on comprehensive health screening package.',
      serviceId: '1',
      serviceName: 'Comprehensive Health Screening',
      discountType: 'percentage',
      discountValue: 20,
      targetGroups: ['Community Church', 'Youth Ministry'],
      startDate: '2025-01-15',
      endDate: '2025-02-15',
      status: 'pending',
      views: 0,
      clicks: 0,
      conversions: 0,
      requiresApproval: true
    },
    {
      id: '2',
      title: 'Free Consultation Session',
      description: 'Complimentary 30-minute business consultation for new clients.',
      serviceId: '2',
      serviceName: 'Professional Business Consultation',
      discountType: 'fixed',
      discountValue: 75,
      targetGroups: ['Local Union Chapter'],
      startDate: '2025-01-10',
      endDate: '2025-01-31',
      status: 'active',
      views: 234,
      clicks: 45,
      conversions: 8,
      requiresApproval: true
    }
  ]);

  const [sponsoredListings, setSponsoredListings] = useState<SponsoredListing[]>([
    {
      id: '1',
      serviceId: '1',
      serviceName: 'Comprehensive Health Screening',
      duration: 30,
      cost: 50.00,
      status: 'active',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      impressions: 1250,
      clicks: 89
    },
    {
      id: '2',
      serviceId: '3',
      serviceName: 'Digital Marketing Masterclass',
      duration: 14,
      cost: 25.00,
      status: 'pending',
      startDate: '2025-01-20',
      endDate: '2025-02-03',
      impressions: 0,
      clicks: 0
    }
  ]);

  const [showCreatePromotion, setShowCreatePromotion] = useState(false);
  const [showCreateSponsored, setShowCreateSponsored] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    serviceId: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: '',
    targetGroups: [] as string[],
    startDate: '',
    endDate: ''
  });

  const [newSponsored, setNewSponsored] = useState({
    serviceId: '',
    duration: '',
    cost: ''
  });

  const availableServices = [
    { id: '1', name: 'Comprehensive Health Screening' },
    { id: '2', name: 'Professional Business Consultation' },
    { id: '3', name: 'Digital Marketing Masterclass' }
  ];

  const availableGroups = [
    'Community Church',
    'Youth Ministry',
    'Local Union Chapter',
    'Tech Professionals',
    'Community Care'
  ];

  const handleCreatePromotion = () => {
    const promotion: Promotion = {
      id: Date.now().toString(),
      ...newPromotion,
      serviceName: availableServices.find(s => s.id === newPromotion.serviceId)?.name || '',
      discountValue: parseFloat(newPromotion.discountValue) || 0,
      status: 'pending',
      views: 0,
      clicks: 0,
      conversions: 0,
      requiresApproval: true
    };
    setPromotions([promotion, ...promotions]);
    setNewPromotion({
      title: '', description: '', serviceId: '', discountType: 'percentage', 
      discountValue: '', targetGroups: [], startDate: '', endDate: ''
    });
    setShowCreatePromotion(false);
  };

  const handleCreateSponsored = () => {
    const sponsored: SponsoredListing = {
      id: Date.now().toString(),
      serviceId: newSponsored.serviceId,
      serviceName: availableServices.find(s => s.id === newSponsored.serviceId)?.name || '',
      duration: parseInt(newSponsored.duration) || 0,
      cost: parseFloat(newSponsored.cost) || 0,
      status: 'pending',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + parseInt(newSponsored.duration) * 24 * 60 * 60 * 1000).toISOString(),
      impressions: 0,
      clicks: 0
    };
    setSponsoredListings([sponsored, ...sponsoredListings]);
    setNewSponsored({ serviceId: '', duration: '', cost: '' });
    setShowCreateSponsored(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'expired': return 'bg-gray-100 text-gray-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const activePromotions = promotions.filter(p => p.status === 'active').length;
  const totalViews = promotions.reduce((sum, p) => sum + p.views, 0);
  const totalConversions = promotions.reduce((sum, p) => sum + p.conversions, 0);
  const conversionRate = totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(1) : '0';

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Engagement & Marketing</h1>
        <p className="text-gray-600">Promote your services and boost visibility within groups</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Promotions</p>
              <p className="text-2xl font-bold text-green-600">{activePromotions}</p>
            </div>
            <Gift className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">{totalViews}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-purple-600">{totalConversions}</p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-orange-600">{conversionRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('promotions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'promotions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Promotions ({promotions.length})
            </button>
            <button
              onClick={() => setActiveTab('sponsored')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sponsored'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sponsored Listings ({sponsoredListings.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Event Services
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

      {/* Promotions Tab */}
      {activeTab === 'promotions' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Group Promotions</h2>
              <p className="text-sm text-gray-600">Create special offers for group members (requires admin approval)</p>
            </div>
            <button
              onClick={() => setShowCreatePromotion(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Promotion</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promotion) => (
              <div key={promotion.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{promotion.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{promotion.description}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(promotion.status)}`}>
                      {promotion.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service:</span>
                    <span className="text-gray-900">{promotion.serviceName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-green-600 font-medium">
                      {promotion.discountType === 'percentage' ? `${promotion.discountValue}%` : `$${promotion.discountValue}`} OFF
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="text-gray-900">
                      {new Date(promotion.startDate).toLocaleDateString()} - {new Date(promotion.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Target Groups:</p>
                  <div className="flex flex-wrap gap-1">
                    {promotion.targetGroups.map((group, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        {group}
                      </span>
                    ))}
                  </div>
                </div>

                {promotion.status === 'active' && (
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-600">{promotion.views}</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{promotion.clicks}</p>
                      <p className="text-xs text-gray-500">Clicks</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">{promotion.conversions}</p>
                      <p className="text-xs text-gray-500">Sales</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedPromotion(promotion)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {promotion.requiresApproval && promotion.status === 'pending' && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      Awaiting Approval
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Sponsored Listings Tab */}
      {activeTab === 'sponsored' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sponsored Listings</h2>
              <p className="text-sm text-gray-600">Boost your service visibility with highlighted vendor cards</p>
            </div>
            <button
              onClick={() => setShowCreateSponsored(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Sponsored Listing</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsoredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.serviceName}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">${listing.cost}</p>
                    <p className="text-xs text-gray-500">{listing.duration} days</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Duration</p>
                    <p className="text-gray-600">{listing.duration} days</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Cost</p>
                    <p className="text-gray-600">${listing.cost.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Start Date</p>
                    <p className="text-gray-600">{new Date(listing.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">End Date</p>
                    <p className="text-gray-600">{new Date(listing.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {listing.status === 'active' && (
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-purple-600">{listing.impressions}</p>
                        <p className="text-xs text-purple-600">Impressions</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-purple-600">{listing.clicks}</p>
                        <p className="text-xs text-purple-600">Clicks</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Event Services Tab */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Service Booking</h2>
          <p className="text-gray-600 mb-6">Offer your services for group events and special occasions</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Training Events</h3>
              <p className="text-sm text-gray-600 mb-4">Offer training sessions and workshops for group events</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Setup Training Services
              </button>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Checks</h3>
              <p className="text-sm text-gray-600 mb-4">Provide health screening services for group events</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Setup Health Services
              </button>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Logistics</h3>
              <p className="text-sm text-gray-600 mb-4">Provide logistics and coordination services</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Setup Logistics Services
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Promotion Performance</h3>
            <div className="space-y-4">
              {promotions.filter(p => p.status === 'active').map((promotion) => (
                <div key={promotion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{promotion.title}</p>
                    <p className="text-xs text-gray-500">{promotion.serviceName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">{promotion.conversions}</p>
                    <p className="text-xs text-gray-500">conversions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing ROI</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Total Investment</p>
                  <p className="text-xs text-green-600">Marketing spend</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">$75.00</p>
                  <p className="text-xs text-green-500">This month</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Revenue Generated</p>
                  <p className="text-xs text-blue-600">From promotions</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">$600.00</p>
                  <p className="text-xs text-blue-500">8x return</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Promotion Modal */}
      {showCreatePromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Promotion</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newPromotion.title}
                  onChange={(e) => setNewPromotion({...newPromotion, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 20% Off Health Screening"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newPromotion.description}
                  onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your promotion"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select
                  value={newPromotion.serviceId}
                  onChange={(e) => setNewPromotion({...newPromotion, serviceId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Service</option>
                  {availableServices.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select
                    value={newPromotion.discountType}
                    onChange={(e) => setNewPromotion({...newPromotion, discountType: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {newPromotion.discountType === 'percentage' ? 'Percentage' : 'Amount ($)'}
                  </label>
                  <input
                    type="number"
                    value={newPromotion.discountValue}
                    onChange={(e) => setNewPromotion({...newPromotion, discountValue: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={newPromotion.discountType === 'percentage' ? '20' : '25.00'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Groups</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {availableGroups.map(group => (
                    <label key={group} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newPromotion.targetGroups.includes(group)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewPromotion({...newPromotion, targetGroups: [...newPromotion.targetGroups, group]});
                          } else {
                            setNewPromotion({...newPromotion, targetGroups: newPromotion.targetGroups.filter(g => g !== group)});
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{group}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newPromotion.startDate}
                    onChange={(e) => setNewPromotion({...newPromotion, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newPromotion.endDate}
                    onChange={(e) => setNewPromotion({...newPromotion, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreatePromotion(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePromotion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Promotion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Sponsored Listing Modal */}
      {showCreateSponsored && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Sponsored Listing</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select
                  value={newSponsored.serviceId}
                  onChange={(e) => setNewSponsored({...newSponsored, serviceId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Service</option>
                  {availableServices.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                <input
                  type="number"
                  value={newSponsored.duration}
                  onChange={(e) => setNewSponsored({...newSponsored, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newSponsored.cost}
                  onChange={(e) => setNewSponsored({...newSponsored, cost: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50.00"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateSponsored(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSponsored}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};