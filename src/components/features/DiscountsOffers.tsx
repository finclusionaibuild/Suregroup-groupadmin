import React, { useState } from 'react';
import { Search, Tag, Clock, ExternalLink, Star, MapPin, Filter } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  originalPrice?: number;
  discountedPrice?: number;
  category: string;
  provider: string;
  validUntil: string;
  location?: string;
  rating: number;
  isExclusive: boolean;
  groupName: string;
  imageUrl: string;
  termsAndConditions: string[];
}

export const DiscountsOffers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const [offers] = useState<Offer[]>([
    {
      id: '1',
      title: '20% Off Health Checkup Package',
      description: 'Comprehensive health screening including blood work, vitals, and consultation with certified medical professionals.',
      discount: '20% OFF',
      originalPrice: 150.00,
      discountedPrice: 120.00,
      category: 'Health',
      provider: 'MediCare Plus',
      validUntil: '2025-02-28',
      location: 'Lagos, Nigeria',
      rating: 4.8,
      isExclusive: true,
      groupName: 'Community Church',
      imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
      termsAndConditions: [
        'Valid for new patients only',
        'Appointment must be booked in advance',
        'Cannot be combined with other offers'
      ]
    },
    {
      id: '2',
      title: 'Professional Development Course - 50% Off',
      description: 'Advanced project management certification course with industry-recognized credentials.',
      discount: '50% OFF',
      originalPrice: 299.00,
      discountedPrice: 149.50,
      category: 'Education',
      provider: 'SkillUp Academy',
      validUntil: '2025-03-15',
      rating: 4.9,
      isExclusive: false,
      groupName: 'Local Union Chapter',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      termsAndConditions: [
        'Course must be completed within 6 months',
        'Includes all study materials',
        'Certificate provided upon completion'
      ]
    },
    {
      id: '3',
      title: 'Family Restaurant - Buy 1 Get 1 Free',
      description: 'Enjoy delicious family meals with our special buy one get one free offer on all main courses.',
      discount: 'BOGO',
      category: 'Food & Dining',
      provider: 'Mama\'s Kitchen',
      validUntil: '2025-01-31',
      location: 'Abuja, Nigeria',
      rating: 4.6,
      isExclusive: true,
      groupName: 'Youth Ministry',
      imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      termsAndConditions: [
        'Valid for dine-in only',
        'Cannot be used with other promotions',
        'Maximum 2 free meals per table'
      ]
    },
    {
      id: '4',
      title: 'Gym Membership - 3 Months Free',
      description: 'Premium gym membership with access to all equipment, classes, and personal training sessions.',
      discount: '3 MONTHS FREE',
      originalPrice: 180.00,
      discountedPrice: 120.00,
      category: 'Fitness',
      provider: 'FitLife Gym',
      validUntil: '2025-02-15',
      location: 'Port Harcourt, Nigeria',
      rating: 4.7,
      isExclusive: false,
      groupName: 'Community Care',
      imageUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
      termsAndConditions: [
        'Annual membership required',
        'Free months added to membership duration',
        'Access to all facilities included'
      ]
    }
  ]);

  const categories = ['all', 'Health', 'Education', 'Food & Dining', 'Fitness', 'Shopping', 'Services'];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || offer.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleClaimOffer = (offerId: string) => {
    // Handle offer claiming logic
    console.log('Claiming offer:', offerId);
    alert('Offer claimed! Check your email for details.');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Discounts & Offers</h1>
        <p className="text-gray-600">Exclusive deals and discounts from our partner network</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Offers</p>
              <p className="text-2xl font-bold text-blue-600">{offers.length}</p>
            </div>
            <Tag className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Exclusive Deals</p>
              <p className="text-2xl font-bold text-green-600">
                {offers.filter(offer => offer.isExclusive).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Potential Savings</p>
              <p className="text-2xl font-bold text-purple-600">
                ${offers.reduce((sum, offer) => sum + ((offer.originalPrice || 0) - (offer.discountedPrice || 0)), 0).toFixed(0)}
              </p>
            </div>
            <Tag className="w-8 h-8 text-purple-500" />
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
                placeholder="Search offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={offer.imageUrl} 
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {offer.discount}
                </span>
              </div>
              {offer.isExclusive && (
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    EXCLUSIVE
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{offer.title}</h3>
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{offer.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{offer.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-500">
                  <p>{offer.provider}</p>
                  <p className="text-xs">{offer.groupName}</p>
                </div>
                {offer.originalPrice && offer.discountedPrice && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500 line-through">${offer.originalPrice.toFixed(2)}</p>
                    <p className="text-lg font-bold text-green-600">${offer.discountedPrice.toFixed(2)}</p>
                  </div>
                )}
              </div>

              {offer.location && (
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{offer.location}</span>
                </div>
              )}

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4 mr-1" />
                <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedOffer(offer)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleClaimOffer(offer.id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Claim Offer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Details Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedOffer.imageUrl} 
                alt={selectedOffer.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedOffer(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedOffer.title}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {selectedOffer.discount}
                    </span>
                    {selectedOffer.isExclusive && (
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        EXCLUSIVE
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-lg font-medium">{selectedOffer.rating}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{selectedOffer.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Provider</h4>
                  <p className="text-gray-600">{selectedOffer.provider}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Category</h4>
                  <p className="text-gray-600">{selectedOffer.category}</p>
                </div>
                {selectedOffer.location && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Location</h4>
                    <p className="text-gray-600">{selectedOffer.location}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Valid Until</h4>
                  <p className="text-gray-600">{new Date(selectedOffer.validUntil).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedOffer.originalPrice && selectedOffer.discountedPrice && (
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-medium text-green-900 mb-2">Pricing</h4>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg text-gray-500 line-through">
                      ${selectedOffer.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ${selectedOffer.discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-green-600">
                      Save ${(selectedOffer.originalPrice - selectedOffer.discountedPrice).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Terms & Conditions</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedOffer.termsAndConditions.map((term, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleClaimOffer(selectedOffer.id);
                    setSelectedOffer(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Claim This Offer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};