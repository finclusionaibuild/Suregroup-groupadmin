import React from 'react';
import { GroupOverview } from '../features/GroupOverview';
import { GroupManagement } from '../features/GroupManagement';
import { GroupSetup } from '../features/GroupSetup';
import { MembershipManagement } from '../features/MembershipManagement';
import { ApprovalWorkflow } from '../features/ApprovalWorkflow';
import { EventManagement } from '../features/EventManagement';
import { Votings } from '../features/Votings';
import { ContentOversight } from '../features/ContentOversight';
import { PerformanceTracking } from '../features/PerformanceTracking';
import { ReportsFlags } from '../features/ReportsFlags';
import { WalletManagement } from '../features/WalletManagement';
import { RewardsReferrals } from '../features/RewardsReferrals';
import { BenefitManagement } from '../features/BenefitManagement';
import { MarketplaceManagement } from '../features/MarketplaceManagement';
import { RatingsReviews } from '../features/RatingsReviews';
import { NotificationsAlerts } from '../features/NotificationsAlerts';
import { ChatMessaging } from '../features/ChatMessaging';
import { ProfileSettings } from '../features/ProfileSettings';

interface FeatureRouterProps {
  featureId: string;
}

export const FeatureRouter: React.FC<FeatureRouterProps> = ({ featureId }) => {
  switch (featureId) {
    case 'group-overview':
      return <GroupOverview />;
    case 'group-management':
      return <GroupManagement />;
    case 'group-setup':
      return <GroupSetup />;
    case 'membership-management':
      return <MembershipManagement />;
    case 'approval-workflow':
      return <ApprovalWorkflow />;
    case 'event-management':
      return <EventManagement />;
    case 'votings':
      return <Votings />;
    case 'content-oversight':
      return <ContentOversight />;
    case 'performance-tracking':
      return <PerformanceTracking />;
    case 'reports-flags':
      return <ReportsFlags />;
    case 'wallet-management':
      return <WalletManagement />;
    case 'referrals-rewards':
      return <RewardsReferrals />;
    case 'notifications-alerts':
      return <NotificationsAlerts />;
    case 'chats':
      return <ChatMessaging />;
    case 'ratings-reviews':
      return <RatingsReviews />;
    case 'profile-settings':
      return <ProfileSettings />;
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