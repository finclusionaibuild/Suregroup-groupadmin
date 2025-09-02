import React, { useState } from 'react';
import { Send, Phone, Video, MoreHorizontal, Search, Plus, Users, MessageSquare, Clock, CheckCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'developer' | 'support' | 'community';
  message: string;
  timestamp: string;
  isOwn: boolean;
  attachments?: string[];
}

interface ChatConversation {
  id: string;
  name: string;
  type: 'support' | 'community' | 'direct';
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  memberCount?: number;
  category?: string;
}

export const DeveloperChat: React.FC = () => {
  const [conversations] = useState<ChatConversation[]>([
    {
      id: '1',
      name: 'Developer Support',
      type: 'support',
      avatar: 'DS',
      lastMessage: 'Your API key has been generated successfully',
      lastMessageTime: '2025-01-14T10:30:00Z',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: '2',
      name: 'API Developers Community',
      type: 'community',
      avatar: 'AD',
      lastMessage: 'New webhook events available in v2.1',
      lastMessageTime: '2025-01-14T09:15:00Z',
      unreadCount: 3,
      isOnline: true,
      memberCount: 1247,
      category: 'General Discussion'
    },
    {
      id: '3',
      name: 'Integration Help',
      type: 'community',
      avatar: 'IH',
      lastMessage: 'Best practices for error handling?',
      lastMessageTime: '2025-01-13T16:45:00Z',
      unreadCount: 1,
      isOnline: false,
      memberCount: 89,
      category: 'Technical Help'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      type: 'direct',
      avatar: 'SJ',
      lastMessage: 'Thanks for the code example!',
      lastMessageTime: '2025-01-13T14:20:00Z',
      unreadCount: 0,
      isOnline: false
    }
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'Support Agent',
      senderType: 'support',
      message: 'Hello! I see you\'re having issues with API rate limiting. Let me help you with that.',
      timestamp: '2025-01-14T10:25:00Z',
      isOwn: false
    },
    {
      id: '2',
      senderId: '2',
      senderName: 'You',
      senderType: 'developer',
      message: 'Yes, I\'m getting 429 errors even though my dashboard shows I\'m within quota.',
      timestamp: '2025-01-14T10:27:00Z',
      isOwn: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Support Agent',
      senderType: 'support',
      message: 'Rate limits are applied per minute, not just monthly quota. You might be hitting the per-minute limit. Let me check your usage patterns.',
      timestamp: '2025-01-14T10:28:00Z',
      isOwn: false
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Support Agent',
      senderType: 'support',
      message: 'I can see you\'re making about 100 requests per minute to the /users endpoint. The limit is 60/minute. Consider implementing request batching or caching.',
      timestamp: '2025-01-14T10:30:00Z',
      isOwn: false
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<ChatConversation>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current-developer',
      senderName: 'You',
      senderType: 'developer',
      message: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case 'support': return '🎧';
      case 'community': return '👥';
      case 'direct': return '💬';
      default: return '💬';
    }
  };

  const getSenderColor = (senderType: string) => {
    switch (senderType) {
      case 'support': return 'bg-blue-600 text-white';
      case 'community': return 'bg-purple-600 text-white';
      case 'developer': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  const activeChats = conversations.filter(conv => conv.isOnline).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Developer Chat</h1>
        <p className="text-gray-600">Connect with support and the developer community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
              <p className="text-2xl font-bold text-blue-600">{totalUnread}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Chats</p>
              <p className="text-2xl font-bold text-green-600">{activeChats}</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Support Response</p>
              <p className="text-2xl font-bold text-purple-600">2.4h</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
              <p className="text-2xl font-bold text-orange-600">96%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Conversations</h3>
                <button className="text-blue-600 hover:text-blue-800">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 ${
                    selectedConversation.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{conversation.avatar}</span>
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{conversation.name}</p>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">
                          {new Date(conversation.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="flex items-center space-x-1">
                          <span className="text-lg">{getConversationIcon(conversation.type)}</span>
                          {conversation.memberCount && (
                            <span className="text-xs text-gray-400">{conversation.memberCount}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{selectedConversation.avatar}</span>
                    </div>
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.type === 'community' 
                        ? `${selectedConversation.memberCount} members • ${selectedConversation.category}`
                        : selectedConversation.type === 'support'
                        ? 'Developer Support Team'
                        : selectedConversation.isOnline ? 'Online' : 'Offline'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedConversation.type === 'support' && (
                    <>
                      <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100">
                        <Video className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOwn 
                      ? 'bg-blue-600 text-white' 
                      : getSenderColor(message.senderType)
                  }`}>
                    {!message.isOwn && selectedConversation.type === 'community' && (
                      <p className="text-xs font-medium mb-1 opacity-75">{message.senderName}</p>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-blue-100' : 'text-gray-200'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="text-xs opacity-75">📎 {attachment}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-1"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900">Developer Community Guidelines</h3>
            <p className="text-xs text-blue-700">
              Be respectful, share knowledge, and help fellow developers. Follow our community guidelines for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};