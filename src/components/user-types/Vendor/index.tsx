import React from 'react';
import RoleLanding from '../RoleLanding';

const VendorLanding: React.FC = () => (
  <RoleLanding
    title="Vendor"
    description="Offer services and manage orders in the marketplace."
    accentColorClass="bg-gradient-to-r from-orange-600 to-red-600"
    signupRole="vendor"
  />
);

export default VendorLanding;


