import React, { useState } from 'react';
import { Star, TrendingUp, Users, Award, MessageSquare, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';

interface DeveloperRating {
  id: string;
  raterName: string;
  raterCompany?: string;
  rating: number;
  category: 'api_quality' | 'documentation' | 'support' | 'reliability' | 'performance';
  comment: string;
  isVerified: boolean;
  createdAt: string;
  helpful: number;
  notHelpful: number;
}

interface RatingCategory {
  name: string;
  score: number;
  count: number;
  description: string;
}

export const DeveloperRatings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'scorecard'>('overview');
  
  const [ratings] = useState<DeveloperRating[]>([
    {
      id: '1',
      raterName: 'Sarah Johnson',
      raterCompany: 'TechStart Inc',
      rating: 5,
      category: 'api_quality',
      comment: 'Excellent API design with clear documentation. Integration was smooth and the response times are consistently fast.',
      isVerified: true,
      createdAt: '2025-01-14T10:30:00Z',
      helpful: 12,
      notHelpful: 1
    },
    {
      id: '2',
      raterName: 'Mike Wilson',
      raterCompany: 'DevCorp Solutions',
      rating: 4,
      category: 'support',
      comment: 'Great support team! They responded quickly to my questions and helped resolve integration issues.',
      isVerified: true,
      createdAt: '2025-01-13T16:45:00Z',
      helpful: 8,
      notHelpful: 0
    },
    {
      id: '3',
      raterName: 'Emily Davis',
      rating: 5,
      category: 'documentation',
      comment: 'The documentation is comprehensive and well-organized. Code examples are very helpful.',
      isVerified: false,
      createdAt: '2025-01-12T14:20:00Z',
      helpful: 15,
      notHelpful: 2
    },
    {
      id: '4',
      raterName: 'David Brown',
      raterCompany: 'Innovation Labs',
      rating: 4,
      category: 'reliability',
      comment: 'Very reliable service with minimal downtime. API responses are consistent and well-structured.',
      isVerified: true,
      createdAt: '2025-01-11T11:30:00Z',
      helpful: 6,
      notHelpful: 0
    }
  ]);

  const [ratingCategories] = useState<RatingCategory[]>([
    {
      name: 'API Quality',
      score: 4.8,
      count: 23,
      description: 'Code quality, design, and ease of use'
    },
    {
      name: 'Documentation',
      score: 4.9,
      count: 18,
      description: 'Clarity, completeness, and examples'
    },
    {
      name: 'Support',
      score: 4.7,
      count: 15,
      description: 'Response time and helpfulness'
    },
    {
      name: 'Reliability',
      score: 4.8,
      count: 21,
      description: 'Uptime, consistency, and performance'
    },
    {
      name: 'Performance',
      score: 4.6,
      count: 19,
      description: 'Speed, efficiency, and optimization'
    }
  ]);

  const handleHelpfulVote = (ratingId: string, isHelpful: boolean) => {
    // Handle helpful vote
    console.log(`Rating ${ratingId} marked as ${isHelpful ? 'helpful' : 'not helpful'}`);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'api_quality': return 'bg-blue-100 text-blue-700';
      case 'documentation': return 'bg-green-100 text-green-700';
      case 'support': return 'bg-purple-100 text-purple-700';
      case 'reliability': return 'bg-orange-100 text-orange-700';
      case 'performance': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const averageRating = ratings.length > 0 ? 
    ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length : 0;
  const totalReviews = ratings.length;
  const verifiedReviews = ratings.filter(r => r.isVerified).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ratings & Reviews</h1>
        <p className="text-gray-600">Your developer reputation and community feedback</p>
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
            <MessageSquare className="w-8 h-8 text-blue-500" />
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
              <p className="text-sm font-medium text-gray-600">Helpful Votes</p>
              <p className="text-2xl font-bold text-purple-600">
                {ratings.reduce((sum, rating) => sum + rating.helpful, 0)}
              </p>
            </div>
            <ThumbsUp className="w-8 h-8 text-purple-500" />
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
              Overview
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
              onClick={() => setActiveTab('scorecard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scorecard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Developer Scorecard
            </button>
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
            
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-sm text-gray-600">{totalReviews} reviews</p>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratings.filter(r => r.rating === stars).length;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-8">{stars} ★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Scores</h3>
            
            <div className="space-y-4">
              {ratingCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      <span className="text-sm text-gray-600">{category.score}/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(category.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{category.count} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {ratings.map((rating) => (
            <div key={rating.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{rating.raterName}</h3>
                    {rating.raterCompany && (
                      <span className="text-sm text-gray-500">from {rating.raterCompany}</span>
                    )}
                    {rating.isVerified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    {renderStars(rating.rating)}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(rating.category)}`}>
                      {rating.category.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-500">{new Date(rating.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{rating.comment}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleHelpfulVote(rating.id, true)}
                    className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{rating.helpful}</span>
                  </button>
                  <button
                    onClick={() => handleHelpfulVote(rating.id, false)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm">{rating.notHelpful}</span>
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  {rating.helpful + rating.notHelpful} people found this helpful
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Developer Scorecard Tab */}
      {activeTab === 'scorecard' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Developer Scorecard</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-blue-900">API Uptime</p>
                      <p className="text-xs text-blue-600">Last 30 days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">99.8%</p>
                      <p className="text-xs text-blue-500">Excellent</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-900">Response Time</p>
                      <p className="text-xs text-green-600">Average latency</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">145ms</p>
                      <p className="text-xs text-green-500">Fast</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-purple-900">Error Rate</p>
                      <p className="text-xs text-purple-600">Failed requests</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">0.8%</p>
                      <p className="text-xs text-purple-500">Low</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">Community Engagement</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-orange-900">Support Response</p>
                      <p className="text-xs text-orange-600">Average time</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">2.4h</p>
                      <p className="text-xs text-orange-500">Fast</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-indigo-900">Documentation Quality</p>
                      <p className="text-xs text-indigo-600">Community rating</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-600">4.9/5</p>
                      <p className="text-xs text-indigo-500">Excellent</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-pink-900">Integration Success</p>
                      <p className="text-xs text-pink-600">First-time success rate</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-pink-600">94%</p>
                      <p className="text-xs text-pink-500">High</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ratingCategories.map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
                    <span className="text-lg font-bold text-blue-600">{category.score}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(Math.round(category.score))}
                    <span className="text-xs text-gray-500">({category.count})</span>
                  </div>
                  
                  <p className="text-xs text-gray-600">{category.description}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${(category.score / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};