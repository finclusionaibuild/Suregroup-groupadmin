import React, { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Calendar, Users, BarChart3, DollarSign, Edit, Trash2, Eye, X, ArrowDownCircle, ArrowUpCircle, Send } from 'lucide-react';
import { DonationCampaign, DonationRecord, DonationWallet } from '../../types';

export const DonationManagement: React.FC = () => {
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [wallet, setWallet] = useState<DonationWallet>({ balance: 0, currency: 'USD', updatedAt: new Date().toISOString() });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | DonationCampaign['status']>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editCampaign, setEditCampaign] = useState<DonationCampaign | null>(null);
  const [detailsCampaign, setDetailsCampaign] = useState<DonationCampaign | null>(null);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    targetAmount: '',
    startDate: '',
    endDate: '',
    visibility: 'public' as 'public' | 'restricted',
    visibleRoles: [] as string[]
  });
  const [transferModal, setTransferModal] = useState<{ type: 'transfer' | 'withdraw' | 'allocate'; amount: string; note: string } | null>(null);
  const [donorFilter, setDonorFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const campaignDonations = (id: string) => donations.filter(d => d.campaignId === id);
  const filteredCampaignDonations = (id: string) => campaignDonations(id).filter(d => {
    const matchesDonor = donorFilter === '' || d.memberName.toLowerCase().includes(donorFilter.toLowerCase());
    const matchesAmount = amountFilter === '' || d.amount >= parseFloat(amountFilter || '0');
    const matchesDate = dateFilter === '' || d.createdAt.slice(0,10) === dateFilter;
    return matchesDonor && matchesAmount && matchesDate;
  });

  useEffect(() => {
    try {
      const rawC = localStorage.getItem('donation_campaigns');
      const rawD = localStorage.getItem('donation_records');
      const rawW = localStorage.getItem('donation_wallet');
      if (rawC) setCampaigns(JSON.parse(rawC));
      if (rawD) setDonations(JSON.parse(rawD));
      if (rawW) setWallet(JSON.parse(rawW));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('donation_campaigns', JSON.stringify(campaigns));
      localStorage.setItem('donation_records', JSON.stringify(donations));
      localStorage.setItem('donation_wallet', JSON.stringify(wallet));
    } catch {}
  }, [campaigns, donations, wallet]);

  const computeStatus = (start: string, end: string): DonationCampaign['status'] => {
    const now = new Date();
    const s = start ? new Date(start) : null;
    const e = end ? new Date(end) : null;
    if (s && now < s) return 'upcoming';
    if (e && now > e) return 'closed';
    return 'active';
  };

  const handleCreateCampaign = () => {
    const id = `don-${Date.now()}`;
    const created: DonationCampaign = {
      id,
      title: newCampaign.title.trim(),
      description: newCampaign.description.trim(),
      targetAmount: newCampaign.targetAmount ? parseFloat(newCampaign.targetAmount) : undefined,
      amountRaised: 0,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      status: computeStatus(newCampaign.startDate, newCampaign.endDate),
      visibility: newCampaign.visibility,
      visibleRoles: newCampaign.visibleRoles,
      createdBy: 'Group Admin',
      createdAt: new Date().toISOString()
    };
    setCampaigns([created, ...campaigns]);
    setShowCreateModal(false);
    setNewCampaign({ title: '', description: '', targetAmount: '', startDate: '', endDate: '', visibility: 'public', visibleRoles: [] });
  };

  const handleDeleteCampaign = (id: string) => setCampaigns(campaigns.filter(c => c.id !== id));
  const handleCloseCampaign = (id: string) => setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: 'closed' } : c));
  const handleSaveEdit = () => {
    if (!editCampaign) return;
    const updated = { ...editCampaign };
    setCampaigns(campaigns.map(c => c.id === updated.id ? updated : c));
    setEditCampaign(null);
  };

  // Wallet operations (simulate SureBanker integration)
  const applyWalletChange = (delta: number) => setWallet({ balance: Math.max(0, wallet.balance + delta), currency: wallet.currency, updatedAt: new Date().toISOString() });
  const handleWalletAction = (type: 'transfer' | 'withdraw' | 'allocate', amountStr: string) => {
    const amt = parseFloat(amountStr || '0');
    if (isNaN(amt) || amt <= 0) return;
    if (type === 'withdraw' && amt > wallet.balance) return;
    if (type === 'withdraw') applyWalletChange(-amt);
    if (type === 'transfer' || type === 'allocate') applyWalletChange(-amt);
    setTransferModal(null);
  };

  // Analytics
  const totalRaised = donations.reduce((s, d) => s + d.amount, 0);
  const activeCount = campaigns.filter(c => c.status === 'active').length;
  const closedCount = campaigns.filter(c => c.status === 'closed').length;
  const topDonors = useMemo(() => {
    const map = new Map<string, number>();
    donations.forEach(d => map.set(d.memberName, (map.get(d.memberName) || 0) + d.amount));
    return Array.from(map.entries()).sort((a,b) => b[1]-a[1]).slice(0,5);
  }, [donations]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Donation Management</h1>
          <p className="text-gray-600">Create and manage donation campaigns with SureBanker wallet</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setTransferModal({ type: 'transfer', amount: '', note: '' })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center space-x-1"><ArrowUpCircle className="w-4 h-4" /><span>Transfer</span></button>
          <button onClick={() => setTransferModal({ type: 'withdraw', amount: '', note: '' })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center space-x-1"><ArrowDownCircle className="w-4 h-4" /><span>Withdraw</span></button>
          <button onClick={() => setTransferModal({ type: 'allocate', amount: '', note: '' })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Allocate</button>
          <button onClick={() => setShowCreateModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"><Plus className="w-4 h-4" /><span>Create New Donation</span></button>
        </div>
      </div>

      {/* Wallet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Donation Wallet Balance</p>
              <p className="text-2xl font-bold text-gray-900">${wallet.balance.toFixed(2)} {wallet.currency}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-emerald-600">${totalRaised.toFixed(2)}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-blue-600">{activeCount}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Closed Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{closedCount}</p>
            </div>
            <X className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" placeholder="Search campaigns..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full" />
            </div>
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Campaigns */}
      <div className="space-y-6">
        {filteredCampaigns.map(c => {
          const raised = campaignDonations(c.id).reduce((s, d) => s + d.amount, 0);
          const progress = c.targetAmount ? Math.min(100, Math.round((raised / c.targetAmount) * 100)) : 0;
          return (
            <div key={c.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${c.status === 'active' ? 'bg-green-100 text-green-700' : c.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{c.status}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{c.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center"><DollarSign className="w-4 h-4 mr-2" /><span>Target: {c.targetAmount ? `$${c.targetAmount.toFixed(2)}` : '—'}</span></div>
                    <div className="flex items-center"><DollarSign className="w-4 h-4 mr-2" /><span>Raised: ${raised.toFixed(2)}</span></div>
                    <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /><span>Ends {new Date(c.endDate).toLocaleDateString()}</span></div>
                  </div>
                  {c.targetAmount && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button onClick={() => setDetailsCampaign(c)} className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"><Eye className="w-4 h-4" /><span>Details</span></button>
                  <button onClick={() => setEditCampaign(c)} className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"><Edit className="w-4 h-4" /><span>Edit</span></button>
                  <button onClick={() => handleCloseCampaign(c.id)} className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">Close</button>
                  <button onClick={() => handleDeleteCampaign(c.id)} className="text-red-600 hover:text-red-900 flex items-center space-x-1"><Trash2 className="w-4 h-4" /><span>Delete</span></button>
                </div>
              </div>

              {/* Donations Table */}
              <div className="bg-white rounded-lg border border-gray-200 mt-4">
                <div className="p-4 flex flex-col md:flex-row gap-3 items-center">
                  <input type="text" value={donorFilter} onChange={(e) => setDonorFilter(e.target.value)} placeholder="Filter by member" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-1/3" />
                  <input type="number" value={amountFilter} onChange={(e) => setAmountFilter(e.target.value)} placeholder="Min amount" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-1/3" />
                  <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-1/3" />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCampaignDonations(c.id).map(d => (
                        <tr key={d.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.memberName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${d.amount.toFixed(2)} {d.currency}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(d.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                      {filteredCampaignDonations(c.id).length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-6 py-6 text-center text-sm text-gray-500">No donations for this campaign yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCampaigns.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No donations yet</h3>
            <p className="text-gray-500">Create a new donation campaign to get started.</p>
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Donation</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donation Title</label>
                <input type="text" value={newCampaign.title} onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={newCampaign.description} onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (optional)</label>
                  <input type="number" value={newCampaign.targetAmount} onChange={(e) => setNewCampaign({ ...newCampaign, targetAmount: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                  <select value={newCampaign.visibility} onChange={(e) => setNewCampaign({ ...newCampaign, visibility: e.target.value as 'public' | 'restricted' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="public">Public (members)</option>
                    <option value="restricted">Restricted (roles)</option>
                  </select>
                </div>
              </div>
              {newCampaign.visibility === 'restricted' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allowed Roles</label>
                  <div className="flex flex-wrap gap-2">
                    {['member','vendor','developer'].map(role => (
                      <label key={role} className="inline-flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={newCampaign.visibleRoles.includes(role)} onChange={(e) => {
                          const next = e.target.checked ? [...newCampaign.visibleRoles, role] : newCampaign.visibleRoles.filter(r => r !== role);
                          setNewCampaign({ ...newCampaign, visibleRoles: next });
                        }} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="capitalize">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" value={newCampaign.startDate} onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" value={newCampaign.endDate} onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleCreateCampaign} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Donation</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {editCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Donation</h3>
              <button onClick={() => setEditCampaign(null)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donation Title</label>
                <input type="text" value={editCampaign.title} onChange={(e) => setEditCampaign({ ...editCampaign, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editCampaign.description} onChange={(e) => setEditCampaign({ ...editCampaign, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent" rows={3} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
                  <input type="number" value={editCampaign.targetAmount ?? ''} onChange={(e) => setEditCampaign({ ...editCampaign, targetAmount: e.target.value ? parseFloat(e.target.value) : undefined })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                  <select value={editCampaign.visibility} onChange={(e) => setEditCampaign({ ...editCampaign, visibility: e.target.value as 'public' | 'restricted' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent">
                    <option value="public">Public</option>
                    <option value="restricted">Restricted</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" value={editCampaign.startDate.slice(0,10)} onChange={(e) => setEditCampaign({ ...editCampaign, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" value={editCampaign.endDate.slice(0,10)} onChange={(e) => setEditCampaign({ ...editCampaign, endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setEditCampaign(null)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Details Modal */}
      {detailsCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{detailsCampaign.title}</h3>
              <button onClick={() => setDetailsCampaign(null)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">{detailsCampaign.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div><span className="font-medium">Target:</span> {detailsCampaign.targetAmount ? `$${detailsCampaign.targetAmount.toFixed(2)}` : '—'}</div>
                <div><span className="font-medium">Status:</span> {detailsCampaign.status}</div>
                <div><span className="font-medium">Start:</span> {new Date(detailsCampaign.startDate).toLocaleDateString()}</div>
                <div><span className="font-medium">End:</span> {new Date(detailsCampaign.endDate).toLocaleDateString()}</div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Top Donors</h4>
                {topDonors.length === 0 && <div className="text-sm text-gray-500">No donors yet.</div>}
                {topDonors.map(([name, amt]) => (
                  <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-700">{name}</span>
                    <span className="text-gray-900 font-medium">${amt.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center space-x-1"><Send className="w-4 h-4" /><span>Send Thank You</span></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Action Modal */}
      {transferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">{transferModal.type} funds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="number" step="0.01" value={transferModal.amount} onChange={(e) => setTransferModal({ ...transferModal, amount: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <input type="text" value={transferModal.note} onChange={(e) => setTransferModal({ ...transferModal, note: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setTransferModal(null)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleWalletAction(transferModal.type, transferModal.amount)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

