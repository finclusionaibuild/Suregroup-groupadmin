import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, Users, Building, User, ArrowLeft, ShoppingCart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

export const DemoRoleSelection: React.FC = () => {
  const { startDemo } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleParam = searchParams.get('role') as UserRole;

  // If role is specified in URL, start demo immediately
  React.useEffect(() => {
    if (roleParam && ['super-admin', 'product-admin', 'group-admin', 'member'].includes(roleParam)) {
      startDemo(roleParam);
      navigate('/dashboard');
    }
  }, [roleParam, startDemo, navigate]);

  const roles = [
    {
      role: 'super-admin' as UserRole,
      title: 'Super Admin',
      description: 'System-wide management and control',
      icon: <Shield className="w-8 h-8 text-red-600" />,
      color: 'from-red-500 to-red-600',
      features: ['System Overview', 'User Management', 'Analytics', 'Configuration']
    },
    {
      role: 'product-admin' as UserRole,
      title: 'Product Admin',
      description: 'Product features and marketplace oversight',
      icon: <Building className="w-8 h-8 text-purple-600" />,
      color: 'from-purple-500 to-purple-600',
      features: ['Feature Management', 'Marketplace', 'Integrations', 'Analytics']
    },
    {
      role: 'group-admin' as UserRole,
      title: 'Group Admin',
      description: 'Group creation and member management',
      icon: <Users className="w-8 h-8 text-blue-600" />,
      color: 'from-blue-500 to-blue-600',
      features: ['Group Management', 'Member Admin', 'Events', 'Communication']
    },
    {
      role: 'member' as UserRole,
      title: 'Member',
      description: 'Access group content and participate',
      icon: <User className="w-8 h-8 text-emerald-600" />,
      color: 'from-emerald-500 to-emerald-600',
      features: ['Group Feeds', 'Chat', 'Marketplace', 'Profile']
    },
    {
      role: 'vendor' as UserRole,
      title: 'Vendor',
      description: 'Service provider and marketplace seller',
      icon: <ShoppingCart className="w-8 h-8 text-orange-600" />,
      color: 'from-orange-500 to-orange-600',
      features: ['Service Management', 'Orders', 'Transactions', 'Reviews']
    },
    {
      role: 'developer' as UserRole,
      title: 'Developer',
      description: 'API access and platform integration',
      icon: <Settings className="w-8 h-8 text-gray-600" />,
      color: 'from-gray-500 to-gray-600',
      features: ['API Management', 'Documentation', 'Sandbox', 'Analytics']
    }
  ];

  const handleRoleSelection = (role: UserRole) => {
    startDemo(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Try Sure Groups Demo</h1>
          <p className="text-xl text-gray-600">
            Select a role to explore the platform capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((roleData) => (
            <div
              key={roleData.role}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleRoleSelection(roleData.role)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${roleData.color} rounded-xl flex items-center justify-center`}>
                  {roleData.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{roleData.title}</h3>
                  <p className="text-gray-600">{roleData.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h4 className="text-sm font-semibold text-gray-700">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {roleData.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                Enter {roleData.title} Demo
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Ready to get started?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};