import React, { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Clock, CheckCircle, X, Eye, BarChart3, Users, Calendar, Pencil, Trash2 } from 'lucide-react';

interface VotingOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface Voting {
  id: string;
  title: string;
  description: string;
  type: 'single-choice' | 'multiple-choice' | 'yes-no';
  options: VotingOption[];
  groupName: string;
  createdBy: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  totalVotes: number;
  visibility: 'public' | 'restricted';
  visibleRoles?: string[];
  eligibleVoters: number;
}

export const Votings: React.FC = () => {
  const [votings, setVotings] = useState<Voting[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Voting['status']>('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<Voting | null>(null);
  const [showResultsModal, setShowResultsModal] = useState<Voting | null>(null);
  const [newPoll, setNewPoll] = useState({
    title: '',
    description: '',
    type: 'single-choice' as Voting['type'],
    options: [{ id: 'opt-1', text: '', votes: 0, percentage: 0 }],
    startDate: '',
    endDate: '',
    visibility: 'public' as 'public' | 'restricted',
    visibleRoles: [] as string[],
    groupName: 'Community Church'
  });

  // Groups from localStorage for filter dropdown
  const groups = useMemo(() => {
    try {
      const raw = localStorage.getItem('groups');
      const parsed = raw ? JSON.parse(raw) as { id: string; name: string }[] : [];
      return Array.isArray(parsed) ? parsed.map(g => g.name) : [];
    } catch { return []; }
  }, []);

  const filteredVotings = votings.filter(voting => {
    const matchesSearch = voting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || voting.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || voting.groupName === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  // localStorage persistence
  useEffect(() => {
    try {
      const raw = localStorage.getItem('polls');
      if (raw) {
        const parsed = JSON.parse(raw) as Voting[];
        if (Array.isArray(parsed)) setVotings(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('polls', JSON.stringify(votings)); } catch {}
  }, [votings]);

  const computeStatus = (start: string, end: string): Voting['status'] => {
    const now = new Date();
    const s = start ? new Date(start) : null;
    const e = end ? new Date(end) : null;
    if (s && now < s) return 'upcoming';
    if (e && now > e) return 'completed';
    return 'active';
  };

  const recalcPercentages = (options: VotingOption[], total: number) =>
    options.map(o => ({ ...o, percentage: total > 0 ? Math.round((o.votes / total) * 100) : 0 }));

  const handleCreatePoll = () => {
    const id = `poll-${Date.now()}`;
    const totalVotes = 0;
    const created: Voting = {
      id,
      title: newPoll.title.trim(),
      description: newPoll.description.trim(),
      type: newPoll.type,
      options: recalcPercentages(newPoll.options.map((o, idx) => ({...o, id: o.id || `opt-${idx+1}`, votes: 0})), totalVotes),
      groupName: newPoll.groupName,
      createdBy: 'Group Admin',
      startDate: newPoll.startDate,
      endDate: newPoll.endDate,
      status: computeStatus(newPoll.startDate, newPoll.endDate),
      totalVotes,
      visibility: newPoll.visibility,
      visibleRoles: newPoll.visibleRoles,
      eligibleVoters: 0
    };
    setVotings([created, ...votings]);
    setShowCreateModal(false);
    setNewPoll({
      title: '', description: '', type: 'single-choice', options: [{ id: 'opt-1', text: '', votes: 0, percentage: 0 }],
      startDate: '', endDate: '', visibility: 'public', visibleRoles: [], groupName: 'Community Church'
    });
  };

  const handleDeletePoll = (id: string) => {
    setVotings(votings.filter(v => v.id !== id));
  };

  const handleUpdatePoll = () => {
    if (!showEditModal) return;
    const updated = { ...showEditModal };
    updated.options = recalcPercentages(updated.options, updated.totalVotes);
    updated.status = computeStatus(updated.startDate, updated.endDate);
    setVotings(votings.map(v => v.id === updated.id ? updated : v));
    setShowEditModal(null as any);
  };

  const handleClosePoll = (id: string) => {
    setVotings(votings.map(v => v.id === id ? { ...v, status: 'completed' } : v));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'single-choice': return 'bg-blue-100 text-blue-700';
      case 'multiple-choice': return 'bg-purple-100 text-purple-700';
      case 'yes-no': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const activeVotings = votings.filter(v => v.status === 'active').length;
  const completedVotings = votings.filter(v => v.status === 'completed').length;
  const participationRate = votings.length === 0 ? 0 : Math.round((votings.reduce((s, v) => s + v.totalVotes, 0) / Math.max(1, votings.reduce((s, v) => s + v.eligibleVoters, 0))) * 100);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Votings</h1>
        <p className="text-gray-600">Participate in group decisions and view voting results</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Votings</p>
              <p className="text-2xl font-bold text-gray-900">{votings.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Votings</p>
              <p className="text-2xl font-bold text-green-600">{activeVotings}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{completedVotings}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Participation Rate</p>
              <p className="text-2xl font-bold text-purple-600">{participationRate.toFixed(0)}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search votings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Groups</option>
            {groups.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <div className="flex-1"></div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Poll</span>
          </button>
        </div>
      </div>

      {/* Votings List */}
      <div className="space-y-6">
        {filteredVotings.map((voting) => (
          <div key={voting.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{voting.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(voting.status)}`}>
                    {getStatusIcon(voting.status)}
                    <span className="ml-1">{voting.status}</span>
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(voting.type)}`}>
                    {voting.type.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{voting.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Ends {new Date(voting.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{voting.totalVotes} total votes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <span>Status: {voting.status}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>{voting.groupName}</span>
                  <span>•</span>
                  <span>Created by {voting.createdBy}</span>
                  <span>•</span>
                  <span>Visibility: {voting.visibility}</span>
                </div>
                {/* Options preview (results snapshot) */}
                <div className="space-y-3">
                  {voting.options.map((option) => (
                    <div key={option.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{option.text}</span>
                        <span className="text-sm text-gray-600">{option.votes} votes</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${option.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{option.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button onClick={() => setShowResultsModal(voting)} className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View Results</span>
                </button>
                <button onClick={() => setShowEditModal(voting)} className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
                  <Pencil className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDeletePoll(voting.id)} className="text-red-600 hover:text-red-900 flex items-center space-x-1">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                {voting.status === 'active' && (
                  <button onClick={() => handleClosePoll(voting.id)} className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">Close Poll</button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredVotings.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No polls created yet</h3>
            <p className="text-gray-500">Click “Create New Poll” to start.</p>
          </div>
        )}
      </div>

      {/* Create Poll Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Poll</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poll Title</label>
                <input type="text" value={newPoll.title} onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poll Description</label>
                <textarea value={newPoll.description} onChange={(e) => setNewPoll({ ...newPoll, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                <div className="space-y-2">
                  {newPoll.options.map((opt, idx) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <input type="text" value={opt.text} onChange={(e) => {
                        const copy = [...newPoll.options];
                        copy[idx] = { ...copy[idx], text: e.target.value };
                        setNewPoll({ ...newPoll, options: copy });
                      }} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={`Option ${idx+1}`} />
                      <button onClick={() => setNewPoll({ ...newPoll, options: newPoll.options.filter((_, i) => i !== idx) })} className="px-2 py-2 text-red-600 hover:text-red-800" aria-label="Remove option">✕</button>
                    </div>
                  ))}
                  <button onClick={() => setNewPoll({ ...newPoll, options: [...newPoll.options, { id: `opt-${newPoll.options.length+1}`, text: '', votes: 0, percentage: 0 }] })} className="text-blue-600 hover:text-blue-800 text-sm">+ Add option</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" value={newPoll.startDate} onChange={(e) => setNewPoll({ ...newPoll, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" value={newPoll.endDate} onChange={(e) => setNewPoll({ ...newPoll, endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                  <select value={newPoll.visibility} onChange={(e) => setNewPoll({ ...newPoll, visibility: e.target.value as 'public' | 'restricted' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="public">Public (within group)</option>
                    <option value="restricted">Restricted by role</option>
                  </select>
                </div>
                {newPoll.visibility === 'restricted' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allowed Roles</label>
                    <div className="flex flex-wrap gap-2">
                      {['member','vendor','developer'].map(role => (
                        <label key={role} className="inline-flex items-center space-x-2 text-sm">
                          <input type="checkbox" checked={newPoll.visibleRoles.includes(role)} onChange={(e) => {
                            const next = e.target.checked ? [...newPoll.visibleRoles, role] : newPoll.visibleRoles.filter(r => r !== role);
                            setNewPoll({ ...newPoll, visibleRoles: next });
                          }} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="capitalize">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleCreatePoll} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Poll</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Poll Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Poll</h3>
              <button onClick={() => setShowEditModal(null as any)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poll Title</label>
                <input type="text" value={showEditModal.title} onChange={(e) => setShowEditModal({ ...showEditModal, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poll Description</label>
                <textarea value={showEditModal.description} onChange={(e) => setShowEditModal({ ...showEditModal, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                <div className="space-y-2">
                  {showEditModal.options.map((opt, idx) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <input type="text" value={opt.text} onChange={(e) => {
                        const copy = [...showEditModal.options];
                        copy[idx] = { ...copy[idx], text: e.target.value };
                        setShowEditModal({ ...showEditModal, options: copy });
                      }} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      <button onClick={() => setShowEditModal({ ...showEditModal, options: showEditModal.options.filter((_, i) => i !== idx) })} className="px-2 py-2 text-red-600 hover:text-red-800" aria-label="Remove option">✕</button>
                    </div>
                  ))}
                  <button onClick={() => setShowEditModal({ ...showEditModal, options: [...showEditModal.options, { id: `opt-${showEditModal.options.length+1}`, text: '', votes: 0, percentage: 0 }] })} className="text-blue-600 hover:text-blue-800 text-sm">+ Add option</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" value={showEditModal.startDate.slice(0,10)} onChange={(e) => setShowEditModal({ ...showEditModal, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" value={showEditModal.endDate.slice(0,10)} onChange={(e) => setShowEditModal({ ...showEditModal, endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                  <select value={showEditModal.visibility} onChange={(e) => setShowEditModal({ ...showEditModal, visibility: e.target.value as 'public' | 'restricted' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="public">Public (within group)</option>
                    <option value="restricted">Restricted by role</option>
                  </select>
                </div>
                {showEditModal.visibility === 'restricted' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allowed Roles</label>
                    <div className="flex flex-wrap gap-2">
                      {['member','vendor','developer'].map(role => (
                        <label key={role} className="inline-flex items-center space-x-2 text-sm">
                          <input type="checkbox" checked={showEditModal.visibleRoles?.includes(role)} onChange={(e) => {
                            const next = e.target.checked ? [...(showEditModal.visibleRoles||[]), role] : (showEditModal.visibleRoles||[]).filter(r => r !== role);
                            setShowEditModal({ ...showEditModal, visibleRoles: next });
                          }} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="capitalize">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setShowEditModal(null as any)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleUpdatePoll} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showResultsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Results: {showResultsModal.title}</h3>
              <button onClick={() => setShowResultsModal(null as any)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Start</h4>
                  <p className="text-gray-600">{new Date(showResultsModal.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">End</h4>
                  <p className="text-gray-600">{new Date(showResultsModal.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="space-y-3">
                {showResultsModal.options.map(opt => (
                  <div key={opt.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{opt.text}</span>
                      <span className="text-sm text-gray-600">{opt.votes} votes</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${opt.percentage}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{opt.percentage}%</div>
                  </div>
                ))}
              </div>
              {showResultsModal.status === 'active' && (
                <button onClick={() => { handleClosePoll(showResultsModal.id); setShowResultsModal(null as any); }} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">Close Poll</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Voting Interface Component
// Removed in admin POV (admins do not vote).