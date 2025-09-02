import React from 'react';
import RoleLanding from '../RoleLanding';

const ProductAdminLanding: React.FC = () => (
  <RoleLanding
    title="Product Admin"
    description="Platform management, features, and system settings."
    accentColorClass="bg-gradient-to-r from-blue-600 to-teal-600"
    signupRole="product-admin"
  />
);

export default ProductAdminLanding;


