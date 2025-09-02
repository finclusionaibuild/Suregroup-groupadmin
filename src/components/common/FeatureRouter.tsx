import React from 'react';
import { UserManagement } from '../features/UserManagement';
import { KYCManagement } from '../features/KYCManagement';
import { WalletManagement } from '../features/WalletManagement';
import { TicketingSystem } from '../features/TicketingSystem';
import { GroupManagement } from '../features/GroupManagement';
import { EventManagement } from '../features/EventManagement';
import { FeatureManagement } from '../features/FeatureManagement';
import { AdminUserManagement } from '../features/AdminUserManagement';
import { RBACManagement } from '../features/RBACManagement';
import { RegionalManagement } from '../features/RegionalManagement';
import { TransactionManagement } from '../features/TransactionManagement';
import { UserTourGuide } from '../features/UserTourGuide';
import { MyGroups } from '../features/MyGroups';
import { MyOrders } from '../features/MyOrders';
import { ContentCollaboration } from '../features/ContentCollaboration';
import { AccountabilityTracking } from '../features/AccountabilityTracking';
import { DiscountsOffers } from '../features/DiscountsOffers';
import { ProfessionalServices } from '../features/ProfessionalServices';
import { PriorityInvitations } from '../features/PriorityInvitations';
import { DisputeManagement } from '../features/DisputeManagement';
import { ReportsFlags } from '../features/ReportsFlags';
import { Wallet } from '../features/Wallet';
import { RewardsReferrals } from '../features/RewardsReferrals';
import { NotificationsAlerts } from '../features/NotificationsAlerts';
import { ChatMessaging } from '../features/ChatMessaging';
import { RatingsReviews } from '../features/RatingsReviews';
import { ProfileSettings } from '../features/ProfileSettings';
import { GroupSetup } from '../features/GroupSetup';
import { MembershipManagement } from '../features/MembershipManagement';
import { PerformanceTracking } from '../features/PerformanceTracking';
import { ContentOversight } from '../features/ContentOversight';
import { BenefitManagement } from '../features/BenefitManagement';
import { MarketplaceManagement } from '../features/MarketplaceManagement';
import { VendorTourGuide } from '../features/VendorTourGuide';
import { VendorServices } from '../features/VendorServices';
import { VendorOrders } from '../features/VendorOrders';
import { VendorTransactions } from '../features/VendorTransactions';
import { VendorMarketing } from '../features/VendorMarketing';
import { VendorSupport } from '../features/VendorSupport';
import { VendorReputationTrust } from '../features/VendorReputationTrust';
import { DeveloperTourGuide } from '../features/DeveloperTourGuide';
import { APIKeyManagement } from '../features/APIKeyManagement';
import { APIDocumentation } from '../features/APIDocumentation';
import { SandboxEnvironment } from '../features/SandboxEnvironment';
import { DeveloperAnalytics } from '../features/DeveloperAnalytics';
import { DeveloperSecurity } from '../features/DeveloperSecurity';
import { DeveloperBilling } from '../features/DeveloperBilling';
import { DeveloperSupport } from '../features/DeveloperSupport';
import { EndpointExplorer } from '../features/EndpointExplorer';
import { WebhookManagement } from '../features/WebhookManagement';
import { DebuggingConsole } from '../features/DebuggingConsole';
import { UsageMonitoring } from '../features/UsageMonitoring';
import { DeveloperProfile } from '../features/DeveloperProfile';
import { ComplianceCenter } from '../features/ComplianceCenter';
import { DeveloperRatings } from '../features/DeveloperRatings';
import { DeveloperChat } from '../features/DeveloperChat';
import { HelpCenter } from '../features/HelpCenter';
import { VendorMarketplace } from '../features/VendorMarketplace';
import { GroupOverview } from '../features/GroupOverview';
import { SystemSettings } from '../features/SystemSettings';
import { SecurityManagement } from '../features/SecurityManagement';
import { AuditLogs } from '../features/AuditLogs';
import { SystemMonitoring } from '../features/SystemMonitoring';
import { BackupRecovery } from '../features/BackupRecovery';
import { DatabaseManagement } from '../features/DatabaseManagement';
import { Meetings } from '../features/Meetings';
import { Votings } from '../features/Votings';

interface FeatureRouterProps {
  featureId: string;
}

export const FeatureRouter: React.FC<FeatureRouterProps> = ({ featureId }) => {
  switch (featureId) {
    case 'user-tour':
      return <UserTourGuide />;
    case 'my-groups':
      return <MyGroups />;
    case 'content-collaboration':
      return <ContentCollaboration />;
    case 'accountability-tracking':
      return <AccountabilityTracking />;
    case 'discounts-offers':
      return <DiscountsOffers />;
    case 'professional-services':
      return <ProfessionalServices />;
    case 'priority-invitations':
      return <PriorityInvitations />;
    case 'marketplace-browse':
      return <DiscountsOffers />;
    case 'marketplace-orders':
      return <MyOrders />;
    case 'dispute-management':
      return <DisputeManagement />;
    case 'reports-flags':
      return <ReportsFlags />;
    case 'wallet':
      return <Wallet />;
    case 'rewards-referrals':
      return <RewardsReferrals />;
    case 'notifications-alerts':
      return <NotificationsAlerts />;
    case 'chat-messaging':
      return <ChatMessaging />;
    case 'ratings-reviews':
      return <RatingsReviews />;
    case 'profile-settings':
      return <ProfileSettings />;
    case 'meetings':
      return <Meetings />;
    case 'votings':
      return <Votings />;
    case 'calendar':
      return <EventManagement />;
   case 'chats':
     return <ChatMessaging />;
    case 'developer-tour':
      return <DeveloperTourGuide />;
    case 'developer-profile':
      return <DeveloperProfile />;
    case 'api-keys':
      return <APIKeyManagement />;
    case 'documentation':
      return <APIDocumentation />;
    case 'endpoint-explorer':
      return <EndpointExplorer />;
    case 'webhooks':
      return <WebhookManagement />;
    case 'sandbox':
      return <SandboxEnvironment />;
    case 'debugging-console':
      return <DebuggingConsole />;
    case 'usage-monitoring':
      return <UsageMonitoring />;
    case 'analytics':
      return <DeveloperAnalytics />;
    case 'performance-reports':
      return <DeveloperAnalytics />;
    case 'kyc-verification':
      return <DeveloperSecurity />;
    case 'compliance-center':
      return <ComplianceCenter />;
    case 'billing-history':
      return <DeveloperBilling />;
    case 'rewards-points':
      return <DeveloperBilling />;
    case 'support-tickets':
      return <DeveloperSupport />;
    case 'developer-ratings':
      return <DeveloperRatings />;
    case 'vendor-tour':
      return <VendorTourGuide />;
    case 'vendor-profile':
      return (
        <div className="p-6">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Vendor Profile</h2>
            <p className="text-gray-600">
              Manage your vendor profile and business information.
            </p>
          </div>
        </div>
      );
    case 'services':
      return <VendorServices />;
    case 'orders':
      return <VendorOrders />;
    case 'marketplace':
      return <VendorMarketplace />;
    case 'transactions':
      return <VendorTransactions />;
    case 'marketing':
      return <VendorMarketing />;
    case 'support':
      return <VendorSupport />;
    case 'trust-verification':
      return <VendorReputationTrust />;
    case 'referrals-rewards':
      return <RewardsReferrals />;
    case 'notifications':
      return <NotificationsAlerts />;
    case 'chat':
      return <ChatMessaging />;
    case 'group-overview':
      return <GroupOverview />;
    case 'user-management':
      return <UserManagement />;
    case 'group-admin-management':
      return <AdminUserManagement />;
    case 'members-management':
      return <UserManagement />;
    case 'vendors-management':
      return <VendorServices />;
    case 'chat-management':
      return <ChatMessaging />;
    case 'wallet-management':
      return <WalletManagement />;
    case 'marketplace-management':
      return <MarketplaceManagement />;
    case 'calendar-management':
      return <EventManagement />;
    case 'system-settings':
      return <SystemSettings />;
    case 'security-management':
      return <SecurityManagement />;
    case 'audit-logs':
      return <AuditLogs />;
    case 'system-monitoring':
      return <SystemMonitoring />;
    case 'backup-recovery':
      return <BackupRecovery />;
    case 'database-management':
      return <DatabaseManagement />;
    case 'admin-user-management':
      return <AdminUserManagement />;
    case 'kyc-management':
      return <KYCManagement />;
    case 'ticketing-system':
      return <TicketingSystem />;
    case 'group-management':
      return <GroupManagement />;
    case 'approval-workflow':
      return <ApprovalWorkflow />;
    case 'event-management':
      return <EventManagement />;
    case 'feature-management':
      return <FeatureManagement />;
    case 'rbac-management':
      return <RBACManagement />;
    case 'regional-management':
      return <RegionalManagement />;
    case 'transaction-management':
      return <TransactionManagement />;
    case 'analytics-reporting':
      return (
        <div className="p-6">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics & Reporting</h2>
            <p className="text-gray-600">
              Comprehensive analytics and reporting dashboard for platform insights.
            </p>
          </div>
        </div>
      );
    case 'group-setup':
      return <GroupSetup />;
    case 'membership-management':
      return <MembershipManagement />;
    case 'events':
      return <EventManagement />;
    case 'content-oversight':
      return <ContentOversight />;
    case 'performance-tracking':
      return <PerformanceTracking />;
    case 'reports-flags':
      return <ReportsFlags />;
    case 'wallet-management':
      return <WalletManagement />;
    case 'marketplace-management':
      return <MarketplaceManagement />;
    case 'benefit-management':
      return <BenefitManagement />;
    default:
      return (
        <div className="p-6">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Feature Coming Soon</h2>
            <p className="text-gray-600">
              The {featureId} feature is currently under development and will be available soon.
            </p>
          </div>
        </div>
      );
  }
};