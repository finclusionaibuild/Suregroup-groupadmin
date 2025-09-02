import React, { useState } from 'react';
import { MessageSquare, Plus, Send, Search, Clock, CheckCircle, AlertTriangle, FileText, HelpCircle, Code } from 'lucide-react';
import { DeveloperTicket, TicketResponse } from '../../types';

export const DeveloperSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'chat' | 'help-center' | 'status'>('tickets');
  
  const [tickets, setTickets] = useState<DeveloperTicket[]>([
    {
      id: 'DEV-001',
      title: 'API Rate Limit Issues',
      description: 'Getting 429 errors even though I\'m within my quota. Need help understanding rate limiting.',
      category: 'api',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2025-01-14T10:30:00Z',
      updatedAt: '2025-01-14T14:20:00Z',
      responses: [
        {
          id: '1',
          sender: 'developer',
          message: 'I\'m getting rate limit errors on the /users endpoint even though my dashboard shows I\'m only at 60% of my quota.',
          timestamp: '2025-01-14T10:30:00Z'
        },
        {
          id: '2',
          sender: 'support',
          message: 'Thanks for reaching out! Rate limits are applied per minute, not just monthly quota. You might be hitting the per-minute limit. Let me check your usage patterns.',
          timestamp: '2025-01-14T14:20:00Z'
        }
      ]
    },
    {
      id: 'DEV-002',
      title: 'Webhook Delivery Failures',
      description: 'Webhooks are not being delivered to my endpoint consistently.',
      category: 'technical',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2025-01-12T16:45:00Z',
      updatedAt: '2025-01-13T09:15:00Z',
      responses: [
        {
          id: '1',
          sender: 'developer',
          message: 'My webhook endpoint is not receiving all events. About 20% are missing.',
          timestamp: '2025-01-12T16:45:00Z'
        },
        {
          id: '2',
          sender: 'support',
          message: 'I see the issue. Your endpoint was returning 500 errors for some requests. We\'ve implemented retry logic and the delivery rate should improve.',
          timestamp: '2025-01-13T09:15:00Z'
        }
      ]
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'general' as DeveloperTicket['category'],
    priority: 'medium' as DeveloperTicket['priority']
  });

  const [selectedTicket, setSelectedTicket] = useState<DeveloperTicket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const helpArticles = [
    {
      id: '1',
      title: 'Getting Started with SureGroups API',
      category: 'Getting Started',
      views: 1250,
      helpful: 45,
      lastUpdated: '2025-01-10'
    },
    {
      id: '2',
      title: 'Authentication and API Keys',
      category: 'Authentication',
      views: 890,
      helpful: 38,
      lastUpdated: '2025-01-08'
    },
    {
      id: '3',
      title: 'Webhook Implementation Guide',
      category: 'Webhooks',
      views: 567,
      helpful: 29,
      lastUpdated: '2025-01-05'
    },
    {
      id: '4',
      title: 'Error Handling Best Practices',
      category: 'Best Practices',
      views: 423,
      helpful: 22,
      lastUpdated: '2025-01-03'
    }
  ];

  const systemStatus = [
    { service: 'API Gateway', status: 'operational', incidents: 0 },
    { service: 'Authentication Service', status: 'operational', incidents: 0 },
    { service: 'Webhook Delivery', status: 'degraded', incidents: 1 },
    { service: 'Documentation', status: 'operational', incidents: 0 },
    { service: 'Support Chat', status: 'operational', incidents: 0 }
  ];

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTicket = () => {
    const ticket: DeveloperTicket = {
      id: `DEV-${Date.now().toString().slice(-3)}`,
      ...newTicket,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: []
    };
    setTickets([ticket, ...tickets]);
    setNewTicket({ title: '', description: '', category: 'general', priority: 'medium' });
    setShowCreateModal(false);
  };

  const handleSendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;

    const response: TicketResponse = {
      id: Date.now().toString(),
      sender: 'developer',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setTickets(tickets.map(ticket => 
      ticket.id === selectedTicket.id 
        ? { ...ticket, responses: [...ticket.responses, response], updatedAt: new Date().toISOString() }
        : ticket
    ));

    setNewMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
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
      case 'api': return 'bg-blue-100 text-blue-700';
      case 'technical': return 'bg-purple-100 text-purple-700';
      case 'billing': return 'bg-green-100 text-green-700';
      case 'general': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700';
      case 'degraded': return 'bg-yellow-100 text-yellow-700';
      case 'outage': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Support & Help</h1>
        <p className="text-gray-600">Get help with development, report issues, and access resources</p>
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
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{inProgressTickets}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-green-600">2.4h</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-purple-600">4.8/5</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-500" />
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
              onClick={() => setActiveTab('chat')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Live Chat
            </button>
            <button
              onClick={() => setActiveTab('help-center')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'help-center'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Help Center
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'status'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              System Status
            </button>
          </nav>
        </div>
      </div>

      {/* Support Tickets Tab */}
      {activeTab === 'tickets' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Ticket</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
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
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Live Chat Tab */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Developer Support Chat</h3>
            <p className="text-gray-500 mb-6">
              Connect with our developer support team for real-time assistance
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Start Live Chat
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Average response time: 2.4 hours
            </p>
          </div>
        </div>
      )}

      {/* Help Center Tab */}
      {activeTab === 'help-center' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h2>
            <div className="space-y-4">
              {helpArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{article.title}</h4>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{article.category}</span>
                        <span>{article.views} views</span>
                        <span>{article.helpful} helpful</span>
                        <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">API Documentation</h3>
              <p className="text-sm text-gray-600 mb-4">Comprehensive API reference and guides</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Docs
              </button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <Code className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Code Examples</h3>
              <p className="text-sm text-gray-600 mb-4">Ready-to-use code snippets and samples</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Browse Examples
              </button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Forum</h3>
              <p className="text-sm text-gray-600 mb-4">Connect with other developers</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Join Forum
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Status Tab */}
      {activeTab === 'status' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">System Status</h2>
          
          <div className="space-y-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'operational' ? 'bg-green-500' :
                    service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{service.service}</h4>
                    <p className="text-xs text-gray-500">
                      {service.incidents === 0 ? 'No incidents' : `${service.incidents} incident(s)`}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getSystemStatusColor(service.status)}`}>
                  {service.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Service Level Agreement</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• 99.9% uptime guarantee</p>
              <p>• &lt; 200ms average response time</p>
              <p>• 24/7 monitoring and support</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreateModal && (
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
                  <option value="api">API Issues</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing</option>
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
                onClick={() => setShowCreateModal(false)}
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

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex">
            {/* Left Panel - Ticket Details */}
            <div className="w-1/3 p-6 border-r border-gray-200 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Ticket Details</h3>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Title</h4>
                  <p className="text-gray-900">{selectedTicket.title}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="text-gray-600">{selectedTicket.description}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Category</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(selectedTicket.category)}`}>
                      {selectedTicket.category}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Priority</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Status</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Chat */}
            <div className="w-2/3 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900">Conversation</h4>
                <p className="text-sm text-gray-600">Chat with our support team</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedTicket.responses.map((response) => (
                  <div key={response.id} className={`flex ${response.sender === 'developer' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      response.sender === 'developer' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium opacity-75">
                          {response.sender === 'developer' ? 'You' : 'Support Team'}
                        </span>
                      </div>
                      <p className="text-sm">{response.message}</p>
                      <p className={`text-xs mt-1 ${
                        response.sender === 'developer' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(response.timestamp).toLocaleString()}
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