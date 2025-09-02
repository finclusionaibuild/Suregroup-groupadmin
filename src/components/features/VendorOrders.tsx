import React, { useState } from 'react';
import { Search, Eye, Check, Clock, Truck, Star, MessageSquare, Calendar, User, X, ShoppingCart } from 'lucide-react';
import { VendorOrder } from '../../types';

export const VendorOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'in-progress' | 'completed' | 'cancelled'>('pending');
  
  const [orders, setOrders] = useState<VendorOrder[]>([
    {
      id: 'ORD-001',
      serviceId: '1',
      serviceName: 'Comprehensive Health Screening',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@example.com',
      amount: 125.00,
      status: 'pending',
      orderDate: '2025-01-14T10:30:00Z',
      notes: 'Please schedule for next week, preferably morning slot.'
    },
    {
      id: 'ORD-002',
      serviceId: '2',
      serviceName: 'Professional Business Consultation',
      customerName: 'Mike Wilson',
      customerEmail: 'mike.w@example.com',
      amount: 75.00,
      status: 'in-progress',
      orderDate: '2025-01-13T16:45:00Z',
      deliveryDate: '2025-01-20T14:00:00Z',
      notes: 'Focus on digital transformation strategy.'
    },
    {
      id: 'ORD-003',
      serviceId: '1',
      serviceName: 'Comprehensive Health Screening',
      customerName: 'Emily Davis',
      customerEmail: 'emily.d@example.com',
      amount: 125.00,
      status: 'completed',
      orderDate: '2025-01-12T14:20:00Z',
      deliveryDate: '2025-01-15T10:00:00Z',
      rating: 5,
      review: 'Excellent service! Very thorough and professional.'
    },
    {
      id: 'ORD-004',
      serviceId: '3',
      serviceName: 'Digital Marketing Masterclass',
      customerName: 'David Brown',
      customerEmail: 'david.b@example.com',
      amount: 149.00,
      status: 'completed',
      orderDate: '2025-01-10T11:30:00Z',
      deliveryDate: '2025-01-12T09:00:00Z',
      rating: 4,
      review: 'Great content, but could use more practical examples.'
    },
    {
      id: 'ORD-005',
      serviceId: '2',
      serviceName: 'Professional Business Consultation',
      customerName: 'Lisa Martinez',
      customerEmail: 'lisa.m@example.com',
      amount: 75.00,
      status: 'cancelled',
      orderDate: '2025-01-11T09:15:00Z',
      notes: 'Customer requested cancellation due to scheduling conflict.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<VendorOrder | null>(null);
  const [satisfactionForm, setSatisfactionForm] = useState({
    orderId: '',
    rating: 5,
    comment: ''
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleUpdateOrderStatus = (orderId: string, status: VendorOrder['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status,
            deliveryDate: status === 'in-progress' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : order.deliveryDate
          }
        : order
    ));
  };

  const handleSubmitSatisfaction = () => {
    // Handle customer satisfaction submission
    console.log('Satisfaction submitted:', satisfactionForm);
    alert('Customer satisfaction recorded successfully!');
    setSatisfactionForm({ orderId: '', rating: 5, comment: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Truck className="w-4 h-4" />;
      case 'completed': return <Check className="w-4 h-4" />;
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

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const inProgressCount = orders.filter(o => o.status === 'in-progress').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;
  const cancelledCount = orders.filter(o => o.status === 'cancelled').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders & Delivery</h1>
        <p className="text-gray-600">Manage customer orders and track delivery progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
            </div>
            <Truck className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
            </div>
            <X className="w-8 h-8 text-red-500" />
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
              onClick={() => setActiveTab('in-progress')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'in-progress'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              In Progress ({inProgressCount})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cancelled'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cancelled ({cancelledCount})
            </button>
          </nav>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{order.serviceName}</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status}</span>
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Customer</p>
                    <p className="text-gray-600">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Order Date</p>
                    <p className="text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleTimeString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Amount</p>
                    <p className="text-lg font-bold text-green-600">${order.amount.toFixed(2)}</p>
                  </div>
                </div>

                {order.deliveryDate && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Scheduled Delivery</p>
                    <p className="text-gray-600">{new Date(order.deliveryDate).toLocaleDateString()} at {new Date(order.deliveryDate).toLocaleTimeString()}</p>
                  </div>
                )}

                {order.notes && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Customer Notes</p>
                    <p className="text-gray-600 text-sm">{order.notes}</p>
                  </div>
                )}

                {order.rating && order.review && (
                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(order.rating)}
                      <span className="text-sm text-gray-600">Customer Review</span>
                    </div>
                    <p className="text-sm text-green-800">{order.review}</p>
                  </div>
                )}

                {/* Delivery Timeline for In-Progress Orders */}
                {order.status === 'in-progress' && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-3">Delivery Progress</h4>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-blue-800">Order Confirmed</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-blue-300"></div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-blue-800">In Progress</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-300"></div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="text-xs text-gray-500">Delivery</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                
                {order.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateOrderStatus(order.id, 'in-progress')}
                    className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                )}
                
                {order.status === 'in-progress' && (
                  <button
                    onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                    className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                  >
                    <Check className="w-4 h-4" />
                    <span>Complete</span>
                  </button>
                )}

                <button className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} Orders</h3>
            <p className="text-gray-500">No orders found matching your current filter.</p>
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
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="ml-1">{selectedOrder.status}</span>
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Service Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="text-gray-900">{selectedOrder.serviceName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="text-gray-900">${selectedOrder.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="text-gray-900">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                    </div>
                    {selectedOrder.deliveryDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Date:</span>
                        <span className="text-gray-900">{new Date(selectedOrder.deliveryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="text-gray-900">{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-gray-900">{selectedOrder.customerEmail}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Notes</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-700">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {selectedOrder.rating && selectedOrder.review && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Review</h4>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(selectedOrder.rating)}
                      <span className="text-sm text-green-800">{selectedOrder.rating}/5</span>
                    </div>
                    <p className="text-green-800">{selectedOrder.review}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                {selectedOrder.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleUpdateOrderStatus(selectedOrder.id, 'in-progress');
                        setSelectedOrder(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Accept Order
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateOrderStatus(selectedOrder.id, 'cancelled');
                        setSelectedOrder(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Decline Order
                    </button>
                  </>
                )}
                
                {selectedOrder.status === 'in-progress' && (
                  <button
                    onClick={() => {
                      handleUpdateOrderStatus(selectedOrder.id, 'completed');
                      setSelectedOrder(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Mark as Completed
                  </button>
                )}

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Contact Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};