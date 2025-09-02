import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Star, MapPin, Clock, DollarSign, Briefcase, Heart, GraduationCap } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  provider: string;
  category: 'loans' | 'health' | 'jobs' | 'training';
  price?: number;
  rating: number;
  location?: string;
  duration?: string;
  requirements: string[];
  benefits: string[];
  imageUrl: string;
  isAvailable: boolean;
  applicationDeadline?: string;
}

export const ProfessionalServices: React.FC = () => {
  const [services] = useState<Service[]>([
    {
      id: '1',
      title: 'Personal Loan - Quick Approval',
      description: 'Get instant personal loans up to ₦5,000,000 with competitive interest rates and flexible repayment terms.',
      provider: 'SureBank Financial',
      category: 'loans',
      price: 15, // Interest rate percentage
      rating: 4.8,
      duration: '12-60 months',
      requirements: ['Valid ID', 'Proof of income', 'Bank statement (3 months)', 'BVN verification'],
      benefits: ['Quick approval (24 hours)', 'No collateral required', 'Flexible repayment', 'Competitive rates'],
      imageUrl: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=600',
      isAvailable: true
    },
    {
      id: '2',
      title: 'Comprehensive Health Screening',
      description: 'Complete health checkup including blood tests, vitals, and consultation with certified medical professionals.',
      provider: 'HealthCare Plus',
      category: 'health',
      price: 25000,
      rating: 4.9,
      location: 'Lagos, Abuja, Port Harcourt',
      duration: '2-3 hours',
      requirements: ['Valid ID', 'Health insurance (optional)', 'Fasting 12 hours before test'],
      benefits: ['Comprehensive report', 'Doctor consultation', 'Follow-up support', 'Digital results'],
      imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
      isAvailable: true
    },
    {
      id: '3',
      title: 'Software Developer - Remote',
      description: 'Join our dynamic tech team as a full-stack developer. Work on exciting projects with modern technologies.',
      provider: 'TechCorp Nigeria',
      category: 'jobs',
      price: 450000, // Monthly salary
      rating: 4.7,
      location: 'Remote/Lagos',
      requirements: ['3+ years experience', 'React/Node.js skills', 'Portfolio of projects', 'Bachelor\'s degree'],
      benefits: ['Remote work', 'Health insurance', 'Learning budget', 'Flexible hours'],
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      isAvailable: true,
      applicationDeadline: '2025-02-15'
    },
    {
      id: '4',
      title: 'Digital Marketing Certification',
      description: 'Master digital marketing with hands-on training in SEO, social media, PPC, and analytics.',
      provider: 'SkillUp Academy',
      category: 'training',
      price: 85000,
      rating: 4.6,
      duration: '8 weeks',
      location: 'Online + Lagos Center',
      requirements: ['Basic computer skills', 'Internet access', 'Commitment to complete course'],
      benefits: ['Industry certification', 'Job placement support', 'Lifetime access', 'Expert mentorship'],
      imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      isAvailable: true,
      applicationDeadline: '2025-01-30'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Service['category']>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory && service.isAvailable;
  });

  const getCategoryIcon = (category: Service['category']) => {
    switch (category) {
      case 'loans': return <DollarSign className="w-6 h-6" />;
      case 'health': return <Heart className="w-6 h-6" />;
      case 'jobs': return <Briefcase className="w-6 h-6" />;
      case 'training': return <GraduationCap className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: Service['category']) => {
    switch (category) {
      case 'loans': return 'from-green-500 to-emerald-600';
      case 'health': return 'from-red-500 to-pink-600';
      case 'jobs': return 'from-blue-500 to-indigo-600';
      case 'training': return 'from-purple-500 to-violet-600';
    }
  };

  const formatPrice = (service: Service) => {
    switch (service.category) {
      case 'loans': return `${service.price}% interest rate`;
      case 'jobs': return `₦${service.price?.toLocaleString()}/month`;
      default: return `₦${service.price?.toLocaleString()}`;
    }
  };

  const handleApply = (serviceId: string) => {
    // Handle service application
    console.log('Applying for service:', serviceId);
    alert('Application submitted successfully! You will be contacted within 24 hours.');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Professional Services</h1>
        <p className="text-gray-600">Access loans, health services, job opportunities, and training programs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Services</p>
              <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.isAvailable).length}</p>
            </div>
            <Briefcase className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Loan Services</p>
              <p className="text-2xl font-bold text-green-600">{services.filter(s => s.category === 'loans').length}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Job Openings</p>
              <p className="text-2xl font-bold text-blue-600">{services.filter(s => s.category === 'jobs').length}</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Training Programs</p>
              <p className="text-2xl font-bold text-purple-600">{services.filter(s => s.category === 'training').length}</p>
            </div>
            <GraduationCap className="w-8 h-8 text-purple-500" />
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
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="loans">Loans</option>
            <option value="health">Health Services</option>
            <option value="jobs">Job Opportunities</option>
            <option value="training">Training Programs</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={service.imageUrl} 
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(service.category)} rounded-lg flex items-center justify-center text-white`}>
                  {getCategoryIcon(service.category)}
                </div>
              </div>
              {service.applicationDeadline && (
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Deadline: {new Date(service.applicationDeadline).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{service.title}</h3>
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{service.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-500">
                  <p className="font-medium">{service.provider}</p>
                  <p className="capitalize">{service.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{formatPrice(service)}</p>
                </div>
              </div>

              {service.location && (
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{service.location}</span>
                </div>
              )}

              {service.duration && (
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{service.duration}</span>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleApply(service.id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedService.imageUrl} 
                alt={selectedService.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedService.title}</h2>
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 bg-gradient-to-r ${getCategoryColor(selectedService.category)} rounded-lg flex items-center justify-center text-white`}>
                      {getCategoryIcon(selectedService.category)}
                    </div>
                    <span className="text-lg font-bold text-green-600">{formatPrice(selectedService)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-lg font-medium">{selectedService.rating}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{selectedService.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedService.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {selectedService.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Provider</h4>
                  <p className="text-gray-600">{selectedService.provider}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Category</h4>
                  <p className="text-gray-600 capitalize">{selectedService.category}</p>
                </div>
                {selectedService.location && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Location</h4>
                    <p className="text-gray-600">{selectedService.location}</p>
                  </div>
                )}
                {selectedService.duration && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Duration</h4>
                    <p className="text-gray-600">{selectedService.duration}</p>
                  </div>
                )}
              </div>

              {selectedService.applicationDeadline && (
                <div className="bg-red-50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-medium text-red-900 mb-2">Application Deadline</h4>
                  <p className="text-red-700">{new Date(selectedService.applicationDeadline).toLocaleDateString()}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApply(selectedService.id);
                    setSelectedService(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};