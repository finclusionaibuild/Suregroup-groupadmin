import React, { useState } from 'react';
import { Shield, Star, Award, TrendingUp, CheckCircle, Clock, Users, Target, X, Building, User } from 'lucide-react';
import { VendorReview } from '../../types';

export const VendorReputationTrust: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'verification' | 'achievements'>('overview');
  
  const [reviews, setReviews] = useState<VendorReview[]>([
    {
      id: '1',
      serviceId: '1',
      serviceName: 'Comprehensive Health Screening',
      customerName: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent service! Very thorough and professional. The staff was friendly and the results were delivered quickly.',
      isVerified: true,
      createdAt: '2025-01-14T10:30:00Z',
      response: 'Thank you for the wonderful feedback! We\'re glad you had a great experience.',
      responseDate: '2025-01-14T14:20:00Z'
    },
    {
      id: '2',
      serviceId: '2',
      serviceName: 'Professional Business Consultation',
      customerName: 'Mike Wilson',
      rating: 4,
      comment: 'Great insights and practical advice. Helped me develop a solid business strategy.',
      isVerified: true,
      createdAt: '2025-01-13T16:45:00Z'
    },
    {
      id: '3',
      serviceId: '1',
      serviceName: 'Comprehensive Health Screening',
      customerName: 'Emily Davis',
      rating: 5,
      comment: 'Professional service with detailed explanations. Highly recommend!',
      isVerified: false,
      createdAt: '2025-01-12T14:20:00Z'
    },
    {
      id: '4',
      serviceId: '3',
      serviceName: 'Digital Marketing Masterclass',
      customerName: 'David Brown',
      rating: 4,
      comment: 'Good content and practical examples. Could use more advanced topics.',
      isVerified: true,
      createdAt: '2025-01-11T11:30:00Z'
    }
  ]);

  const [verificationStatus] = useState({
    identity: { status: 'verified', date: '2025-01-01' },
    business: { status: 'verified', date: '2025-01-01' },
    insurance: { status: 'pending', date: null },
    certifications: { status: 'verified', date: '2025-01-01' },
    background: { status: 'verified', date: '2025-01-01' }
  });

  const [achievements] = useState([
    {
      id: '1',
      title: 'Top Rated Vendor',
      description: 'Maintained 4.8+ rating for 6 months',
      icon: '🏆',
      earnedDate: '2025-01-01',
      category: 'Performance'
    },
    {
      id: '2',
      title: 'Verified Professional',
      description: 'Completed all verification requirements',
      icon: '✅',
      earnedDate: '2025-01-01',
      category: 'Trust'
    },
    {
      id: '3',
      title: 'Customer Favorite',
      description: '50+ positive reviews received',
      icon: '❤️',
      earnedDate: '2025-01-10',
      category: 'Customer Service'
    },
    {
      id: '4',
      title: 'Fast Responder',
      description: 'Average response time under 2 hours',
      icon: '⚡',
      earnedDate: '2025-01-05',
      category: 'Efficiency'
    }
  ]);

  const [responseForm, setResponseForm] = useState({
    reviewId: '',
    response: ''
  });

  const handleSubmitResponse = () => {
    setReviews(reviews.map(review => 
      review.id === responseForm.reviewId 
        ? { 
            ...review, 
            response: responseForm.response,
            responseDate: new Date().toISOString()
          }
        : review
    ));
    setResponseForm({ reviewId: '', response: '' });
    alert('Response submitted successfully!');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
    );
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const averageRating = reviews.length > 0 ? 
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const totalReviews = reviews.length;
  const verifiedReviews = reviews.filter(r => r.isVerified).length;
  const responseRate = reviews.filter(r => r.response).length / reviews.length * 100;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reputation & Trust</h1>
        <p className="text-gray-600">Build trust with verified credentials and customer reviews</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-blue-600">{totalReviews}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Reviews</p>
              <p className="text-2xl font-bold text-green-600">{verifiedReviews}</p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-purple-600">{responseRate.toFixed(0)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trust Overview
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({totalReviews})
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'verification'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Verification Status
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'achievements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Achievements ({achievements.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Trust Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Verified Vendor</h3>
                <p className="text-sm text-green-600">All verifications completed</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Identity Verification</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Business License</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Professional Certifications</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Insurance Coverage</span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">⏳ Pending</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Score</h3>
            
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">92</span>
              </div>
              <p className="text-sm text-gray-600">Trust Score out of 100</p>
              <p className="text-xs text-green-600">Excellent standing</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customer Satisfaction</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">96%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">88%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Service Quality</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <span className="text-sm text-gray-900">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{review.serviceName}</h3>
                    {review.isVerified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600">by {review.customerName}</span>
                    <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  
                  {review.response ? (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-blue-900">Your Response</span>
                        <span className="text-xs text-blue-600">
                          {new Date(review.responseDate!).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-blue-800 text-sm">{review.response}</p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <textarea
                        value={responseForm.reviewId === review.id ? responseForm.response : ''}
                        onChange={(e) => setResponseForm({ reviewId: review.id, response: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        rows={2}
                        placeholder="Respond to this review..."
                      />
                      <button
                        onClick={handleSubmitResponse}
                        disabled={!responseForm.response || responseForm.reviewId !== review.id}
                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Response
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Verification Status Tab */}
      {activeTab === 'verification' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Verification Status</h2>
          
          <div className="space-y-6">
            {Object.entries(verificationStatus).map(([key, verification]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    verification.status === 'verified' ? 'bg-green-100' : 
                    verification.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {getVerificationIcon(verification.status)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {verification.status === 'verified' && verification.date && 
                        `Verified on ${new Date(verification.date).toLocaleDateString()}`}
                      {verification.status === 'pending' && 'Verification in progress'}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getVerificationStatusColor(verification.status)}`}>
                  {getVerificationIcon(verification.status)}
                  <span className="ml-1 capitalize">{verification.status}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Verification Benefits</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Higher visibility in search results</li>
              <li>• Verified vendor badge on your profile</li>
              <li>• Access to premium group partnerships</li>
              <li>• Increased customer trust and conversion rates</li>
            </ul>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{achievement.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {achievement.category}
                </span>
                <span className="text-xs text-gray-500">
                  Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};