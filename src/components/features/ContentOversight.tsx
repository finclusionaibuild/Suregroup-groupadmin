import React, { useState } from 'react';
import { Search, Eye, Check, X, Flag, MessageSquare, Image, FileText, MoreHorizontal } from 'lucide-react';

interface Content {
  id: string;
  type: 'post' | 'comment' | 'media' | 'document';
  author: string;
  authorId: string;
  content: string;
  groupName: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  flagCount: number;
  flagReasons: string[];
  mediaUrl?: string;
  documentName?: string;
}

interface ModerationAction {
  id: string;
  contentId: string;
  action: 'approved' | 'rejected' | 'flagged' | 'removed';
  reason: string;
  moderator: string;
  timestamp: string;
}

export const ContentOversight: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'flagged' | 'approved' | 'rejected'>('pending');
  
  const [content, setContent] = useState<Content[]>([
    {
      id: '1',
      type: 'post',
      author: 'John Smith',
      authorId: '1',
      content: 'Excited to announce our upcoming community service event! Join us this Saturday for a neighborhood cleanup.',
      groupName: 'Community Care',
      status: 'pending',
      createdAt: '2025-01-14T10:30:00Z',
      flagCount: 0,
      flagReasons: []
    },
    {
      id: '2',
      type: 'comment',
      author: 'Sarah Johnson',
      authorId: '2',
      content: 'This is a great initiative! Count me in for the cleanup event.',
      groupName: 'Community Care',
      status: 'approved',
      createdAt: '2025-01-14T09:15:00Z',
      reviewedAt: '2025-01-14T09:20:00Z',
      reviewedBy: 'Admin User',
      flagCount: 0,
      flagReasons: []
    },
    {
      id: '3',
      type: 'post',
      author: 'Mike Wilson',
      authorId: '3',
      content: 'Some controversial content that has been flagged by multiple users for review.',
      groupName: 'Youth Ministry',
      status: 'flagged',
      createdAt: '2025-01-13T16:45:00Z',
      flagCount: 5,
      flagReasons: ['Inappropriate content', 'Offensive language', 'Spam']
    },
    {
      id: '4',
      type: 'media',
      author: 'Emily Davis',
      authorId: '4',
      content: 'Sharing photos from last week\'s youth camp!',
      groupName: 'Youth Ministry',
      status: 'approved',
      createdAt: '2025-01-12T14:20:00Z',
      reviewedAt: '2025-01-12T14:25:00Z',
      reviewedBy: 'Admin User',
      flagCount: 0,
      flagReasons: [],
      mediaUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '5',
      type: 'document',
      author: 'David Brown',
      authorId: '5',
      content: 'Sharing the meeting minutes from our last union gathering.',
      groupName: 'Local Union Chapter',
      status: 'rejected',
      createdAt: '2025-01-11T11:30:00Z',
      reviewedAt: '2025-01-11T15:45:00Z',
      reviewedBy: 'Admin User',
      flagCount: 0,
      flagReasons: [],
      documentName: 'union_meeting_minutes.pdf'
    }
  ]);

  const [moderationActions, setModerationActions] = useState<ModerationAction[]>([
    {
      id: '1',
      contentId: '2',
      action: 'approved',
      reason: 'Content follows community guidelines',
      moderator: 'Admin User',
      timestamp: '2025-01-14T09:20:00Z'
    },
    {
      id: '2',
      contentId: '5',
      action: 'rejected',
      reason: 'Contains sensitive organizational information',
      moderator: 'Admin User',
      timestamp: '2025-01-11T15:45:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | Content['type']>('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [reviewModal, setReviewModal] = useState<{ content: Content; action: 'approve' | 'reject' } | null>(null);
  const [reviewReason, setReviewReason] = useState('');

  const filteredContent = content.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesGroup = groupFilter === 'all' || item.groupName === groupFilter;
    const matchesTab = activeTab === 'pending' ? item.status === 'pending' :
                      activeTab === 'flagged' ? item.status === 'flagged' :
                      activeTab === 'approved' ? item.status === 'approved' :
                      item.status === 'rejected';
    return matchesSearch && matchesType && matchesGroup && matchesTab;
  });

  const handleReview = (content: Content, action: 'approve' | 'reject') => {
    setReviewModal({ content, action });
    setReviewReason('');
  };

  const submitReview = () => {
    if (!reviewModal) return;

    const updatedContent: Content = {
      ...reviewModal.content,
      status: reviewModal.action === 'approve' ? 'approved' : 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'Current Admin'
    };

    setContent(content.map(item => 
      item.id === updatedContent.id ? updatedContent : item
    ));

    const moderationAction: ModerationAction = {
      id: Date.now().toString(),
      contentId: reviewModal.content.id,
      action: reviewModal.action === 'approve' ? 'approved' : 'rejected',
      reason: reviewReason || `Content ${reviewModal.action}d by admin`,
      moderator: 'Current Admin',
      timestamp: new Date().toISOString()
    };

    setModerationActions([moderationAction, ...moderationActions]);
    setReviewModal(null);
    setReviewReason('');
  };

  const handleRemoveContent = (contentId: string) => {
    setContent(content.filter(item => item.id !== contentId));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'post': return 'bg-blue-100 text-blue-700';
      case 'comment': return 'bg-green-100 text-green-700';
      case 'media': return 'bg-purple-100 text-purple-700';
      case 'document': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'flagged': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return <MessageSquare className="w-4 h-4" />;
      case 'comment': return <MessageSquare className="w-4 h-4" />;
      case 'media': return <Image className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const pendingCount = content.filter(c => c.status === 'pending').length;
  const flaggedCount = content.filter(c => c.status === 'flagged').length;
  const approvedCount = content.filter(c => c.status === 'approved').length;
  const rejectedCount = content.filter(c => c.status === 'rejected').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Oversight</h1>
        <p className="text-gray-600">Review, approve, and moderate group content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <Eye className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Flagged Content</p>
              <p className="text-2xl font-bold text-red-600">{flaggedCount}</p>
            </div>
            <Flag className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-600">{rejectedCount}</p>
            </div>
            <X className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab('flagged')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'flagged'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Flagged ({flaggedCount})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'approved'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved ({approvedCount})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rejected'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rejected ({rejectedCount})
            </button>
          </nav>
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
                placeholder="Search content..."
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
            <option value="post">Posts</option>
            <option value="comment">Comments</option>
            <option value="media">Media</option>
            <option value="document">Documents</option>
          </select>
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Groups</option>
            <option value="Community Care">Community Care</option>
            <option value="Youth Ministry">Youth Ministry</option>
            <option value="Local Union Chapter">Local Union Chapter</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {item.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{item.author}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{item.groupName}</span>
                      <span>•</span>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1">{item.type}</span>
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 text-sm">{item.content}</p>
                  
                  {item.mediaUrl && (
                    <div className="mt-3">
                      <img 
                        src={item.mediaUrl} 
                        alt="Content media" 
                        className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                  
                  {item.documentName && (
                    <div className="mt-3 flex items-center space-x-2 p-2 bg-gray-50 rounded-lg w-fit">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{item.documentName}</span>
                    </div>
                  )}
                </div>

                {item.flagCount > 0 && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Flag className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-900">
                        Flagged by {item.flagCount} user{item.flagCount > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.flagReasons.map((reason, index) => (
                        <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.reviewedAt && (
                  <div className="text-xs text-gray-500">
                    Reviewed by {item.reviewedBy} on {new Date(item.reviewedAt).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedContent(item)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
                
                {item.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleReview(item, 'approve')}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReview(item, 'reject')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                {item.status === 'flagged' && (
                  <>
                    <button
                      onClick={() => handleReview(item, 'approve')}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveContent(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredContent.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Found</h3>
            <p className="text-gray-500">No content matches your current filters.</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {reviewModal.action === 'approve' ? 'Approve' : 'Reject'} Content
            </h3>
            <p className="text-gray-600 mb-4">
              {reviewModal.action === 'approve' 
                ? 'Are you sure you want to approve this content?' 
                : 'Please provide a reason for rejection:'}
            </p>
            {reviewModal.action === 'reject' && (
              <textarea
                value={reviewReason}
                onChange={(e) => setReviewReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                rows={3}
              />
            )}
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

      {/* Content Details Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Content Details</h3>
              <button
                onClick={() => setSelectedContent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {selectedContent.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-900">{selectedContent.author}</h4>
                  <p className="text-sm text-gray-500">{selectedContent.groupName}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedContent.type)}`}>
                    {getTypeIcon(selectedContent.type)}
                    <span className="ml-1">{selectedContent.type}</span>
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedContent.status)}`}>
                    {selectedContent.status}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Content</h4>
                <p className="text-gray-600">{selectedContent.content}</p>
              </div>

              {selectedContent.mediaUrl && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Media</h4>
                  <img 
                    src={selectedContent.mediaUrl} 
                    alt="Content media" 
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}

              {selectedContent.documentName && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Document</h4>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-6 h-6 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedContent.documentName}</span>
                  </div>
                </div>
              )}

              {selectedContent.flagCount > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Flag Information</h4>
                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <p className="text-sm text-red-900 mb-2">
                      Flagged by {selectedContent.flagCount} user{selectedContent.flagCount > 1 ? 's' : ''}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selectedContent.flagReasons.map((reason, index) => (
                        <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created</h4>
                  <p className="text-gray-600">{new Date(selectedContent.createdAt).toLocaleString()}</p>
                </div>
                {selectedContent.reviewedAt && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Reviewed</h4>
                    <p className="text-gray-600">
                      {new Date(selectedContent.reviewedAt).toLocaleString()}
                      <br />
                      <span className="text-xs">by {selectedContent.reviewedBy}</span>
                    </p>
                  </div>
                )}
              </div>

              {selectedContent.status === 'pending' && (
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => {
                      handleReview(selectedContent, 'approve');
                      setSelectedContent(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve Content
                  </button>
                  <button
                    onClick={() => {
                      handleReview(selectedContent, 'reject');
                      setSelectedContent(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject Content
                  </button>
                </div>
              )}

              {selectedContent.status === 'flagged' && (
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => {
                      handleReview(selectedContent, 'approve');
                      setSelectedContent(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve & Clear Flags
                  </button>
                  <button
                    onClick={() => {
                      handleRemoveContent(selectedContent.id);
                      setSelectedContent(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove Content
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