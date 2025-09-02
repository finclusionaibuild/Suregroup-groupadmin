import React from 'react';
import RoleLanding from '../RoleLanding';

const GroupAdminLanding: React.FC = () => (
  <RoleLanding
    title="Group Admin"
    description="Manage groups, members, and community engagement."
    accentColorClass="bg-gradient-to-r from-emerald-600 to-green-600"
    signupRole="group-admin"
  />
);

export default GroupAdminLanding;


