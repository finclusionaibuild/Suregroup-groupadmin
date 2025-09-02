import React from 'react';
import RoleLanding from '../RoleLanding';

const DeveloperLanding: React.FC = () => (
  <RoleLanding
    title="Developer"
    description="Integrate with APIs, manage keys, and monitor usage."
    accentColorClass="bg-gradient-to-r from-cyan-600 to-blue-600"
    signupRole="developer"
  />
);

export default DeveloperLanding;


