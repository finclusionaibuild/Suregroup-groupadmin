import React, { useState } from 'react';
import { Store, Eye, Edit, Star, ShoppingCart, TrendingUp, Package, DollarSign } from 'lucide-react';

interface StorefrontProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sold: number;
  isActive: boolean;
}

interface StorefrontSettings {
  storeName: string;
  description: string;
  logo: string;
  banner: string;
  theme: 'light' | 'dark' | 'colorful';
  contactEmail: string;
  contactPhone: string;
  businessHours: string;
  shippingInfo: string;
  returnPolicy: string;
}

export const VendorMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'storefront' | 'products' | 'settings' | 'analytics'>('storefront');
  
  const [products] = useState<StorefrontProduct[]>([
    {
      id: '1',
      name: 'Comprehensive Health Screening',
      description: 'Complete health checkup including blood tests, vitals, and consultation',
      price: 125.00,
      category: 'Health Services',
      imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      reviewCount: 23,
      stock: 0, // Service, no stock
      sold: 45,
      isActive: true
    },
    {
      id: '2',
      name: 'Professional Business Consultation',
      description: 'One-on-one consultation with certified business advisors',
      price: 75.00,
      category: 'Professional Services',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviewCount: 18,
      stock: 0,
      sold: 32,
      isActive: true
    },
    {
      id: '3',
      name: 'Digital Marketing Masterclass',
      description: 'Comprehensive course covering SEO, social media marketing, and PPC',
      price: 149.00,
      category: 'Training & Education',
      imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
      reviewCount: 15,
      stock: 0,
      sold: 28,
      isActive: false
    }
  ]);

  const [storefrontSettings, setStorefrontSettings] = useState<StorefrontSettings>({
    storeName: 'HealthCare Plus Services',
    description: 'Professional healthcare and wellness services for your community',
    logo: '',
    banner: '',
    theme: 'light',
    contactEmail: 'info@healthcareplus.com',
    contactPhone: '+234 123 456 7890',
    businessHours: 'Mon-Fri: 9AM-6PM, Sat: 9AM-2PM',
    shippingInfo: 'Services delivered on-site or virtually as specified',
    returnPolicy: 'Full refund available within 24 hours of booking cancellation'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveSettings = () => {
    setIsEditing(false);
    alert('Storefront settings saved successfully!');
  };

  const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.sold), 0);
  const totalSold = products.reduce((sum, product) => sum + product.sold, 0);
  const averageRating = products.length > 0 ? 
    products.reduce((sum, product) => sum + product.rating, 0) / products.length : 0;
  const activeProducts = products.filter(p => p.isActive).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Marketplace Storefront</h1>
        <p className="text-gray-600">Manage your vendor storefront and product showcase</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Services Sold</p>
              <p className="text-2xl font-bold text-blue-600">{totalSold}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-500" />
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
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-purple-600">{activeProducts}</p>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('storefront')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'storefront'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Storefront Preview
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Product Showcase
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Storefront Settings
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Storefront Preview Tab */}
      {activeTab === 'storefront' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Storefront Header */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="p-6">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center -mt-10 border-4 border-white">
                <Store className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{storefrontSettings.storeName}</h2>
                <p className="text-gray-600 mb-2">{storefrontSettings.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>⭐ {averageRating.toFixed(1)} rating</span>
                  <span>📦 {activeProducts} active services</span>
                  <span>🛒 {totalSold} services sold</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('settings')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Storefront</span>
              </button>
            </div>

            {/* Featured Products */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.isActive).map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-green-600">${product.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount})</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-3">
                        {product.sold} services delivered
                      </div>
                      
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Book Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Showcase Tab */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount})</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Category</p>
                    <p className="font-medium text-gray-900">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Services Sold</p>
                    <p className="font-medium text-gray-900">{product.sold}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 text-sm">
                    <Eye className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm">
                    <Edit className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Storefront Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Storefront Settings</h2>
            <button
              onClick={() => isEditing ? handleSaveSettings() : setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              <span>{isEditing ? 'Save Changes' : 'Edit Settings'}</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700  mb-2">Store Name</label>
                <input
                  type="text"
                  value={storefrontSettings.storeName}
                  onChange={(e) => setStorefrontSettings({...storefrontSettings, storeName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={storefrontSettings.description}
                  onChange={(e) => setStorefrontSettings({...storefrontSettings, description: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  value={storefrontSettings.contactEmail}
                  onChange={(e) => setStorefrontSettings({...storefrontSettings, contactEmail: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={storefrontSettings.contactPhone}
                  onChange={(e) => setStorefrontSettings({...storefrontSettings, contactPhone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                <input
                  type="text"
                  value={storefrontSettings.businessHours}
                  onChange={(e) => setStorefrontSettings({...storefrontSettings, businessHours: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Delivery Info</label>
                <textarea
                  value={storefrontSettings.shippingInfo}
                  onChange={(e) => setStorefrontSettings({...storefrontSettings, shippingInfo: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return Policy</label>
                <textarea
                  value={storefrontSettings.returnPolicy}
                  onChange={(e) => setStorefrontSettings({...storefrontSettings, returnPolicy: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  value={storefrontSettings.theme}
                  onChange={(e) => setStorefrontSettings({...storefrontSettings, theme: e.target.value as any})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="light">Light Theme</option>
                  <option value="dark">Dark Theme</option>
                  <option value="colorful">Colorful Theme</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Storefront Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Page Views</p>
                  <p className="text-xs text-blue-600">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">2,340</p>
                  <p className="text-xs text-blue-500">+15% increase</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Conversion Rate</p>
                  <p className="text-xs text-green-600">Visitors to customers</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">4.2%</p>
                  <p className="text-xs text-green-500">Above average</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-900">Avg Order Value</p>
                  <p className="text-xs text-purple-600">Per transaction</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600">${(totalRevenue / totalSold).toFixed(2)}</p>
                  <p className="text-xs text-purple-500">Stable</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Services</h3>
            <div className="space-y-3">
              {products
                .sort((a, b) => (b.price * b.sold) - (a.price * a.sold))
                .slice(0, 3)
                .map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sold} sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">${(product.price * product.sold).toFixed(2)}</p>
                    <p className="text-xs text-gray-500">revenue</p>
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