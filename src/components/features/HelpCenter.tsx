import React, { useState } from 'react';
import { Search, Book, Video, FileText, ExternalLink, Star, ThumbsUp, Clock, Eye } from 'lucide-react';

interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
  lastUpdated: string;
  estimatedReadTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnailUrl: string;
  views: number;
  rating: number;
  publishedAt: string;
}

export const HelpCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'videos' | 'faq' | 'guides'>('articles');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);

  const [articles] = useState<HelpArticle[]>([
    {
      id: '1',
      title: 'Getting Started with SureGroups API',
      content: `# Getting Started with SureGroups API

Welcome to the SureGroups API! This guide will help you get up and running quickly.

## Authentication

All API requests require authentication using an API key. Include your key in the Authorization header:

\`\`\`
Authorization: Bearer your-api-key
\`\`\`

## Making Your First Request

Here's how to make your first API call:

\`\`\`javascript
const response = await fetch('https://api.suregroups.com/v1/users/me', {
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  }
});

const user = await response.json();
console.log(user);
\`\`\`

## Rate Limits

API requests are rate limited to ensure fair usage:
- 1000 requests per hour for free tier
- 10,000 requests per hour for paid plans

## Error Handling

The API uses standard HTTP status codes. Always check the response status and handle errors appropriately.`,
      category: 'Getting Started',
      tags: ['authentication', 'quickstart', 'api'],
      views: 2450,
      helpful: 89,
      lastUpdated: '2025-01-10T00:00:00Z',
      estimatedReadTime: 5,
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Authentication and API Keys',
      content: `# Authentication and API Keys

Learn how to securely authenticate with the SureGroups API using API keys.

## Generating API Keys

1. Navigate to the API Keys section in your dashboard
2. Click "Generate New Key"
3. Select the appropriate permissions
4. Copy and securely store your key

## Key Types

- **Development Keys**: For testing and development
- **Production Keys**: For live applications
- **Restricted Keys**: Limited permissions for specific use cases

## Security Best Practices

- Never expose API keys in client-side code
- Rotate keys regularly
- Use environment variables to store keys
- Monitor key usage for suspicious activity`,
      category: 'Authentication',
      tags: ['api-keys', 'security', 'authentication'],
      views: 1890,
      helpful: 67,
      lastUpdated: '2025-01-08T00:00:00Z',
      estimatedReadTime: 7,
      difficulty: 'beginner'
    },
    {
      id: '3',
      title: 'Webhook Implementation Guide',
      content: `# Webhook Implementation Guide

Webhooks allow you to receive real-time notifications when events occur in the SureGroups platform.

## Setting Up Webhooks

1. Create an endpoint in your application to receive webhook data
2. Configure the webhook in your developer dashboard
3. Verify webhook signatures for security
4. Handle webhook events appropriately

## Event Types

- user.created
- user.updated
- transaction.completed
- group.member_added

## Webhook Security

Always verify webhook signatures to ensure requests are from SureGroups:

\`\`\`javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === expectedSignature;
}
\`\`\``,
      category: 'Webhooks',
      tags: ['webhooks', 'real-time', 'events'],
      views: 1567,
      helpful: 45,
      lastUpdated: '2025-01-05T00:00:00Z',
      estimatedReadTime: 10,
      difficulty: 'intermediate'
    },
    {
      id: '4',
      title: 'Error Handling Best Practices',
      content: `# Error Handling Best Practices

Proper error handling is crucial for building robust applications with the SureGroups API.

## HTTP Status Codes

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Rate Limited
- 500: Server Error

## Retry Logic

Implement exponential backoff for retrying failed requests:

\`\`\`javascript
async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      
      if (response.status === 429) {
        // Rate limited, wait and retry
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        continue;
      }
      
      throw new Error(\`HTTP \${response.status}\`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}
\`\`\``,
      category: 'Best Practices',
      tags: ['error-handling', 'retry-logic', 'reliability'],
      views: 1234,
      helpful: 38,
      lastUpdated: '2025-01-03T00:00:00Z',
      estimatedReadTime: 8,
      difficulty: 'intermediate'
    }
  ]);

  const [videoTutorials] = useState<VideoTutorial[]>([
    {
      id: '1',
      title: 'SureGroups API Overview',
      description: 'Complete introduction to the SureGroups API and its capabilities',
      duration: '12:34',
      category: 'Getting Started',
      thumbnailUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: 3420,
      rating: 4.8,
      publishedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: '2',
      title: 'Building Your First Integration',
      description: 'Step-by-step tutorial for creating your first SureGroups integration',
      duration: '18:45',
      category: 'Tutorials',
      thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: 2890,
      rating: 4.9,
      publishedAt: '2025-01-05T00:00:00Z'
    },
    {
      id: '3',
      title: 'Advanced Webhook Configuration',
      description: 'Learn advanced webhook patterns and best practices',
      duration: '15:22',
      category: 'Advanced',
      thumbnailUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: 1567,
      rating: 4.7,
      publishedAt: '2025-01-08T00:00:00Z'
    }
  ]);

  const categories = ['all', 'Getting Started', 'Authentication', 'Webhooks', 'Best Practices', 'Tutorials', 'Advanced'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const markAsHelpful = (articleId: string) => {
    console.log(`Article ${articleId} marked as helpful`);
    alert('Thank you for your feedback!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-gray-600">Find answers, tutorials, and resources for developers</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search help articles..."
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

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('articles')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'articles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Articles ({articles.length})
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'videos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Video Tutorials ({videoTutorials.length})
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'faq'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'guides'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Integration Guides
            </button>
          </nav>
        </div>
      </div>

      {/* Articles Tab */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{article.title}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(article.difficulty)}`}>
                  {article.difficulty}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.estimatedReadTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{article.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{article.helpful}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{article.category}</span>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Read Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Tutorials Tab */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTutorials.map((video) => (
            <div key={video.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{video.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{video.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.views.toLocaleString()} views</span>
                  <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-semibold text-gray-900 mb-2">How do I get started with the API?</h4>
              <p className="text-sm text-gray-600">
                First, create an account and complete KYC verification. Then generate an API key from your dashboard 
                and start making requests to our endpoints. Check out our Getting Started guide for detailed instructions.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-semibold text-gray-900 mb-2">What are the rate limits?</h4>
              <p className="text-sm text-gray-600">
                Rate limits vary by tier: Tier 1 (5K requests/month), Tier 2 (20K requests/month), 
                Tier 3 (50K requests/month). Per-minute limits also apply to prevent abuse.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-semibold text-gray-900 mb-2">How do I handle webhook failures?</h4>
              <p className="text-sm text-gray-600">
                We automatically retry failed webhooks with exponential backoff. You can view delivery logs 
                in your dashboard and configure retry settings for each webhook endpoint.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-semibold text-gray-900 mb-2">Is there a sandbox environment?</h4>
              <p className="text-sm text-gray-600">
                Yes! Use our sandbox environment to test your integration safely with mock data. 
                Sandbox requests don't count against your rate limits.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-semibold text-gray-900 mb-2">How is billing calculated?</h4>
              <p className="text-sm text-gray-600">
                Billing is based on API usage beyond your tier's included requests. 
                Overage is charged at $0.01 per request. View detailed usage in your billing dashboard.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Integration Guides Tab */}
      {activeTab === 'guides' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Node.js Integration</h3>
            <p className="text-sm text-gray-600 mb-4">Complete guide for integrating with Node.js applications</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto">
              <ExternalLink className="w-4 h-4" />
              <span>View Guide</span>
            </button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Python Integration</h3>
            <p className="text-sm text-gray-600 mb-4">Step-by-step Python SDK integration tutorial</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2 mx-auto">
              <ExternalLink className="w-4 h-4" />
              <span>View Guide</span>
            </button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">React Integration</h3>
            <p className="text-sm text-gray-600 mb-4">Frontend integration patterns for React applications</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2 mx-auto">
              <ExternalLink className="w-4 h-4" />
              <span>View Guide</span>
            </button>
          </div>
        </div>
      )}

      {/* Article Details Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedArticle.title}</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(selectedArticle.difficulty)}`}>
                      {selectedArticle.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{selectedArticle.estimatedReadTime} min read</span>
                    <span className="text-sm text-gray-500">{selectedArticle.views} views</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700">{selectedArticle.content}</div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => markAsHelpful(selectedArticle.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};