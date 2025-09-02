import React, { useState } from 'react';
import { Search, Plus, MessageSquare, Clock, AlertTriangle, CheckCircle, Eye, Send } from 'lucide-react';

interface Dispute {
  id: string;
  title: string;
  description: string;
  category: 'payment' | 'service' | 'behavior' | 'content' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-review' | 'resolved' | 'closed';
  againstUser?: string;
  againstGroup?: string;
  createdAt: string;
  updatedAt: string;
  adminResponse?: string;
  resolution?: string;
  evidence?: string[];
}

interface DisputeMessage {
  id: string;
  disputeId: string;
  sender: 'user' | 'admin';
  message: string;
  timestamp: string;
  attachments?: string[];
}

export const DisputeManagement: React.FC = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: '1',
      title: 'Unauthorized Payment Deduction',
      description: 'I was charged ₦5,000 for a service I did not request. The payment was deducted from my wallet without my consent.',
      category: 'payment',
      priority: 'high',
      status: 'in-review',
      againstGroup: 'Community Church',
      createdAt: '2025-01-14T10:30:00Z',
      updatedAt: '2025-01-14T14:20:00Z',
      adminResponse: 'We are investigating this payment issue. Please provide your transaction ID.',
      evidence: ['Transaction receipt', 'Bank statement']
    },
    {
      id: '2',
      title: 'Inappropriate Group Content',
      description: 'A member posted offensive content in the group chat that violates community guidelines.',
      category: 'content',
      priority: 'medium',
      status: 'resolved',
      againstUser: 'John Doe',
      againstGroup: 'Youth Ministry',
      createdAt: '2025-01-13T16:45:00Z',
      updatedAt: '2025-01-14T09:15:00Z',
      resolution: 'Content has been removed and user has been warned. Group moderators have been notified.'
    },
    {
      id: '3',
      title: 'Service Not Delivered',
      description: 'Paid for professional consultation service but the provider did not show up for the scheduled appointment.',
      category: 'service',
      priority: 'medium',
      status: 'open',
      againstUser: 'Service Provider',
      createdAt: '2025-01-12T11:20:00Z',
      updatedAt: '2025-01-12T11:20:00Z',
      evidence: ['Payment confirmation', 'Appointment booking']
    }
  ]);

  const [messages, setMessages] = useState<DisputeMessage[]>([
    {
      id: '1',
      disputeId: '1',
      sender: 'user',
      message: 'I have attached the transaction receipt and bank statement as evidence.',
      timestamp: '2025-01-14T10:35:00Z',
      attachments: ['receipt.pdf', 'statement.pdf']
    },
    {
      id: '2',
      disputeId: '1',
      sender: 'admin',
      message: 'Thank you for providing the evidence. We are reviewing your case and will respond within 24 hours.',
      timestamp: '2025-01-14T14:20:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Dispute['status']>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Dispute['category']>('all');
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const [newDispute, setNewDispute] = useState({
    title: '',
    description: '',
    category: 'other' as Dispute['category'],
    priority: 'medium' as Dispute['priority'],
    againstUser: '',
    againstGroup: '',
    evidence: [] as string[]
  });

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || dispute.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateDispute = () => {
    const dispute: Dispute = {
      id: Date.now().toString(),
      ...newDispute,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setDisputes([dispute, ...disputes]);
    setNewDispute({
      title: '',
      description: '',
      category: 'other',
      priority: 'medium',
      againstUser: '',
      againstGroup: '',
      evidence: []
    });
    setShowCreateModal(false);
  };

  const handleSendMessage = () => {
    if (!selectedDispute || !newMessage.trim()) return;

    const message: DisputeMessage = {
      id: Date.now().toString(),
      disputeId: selectedDispute.id,
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getDisputeMessages = (disputeId: string) => {
    return messages.filter(msg => msg.disputeId === disputeId);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'payment': return 'bg-red-100 text-red-700';
      case 'service': return 'bg-blue-100 text-blue-700';
      case 'behavior': return 'bg-orange-100 text-orange-700';
      case 'content': return 'bg-purple-100 text-purple-700';
      case 'other': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in-review': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="w-4 h-4" />;
      case 'in-review': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const openDisputes = disputes.filter(d => d.status === 'open').length;
  const inReviewDisputes = disputes.filter(d => d.status === 'in-review').length;
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dispute Management</h1>
        <p className="text-gray-600">File, track, and manage disputes with group admins</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Disputes</p>
              <p className="text-2xl font-bold text-blue-600">{openDisputes}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Review</p>
              <p className="text-2xl font-bold text-yellow-600">{inReviewDisputes}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{resolvedDisputes}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Disputes</p>
              <p className="text-2xl font-bold text-gray-900">{disputes.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search disputes..."
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
            <option value="open">Open</option>
            <option value="in-review">In Review</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="payment">Payment</option>
            <option value="service">Service</option>
            <option value="behavior">Behavior</option>
            <option value="content">Content</option>
            <option value="other">Other</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>File Dispute</span>
          </button>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {filteredDisputes.map((dispute) => (
          <div key={dispute.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{dispute.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(dispute.status)}`}>
                    {getStatusIcon(dispute.status)}
                    <span className="ml-1">{dispute.status}</span>
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3 line-clamp-2">{dispute.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(dispute.category)}`}>
                    {dispute.category}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(dispute.priority)}`}>
                    {dispute.priority} priority
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Created: {new Date(dispute.createdAt).toLocaleDateString()}</span>
                  <span>Updated: {new Date(dispute.updatedAt).toLocaleDateString()}</span>
                  {dispute.againstUser && <span>Against: {dispute.againstUser}</span>}
                  {dispute.againstGroup && <span>Group: {dispute.againstGroup}</span>}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedDispute(dispute)}
                  className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => setSelectedDispute(dispute)}
                  className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Dispute Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">File New Dispute</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newDispute.title}
                  onChange={(e) => setNewDispute({...newDispute, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newDispute.description}
                  onChange={(e) => setNewDispute({...newDispute, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Detailed description of the dispute"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newDispute.category}
                  onChange={(e) => setNewDispute({...newDispute, category: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="payment">Payment Issue</option>
                  <option value="service">Service Issue</option>
                  <option value="behavior">Inappropriate Behavior</option>
                  <option value="content">Content Violation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newDispute.priority}
                  onChange={(e) => setNewDispute({...newDispute, priority: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Against User (Optional)</label>
                <input
                  type="text"
                  value={newDispute.againstUser}
                  onChange={(e) => setNewDispute({...newDispute, againstUser: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Username or name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Against Group (Optional)</label>
                <input
                  type="text"
                  value={newDispute.againstGroup}
                  onChange={(e) => setNewDispute({...newDispute, againstGroup: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Group name"
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
                onClick={handleCreateDispute}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                File Dispute
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Details Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex">
            {/* Left Panel - Dispute Details */}
            <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Dispute Details</h3>
                <button
                  onClick={() => setSelectedDispute(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Title</h4>
                  <p className="text-gray-900">{selectedDispute.title}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedDispute.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Category</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(selectedDispute.category)}`}>
                      {selectedDispute.category}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Priority</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedDispute.priority)}`}>
                      {selectedDispute.priority}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Status</h4>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedDispute.status)}`}>
                      {getStatusIcon(selectedDispute.status)}
                      <span className="ml-1">{selectedDispute.status}</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Created</h4>
                    <p className="text-gray-600">{new Date(selectedDispute.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {selectedDispute.evidence && selectedDispute.evidence.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Evidence</h4>
                    <ul className="space-y-1">
                      {selectedDispute.evidence.map((item, index) => (
                        <li key={index} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                          📎 {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedDispute.resolution && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-green-900 mb-2">Resolution</h4>
                    <p className="text-green-700">{selectedDispute.resolution}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Panel - Chat */}
            <div className="w-1/2 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900">Discussion</h4>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {getDisputeMessages(selectedDispute.id).map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="text-xs">📎 {attachment}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-1"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};