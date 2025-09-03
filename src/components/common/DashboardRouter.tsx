import React, { Suspense, lazy } from 'react';

const GroupAdminDashboard = lazy(() => 
  import('../dashboards/GroupAdminDashboard').then(m => ({ default: m.GroupAdminDashboard }))
);

export const DashboardRouter: React.FC = () => {
  return (
    <Suspense fallback={<div className="p-6">Loading dashboard...</div>}>
      <GroupAdminDashboard />
    </Suspense>
  );
};