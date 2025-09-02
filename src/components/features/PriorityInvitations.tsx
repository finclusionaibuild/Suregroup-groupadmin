import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Check, X, Bell, Star } from 'lucide-react';

interface Invitation {
  id: string;
  title: string;
  description: string;
  eventType: 'conference' | 'workshop' | 'networking' | 'training' | 'social';
  organizer: string;
  date: string;
  time: string;
  location: string;
  maxAttendees?: number;
  currentAttendees: number;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  rsvpDeadline: string;
  benefits: string[];
  requirements?: string[];
  imageUrl: string;
  isExclusive: boolean;
}

export const PriorityInvitations: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: '1',
      title: 'Tech Leadership Summit 2025',
      description: 'Exclusive summit for technology leaders and innovators. Network with industry experts and learn about emerging trends.',
      eventType: 'conference',
      organizer: 'TechCorp Nigeria',
      date: '2025-02-15',
      time: '09:00',
      location: 'Eko Hotel, Lagos',
      maxAttendees: 200,
      currentAttendees: 156,
      priority: 'high',
      status: 'pending',
      rsvpDeadline: '2025-02-10',
      benefits: ['Networking opportunities', 'Industry insights', 'Certificate of attendance', 'Lunch included'],
      requirements: ['Professional attire', 'Valid ID', 'Business card'],
      imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
      isExclusive: true
    },
    {
      id: '2',
      title: 'Digital Marketing Workshop',
      description: 'Hands-on workshop covering latest digital marketing strategies, SEO, and social media marketing.',
      eventType: 'workshop',
      organizer: 'SkillUp Academy',
      date: '2025-01-25',
      time: '14:00',
      location: 'Victoria Island, Lagos',
      maxAttendees: 50,
      currentAttendees: 32,
      priority: 'medium',
      status: 'pending',
      rsvpDeadline: '2025-01-22',
      benefits: ['Practical skills', 'Workshop materials', 'Certificate', 'Networking'],
      imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      isExclusive: false
    },
    {
      id: '3',
      title: 'Community Health Fair',
      description: 'Free health screening and wellness education for community members and their families.',
      eventType: 'social',
      organizer: 'HealthCare Plus',
      date: '2025-01-30',
      time: '10:00',
      location: 'Community Center, Abuja',
      currentAttendees: 89,
      priority: 'medium',
      status: 'accepted',
      rsvpDeadline: '2025-01-28',
      benefits: ['Free health screening', 'Wellness consultation', 'Health education', 'Family friendly'],
      imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
      isExclusive: false
    },
    {
      id: '4',
      title: 'Exclusive Investment Seminar',
      description: 'Private seminar on investment opportunities and wealth building strategies for high-net-worth individuals.',
      eventType: 'networking',
      organizer: 'SureBank Financial',
      date: '2025-02-20',
      time: '18:00',
      location: 'Four Points Hotel, Lagos',
      maxAttendees: 30,
      currentAttendees: 18,
      priority: 'high',
      status: 'pending',
      rsvpDeadline: '2025-02-15',
      benefits: ['Investment insights', 'Exclusive opportunities', 'Private networking', 'Dinner included'],
      requirements: ['Invitation only', 'Minimum investment threshold', 'Valid ID'],
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      isExclusive: true
    }
  ]);

  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | Invitation['status']>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | Invitation['priority']>('all');

  const handleRSVP = (invitationId: string, response: 'accepted' | 'declined') => {
    setInvitations(invitations.map(inv => 
      inv.id === invitationId 
        ? { ...inv, status: response }
        : inv
    ));
    
    if (selectedInvitation?.id === invitationId) {
      setSelectedInvitation({ ...selectedInvitation, status: response });
    }
  };

  const setReminder = (invitationId: string) => {
    // Handle reminder setting
    console.log('Setting reminder for invitation:', invitationId);
    alert('Reminder set! You will be notified 24 hours before the event.');
  };

  const filteredInvitations = invitations.filter(inv => {
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || inv.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'declined': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'expired': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'conference': return 'from-blue-500 to-indigo-600';
      case 'workshop': return 'from-green-500 to-emerald-600';
      case 'networking': return 'from-purple-500 to-violet-600';
      case 'training': return 'from-orange-500 to-red-600';
      case 'social': return 'from-pink-500 to-rose-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const pendingCount = invitations.filter(inv => inv.status === 'pending').length;
  const acceptedCount = invitations.filter(inv => inv.status === 'accepted').length;
  const highPriorityCount = invitations.filter(inv => inv.priority === 'high').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Priority Invitations</h1>
        <p className="text-gray-600">Exclusive event invitations and RSVP management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Invitations</p>
              <p className="text-2xl font-bold text-gray-900">{invitations.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending RSVP</p>
              <p className="text-2xl font-bold text-blue-600">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accepted</p>
              <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
            </div>
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
            </div>
            <Star className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Invitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvitations.map((invitation) => (
          <div key={invitation.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={invitation.imageUrl} 
                alt={invitation.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(invitation.priority)}`}>
                  {invitation.priority} priority
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invitation.status)}`}>
                  {invitation.status}
                </span>
              </div>
              {invitation.isExclusive && (
                <div className="absolute bottom-4 left-4">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    EXCLUSIVE
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{invitation.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{invitation.description}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(invitation.date).toLocaleDateString()} at {invitation.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{invitation.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>
                    {invitation.currentAttendees} attending
                    {invitation.maxAttendees && ` / ${invitation.maxAttendees} max`}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>RSVP by {new Date(invitation.rsvpDeadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="text-xs text-gray-400 mb-4">
                Organized by {invitation.organizer}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedInvitation(invitation)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </button>
                
                {invitation.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRSVP(invitation.id, 'accepted')}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRSVP(invitation.id, 'declined')}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                    >
                      Decline
                    </button>
                  </div>
                )}
                
                {invitation.status === 'accepted' && (
                  <button
                    onClick={() => setReminder(invitation.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 flex items-center space-x-1"
                  >
                    <Bell className="w-3 h-3" />
                    <span>Remind Me</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invitation Details Modal */}
      {selectedInvitation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedInvitation.imageUrl} 
                alt={selectedInvitation.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedInvitation(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedInvitation.title}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedInvitation.priority)}`}>
                      {selectedInvitation.priority} priority
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedInvitation.status)}`}>
                      {selectedInvitation.status}
                    </span>
                    {selectedInvitation.isExclusive && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        EXCLUSIVE
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{selectedInvitation.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Event Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{new Date(selectedInvitation.date).toLocaleDateString()} at {selectedInvitation.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{selectedInvitation.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span>
                        {selectedInvitation.currentAttendees} attending
                        {selectedInvitation.maxAttendees && ` / ${selectedInvitation.maxAttendees} max`}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span>RSVP by {new Date(selectedInvitation.rsvpDeadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {selectedInvitation.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedInvitation.requirements && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedInvitation.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Organized by:</strong> {selectedInvitation.organizer}
                </p>
                <p className="text-sm text-gray-600 capitalize">
                  <strong>Event Type:</strong> {selectedInvitation.eventType}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedInvitation(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                
                {selectedInvitation.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleRSVP(selectedInvitation.id, 'declined');
                        setSelectedInvitation(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => {
                        handleRSVP(selectedInvitation.id, 'accepted');
                        setSelectedInvitation(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Accept RSVP
                    </button>
                  </>
                )}
                
                {selectedInvitation.status === 'accepted' && (
                  <button
                    onClick={() => {
                      setReminder(selectedInvitation.id);
                      setSelectedInvitation(null);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Set Reminder</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};