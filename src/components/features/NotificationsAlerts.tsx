import React, { useState } from 'react';
import { Bell, Check, X, Settings, Filter, BookMarked as MarkAsRead, Volume2, VolumeX } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'system' | 'transaction' | 'group' | 'event' | 'security';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  timestamp: string;
  actionUrl?: string;
  groupName?: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
}

export const NotificationsAlerts: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Payment Received',
      message: 'You received $125.50 from Community Church for monthly contribution refund',
      type: 'transaction',
      priority: 'medium',
      isRead: false,
      timestamp: '2025-01-14T10:30:00Z',
      actionUrl: '/wallet'
    },
    {
      id: '2',
      title: 'New Event Invitation',
      message: 'You\'ve been invited to Tech Leadership Summit 2025',
      type: 'event',
      priority: 'high',
      isRead: false,
      timestamp: '2025-01-14T09:15:00Z',
      actionUrl: '/priority-invitations',
      groupName: 'Tech Professionals'
    },
    {
      id: '3',
      title: 'Group Message',
      message: 'New message in Youth Ministry group chat',
      type: 'group',
      priority: 'low',
      isRead: true,
      timestamp: '2025-01-14T08:45:00Z',
      actionUrl: '/chat',
      groupName: 'Youth Ministry'
    },
    {
      id: '4',
      title: 'Security Alert',
      message: 'New login detected from unknown device',
      type: 'security',
      priority: 'urgent',
      isRead: false,
      timestamp: '2025-01-13T22:30:00Z',
      actionUrl: '/profile-settings'
    },
    {
      id: '5',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 2:00 AM - 4:00 AM',
      type: 'system',
      priority: 'medium',
      isRead: true,
      timestamp: '2025-01-13T16:20:00Z'
    },
    {
      id: '6',
      title: 'Marketplace Order Shipped',
      message: 'Your order for Organic Honey has been shipped and will arrive tomorrow',
      type: 'transaction',
      priority: 'medium',
      isRead: false,
      timestamp: '2025-01-13T14:30:00Z',
      actionUrl: '/marketplace-orders'
    },
    {
      id: '7',
      title: 'New Group Member',
      message: '5 new members joined Youth Ministry this week',
      type: 'group',
      priority: 'low',
      isRead: true,
      timestamp: '2025-01-12T11:20:00Z',
      groupName: 'Youth Ministry'
    },
    {
      id: '8',
      title: 'Event Reminder',
      message: 'Community Service Day is tomorrow at 9:00 AM',
      type: 'event',
      priority: 'high',
      isRead: false,
      timestamp: '2025-01-12T09:00:00Z',
      actionUrl: '/events',
      groupName: 'Community Care'
    }
  ]);

  const [settings, setSettings] = useState<Record<string, NotificationSettings>>({
    transaction: { email: true, push: true, sms: false, inApp: true },
    group: { email: true, push: true, sms: false, inApp: true },
    event: { email: true, push: true, sms: true, inApp: true },
    security: { email: true, push: true, sms: true, inApp: true },
    system: { email: false, push: true, sms: false, inApp: true }
  });

  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  const [filterType, setFilterType] = useState<'all' | Notification['type']>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'read' && notification.isRead) ||
                       (filterRead === 'unread' && !notification.isRead);
    return matchesType && matchesRead;
  });

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const handleSettingChange = (type: string, setting: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: value
      }
    }));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transaction': return 'bg-green-100 text-green-700';
      case 'group': return 'bg-blue-100 text-blue-700';
      case 'event': return 'bg-purple-100 text-purple-700';
      case 'security': return 'bg-red-100 text-red-700';
      case 'system': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transaction': return '💰';
      case 'group': return '👥';
      case 'event': return '📅';
      case 'security': return '🔒';
      case 'system': return '⚙️';
      default: return '📢';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.isRead).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications & Alerts</h1>
        <p className="text-gray-600">Stay updated with real-time notifications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
            <Bell className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
            </div>
            <Bell className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
            </div>
            <Bell className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-purple-600">
                {notifications.filter(n => {
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return new Date(n.timestamp) >= weekAgo;
                }).length}
              </p>
            </div>
            <Bell className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications ({unreadCount})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="transaction">Transaction</option>
                <option value="group">Group</option>
                <option value="event">Event</option>
                <option value="security">Security</option>
                <option value="system">System</option>
              </select>
              <select
                value={filterRead}
                onChange={(e) => setFilterRead(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
              <button
                onClick={handleMarkAllAsRead}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Mark All Read</span>
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className={`bg-white rounded-lg border border-gray-200 p-6 ${!notification.isRead ? 'border-l-4 border-l-blue-500' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-sm font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{new Date(notification.timestamp).toLocaleString()}</span>
                        {notification.groupName && <span>• {notification.groupName}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {notification.actionUrl && (
                  <div className="mt-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
          
          <div className="space-y-6">
            {Object.entries(settings).map(([type, typeSettings]) => (
              <div key={type} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-xl">{getTypeIcon(type)}</div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 capitalize">{type} Notifications</h3>
                    <p className="text-sm text-gray-600">
                      {type === 'transaction' && 'Payment confirmations, wallet updates'}
                      {type === 'group' && 'Group messages, member updates'}
                      {type === 'event' && 'Event invitations, reminders'}
                      {type === 'security' && 'Login alerts, security warnings'}
                      {type === 'system' && 'Maintenance, platform updates'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Email</span>
                    <button
                      onClick={() => handleSettingChange(type, 'email', !typeSettings.email)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        typeSettings.email ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        typeSettings.email ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Push</span>
                    <button
                      onClick={() => handleSettingChange(type, 'push', !typeSettings.push)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        typeSettings.push ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        typeSettings.push ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">SMS</span>
                    <button
                      onClick={() => handleSettingChange(type, 'sms', !typeSettings.sms)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        typeSettings.sms ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        typeSettings.sms ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">In-App</span>
                    <button
                      onClick={() => handleSettingChange(type, 'inApp', !typeSettings.inApp)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        typeSettings.inApp ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        typeSettings.inApp ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Global Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Do Not Disturb</p>
                  <p className="text-xs text-gray-500">Pause all notifications temporarily</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Sound Notifications</p>
                  <p className="text-xs text-gray-500">Play sound for new notifications</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};