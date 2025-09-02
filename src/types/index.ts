import { DivideIcon as LucideIcon } from 'lucide-react';

export type UserRole = 'super-admin' | 'product-admin' | 'group-admin' | 'member' | 'vendor';
export type UserRole = 'super-admin' | 'product-admin' | 'group-admin' | 'member' | 'vendor' | 'developer';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export interface SidebarGroup {
  title: string;
  items: NavigationItem[];
}

export interface DashboardMetric {
  title: string;
  value: string;
  change?: string;
  trend: 'up' | 'down' | 'neutral';
}

// User Management Types
export interface UserData {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  isEmailVerified: boolean;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended';
  region: string;
  lastLogin: string;
  createdAt: string;
}

// Group Management Types
export interface GroupData {
  id: string;
  name: string;
  description: string;
  type: 'church' | 'union' | 'association' | 'community';
  memberCount: number;
  status: 'active' | 'inactive';
  createdBy: string;
  createdAt: string;
  profileImage?: string;
}

// Event Management Types
export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  groupId: string;
  groupName: string;
  maxAttendees?: number;
  currentAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
}

// Feature Management Types
export interface Feature {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'beta' | 'deprecated';
  version: string;
  rolloutPercentage: number;
  createdAt: string;
  updatedAt: string;
}

// KYC Management Types
export interface KYCDocument {
  id: string;
  userId: string;
  userName: string;
  documentType: 'identity' | 'address' | 'business';
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  comments?: string;
}

// Ticketing System Types
export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: 'technical' | 'billing' | 'general' | 'feature-request';
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

// Wallet Management Types
export interface WalletData {
  id: string;
  userId: string;
  userName: string;
  balance: number;
  currency: string;
  status: 'active' | 'frozen' | 'suspended';
  createdAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

// Vendor Types
export interface VendorService {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  connectedGroups: string[];
  imageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface VendorOrder {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
  rating?: number;
  review?: string;
}

export interface VendorTransaction {
  id: string;
  orderId: string;
  amount: number;
  type: 'payment' | 'refund' | 'commission';
  status: 'pending' | 'in-escrow' | 'completed' | 'failed';
  escrowReleaseDate?: string;
  createdAt: string;
  completedAt?: string;
}

export interface VendorReview {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt: string;
  response?: string;
  responseDate?: string;
}

// Developer Types
export interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  status: 'active' | 'revoked' | 'expired';
  createdAt: string;
  lastUsed?: string;
  expiresAt?: string;
}

export interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  category: string;
  parameters: APIParameter[];
  responseExample: string;
}

export interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface APIUsage {
  date: string;
  requests: number;
  errors: number;
  latency: number;
}

export interface DeveloperTicket {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'api';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  sender: 'developer' | 'support';
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface DeveloperProfile {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  bio: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  verificationStatus: {
    bvn: boolean;
    nin: boolean;
    business: boolean;
    liveliness: boolean;
  };
  createdAt: string;
}