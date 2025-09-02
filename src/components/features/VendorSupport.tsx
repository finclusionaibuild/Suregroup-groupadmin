import React, { useState } from 'react';
import { MessageSquare, Plus, Send, Clock, CheckCircle, AlertTriangle, DollarSign, FileText, X } from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'payment' | 'dispute' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  adminResponse?: string;
}

interface DisputeCase {
  id: string;
  orderId: string;
  customerName: string;
  issue: string;
  description: string;
  amount: number;
  status: 'open' | 'under-review' | 'resolved' | 'escalated';
  createdAt: string;
  messages: DisputeMessage[];
}

interface DisputeMessage {
  id: string;
  sender: 'vendor' | 'customer' | 'admin';
  message: string;
  timestamp: string;
  attachments?: string[];
}

export const VendorSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'disputes' | 'refunds'>('tickets');
  
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-001',
      title: 'Payment Processing Delay',
      description: 'My payment for order ORD-001 has been delayed for 3 days. When will it be processed?',
      category: 'payment',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2025-01-14T10:30:00Z',
      updatedAt: '2025-01-14T14:20:00Z',
      adminResponse: 'We are investigating the payment delay. You should receive payment within 24 hours.'
    },
    {
      id: 'TKT-002',
      title: 'Service Approval Question',
      description: 'My new service has been pending approval for a week. What additional information is needed?',
      category: 'general',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2025-01-12T16:45:00Z',
      updatedAt: '2025-01-13T09:15:00Z',
      adminResponse: 'Your service has been approved. Please check your dashboard for the updated status.'
    },
    {
      id: 'TKT-003',
      title: 'Technical Issue with Dashboard',
      description: 'Unable to upload service images. Getting error message when trying to save.',
      category: 'technical',
      priority: 'medium',
      status: 'open',
      createdAt: '2025-01-13T11:20:00Z',
      updatedAt: '2025-01-13T11:20:00Z'
    }
  ]);

  const [disputes, setDisputes] = useState<DisputeCase[]>([
    {
      id: 'DSP-001',
      orderId: 'ORD-001',
      customerName: 'Sarah Johnson',
      issue: 'Service Quality',
      description: 'Customer claims the health screening was incomplete and wants a partial refund.',
      amount: 125.00,
      status: 'under-review',
      createdAt: '2025-01-14T08:30:00Z',
      messages: [
        {
          id: '1',
          sender: 'customer',
          message: 'The health screening did not include the blood work as promised. I want a partial refund.',
          timestamp: '2025-01-14T08:30:00Z'
        },
        {
          id: '2',
          sender: 'vendor',
          message: 'I apologize for the confusion. The blood work was scheduled for a separate appointment. I can offer a 25% refund for the inconvenience.',
          timestamp: '2025-01-14T10:15:00Z'
        },
        {
          id: '3',
          sender: 'admin',
          message: 'We are reviewing this case. Please provide documentation of the original service agreement.',
          timestamp: '2025-01-14T14:20:00Z'
        }
      ]
    }
  ]);

  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<DisputeCase | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'general' as SupportTicket['category'],
    priority: 'medium' as SupportTicket['priority']
  });

  const handleCreateTicket = () => {
    const ticket: SupportTicket = {
      id: `TKT-${Date.now().toString().slice(-3)}`,
      ...newTicket,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTickets([ticket, ...tickets]);
    setNewTicket({ title: '', description: '', category: 'general', priority: 'medium' });
    setShowCreateTicket(false);
  };

  const handleSendMessage = () => {
    if (!selectedDispute || !newMessage.trim()) return;

    const message: DisputeMessage = {
      id: Date.now().toString(),
      sender: 'vendor',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setDisputes(disputes.map(dispute => 
      dispute.id === selectedDispute.id 
        ? { ...dispute, messages: [...dispute.messages, message] }
        : dispute
    ));

    setNewMessage('');
  };

  const handleRefundRequest = (orderId: string, amount: number) => {
    alert(`Refund request submitted for order ${orderId} - $${amount.toFixed(2)}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'under-review': return 'bg-orange-100 text-orange-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      case 'escalated': return 'bg-red-100 text-red-700';
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-purple-100 text-purple-700';
      case 'payment': return 'bg-green-100 text-green-700';
      case 'dispute': return 'bg-red-100 text-red-700';
      case 'general': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'under-review': return <AlertTriangle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      case 'escalated': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const openDisputes = disputes.filter(d => d.status === 'open' || d.status === 'under-review').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Support & Dispute Resolution</h1>
        <p className="text-gray-600">Get help and resolve customer disputes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-blue-600">{openTickets}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Disputes</p>
              <p className="text-2xl font-bold text-red-600">{openDisputes}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved Issues</p>
              <p className="text-2xl font-bold text-green-600">{resolvedTickets}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Time</p>
              <p className="text-2xl font-bold text-purple-600">2.4h</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tickets'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Support Tickets ({tickets.length})
            </button>
            <button
              onClick={() => setActiveTab('disputes')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'disputes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Disputes ({disputes.length})
            </button>
            <button
              onClick={() => setActiveTab('refunds')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'refunds'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Refund Requests
            </button>
          </nav>
        </div>
      </div>

      {/* Support Tickets Tab */}
      {activeTab === 'tickets' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
            <button
              onClick={() => setShowCreateTicket(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Ticket</span>
            </button>
          </div>

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1">{ticket.status}</span>
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{ticket.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(ticket.category)}`}>
                        {ticket.category}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority} priority
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                      <span>ID: {ticket.id}</span>
                    </div>

                    {ticket.adminResponse && (
                      <div className="mt-4 bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Admin Response:</strong> {ticket.adminResponse}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Disputes Tab */}
      {activeTab === 'disputes' && (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Customer Disputes</h2>
            <p className="text-sm text-gray-600">Resolve customer disputes through direct communication</p>
          </div>

          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div key={dispute.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Dispute: {dispute.issue}</h3>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(dispute.status)}`}>
                        {getStatusIcon(dispute.status)}
                        <span className="ml-1">{dispute.status}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Order ID</p>
                        <p className="text-gray-600">{dispute.orderId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Customer</p>
                        <p className="text-gray-600">{dispute.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Amount</p>
                        <p className="text-gray-600">${dispute.amount.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{dispute.description}</p>
                    
                    <div className="text-xs text-gray-500">
                      Created: {new Date(dispute.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedDispute(dispute)}
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat</span>
                    </button>
                    <button
                      onClick={() => handleRefundRequest(dispute.orderId, dispute.amount * 0.25)}
                      className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Offer Refund</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Refunds Tab */}
      {activeTab === 'refunds' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Refund Management</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-6 h-6 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Partial Refund Request</p>
                  <p className="text-xs text-yellow-700">Order ORD-001 • Sarah Johnson • $31.25 (25%)</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                  Approve
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                  Decline
                </button>
              </div>
            </div>

            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Additional Refund Requests</h3>
              <p className="text-gray-500">All refund requests have been processed.</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreateTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Support Ticket</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Detailed description of the issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({...newTicket, category: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="technical">Technical</option>
                  <option value="payment">Payment</option>
                  <option value="dispute">Dispute</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateTicket(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTicket}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Chat Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex">
            {/* Left Panel - Dispute Details */}
            <div className="w-1/3 p-6 border-r border-gray-200 overflow-y-auto">
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
                  <h4 className="text-sm font-medium text-gray-700">Issue</h4>
                  <p className="text-gray-900">{selectedDispute.issue}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="text-gray-600">{selectedDispute.description}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Order ID</h4>
                    <p className="text-gray-600">{selectedDispute.orderId}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Customer</h4>
                    <p className="text-gray-600">{selectedDispute.customerName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Amount</h4>
                    <p className="text-gray-600">${selectedDispute.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Status</h4>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedDispute.status)}`}>
                      {getStatusIcon(selectedDispute.status)}
                      <span className="ml-1">{selectedDispute.status}</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleRefundRequest(selectedDispute.orderId, selectedDispute.amount * 0.25)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Offer 25% Refund</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Chat */}
            <div className="w-2/3 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900">Dispute Chat</h4>
                <p className="text-sm text-gray-600">Communicate with customer and admin</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedDispute.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'vendor' 
                        ? 'bg-blue-600 text-white' 
                        : message.sender === 'admin'
                        ? 'bg-purple-100 text-purple-900'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium opacity-75">
                          {message.sender === 'vendor' ? 'You' : 
                           message.sender === 'admin' ? 'Admin' : 'Customer'}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'vendor' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
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