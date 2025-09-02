import React, { useState } from 'react';
import { Search, Package, Clock, CheckCircle, Truck, Star, Eye, MessageSquare, RotateCcw, X } from 'lucide-react';

interface Order {
  id: string;
  productName: string;
  productImage: string;
  vendorName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  trackingNumber?: string;
  groupName: string;
  canReview: boolean;
  rating?: number;
  review?: string;
}

export const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      productName: 'Organic Honey - 500ml',
      productImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150',
      vendorName: 'Local Farmers Co-op',
      quantity: 2,
      price: 25.99,
      totalAmount: 51.98,
      status: 'delivered',
      orderDate: '2025-01-10T14:30:00Z',
      estimatedDelivery: '2025-01-15T00:00:00Z',
      deliveredDate: '2025-01-14T16:20:00Z',
      trackingNumber: 'TRK123456789',
      groupName: 'Community Church',
      canReview: true,
      rating: 5,
      review: 'Excellent quality honey! Fast delivery and great packaging.'
    },
    {
      id: 'ORD-002',
      productName: 'Handmade Crafts Set',
      productImage: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=150',
      vendorName: 'Community Artisans',
      quantity: 1,
      price: 45.00,
      totalAmount: 45.00,
      status: 'shipped',
      orderDate: '2025-01-12T10:15:00Z',
      estimatedDelivery: '2025-01-18T00:00:00Z',
      trackingNumber: 'TRK987654321',
      groupName: 'Community Care',
      canReview: false
    },
    {
      id: 'ORD-003',
      productName: 'Professional Consultation Session',
      productImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
      vendorName: 'Professional Services Inc',
      quantity: 1,
      price: 75.00,
      totalAmount: 75.00,
      status: 'confirmed',
      orderDate: '2025-01-14T09:45:00Z',
      estimatedDelivery: '2025-01-20T14:00:00Z',
      groupName: 'Local Union Chapter',
      canReview: false
    },
    {
      id: 'ORD-004',
      productName: 'Digital Marketing Course',
      productImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
      vendorName: 'SkillUp Academy',
      quantity: 1,
      price: 149.00,
      totalAmount: 149.00,
      status: 'processing',
      orderDate: '2025-01-13T16:20:00Z',
      estimatedDelivery: '2025-01-16T00:00:00Z',
      groupName: 'Tech Professionals',
      canReview: false
    },
    {
      id: 'ORD-005',
      productName: 'Health Screening Package',
      productImage: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=150',
      vendorName: 'HealthCare Plus',
      quantity: 1,
      price: 125.00,
      totalAmount: 125.00,
      status: 'cancelled',
      orderDate: '2025-01-11T11:30:00Z',
      groupName: 'Community Church',
      canReview: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    orderId: '',
    rating: 5,
    comment: ''
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmitReview = () => {
    setOrders(orders.map(order => 
      order.id === reviewForm.orderId 
        ? { ...order, rating: reviewForm.rating, review: reviewForm.comment, canReview: false }
        : order
    ));
    setReviewForm({ orderId: '', rating: 5, comment: '' });
    setShowReviewModal(false);
    alert('Review submitted successfully!');
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
  };

  const handleReorder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const newOrder: Order = {
        ...order,
        id: `ORD-${Date.now().toString().slice(-3)}`,
        status: 'pending',
        orderDate: new Date().toISOString(),
        deliveredDate: undefined,
        trackingNumber: undefined,
        canReview: false,
        rating: undefined,
        review: undefined
      };
      setOrders([newOrder, ...orders]);
      alert('Order placed successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-purple-100 text-purple-700';
      case 'shipped': return 'bg-indigo-100 text-indigo-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
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

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed' || o.status === 'processing').length;
  const totalSpent = orders.filter(o => o.status !== 'cancelled').reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track your marketplace orders and purchase history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <Package className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{deliveredOrders}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{pendingOrders}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-purple-600">${totalSpent.toFixed(2)}</p>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
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
                placeholder="Search orders..."
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
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <img 
                src={order.productImage} 
                alt={order.productName}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.productName}</h3>
                    <p className="text-sm text-gray-600">by {order.vendorName}</p>
                    <p className="text-xs text-gray-500">{order.groupName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Ordered {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                </div>

                {order.trackingNumber && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      Tracking: <span className="font-mono text-blue-600">{order.trackingNumber}</span>
                    </p>
                  </div>
                )}

                {order.estimatedDelivery && order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {order.deliveredDate && (
                  <div className="mb-3">
                    <p className="text-sm text-green-600">
                      Delivered on {new Date(order.deliveredDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {order.rating && order.review && (
                  <div className="mb-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      {renderStars(order.rating)}
                      <span className="text-sm text-green-800">Your Review</span>
                    </div>
                    <p className="text-sm text-green-700">{order.review}</p>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  
                  <button className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Vendor</span>
                  </button>
                  
                  {order.canReview && (
                    <button
                      onClick={() => {
                        setReviewForm({ orderId: order.id, rating: 5, comment: '' });
                        setShowReviewModal(true);
                      }}
                      className="text-yellow-600 hover:text-yellow-900 flex items-center space-x-1"
                    >
                      <Star className="w-4 h-4" />
                      <span>Review</span>
                    </button>
                  )}
                  
                  {order.status === 'delivered' && (
                    <button
                      onClick={() => handleReorder(order.id)}
                      className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reorder</span>
                    </button>
                  )}
                  
                  {(order.status === 'pending' || order.status === 'confirmed') && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-500">You haven't placed any orders yet or no orders match your search.</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Order Details - {selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedOrder.productImage} 
                  alt={selectedOrder.productName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedOrder.productName}</h4>
                  <p className="text-gray-600">by {selectedOrder.vendorName}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.groupName}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Order ID</h4>
                  <p className="text-gray-600">{selectedOrder.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Status</h4>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="ml-1">{selectedOrder.status}</span>
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Quantity</h4>
                  <p className="text-gray-600">{selectedOrder.quantity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Total Amount</h4>
                  <p className="text-gray-600">${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Order Date</h4>
                  <p className="text-gray-600">{new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                </div>
                {selectedOrder.deliveredDate && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Delivered Date</h4>
                    <p className="text-gray-600">{new Date(selectedOrder.deliveredDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {selectedOrder.trackingNumber && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Tracking Number</h4>
                  <p className="text-gray-600 font-mono">{selectedOrder.trackingNumber}</p>
                </div>
              )}

              {selectedOrder.rating && selectedOrder.review && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-900 mb-2">Your Review</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    {renderStars(selectedOrder.rating)}
                    <span className="text-sm text-green-800">{selectedOrder.rating}/5</span>
                  </div>
                  <p className="text-green-700">{selectedOrder.review}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Write Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex items-center space-x-2">
                  {renderStars(reviewForm.rating, true, (rating) => setReviewForm({...reviewForm, rating}))}
                  <span className="text-sm text-gray-600 ml-2">({reviewForm.rating}/5)</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Share your experience..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};