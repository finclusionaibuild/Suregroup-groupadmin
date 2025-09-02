import React, { useState } from 'react';
import { Search, Plus, Vote, Clock, CheckCircle, X, Eye, BarChart3, Users, Calendar } from 'lucide-react';

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
  hasVoted: boolean;
  userVote?: string[];
  isAnonymous: boolean;
  requiresQuorum: boolean;
  quorumPercentage?: number;
  eligibleVoters: number;
}

export const Votings: React.FC = () => {
  const [votings, setVotings] = useState<Voting[]>([
    {
      id: '1',
      title: 'Youth Camp Location Selection',
      description: 'Help us choose the location for our annual youth summer camp. Your vote will help determine where we spend this amazing week together.',
      type: 'single-choice',
      options: [
        { id: '1', text: 'Mountain Resort - Obudu Ranch', votes: 23, percentage: 45 },
        { id: '2', text: 'Beach Resort - Tarkwa Bay', votes: 18, percentage: 35 },
        { id: '3', text: 'City Conference Center - Lagos', votes: 10, percentage: 20 }
      ],
      groupName: 'Youth Ministry',
      createdBy: 'Youth Pastor Sarah',
      startDate: '2025-01-15T00:00:00Z',
      endDate: '2025-01-25T23:59:59Z',
      status: 'active',
      totalVotes: 51,
      hasVoted: false,
      isAnonymous: true,
      requiresQuorum: true,
      quorumPercentage: 60,
      eligibleVoters: 67
    },
    {
      id: '2',
      title: 'Sunday Service Time Change',
      description: 'Should we change our Sunday service time to accommodate more families? This is an important decision that affects our entire community.',
      type: 'yes-no',
      options: [
        { id: '1', text: 'Yes, change to 11:00 AM', votes: 89, percentage: 62 },
        { id: '2', text: 'No, keep current time (10:00 AM)', votes: 54, percentage: 38 }
      ],
      groupName: 'Community Church',
      createdBy: 'Pastor John',
      startDate: '2025-01-10T00:00:00Z',
      endDate: '2025-01-20T23:59:59Z',
      status: 'active',
      totalVotes: 143,
      hasVoted: true,
      userVote: ['1'],
      isAnonymous: false,
      requiresQuorum: true,
      quorumPercentage: 50,
      eligibleVoters: 245
    },
    {
      id: '3',
      title: 'Community Service Projects',
      description: 'Which community service projects should we prioritize this quarter? You can select multiple options.',
      type: 'multiple-choice',
      options: [
        { id: '1', text: 'Neighborhood Cleanup Drive', votes: 34, percentage: 28 },
        { id: '2', text: 'Food Bank Volunteer Program', votes: 45, percentage: 37 },
        { id: '3', text: 'Elderly Care Assistance', votes: 28, percentage: 23 },
        { id: '4', text: 'Youth Mentorship Program', votes: 15, percentage: 12 }
      ],
      groupName: 'Community Care',
      createdBy: 'Community Coordinator',
      startDate: '2025-01-12T00:00:00Z',
      endDate: '2025-01-22T23:59:59Z',
      status: 'active',
      totalVotes: 67,
      hasVoted: false,
      isAnonymous: true,
      requiresQuorum: false,
      eligibleVoters: 89
    },
    {
      id: '4',
      title: 'Annual Budget Approval',
      description: 'Vote to approve the proposed annual budget for union activities and member benefits.',
      type: 'yes-no',
      options: [
        { id: '1', text: 'Approve Budget', votes: 78, percentage: 85 },
        { id: '2', text: 'Reject Budget', votes: 14, percentage: 15 }
      ],
      groupName: 'Local Union Chapter',
      createdBy: 'Union Rep Mike',
      startDate: '2025-01-08T00:00:00Z',
      endDate: '2025-01-18T23:59:59Z',
      status: 'completed',
      totalVotes: 92,
      hasVoted: true,
      userVote: ['1'],
      isAnonymous: false,
      requiresQuorum: true,
      quorumPercentage: 75,
      eligibleVoters: 156
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Voting['status']>('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [selectedVoting, setSelectedVoting] = useState<Voting | null>(null);
  const [userVotes, setUserVotes] = useState<Record<string, string[]>>({});

  const filteredVotings = votings.filter(voting => {
    const matchesSearch = voting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || voting.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || voting.groupName === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const handleVote = (votingId: string, optionIds: string[]) => {
    const voting = votings.find(v => v.id === votingId);
    if (!voting || voting.hasVoted) return;

    // Update local state
    setUserVotes(prev => ({ ...prev, [votingId]: optionIds }));
    
    // Update voting data
    setVotings(votings.map(v => {
      if (v.id === votingId) {
        const updatedOptions = v.options.map(option => {
          const newVotes = optionIds.includes(option.id) ? option.votes + 1 : option.votes;
          const newTotal = v.totalVotes + (optionIds.includes(option.id) ? 1 : 0);
          return {
            ...option,
            votes: newVotes,
            percentage: Math.round((newVotes / (newTotal || 1)) * 100)
          };
        });
        
        return {
          ...v,
          options: updatedOptions,
          totalVotes: v.totalVotes + 1,
          hasVoted: true,
          userVote: optionIds
        };
      }
      return v;
    }));

    alert('Your vote has been recorded successfully!');
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
      case 'active': return <Vote className="w-4 h-4" />;
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
  const participationRate = votings.filter(v => v.hasVoted).length / votings.length * 100;

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
            <Vote className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Votings</p>
              <p className="text-2xl font-bold text-green-600">{activeVotings}</p>
            </div>
            <Vote className="w-8 h-8 text-green-500" />
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
            <option value="Youth Ministry">Youth Ministry</option>
            <option value="Community Church">Community Church</option>
            <option value="Community Care">Community Care</option>
            <option value="Local Union Chapter">Local Union Chapter</option>
          </select>
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
                    <span>{voting.totalVotes} / {voting.eligibleVoters} voted</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <span>{Math.round((voting.totalVotes / voting.eligibleVoters) * 100)}% participation</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>{voting.groupName}</span>
                  <span>•</span>
                  <span>Created by {voting.createdBy}</span>
                  {voting.isAnonymous && (
                    <>
                      <span>•</span>
                      <span>Anonymous voting</span>
                    </>
                  )}
                  {voting.requiresQuorum && (
                    <>
                      <span>•</span>
                      <span>Requires {voting.quorumPercentage}% quorum</span>
                    </>
                  )}
                </div>

                {voting.hasVoted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">You have voted in this poll</span>
                    </div>
                  </div>
                )}

                {voting.requiresQuorum && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Quorum Progress</span>
                      <span className="text-sm text-gray-900">
                        {Math.round((voting.totalVotes / voting.eligibleVoters) * 100)}% / {voting.quorumPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (voting.totalVotes / voting.eligibleVoters) * 100 >= voting.quorumPercentage! 
                            ? 'bg-green-500' 
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min((voting.totalVotes / voting.eligibleVoters) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Voting Options */}
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
                        {voting.userVote?.includes(option.id) && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Your vote</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedVoting(voting)}
                  className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                
                {voting.status === 'active' && !voting.hasVoted && (
                  <button
                    onClick={() => setSelectedVoting(voting)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-1"
                  >
                    <Vote className="w-4 h-4" />
                    <span>Vote Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredVotings.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Vote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Votings Found</h3>
            <p className="text-gray-500">No votings match your current filters.</p>
          </div>
        )}
      </div>

      {/* Voting Details Modal */}
      {selectedVoting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedVoting.title}</h3>
              <button
                onClick={() => setSelectedVoting(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedVoting.status)}`}>
                  {getStatusIcon(selectedVoting.status)}
                  <span className="ml-1">{selectedVoting.status}</span>
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedVoting.type)}`}>
                  {selectedVoting.type.replace('-', ' ')}
                </span>
                {selectedVoting.isAnonymous && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">Anonymous</span>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedVoting.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Start Date</h4>
                  <p className="text-gray-600">{new Date(selectedVoting.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">End Date</h4>
                  <p className="text-gray-600">{new Date(selectedVoting.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Group</h4>
                  <p className="text-gray-600">{selectedVoting.groupName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created By</h4>
                  <p className="text-gray-600">{selectedVoting.createdBy}</p>
                </div>
              </div>

              {selectedVoting.status === 'active' && !selectedVoting.hasVoted && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Cast Your Vote</h4>
                  <VotingInterface 
                    voting={selectedVoting} 
                    onVote={(optionIds) => {
                      handleVote(selectedVoting.id, optionIds);
                      setSelectedVoting(null);
                    }}
                  />
                </div>
              )}

              {selectedVoting.hasVoted && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-900 mb-2">Your Vote</h4>
                  <div className="space-y-1">
                    {selectedVoting.userVote?.map(voteId => {
                      const option = selectedVoting.options.find(opt => opt.id === voteId);
                      return option ? (
                        <div key={voteId} className="text-sm text-green-800">
                          ✓ {option.text}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Voting Interface Component
interface VotingInterfaceProps {
  voting: Voting;
  onVote: (optionIds: string[]) => void;
}

const VotingInterface: React.FC<VotingInterfaceProps> = ({ voting, onVote }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (optionId: string) => {
    if (voting.type === 'single-choice' || voting.type === 'yes-no') {
      setSelectedOptions([optionId]);
    } else {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleSubmitVote = () => {
    if (selectedOptions.length === 0) {
      alert('Please select at least one option');
      return;
    }
    onVote(selectedOptions);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {voting.options.map((option) => (
          <label key={option.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type={voting.type === 'multiple-choice' ? 'checkbox' : 'radio'}
              name={`voting-${voting.id}`}
              value={option.id}
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionSelect(option.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900">{option.text}</span>
          </label>
        ))}
      </div>
      
      <button
        onClick={handleSubmitVote}
        disabled={selectedOptions.length === 0}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Vote className="w-4 h-4" />
        <span>Submit Vote</span>
      </button>
    </div>
  );
};