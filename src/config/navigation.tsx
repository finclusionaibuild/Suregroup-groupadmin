import React from 'react';
import { 
  Home, 
  Users, 
  MessageSquare, 
  ShoppingCart, 
  Calendar,
  Bell,
  TrendingUp,
  DollarSign,
  Settings,
  HelpCircle,
  Award,
  FileText,
  Shield,
  Star,
  UserPlus,
  Target,
  Gift,
  CreditCard,
  Phone,
  Flag,
  BarChart3,
  Briefcase,
  GraduationCap,
  Heart,
  MapPin,
  Zap,
  LogOut,
  Database
} from 'lucide-react';
import { NavigationGroup } from '../types';

export const getMemberNavigation = (): NavigationGroup[] => [
  {
    title: 'Dashboard & Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'user-tour', label: 'User Tour Guide', icon: HelpCircle },
      { id: 'my-groups', label: 'My Groups', icon: Users }
    ]
  },
  {
    title: 'Engagement & Content',
    items: [
      { id: 'content-collaboration', label: 'Content & Collaboration', icon: MessageSquare },
      { id: 'accountability-tracking', label: 'Accountability Tracking', icon: Target },
      { id: 'meetings', label: 'Manage Meetings', icon: Users },
      { id: 'votings', label: 'Manage Votings', icon: Target },
      { id: 'calendar', label: 'Manage Events', icon: Calendar }
    ]
  },
  {
    title: 'Benefits & Services',
    items: [
      { id: 'discounts-offers', label: 'Discounts & Offers', icon: Gift },
      { id: 'professional-services', label: 'Professional Services', icon: Briefcase },
      { id: 'priority-invitations', label: 'Priority Invitations', icon: Calendar },
      { id: 'marketplace-browse', label: 'Browse Marketplace', icon: ShoppingCart },
      { id: 'marketplace-orders', label: 'My Orders', icon: ShoppingCart }
    ]
  },
  {
    title: 'Support & Reports',
    items: [
      { id: 'dispute-management', label: 'Dispute Management', icon: FileText },
      { id: 'reports-flags', label: 'Reports & Flags', icon: Flag }
    ]
  },
  {
    title: 'Financial Services',
    items: [
      { id: 'wallet', label: 'Wallet (Sure Banker)', icon: CreditCard },
      { id: 'rewards-referrals', label: 'Rewards & Referrals', icon: Award }
    ]
  },
  {
    title: 'Communication',
    items: [
      { id: 'notifications-alerts', label: 'Notifications & Alerts', icon: Bell },
      { id: 'chat-messaging', label: 'Chat & Messaging', icon: Phone }
    ]
  },
  {
    title: 'Profile & Security',
    items: [
      { id: 'ratings-reviews', label: 'Ratings & Reviews', icon: Star },
      { id: 'profile-settings', label: 'Profile & Settings', icon: Settings }
    ]
  }
];

export const getGroupAdminNavigation = (): NavigationGroup[] => [
  {
    title: 'Dashboard & Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'user-tour', label: 'User Tour Guide', icon: HelpCircle },
      { id: 'group-overview', label: 'Group Overview', icon: Users }
    ]
  },
  {
    title: 'Group Management',
    items: [
      { id: 'group-management', label: 'Group Management', icon: Users },
      { id: 'group-setup', label: 'Group Setup', icon: Settings },
      { id: 'membership-management', label: 'Membership Management', icon: UserPlus },
      { id: 'approval-workflow', label: 'Approval Workflow', icon: Shield },
      { id: 'events', label: 'Events Management', icon: Calendar },
      { id: 'votings', label: 'Voting Management', icon: Target },
      { id: 'content-oversight', label: 'Content Oversight', icon: MessageSquare }
    ]
  },
  {
    title: 'Performance & Content',
    items: [
      { id: 'performance-tracking', label: 'Performance Tracking', icon: BarChart3 },
      { id: 'reports-flags', label: 'Reports & Flags', icon: Flag }
    ]
  },
  {
    title: 'Financial Services',
    items: [
      { id: 'wallet-management', label: 'Wallet Management', icon: CreditCard },
      { id: 'referrals-rewards', label: 'Referrals & Rewards', icon: Award },
      { id: 'benefit-management', label: 'Benefit Management', icon: Gift }
    ]
  },
  {
    title: 'Marketplace & Services',
    items: [
      { id: 'marketplace-management', label: 'Marketplace Management', icon: ShoppingCart },
      { id: 'ratings-reviews', label: 'Ratings & Reviews', icon: Star }
    ]
  },
  {
    title: 'Communication',
    items: [
      { id: 'notifications-alerts', label: 'Notifications & Alerts', icon: Bell },
      { id: 'chats', label: 'Chats', icon: Phone }
    ]
  },
  {
    title: 'Profile & Settings',
    items: [
      { id: 'profile-settings', label: 'Profile & Settings', icon: Settings }
    ]
  }
];

export const getProductAdminNavigation = (): NavigationGroup[] => [
  {
    title: 'Platform Management',
    items: [
      { id: 'group-admin-management', label: 'Group Admin Management', icon: Users },
      { id: 'members-management', label: 'Members Management', icon: Users },
      { id: 'vendors-management', label: 'Vendors Management', icon: ShoppingCart },
      { id: 'system-settings', label: 'System Settings', icon: Settings },
      { id: 'security-management', label: 'Security Management', icon: Shield },
      { id: 'feature-management', label: 'Feature Management', icon: Settings }
    ]
  },
  {
    title: 'Communication & Commerce',
    items: [
      { id: 'chat-management', label: 'Chat Management', icon: MessageSquare },
      { id: 'wallet-management', label: 'Wallet Management', icon: CreditCard },
      { id: 'marketplace-management', label: 'Marketplace Management', icon: ShoppingCart },
      { id: 'calendar-management', label: 'Calendar Management', icon: Calendar }
    ]
  },
  {
    title: 'System Oversight',
    items: [
      { id: 'database-management', label: 'Database Management', icon: Database },
      { id: 'audit-logs', label: 'Audit Logs', icon: FileText },
      { id: 'system-monitoring', label: 'System Monitoring', icon: BarChart3 },
      { id: 'backup-recovery', label: 'Backup & Recovery', icon: Shield }
    ]
  }
];

export const getSuperAdminNavigation = (): NavigationGroup[] => [
  {
    title: 'Platform Control',
    items: [
      { id: 'feature-management', label: 'Feature Management', icon: Settings },
      { id: 'rbac-management', label: 'RBAC Management', icon: Shield },
      { id: 'regional-management', label: 'Regional Management', icon: MapPin }
    ]
  },
  {
    title: 'User Management',
    items: [
      { id: 'admin-user-management', label: 'Admin User Management', icon: Users },
      { id: 'kyc-management', label: 'KYC Management', icon: Shield },
      { id: 'wallet-management', label: 'Wallet Management', icon: CreditCard }
    ]
  },
  {
    title: 'System Management',
    items: [
      { id: 'ticketing-system', label: 'Ticketing System', icon: FileText },
      { id: 'group-management', label: 'Group Management', icon: Users },
      { id: 'event-management', label: 'Event Management', icon: Calendar }
    ]
  },
  {
    title: 'Analytics & Finance',
    items: [
      { id: 'transaction-management', label: 'Transaction Management', icon: DollarSign },
      { id: 'analytics-reporting', label: 'Analytics & Reporting', icon: BarChart3 }
    ]
  }
];

export const getVendorNavigation = (): NavigationGroup[] => [
  {
    title: 'Dashboard & Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'vendor-tour', label: 'User Tour Guide', icon: HelpCircle },
      { id: 'vendor-profile', label: 'Vendor Profile', icon: Users }
    ]
  },
  {
    title: 'Service Management',
    items: [
      { id: 'services', label: 'My Services', icon: Briefcase },
      { id: 'orders', label: 'Orders & Delivery', icon: ShoppingCart },
      { id: 'marketplace', label: 'Marketplace Storefront', icon: ShoppingCart }
    ]
  },
  {
    title: 'Financial Services',
    items: [
      { id: 'transactions', label: 'Transactions (SureBanker)', icon: CreditCard },
      { id: 'wallet', label: 'Wallet Management', icon: DollarSign }
    ]
  },
  {
    title: 'Marketing & Engagement',
    items: [
      { id: 'marketing', label: 'Engagement & Marketing', icon: TrendingUp },
      { id: 'referrals-rewards', label: 'Referrals & Rewards', icon: Award }
    ]
  },
  {
    title: 'Reputation & Trust',
    items: [
      { id: 'ratings-reviews', label: 'Ratings & Reviews', icon: Star },
      { id: 'trust-verification', label: 'Reputation & Trust', icon: Shield }
    ]
  },
  {
    title: 'Support & Communication',
    items: [
      { id: 'support', label: 'Support & Disputes', icon: FileText },
      { id: 'chat', label: 'Chat & Messaging', icon: Phone },
      { id: 'notifications', label: 'Notifications & Alerts', icon: Bell }
    ]
  },
  {
    title: 'Settings & Profile',
    items: [
      { id: 'profile-settings', label: 'Profile & Settings', icon: Settings }
    ]
  }
];

export const getDeveloperNavigation = (): NavigationGroup[] => [
  {
    title: 'Dashboard & Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'developer-tour', label: 'User Tour Guide', icon: HelpCircle },
      { id: 'developer-profile', label: 'Developer Profile', icon: Users }
    ]
  },
  {
    title: 'API Management',
    items: [
      { id: 'api-keys', label: 'API Keys', icon: Shield },
      { id: 'documentation', label: 'Documentation', icon: FileText },
      { id: 'endpoint-explorer', label: 'Endpoint Explorer', icon: Target },
      { id: 'webhooks', label: 'Webhooks', icon: Zap }
    ]
  },
  {
    title: 'Development Tools',
    items: [
      { id: 'sandbox', label: 'Sandbox Environment', icon: Settings },
      { id: 'debugging-console', label: 'Debugging Console', icon: BarChart3 },
      { id: 'usage-monitoring', label: 'Usage Monitoring', icon: TrendingUp }
    ]
  },
  {
    title: 'Analytics & Reports',
    items: [
      { id: 'analytics', label: 'Usage Analytics', icon: BarChart3 },
      { id: 'performance-reports', label: 'Performance Reports', icon: TrendingUp }
    ]
  },
  {
    title: 'Security & Compliance',
    items: [
      { id: 'kyc-verification', label: 'KYC Verification', icon: Shield },
      { id: 'compliance-center', label: 'Compliance Center', icon: FileText }
    ]
  },
  {
    title: 'Billing & Rewards',
    items: [
      { id: 'billing-history', label: 'Billing History', icon: CreditCard },
      { id: 'rewards-points', label: 'Rewards & Points', icon: Award }
    ]
  },
  {
    title: 'Support & Community',
    items: [
      { id: 'support-tickets', label: 'Support Tickets', icon: MessageSquare },
      { id: 'developer-chat', label: 'Developer Chat', icon: Phone },
      { id: 'help-center', label: 'Help Center', icon: HelpCircle },
      { id: 'developer-ratings', label: 'Ratings & Reviews', icon: Star }
    ]
  },
  {
    title: 'Profile & Settings',
    items: [
      { id: 'profile-settings', label: 'Profile & Settings', icon: Settings }
    ]
  }
];