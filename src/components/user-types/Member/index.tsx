import React from 'react';
import RoleLanding from '../RoleLanding';

const MemberLanding: React.FC = () => (
  <RoleLanding
    title="Member"
    description="Participate in your community and access member services."
    accentColorClass="bg-gradient-to-r from-blue-500 to-indigo-500"
    signupRole="member"
  />
);

export default MemberLanding;


