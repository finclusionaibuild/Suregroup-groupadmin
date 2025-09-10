import React, { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Calendar, MapPin, Users, Clock, Edit, Trash2, Eye } from 'lucide-react';
import { EventData, EventRSVP } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

// Minimal calendar grid for current month with highlights
const CalendarGrid: React.FC<{ events: EventData[]; onSelectDate: (date: string) => void }> = ({ events, onSelectDate }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ day: number | null; dateStr?: string; hasEvent?: boolean }> = [];
  for (let i = 0; i < startWeekday; i++) cells.push({ day: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = new Date(year, month, d).toISOString().slice(0, 10);
    const hasEvent = events.some(e => e.date === dateStr);
    cells.push({ day: d, dateStr, hasEvent });
  }
  while (cells.length % 7 !== 0) cells.push({ day: null });
  return (
    <div>
      <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-center py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((c, idx) => (
          <button
            key={idx}
            disabled={!c.day}
            onClick={() => c.dateStr && onSelectDate(c.dateStr)}
            className={`h-16 border rounded flex items-center justify-center ${c.day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'} ${c.hasEvent ? 'border-blue-400' : 'border-gray-200'}`}
          >
            <span className={`text-sm ${c.hasEvent ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>{c.day ?? ''}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const EventManagement: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventData[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled'>('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    groupId: '1',
    maxAttendees: '',
    bannerImageUrl: '',
    rsvpMode: 'open' as 'open' | 'invite-only',
    limitAttendees: ''
  });
  const [editEvent, setEditEvent] = useState<EventData | null>(null);
  const [rsvps, setRsvps] = useState<EventRSVP[]>([]);
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || event.groupId === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  // Pull group list from localStorage maintained by GroupManagement
  const groups = useMemo(() => {
    try {
      const raw = localStorage.getItem('groups');
      const parsed = raw ? JSON.parse(raw) as { id: string; name: string }[] : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const resolveGroupName = (id: string) => groups.find(g => g.id === id)?.name || 'Unknown Group';

  const handleCreateEvent = () => {
    const event: EventData = {
      id: Date.now().toString(),
      ...newEvent,
      groupName: resolveGroupName(newEvent.groupId),
      maxAttendees: newEvent.maxAttendees ? parseInt(newEvent.maxAttendees) : undefined,
      bannerImageUrl: newEvent.bannerImageUrl || undefined,
      rsvpMode: newEvent.rsvpMode,
      limitAttendees: newEvent.limitAttendees ? parseInt(newEvent.limitAttendees) : undefined,
      currentAttendees: 0,
      status: 'upcoming',
      createdBy: 'Current User',
      createdAt: new Date().toISOString()
    };
    setEvents([event, ...events]);
    setNewEvent({ title: '', description: '', date: '', time: '', location: '', groupId: '1', maxAttendees: '', bannerImageUrl: '', rsvpMode: 'open', limitAttendees: '' });
    setShowCreateModal(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const updateEventStatus = (eventId: string, status: EventData['status']) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status } : event
    ));
  };

  const handleStartEdit = (event: EventData) => {
    setEditEvent({ ...event });
  };

  const handleSaveEdit = () => {
    if (!editEvent) return;
    const updated = { ...editEvent, groupName: resolveGroupName(editEvent.groupId) };
    setEvents(events.map(e => e.id === updated.id ? updated : e));
    setEditEvent(null);
  };

  // Persist events/RSVPs to localStorage and hydrate on load
  useEffect(() => {
    try {
      const raw = localStorage.getItem('events');
      if (raw) {
        const parsed = JSON.parse(raw) as EventData[];
        if (Array.isArray(parsed)) {
          setEvents(parsed);
        }
      }
      const rawR = localStorage.getItem('event_rsvps');
      if (rawR) {
        const parsedR = JSON.parse(rawR) as EventRSVP[];
        if (Array.isArray(parsedR)) setRsvps(parsedR);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('events', JSON.stringify(events));
      localStorage.setItem('event_rsvps', JSON.stringify(rsvps));
    } catch {}
  }, [events, rsvps]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const completedEvents = events.filter(e => e.status === 'completed').length;
  const totalAttendees = events.reduce((sum, event) => sum + event.currentAttendees, 0);
  
  // Check if user can create events (only admins can create)
  const canCreateEvents = user?.role && ['super-admin', 'product-admin', 'group-admin'].includes(user.role);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Management</h1>
          <p className="text-gray-600">Create and manage group events</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
            aria-label="Toggle calendar view"
          >
            {view === 'list' ? 'Calendar View' : 'List View'}
          </button>
          {canCreateEvents && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">{upcomingEvents}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-emerald-600">{completedEvents}</p>
            </div>
            <Calendar className="w-8 h-8 text-emerald-500" />
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
                placeholder="Search events..."
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
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Groups</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          {canCreateEvents && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Events Grid or Calendar */}
      {view === 'list' ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {event.bannerImageUrl && (
                  <img src={event.bannerImageUrl} alt="Event banner" className="w-full h-32 object-cover rounded-md mb-3" />
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>
                  {event.currentAttendees} attendees
                  {event.maxAttendees && ` / ${event.maxAttendees} max`}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-400 mb-4">
              {event.groupName} • Created by {event.createdBy}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
                
                {canCreateEvents && (
                  <>
                    <button onClick={() => handleStartEdit(event)} className="text-gray-600 hover:text-gray-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              {event.status === 'upcoming' && (
                <div className="flex space-x-1">
                  {canCreateEvents && (
                    <>
                      <button
                        onClick={() => updateEventStatus(event.id, 'ongoing')}
                        className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                      >
                        Start
                      </button>
                      <button
                        onClick={() => updateEventStatus(event.id, 'cancelled')}
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              )}
              {event.status === 'ongoing' && (
                canCreateEvents && (
                  <button
                    onClick={() => updateEventStatus(event.id, 'completed')}
                    className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200"
                  >
                    Complete
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {/* Simple calendar grid for current month */}
          <CalendarGrid events={events} onSelectDate={(d) => setSearchTerm(new Date(d).toLocaleDateString())} />
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && canCreateEvents && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Event</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the event"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Event location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                <select
                  value={newEvent.groupId}
                  onChange={(e) => setNewEvent({...newEvent, groupId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {groups.length === 0 && <option value="">No groups found</option>}
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Attendees (Optional)</label>
                <input
                  type="number"
                  value={newEvent.maxAttendees}
                  onChange={(e) => setNewEvent({...newEvent, maxAttendees: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Leave empty for unlimited"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={newEvent.bannerImageUrl}
                  onChange={(e) => setNewEvent({...newEvent, bannerImageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RSVP Mode</label>
                  <select
                    value={newEvent.rsvpMode}
                    onChange={(e) => setNewEvent({...newEvent, rsvpMode: e.target.value as 'open' | 'invite-only'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="open">Open</option>
                    <option value="invite-only">Invite Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Limit Attendees</label>
                  <input
                    type="number"
                    value={newEvent.limitAttendees}
                    onChange={(e) => setNewEvent({...newEvent, limitAttendees: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Optional limit"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Attendees (Legacy)</label>
                  <input
                    type="number"
                    value={newEvent.maxAttendees}
                    onChange={(e) => setNewEvent({...newEvent, maxAttendees: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leave empty for unlimited"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedEvent.bannerImageUrl && (
                <img src={selectedEvent.bannerImageUrl} alt="Event banner" className="w-full h-48 object-cover rounded-md" />
              )}
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedEvent.status)}`}>
                {selectedEvent.status}
              </span>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedEvent.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Date & Time</h4>
                  <p className="text-gray-600">{new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Location</h4>
                  <p className="text-gray-600">{selectedEvent.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Group</h4>
                  <p className="text-gray-600">{selectedEvent.groupName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Attendees</h4>
                  <p className="text-gray-600">
                    {selectedEvent.currentAttendees}
                    {selectedEvent.maxAttendees && ` / ${selectedEvent.maxAttendees}`}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">RSVP Mode</h4>
                  <p className="text-gray-600 capitalize">{selectedEvent.rsvpMode}</p>
                </div>
                {selectedEvent.limitAttendees !== undefined && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Limit Attendees</h4>
                    <p className="text-gray-600">{selectedEvent.limitAttendees}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created By</h4>
                  <p className="text-gray-600">{selectedEvent.createdBy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Created Date</h4>
                  <p className="text-gray-600">{new Date(selectedEvent.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">RSVPs</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {rsvps.filter(r => r.eventId === selectedEvent.id).map(r => (
                    <div key={r.id} className="flex items-center justify-between text-sm bg-gray-50 rounded p-2">
                      <span className="text-gray-700">{r.userName}</span>
                      <span className="text-gray-400">{new Date(r.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                  {rsvps.filter(r => r.eventId === selectedEvent.id).length === 0 && (
                    <div className="text-sm text-gray-500">No RSVPs yet.</div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                {canCreateEvents && (
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                    Send Announcement
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editEvent && canCreateEvents && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Event</h3>
              <button onClick={() => setEditEvent(null)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={editEvent.title}
                  onChange={(e) => setEditEvent({ ...editEvent!, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editEvent.description}
                  onChange={(e) => setEditEvent({ ...editEvent!, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={editEvent.date}
                    onChange={(e) => setEditEvent({ ...editEvent!, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={editEvent.time}
                    onChange={(e) => setEditEvent({ ...editEvent!, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editEvent.location}
                  onChange={(e) => setEditEvent({ ...editEvent!, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                <select
                  value={editEvent.groupId}
                  onChange={(e) => setEditEvent({ ...editEvent!, groupId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {groups.length === 0 && <option value="">No groups found</option>}
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Attendees (Optional)</label>
                <input
                  type="number"
                  value={editEvent.maxAttendees ?? ''}
                  onChange={(e) => setEditEvent({ ...editEvent!, maxAttendees: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setEditEvent(null)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};