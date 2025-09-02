import React, { useState } from 'react';
import { Search, Flag, AlertTriangle, Eye, Send, Clock, CheckCircle, X } from 'lucide-react';

interface Report {
  id: string;
  type: 'post' | 'comment' | 'user' | 'group' | 'message';
  reason: 'spam' | 'harassment' | 'inappropriate' | 'violence' | 'hate-speech' | 'misinformation' | 'other';
  description: string;
  reportedContent?: string;
  reportedUser?: string;
  reportedGroup?: string;
  status: 'pending' | 'under-review' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  adminResponse?: string;
  evidence?: string[];
  actionTaken?: string;
}

export const ReportsFlags: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      type: 'post',
      reason: 'inappropriate',
      description: 'This post contains inappropriate content that violates community guidelines.',
      reportedContent: 'Offensive post about community members',
      reportedUser: 'John Doe',
      reportedGroup: 'Community Church',
      status: 'under-review',
      priority: 'high',
      createdAt: '2025-01-14T10:30:00Z',
      updatedAt: '2025-01-14T14:20:00Z',
      adminResponse: 'We are reviewing this report and will take appropriate action.',
      evidence: ['Screenshot of post', 'Community guidelines reference']
    },
    {
      id: '2',
      type: 'user',
      reason: 'harassment',
      description: 'This user has been sending harassing messages to multiple group members.',
      reportedUser: 'Jane Smith',
      reportedGroup: 'Youth Ministry',
      status: 'resolved',
      priority: 'urgent',
      createdAt: '2025-01-13T16:45:00Z',
      updatedAt: '2025-01-14T09:15:00Z',
      adminResponse: 'User has been temporarily suspended and warned.',
      actionTaken: 'User suspended for 7 days, warning issued',
      evidence: ['Chat screenshots', 'Multiple user complaints']
    },
    {
      id: '3',
      type: 'comment',
      reason: 'spam',
      description: 'User is posting spam comments with promotional links.',
      reportedContent: 'Multiple spam comments with external links',
      reportedUser: 'Spam User',
      status: 'pending',
      priority: 'medium',
      createdAt: '2025-01-12T11:20:00Z',
      updatedAt: '2025-01-12T11:20:00Z',
      evidence: ['Comment screenshots']
    },
    {
      id: '4',
      type: 'message',
      reason: 'hate-speech',
      description: 'Private message contains hate speech and discriminatory language.',
      reportedUser: 'Offensive User',
      status: 'dismissed',
      priority: 'high',
      createdAt: '2025-01-11T14:30:00Z',
      updatedAt: '2025-01-12T10:15:00Z',
      adminResponse: 'After review, this does not constitute hate speech under our guidelines.',
      evidence: ['Message screenshot']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Report['status']>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | Report['type']>('all');
  const [reasonFilter, setReasonFilter] = useState<'all' | Report['reason']>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newReport, setNewReport] = useState({
    type: 'post' as Report['type'],
    reason: 'inappropriate' as Report['reason'],
    description: '',
    reportedContent: '',
    reportedUser: '',
    reportedGroup: '',
    evidence: [] as string[]
  });

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (report.reportedUser && report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (report.reportedContent && report.reportedContent.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesReason = reasonFilter === 'all' || report.reason === reasonFilter;
    return matchesSearch && matchesStatus && matchesType && matchesReason;
  });

  const handleCreateReport = () => {
    const report: Report = {
      id: Date.now().toString(),
      ...newReport,
      status: 'pending',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setReports([report, ...reports]);
    setNewReport({
      type: 'post',
      reason: 'inappropriate',
      description: '',
      reportedContent: '',
      reportedUser: '',
      reportedGroup: '',
      evidence: []
    });
    setShowCreateModal(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'post': return 'bg-blue-100 text-blue-700';
      case 'comment': return 'bg-green-100 text-green-700';
      case 'user': return 'bg-purple-100 text-purple-700';
      case 'group': return 'bg-orange-100 text-orange-700';
      case 'message': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'spam': return 'bg-yellow-100 text-yellow-700';
      case 'harassment': return 'bg-red-100 text-red-700';
      case 'inappropriate': return 'bg-orange-100 text-orange-700';
      case 'violence': return 'bg-red-100 text-red-700';
      case 'hate-speech': return 'bg-red-100 text-red-700';
      case 'misinformation': return 'bg-purple-100 text-purple-700';
      case 'other': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'under-review': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'dismissed': return 'bg-gray-100 text-gray-700';
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
      case 'under-review': return <Eye className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'dismissed': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const underReviewReports = reports.filter(r => r.status === 'under-review').length;
  const resolvedReports = reports.filter(r => r.status === 'resolved').length;
  const urgentReports = reports.filter(r => r.priority === 'urgent').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Flags</h1>
        <p className="text-gray-600">Report inappropriate content, behavior, or violations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reports</p>
              <p className="text-2xl font-bold text-blue-600">{pendingReports}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-yellow-600">{underReviewReports}</p>
            </div>
            <Eye className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{resolvedReports}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">{urgentReports}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
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
                placeholder="Search reports..."
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
            <option value="under-review">Under Review</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="post">Post</option>
            <option value="comment">Comment</option>
            <option value="user">User</option>
            <option value="group">Group</option>
            <option value="message">Message</option>
          </select>
          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Reasons</option>
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
            <option value="inappropriate">Inappropriate</option>
            <option value="violence">Violence</option>
            <option value="hate-speech">Hate Speech</option>
            <option value="misinformation">Misinformation</option>
            <option value="other">Other</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <Flag className="w-4 h-4" />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Flag className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report
                  </h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    <span className="ml-1">{report.status}</span>
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{report.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(report.type)}`}>
                    {report.type}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getReasonColor(report.reason)}`}>
                    {report.reason.replace('-', ' ')}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(report.priority)}`}>
                    {report.priority} priority
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <span>Created: {new Date(report.createdAt).toLocaleDateString()}</span>
                  <span>Updated: {new Date(report.updatedAt).toLocaleDateString()}</span>
                  {report.reportedUser && <span>User: {report.reportedUser}</span>}
                  {report.reportedGroup && <span>Group: {report.reportedGroup}</span>}
                </div>
                
                {report.reportedContent && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700">
                      <strong>Reported Content:</strong> {report.reportedContent}
                    </p>
                  </div>
                )}
                
                {report.adminResponse && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-blue-800">
                      <strong>Admin Response:</strong> {report.adminResponse}
                    </p>
                  </div>
                )}
                
                {report.actionTaken && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <strong>Action Taken:</strong> {report.actionTaken}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedReport(report)}
                  className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select
                  value={newReport.type}
                  onChange={(e) => setNewReport({...newReport, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="post">Post</option>
                  <option value="comment">Comment</option>
                  <option value="user">User</option>
                  <option value="group">Group</option>
                  <option value="message">Message</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <select
                  value={newReport.reason}
                  onChange={(e) => setNewReport({...newReport, reason: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="spam">Spam</option>
                  <option value="harassment">Harassment</option>
                  <option value="inappropriate">Inappropriate Content</option>
                  <option value="violence">Violence or Threats</option>
                  <option value="hate-speech">Hate Speech</option>
                  <option value="misinformation">Misinformation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Describe the issue in detail"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reported User (Optional)</label>
                <input
                  type="text"
                  value={newReport.reportedUser}
                  onChange={(e) => setNewReport({...newReport, reportedUser: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Username or name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reported Group (Optional)</label>
                <input
                  type="text"
                  value={newReport.reportedGroup}
                  onChange={(e) => setNewReport({...newReport, reportedGroup: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Group name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content Details (Optional)</label>
                <input
                  type="text"
                  value={newReport.reportedContent}
                  onChange={(e) => setNewReport({...newReport, reportedContent: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the content"
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
                onClick={handleCreateReport}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Report Details</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedReport.type)}`}>
                  {selectedReport.type}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getReasonColor(selectedReport.reason)}`}>
                  {selectedReport.reason.replace('-', ' ')}
                </span>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedReport.status)}`}>
                  {getStatusIcon(selectedReport.status)}
                  <span className="ml-1">{selectedReport.status}</span>
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedReport.priority)}`}>
                  {selectedReport.priority} priority
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedReport.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created</h4>
                  <p className="text-gray-600">{new Date(selectedReport.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Last Updated</h4>
                  <p className="text-gray-600">{new Date(selectedReport.updatedAt).toLocaleDateString()}</p>
                </div>
                {selectedReport.reportedUser && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Reported User</h4>
                    <p className="text-gray-600">{selectedReport.reportedUser}</p>
                  </div>
                )}
                {selectedReport.reportedGroup && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Reported Group</h4>
                    <p className="text-gray-600">{selectedReport.reportedGroup}</p>
                  </div>
                )}
              </div>
              
              {selectedReport.reportedContent && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Reported Content</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-700">{selectedReport.reportedContent}</p>
                  </div>
                </div>
              )}
              
              {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Evidence</h4>
                  <ul className="space-y-1">
                    {selectedReport.evidence.map((item, index) => (
                      <li key={index} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        📎 {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedReport.adminResponse && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Admin Response</h4>
                  <p className="text-blue-700">{selectedReport.adminResponse}</p>
                </div>
              )}
              
              {selectedReport.actionTaken && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-900 mb-2">Action Taken</h4>
                  <p className="text-green-700">{selectedReport.actionTaken}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};