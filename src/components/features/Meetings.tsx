import React, { useState } from 'react';
import { Search, Plus, Calendar, Clock, Users, MapPin, Video, Phone, Eye, Edit, Trash2 } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  location: string;
  type: 'in-person' | 'virtual' | 'hybrid';
  meetingLink?: string;
  organizer: string;
  groupName: string;
  attendees: string[];
  maxAttendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isRecurring: boolean;
  recurrencePattern?: string;
  agenda: string[];
  materials?: string[];
}

export const Meetings: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Weekly Bible Study',
      description: 'Join us for our weekly Bible study session where we explore scripture together.',
      date: '2025-01-17',
      time: '19:00',
      duration: 90,
      location: 'Church Hall',
      type: 'in-person',
      organizer: 'Pastor John',
      groupName: 'Community Church',
      attendees: ['Sarah Johnson', 'Mike Wilson', 'Emily Davis'],
      maxAttendees: 30,
      status: 'upcoming',
      isRecurring: true,
      recurrencePattern: 'Weekly on Friday',
      agenda: [
        'Opening prayer',
        'Scripture reading - Matthew 5:1-12',
        'Group discussion',
        'Closing prayer'
      ]
    },
    {
      id: '2',
      title: 'Youth Leadership Meeting',
      description: 'Monthly meeting for youth leaders to plan upcoming activities and events.',
      date: '2025-01-20',
      time: '15:00',
      duration: 120,
      location: 'Virtual Meeting',
      type: 'virtual',
      meetingLink: 'https://zoom.us/j/123456789',
      organizer: 'Youth Pastor Sarah',
      groupName: 'Youth Ministry',
      attendees: ['John Smith', 'Lisa Brown', 'David Wilson'],
      maxAttendees: 15,
      status: 'upcoming',
      isRecurring: true,
      recurrencePattern: 'Monthly on 3rd Monday',
      agenda: [
        'Review previous month activities',
        'Plan upcoming youth camp',
        'Budget discussion',
        'Volunteer assignments'
      ]
    },
    {
      id: '3',
      title: 'Community Service Planning',
      description: 'Planning session for our upcoming community service initiatives.',
      date: '2025-01-15',
      time: '18:00',
      duration: 60,
      location: 'Community Center',
      type: 'in-person',
      organizer: 'Community Coordinator',
      groupName: 'Community Care',
      attendees: ['Alice Cooper', 'Bob Taylor', 'Carol Davis'],
      status: 'completed',
      isRecurring: false,
      agenda: [
        'Review service opportunities',
        'Assign team leaders',
        'Set timeline and goals'
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Meeting['status']>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | Meeting['type']>('all');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter;
    const matchesType = typeFilter === 'all' || meeting.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleJoinMeeting = (meetingId: string) => {
    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting?.meetingLink) {
      window.open(meeting.meetingLink, '_blank');
    } else {
      alert('Meeting link not available');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'in-person': return 'bg-green-100 text-green-700';
      case 'virtual': return 'bg-blue-100 text-blue-700';
      case 'hybrid': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'in-person': return <MapPin className="w-4 h-4" />;
      case 'virtual': return <Video className="w-4 h-4" />;
      case 'hybrid': return <Phone className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const upcomingMeetings = meetings.filter(m => m.status === 'upcoming').length;
  const completedMeetings = meetings.filter(m => m.status === 'completed').length;
  const totalAttendees = meetings.reduce((sum, meeting) => sum + meeting.attendees.length, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Meetings</h1>
        <p className="text-gray-600">Manage and participate in group meetings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Meetings</p>
              <p className="text-2xl font-bold text-gray-900">{meetings.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">{upcomingMeetings}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedMeetings}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-purple-600">{totalAttendees}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
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
                placeholder="Search meetings..."
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
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="in-person">In-Person</option>
            <option value="virtual">Virtual</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(meeting.type)}`}>
                    {getTypeIcon(meeting.type)}
                    <span className="ml-1">{meeting.type}</span>
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{meeting.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(meeting.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{meeting.time} ({meeting.duration} min)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    {getTypeIcon(meeting.type)}
                    <span className="ml-2">{meeting.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span>Organizer: {meeting.organizer}</span>
                  <span>•</span>
                  <span>{meeting.groupName}</span>
                  <span>•</span>
                  <span>{meeting.attendees.length} attendees</span>
                  {meeting.maxAttendees && <span>/ {meeting.maxAttendees} max</span>}
                </div>

                {meeting.isRecurring && (
                  <div className="text-xs text-blue-600 mb-3">
                    🔄 {meeting.recurrencePattern}
                  </div>
                )}

                {meeting.agenda.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Agenda:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {meeting.agenda.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {meeting.agenda.length > 3 && (
                        <li className="text-blue-600 text-xs">+{meeting.agenda.length - 3} more items</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedMeeting(meeting)}
                  className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                
                {meeting.status === 'upcoming' && meeting.type !== 'in-person' && meeting.meetingLink && (
                  <button
                    onClick={() => handleJoinMeeting(meeting.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredMeetings.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Meetings Found</h3>
            <p className="text-gray-500">No meetings match your current filters.</p>
          </div>
        )}
      </div>

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedMeeting.title}</h3>
              <button
                onClick={() => setSelectedMeeting(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMeeting.status)}`}>
                  {selectedMeeting.status}
                </span>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedMeeting.type)}`}>
                  {getTypeIcon(selectedMeeting.type)}
                  <span className="ml-1">{selectedMeeting.type}</span>
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedMeeting.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Date & Time</h4>
                  <p className="text-gray-600">{new Date(selectedMeeting.date).toLocaleDateString()} at {selectedMeeting.time}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Duration</h4>
                  <p className="text-gray-600">{selectedMeeting.duration} minutes</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Location</h4>
                  <p className="text-gray-600">{selectedMeeting.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Organizer</h4>
                  <p className="text-gray-600">{selectedMeeting.organizer}</p>
                </div>
              </div>

              {selectedMeeting.agenda.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Agenda</h4>
                  <ul className="space-y-1">
                    {selectedMeeting.agenda.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedMeeting.meetingLink && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Meeting Link</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <a href={selectedMeeting.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                      {selectedMeeting.meetingLink}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                {selectedMeeting.status === 'upcoming' && selectedMeeting.meetingLink && (
                  <button
                    onClick={() => handleJoinMeeting(selectedMeeting.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Join Meeting
                  </button>
                )}
                <button
                  onClick={() => setSelectedMeeting(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};