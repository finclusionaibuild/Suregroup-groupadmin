import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Filter, Send } from 'lucide-react';

interface Review {
  id: string;
  targetType: 'group' | 'admin' | 'event' | 'service';
  targetName: string;
  rating: number;
  title: string;
  comment: string;
  isAnonymous: boolean;
  createdAt: string;
  helpful: number;
  notHelpful: number;
  responses?: ReviewResponse[];
}

interface ReviewResponse {
  id: string;
  responder: string;
  message: string;
  timestamp: string;
}

interface RatingTarget {
  id: string;
  name: string;
  type: 'group' | 'admin' | 'event' | 'service';
  averageRating: number;
  totalReviews: number;
  canRate: boolean;
}

export const RatingsReviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-reviews' | 'rate-new' | 'received'>('my-reviews');
  
  const [myReviews, setMyReviews] = useState<Review[]>([
    {
      id: '1',
      targetType: 'group',
      targetName: 'Youth Ministry',
      rating: 5,
      title: 'Amazing community!',
      comment: 'Great group with supportive members and engaging activities. Highly recommend joining!',
      isAnonymous: false,
      createdAt: '2025-01-14T10:30:00Z',
      helpful: 12,
      notHelpful: 1,
      responses: [
        {
          id: '1',
          responder: 'Youth Pastor Sarah',
          message: 'Thank you for the wonderful feedback! We\'re glad you\'re enjoying the community.',
          timestamp: '2025-01-14T14:20:00Z'
        }
      ]
    },
    {
      id: '2',
      targetType: 'admin',
      targetName: 'Pastor John',
      rating: 4,
      title: 'Great leadership',
      comment: 'Pastor John provides excellent guidance and is always available for support.',
      isAnonymous: true,
      createdAt: '2025-01-12T16:45:00Z',
      helpful: 8,
      notHelpful: 0
    },
    {
      id: '3',
      targetType: 'event',
      targetName: 'Community Service Day',
      rating: 5,
      title: 'Well organized event',
      comment: 'The event was perfectly organized and made a real impact in our community.',
      isAnonymous: false,
      createdAt: '2025-01-10T11:20:00Z',
      helpful: 15,
      notHelpful: 2
    }
  ]);

  const [ratingTargets] = useState<RatingTarget[]>([
    {
      id: '1',
      name: 'Community Care',
      type: 'group',
      averageRating: 4.7,
      totalReviews: 23,
      canRate: true
    },
    {
      id: '2',
      name: 'Mike Wilson (Group Admin)',
      type: 'admin',
      averageRating: 4.9,
      totalReviews: 15,
      canRate: true
    },
    {
      id: '3',
      name: 'Bible Study Session',
      type: 'event',
      averageRating: 4.5,
      totalReviews: 8,
      canRate: true
    },
    {
      id: '4',
      name: 'Health Screening Service',
      type: 'service',
      averageRating: 4.8,
      totalReviews: 34,
      canRate: false
    }
  ]);

  const [newReview, setNewReview] = useState({
    targetId: '',
    rating: 5,
    title: '',
    comment: '',
    isAnonymous: false
  });

  const [selectedTarget, setSelectedTarget] = useState<RatingTarget | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleSubmitReview = () => {
    if (!selectedTarget || !newReview.title || !newReview.comment) {
      alert('Please fill in all required fields');
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      targetType: selectedTarget.type,
      targetName: selectedTarget.name,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      isAnonymous: newReview.isAnonymous,
      createdAt: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0
    };

    setMyReviews([review, ...myReviews]);
    setNewReview({ targetId: '', rating: 5, title: '', comment: '', isAnonymous: false });
    setSelectedTarget(null);
    setShowReviewModal(false);
    alert('Review submitted successfully!');
  };

  const handleHelpfulVote = (reviewId: string, isHelpful: boolean) => {
    setMyReviews(myReviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            helpful: isHelpful ? review.helpful + 1 : review.helpful,
            notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful
          }
        : review
    ));
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star 
              className={`w-4 h-4 ${
                star <= rating 
                  ? 'text-yellow-500 fill-current' 
                  : 'text-gray-300'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'group': return 'bg-blue-100 text-blue-700';
      case 'admin': return 'bg-purple-100 text-purple-700';
      case 'event': return 'bg-green-100 text-green-700';
      case 'service': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const averageRating = myReviews.length > 0 ? 
    myReviews.reduce((sum, review) => sum + review.rating, 0) / myReviews.length : 0;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ratings & Reviews</h1>
        <p className="text-gray-600">Rate and review groups, admins, and experiences</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{myReviews.length}</p>
            </div>
            <Star className="w-8 h-8 text-gray-500" />
          </div>
        </div>
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
              <p className="text-sm font-medium text-gray-600">Helpful Votes</p>
              <p className="text-2xl font-bold text-green-600">
                {myReviews.reduce((sum, review) => sum + review.helpful, 0)}
              </p>
            </div>
            <ThumbsUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-blue-600">
                {ratingTargets.filter(target => target.canRate).length}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('my-reviews')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'my-reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Reviews ({myReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('rate-new')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rate-new'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rate & Review
            </button>
          </nav>
        </div>
      </div>

      {/* My Reviews Tab */}
      {activeTab === 'my-reviews' && (
        <div className="space-y-6">
          {myReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(review.targetType)}`}>
                      {review.targetType}
                    </span>
                    {review.isAnonymous && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Anonymous</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600">for {review.targetName}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <p className="text-xs text-gray-500">
                    Posted on {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleHelpfulVote(review.id, true)}
                    className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{review.helpful}</span>
                  </button>
                  <button
                    onClick={() => handleHelpfulVote(review.id, false)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm">{review.notHelpful}</span>
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  {review.helpful + review.notHelpful} people found this helpful
                </span>
              </div>

              {review.responses && review.responses.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Responses</h4>
                  {review.responses.map((response) => (
                    <div key={response.id} className="bg-gray-50 rounded-lg p-3 mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{response.responder}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(response.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{response.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Rate New Tab */}
      {activeTab === 'rate-new' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ratingTargets.map((target) => (
            <div key={target.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{target.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(target.type)}`}>
                    {target.type}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                {renderStars(target.averageRating)}
                <span className="text-sm text-gray-600">
                  {target.averageRating.toFixed(1)} ({target.totalReviews} reviews)
                </span>
              </div>

              <button
                onClick={() => {
                  if (target.canRate) {
                    setSelectedTarget(target);
                    setShowReviewModal(true);
                  }
                }}
                disabled={!target.canRate}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  target.canRate
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}
              >
                {target.canRate ? 'Write Review' : 'Already Reviewed'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Review: {selectedTarget.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex items-center space-x-2">
                  {renderStars(newReview.rating, true, (rating) => setNewReview({...newReview, rating}))}
                  <span className="text-sm text-gray-600 ml-2">({newReview.rating}/5)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief summary of your experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Share your detailed experience..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={newReview.isAnonymous}
                  onChange={(e) => setNewReview({...newReview, isAnonymous: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Submit anonymously
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedTarget(null);
                  setNewReview({ targetId: '', rating: 5, title: '', comment: '', isAnonymous: false });
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};