import React from 'react';
import RoleLanding from '../RoleLanding';

const SuperAdminLanding: React.FC = () => (
  <RoleLanding
    title="Super Admin"
    description="System-wide management and control for the entire platform."
    accentColorClass="bg-gradient-to-r from-indigo-600 to-purple-600"
    signupRole="super-admin"
  />
);

export default SuperAdminLanding;


