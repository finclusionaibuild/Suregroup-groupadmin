import React, { useState } from 'react';
import { Plus, Image, FileText, Video, Send, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  media?: {
    type: 'image' | 'video' | 'document';
    url: string;
    name?: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  groupName: string;
  isLiked: boolean;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  groupName: string;
  replies: number;
  lastActivity: string;
  isActive: boolean;
}

export const ContentCollaboration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'discussions' | 'create'>('feed');
  const [newPost, setNewPost] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Sarah Johnson',
      authorAvatar: 'SJ',
      content: 'Great turnout at today\'s community service event! Thank you to everyone who participated. Together we made a real difference in our neighborhood.',
      media: {
        type: 'image',
        url: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'community-service.jpg'
      },
      timestamp: '2025-01-14T10:30:00Z',
      likes: 24,
      comments: 8,
      shares: 3,
      groupName: 'Community Care',
      isLiked: false
    },
    {
      id: '2',
      author: 'Mike Wilson',
      authorAvatar: 'MW',
      content: 'Reminder: Bible study group meets tomorrow at 7 PM. We\'ll be discussing Chapter 5. Don\'t forget to bring your study guides!',
      timestamp: '2025-01-14T08:15:00Z',
      likes: 12,
      comments: 5,
      shares: 1,
      groupName: 'Youth Ministry',
      isLiked: true
    },
    {
      id: '3',
      author: 'Emily Davis',
      authorAvatar: 'ED',
      content: 'Sharing the presentation from last week\'s workshop on financial literacy. Hope this helps everyone with their budgeting goals!',
      media: {
        type: 'document',
        url: '#',
        name: 'Financial_Literacy_Workshop.pdf'
      },
      timestamp: '2025-01-13T16:45:00Z',
      likes: 18,
      comments: 12,
      shares: 7,
      groupName: 'Local Union Chapter',
      isLiked: false
    }
  ]);

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: '1',
      title: 'Planning the Annual Fundraiser Event',
      author: 'Pastor John',
      groupName: 'Community Church',
      replies: 23,
      lastActivity: '2025-01-14T11:20:00Z',
      isActive: true
    },
    {
      id: '2',
      title: 'Youth Summer Camp Registration',
      author: 'Youth Pastor Sarah',
      groupName: 'Youth Ministry',
      replies: 15,
      lastActivity: '2025-01-14T09:45:00Z',
      isActive: true
    },
    {
      id: '3',
      title: 'Workplace Safety Guidelines Update',
      author: 'Union Rep Mike',
      groupName: 'Local Union Chapter',
      replies: 8,
      lastActivity: '2025-01-13T14:30:00Z',
      isActive: false
    }
  ]);

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: 'You',
      authorAvatar: 'YU',
      content: newPost,
      media: selectedMedia ? {
        type: selectedMedia.type.startsWith('image') ? 'image' : 
              selectedMedia.type.startsWith('video') ? 'video' : 'document',
        url: URL.createObjectURL(selectedMedia),
        name: selectedMedia.name
      } : undefined,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      groupName: 'Community Care',
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setSelectedMedia(null);
    setActiveTab('feed');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedMedia(file);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content & Collaboration</h1>
        <p className="text-gray-600">Share updates, collaborate with your community</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('feed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'feed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Community Feed
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'discussions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Discussions & Forums
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Create Post
            </button>
          </nav>
        </div>
      </div>

      {/* Community Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{post.authorAvatar}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{post.author}</h3>
                    <p className="text-xs text-gray-500">
                      {post.groupName} • {new Date(post.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-gray-800">{post.content}</p>
              </div>

              {/* Media */}
              {post.media && (
                <div className="mb-4">
                  {post.media.type === 'image' && (
                    <img 
                      src={post.media.url} 
                      alt="Post media" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  {post.media.type === 'document' && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.media.name}</p>
                        <p className="text-xs text-gray-500">PDF Document</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center space-x-2 ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discussions & Forums */}
      {activeTab === 'discussions' && (
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>by {discussion.author}</span>
                    <span>•</span>
                    <span>{discussion.groupName}</span>
                    <span>•</span>
                    <span>{discussion.replies} replies</span>
                    <span>•</span>
                    <span>{new Date(discussion.lastActivity).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  discussion.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {discussion.isActive ? 'Active' : 'Closed'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Post */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's on your mind?
              </label>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Share an update with your community..."
              />
            </div>

            {selectedMedia && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500" />
                <span className="text-sm text-gray-700">{selectedMedia.name}</span>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-600">
                  <Image className="w-5 h-5" />
                  <span className="text-sm">Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-600">
                  <Video className="w-5 h-5" />
                  <span className="text-sm">Video</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-600">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm">Document</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              <button
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};