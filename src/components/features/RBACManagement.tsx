import React, { useState } from 'react';
import { Shield, Save, RotateCcw, Check, X } from 'lucide-react';
import { UserRole } from '../../types';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface RolePermissions {
  [key: string]: boolean;
}

export const RBACManagement: React.FC = () => {
  const permissions: Permission[] = [
    // System & User Management
    { id: 'admin_users_manage', name: 'Manage Admin Users', description: 'Create, edit, and delete admin users', category: 'System & User Management' },
    { id: 'users_manage', name: 'Manage All Users', description: 'Full user management across all types', category: 'System & User Management' },
    { id: 'rbac_manage', name: 'Manage Roles & Permissions', description: 'Configure role-based access control', category: 'System & User Management' },
    { id: 'dashboard_manage', name: 'Dashboard Management', description: 'Customize dashboard layouts and widgets', category: 'System & User Management' },
    { id: 'regional_manage', name: 'Regional Management', description: 'Manage regional settings and assignments', category: 'System & User Management' },
    
    // Compliance & Governance
    { id: 'kyc_manage', name: 'KYC/KYB Management', description: 'Review and approve identity verifications', category: 'Compliance & Governance' },
    { id: 'approval_workflows', name: 'Approval Workflows', description: 'Create and manage approval processes', category: 'Compliance & Governance' },
    { id: 'background_checks', name: 'Background Checks', description: 'Manage background verification processes', category: 'Compliance & Governance' },
    { id: 'white_labeling', name: 'White Labeling', description: 'Customize platform branding and appearance', category: 'Compliance & Governance' },
    
    // Financial & Transactions
    { id: 'transactions_manage', name: 'Transaction Management', description: 'View and manage all transactions', category: 'Financial & Transactions' },
    { id: 'wallets_manage', name: 'Wallet Management', description: 'Manage user wallets and balances', category: 'Financial & Transactions' },
    { id: 'escrow_manage', name: 'Escrow Management', description: 'Handle escrow transactions and releases', category: 'Financial & Transactions' },
    { id: 'subscriptions_manage', name: 'Subscription Management', description: 'Manage pricing plans and fees', category: 'Financial & Transactions' },
    { id: 'disputes_manage', name: 'Dispute Management', description: 'Handle transaction disputes and resolutions', category: 'Financial & Transactions' },
    
    // Integrations & Developer Tools
    { id: 'integrations_manage', name: 'Third-Party Integrations', description: 'Manage external service integrations', category: 'Integrations & Developer Tools' },
    { id: 'api_manage', name: 'API Management', description: 'Generate and manage API keys', category: 'Integrations & Developer Tools' },
    { id: 'developer_tools', name: 'Developer Tools', description: 'Access sandbox and development tools', category: 'Integrations & Developer Tools' },
    { id: 'marketplace_system', name: 'Marketplace System', description: 'Manage marketplace vendors and products', category: 'Integrations & Developer Tools' },
    
    // Data & Analytics
    { id: 'database_manage', name: 'Database Management', description: 'Manage database operations and queries', category: 'Data & Analytics' },
    { id: 'system_health', name: 'System Health Analytics', description: 'Monitor system performance and health', category: 'Data & Analytics' },
    { id: 'reports_analytics', name: 'Reports & Analytics', description: 'Generate and export system reports', category: 'Data & Analytics' },
    { id: 'system_logs', name: 'System Logs', description: 'Access and configure system logs', category: 'Data & Analytics' },
    
    // Communication & Support
    { id: 'chat_manage', name: 'Chat Management', description: 'Monitor and manage chat conversations', category: 'Communication & Support' },
    { id: 'email_templates', name: 'Email Templates', description: 'Create and manage email templates', category: 'Communication & Support' },
    { id: 'notifications_manage', name: 'Notification Management', description: 'Send and schedule notifications', category: 'Communication & Support' },
    { id: 'ticketing_manage', name: 'Ticketing System', description: 'Manage support tickets and assignments', category: 'Communication & Support' },
    
    // Group & Event Management
    { id: 'groups_manage', name: 'Group Management', description: 'Create and manage groups', category: 'Group & Event Management' },
    { id: 'events_manage', name: 'Event Management', description: 'Create and manage events', category: 'Group & Event Management' },
    { id: 'members_manage', name: 'Member Management', description: 'Manage group members', category: 'Group & Event Management' },
    
    // Product Features
    { id: 'features_manage', name: 'Feature Management', description: 'Control feature rollouts and toggles', category: 'Product Features' },
    { id: 'marketplace_access', name: 'Marketplace Access', description: 'Access marketplace functionality', category: 'Product Features' },
    { id: 'wallet_access', name: 'Wallet Access', description: 'Access wallet functionality', category: 'Product Features' }
  ];

  const [rolePermissions, setRolePermissions] = useState<Record<UserRole, RolePermissions>>({
    'super-admin': {
      // Super Admin has all permissions
      ...permissions.reduce((acc, perm) => ({ ...acc, [perm.id]: true }), {})
    },
    'product-admin': {
      // Product Admin permissions
      features_manage: true,
      marketplace_system: true,
      integrations_manage: true,
      api_manage: true,
      developer_tools: true,
      system_health: true,
      reports_analytics: true,
      marketplace_access: true,
      admin_users_manage: true,
      users_manage: true,
      wallets_manage: true,
      transactions_manage: true,
      chat_manage: true,
      events_manage: true,
      database_manage: true,
      ticketing_manage: true,
      // Default others to false
      ...permissions.reduce((acc, perm) => ({ 
        ...acc, 
        [perm.id]: ['features_manage', 'marketplace_system', 'integrations_manage', 'api_manage', 'developer_tools', 'system_health', 'reports_analytics', 'marketplace_access', 'admin_users_manage', 'users_manage', 'wallets_manage', 'transactions_manage', 'chat_manage', 'events_manage', 'database_manage', 'ticketing_manage'].includes(perm.id)
      }), {})
    },
    'group-admin': {
      // Group Admin permissions
      groups_manage: true,
      events_manage: true,
      members_manage: true,
      chat_manage: true,
      marketplace_access: true,
      // Default others to false
      ...permissions.reduce((acc, perm) => ({ 
        ...acc, 
        [perm.id]: ['groups_manage', 'events_manage', 'members_manage', 'chat_manage', 'marketplace_access'].includes(perm.id)
      }), {})
    },
    'member': {
      // Member permissions
      marketplace_access: true,
      wallet_access: true,
      // Default others to false
      ...permissions.reduce((acc, perm) => ({ 
        ...acc, 
        [perm.id]: ['marketplace_access', 'wallet_access'].includes(perm.id)
      }), {})
    }
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('super-admin');

  const handlePermissionChange = (permissionId: string, granted: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [permissionId]: granted
      }
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to the backend
    console.log('Saving role permissions:', rolePermissions);
    setHasChanges(false);
    // Show success message
  };

  const handleResetChanges = () => {
    // Reset to original state
    setHasChanges(false);
    // In a real app, this would reload from the backend
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super-admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'product-admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'group-admin': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'member': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const getPermissionCount = (role: UserRole) => {
    return Object.values(rolePermissions[role]).filter(Boolean).length;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">RBAC - Roles & Permissions</h1>
        <p className="text-gray-600">Configure role-based access control and permissions</p>
      </div>

      {/* Role Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Role to Configure</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {(['super-admin', 'product-admin', 'group-admin', 'member'] as UserRole[]).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedRole === role 
                  ? getRoleColor(role) + ' ring-2 ring-blue-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm capitalize">{role.replace('-', ' ')}</h3>
              <p className="text-xs mt-1">
                {getPermissionCount(role)} permissions
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Save/Reset Actions */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-yellow-800">You have unsaved changes</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleResetChanges}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-1"
              >
                <Save className="w-3 h-3" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Matrix */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Permissions for {selectedRole.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure what this role can access and manage
          </p>
        </div>

        <div className="p-6">
          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
            <div key={category} className="mb-8 last:mb-0">
              <h3 className="text-md font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <button
                      onClick={() => handlePermissionChange(
                        permission.id, 
                        !rolePermissions[selectedRole][permission.id]
                      )}
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        rolePermissions[selectedRole][permission.id]
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {rolePermissions[selectedRole][permission.id] && (
                        <Check className="w-3 h-3" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{permission.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Summary */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Permission Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {(['super-admin', 'product-admin', 'group-admin', 'member'] as UserRole[]).map((role) => (
            <div key={role} className="text-center">
              <div className="font-medium text-gray-900 capitalize">{role.replace('-', ' ')}</div>
              <div className="text-gray-600">{getPermissionCount(role)} permissions</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};