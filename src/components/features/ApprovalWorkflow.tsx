import React, { useState } from 'react';
import { Search, Plus, Clock, CheckCircle, X, Eye, Settings, Users, FileText, AlertTriangle } from 'lucide-react';

interface ApprovalRequest {
  id: string;
  type: 'membership' | 'event' | 'content' | 'expense' | 'vendor';
  title: string;
  description: string;
  requestedBy: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reviewedBy?: string;
  reviewedAt?: string;
  comments?: string;
  attachments?: string[];
}

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  approvers: string[];
  isRequired: boolean;
  order: number;
}

export const ApprovalWorkflow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'workflows' | 'settings'>('requests');
  
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    {
      id: '1',
      type: 'membership',
      title: 'New Member Application - Alice Cooper',
      description: 'Alice Cooper has applied to join the Youth Ministry group',
      requestedBy: 'Alice Cooper',
      requestedAt: '2025-01-14T10:30:00Z',
      status: 'pending',
      priority: 'medium',
      attachments: ['application_form.pdf', 'reference_letter.pdf']
    },
    {
      id: '2',
      type: 'event',
      title: 'Community Service Day Event',
      description: 'Request to create a community service event for next month',
      requestedBy: 'Sarah Johnson',
      requestedAt: '2025-01-13T16:45:00Z',
      status: 'approved',
      priority: 'high',
      reviewedBy: 'Pastor John',
      reviewedAt: '2025-01-14T09:15:00Z',
      comments: 'Approved. Great initiative for community engagement.'
    },
    {
      id: '3',
      type: 'expense',
      title: 'Youth Camp Equipment Purchase',
      description: 'Request to purchase camping equipment for upcoming youth retreat',
      requestedBy: 'Youth Pastor Sarah',
      requestedAt: '2025-01-12T14:20:00Z',
      status: 'pending',
      priority: 'high',
      attachments: ['equipment_list.pdf', 'quotes.pdf']
    },
    {
      id: '4',
      type: 'content',
      title: 'Weekly Newsletter Content',
      description: 'Review and approve content for this week\'s community newsletter',
      requestedBy: 'Communications Team',
      requestedAt: '2025-01-11T11:30:00Z',
      status: 'rejected',
      priority: 'medium',
      reviewedBy: 'Pastor John',
      reviewedAt: '2025-01-12T08:45:00Z',
      comments: 'Please revise the section about upcoming events for clarity.'
    }
  ]);

  const [workflowSteps] = useState<WorkflowStep[]>([
    {
      id: '1',
      name: 'Initial Review',
      description: 'First level review by group moderators',
      approvers: ['Group Moderator', 'Assistant Admin'],
      isRequired: true,
      order: 1
    },
    {
      id: '2',
      name: 'Administrative Approval',
      description: 'Review by group administrators',
      approvers: ['Group Admin', 'Senior Admin'],
      isRequired: true,
      order: 2
    },
    {
      id: '3',
      name: 'Final Authorization',
      description: 'Final approval for high-value or sensitive requests',
      approvers: ['Senior Pastor', 'Board Member'],
      isRequired: false,
      order: 3
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ApprovalRequest['status']>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | ApprovalRequest['type']>('all');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [reviewModal, setReviewModal] = useState<{ request: ApprovalRequest; action: 'approve' | 'reject' } | null>(null);
  const [reviewComments, setReviewComments] = useState('');

  const filteredRequests = approvalRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleReview = (request: ApprovalRequest, action: 'approve' | 'reject') => {
    setReviewModal({ request, action });
    setReviewComments('');
  };

  const submitReview = () => {
    if (!reviewModal) return;

    const updatedRequest: ApprovalRequest = {
      ...reviewModal.request,
      status: reviewModal.action === 'approve' ? 'approved' : 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'Current Admin',
      comments: reviewComments || `Request ${reviewModal.action}d by admin`
    };

    setApprovalRequests(approvalRequests.map(request => 
      request.id === updatedRequest.id ? updatedRequest : request
    ));

    setReviewModal(null);
    setReviewComments('');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'membership': return 'bg-blue-100 text-blue-700';
      case 'event': return 'bg-green-100 text-green-700';
      case 'content': return 'bg-purple-100 text-purple-700';
      case 'expense': return 'bg-orange-100 text-orange-700';
      case 'vendor': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const pendingCount = approvalRequests.filter(r => r.status === 'pending').length;
  const approvedCount = approvalRequests.filter(r => r.status === 'approved').length;
  const rejectedCount = approvalRequests.filter(r => r.status === 'rejected').length;
  const urgentCount = approvalRequests.filter(r => r.priority === 'urgent' && r.status === 'pending').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Approval Workflow</h1>
        <p className="text-gray-600">Configure and manage approval steps for group membership, events, and content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
            </div>
            <X className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approval Requests ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab('workflows')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'workflows'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Workflow Configuration
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approval Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Approval Requests Tab */}
      {activeTab === 'requests' && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search approval requests..."
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="membership">Membership</option>
                <option value="event">Event</option>
                <option value="content">Content</option>
                <option value="expense">Expense</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status}</span>
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(request.type)}`}>
                        {request.type}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                        {request.priority} priority
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span>Requested by: {request.requestedBy}</span>
                      <span>•</span>
                      <span>{new Date(request.requestedAt).toLocaleDateString()}</span>
                    </div>

                    {request.attachments && request.attachments.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {request.attachments.map((attachment, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center space-x-1">
                              <FileText className="w-3 h-3" />
                              <span>{attachment}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {request.reviewedAt && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">
                          <strong>Reviewed by:</strong> {request.reviewedBy} on {new Date(request.reviewedAt).toLocaleDateString()}
                        </p>
                        {request.comments && (
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Comments:</strong> {request.comments}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleReview(request, 'approve')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReview(request, 'reject')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredRequests.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Approval Requests</h3>
                <p className="text-gray-500">No requests match your current filters.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Workflow Configuration Tab */}
      {activeTab === 'workflows' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Approval Workflow Steps</h2>
          
          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{step.order}</span>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold text-gray-900">{step.name}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          step.isRequired ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {step.isRequired ? 'Required' : 'Optional'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-3 ml-12">
                  <p className="text-sm font-medium text-gray-700 mb-2">Approvers:</p>
                  <div className="flex flex-wrap gap-2">
                    {step.approvers.map((approver, approverIndex) => (
                      <span key={approverIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        {approver}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Approval Settings</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Auto-approve low priority requests</p>
                <p className="text-xs text-gray-500">Automatically approve requests marked as low priority</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Email notifications</p>
                <p className="text-xs text-gray-500">Send email alerts for new approval requests</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Escalation for overdue requests</p>
                <p className="text-xs text-gray-500">Escalate requests pending for more than 48 hours</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default approval timeout (hours)</label>
              <input
                type="number"
                defaultValue={48}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {reviewModal.action === 'approve' ? 'Approve' : 'Reject'} Request
            </h3>
            <p className="text-gray-600 mb-4">
              {reviewModal.action === 'approve' 
                ? 'Are you sure you want to approve this request?' 
                : 'Please provide a reason for rejection:'}
            </p>
            <textarea
              value={reviewComments}
              onChange={(e) => setReviewComments(e.target.value)}
              placeholder={reviewModal.action === 'approve' ? 'Optional comments...' : 'Rejection reason...'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              rows={3}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setReviewModal(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className={`px-4 py-2 text-white rounded-lg ${
                  reviewModal.action === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {reviewModal.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedRequest.type)}`}>
                  {selectedRequest.type}
                </span>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                  {getStatusIcon(selectedRequest.status)}
                  <span className="ml-1">{selectedRequest.status}</span>
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedRequest.priority)}`}>
                  {selectedRequest.priority} priority
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Title</h4>
                <p className="text-gray-900">{selectedRequest.title}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedRequest.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Requested By</h4>
                  <p className="text-gray-600">{selectedRequest.requestedBy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Requested Date</h4>
                  <p className="text-gray-600">{new Date(selectedRequest.requestedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{attachment}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-xs">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedRequest.reviewedAt && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Review Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Reviewed by:</strong> {selectedRequest.reviewedBy}</p>
                    <p><strong>Review date:</strong> {new Date(selectedRequest.reviewedAt).toLocaleDateString()}</p>
                    {selectedRequest.comments && (
                      <p><strong>Comments:</strong> {selectedRequest.comments}</p>
                    )}
                  </div>
                </div>
              )}

              {selectedRequest.status === 'pending' && (
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => {
                      handleReview(selectedRequest, 'approve');
                      setSelectedRequest(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => {
                      handleReview(selectedRequest, 'reject');
                      setSelectedRequest(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};