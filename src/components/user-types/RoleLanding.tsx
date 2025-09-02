import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface RoleLandingProps {
  title: string;
  description: string;
  accentColorClass: string;
  signupRole: string;
}

const RoleLanding: React.FC<RoleLandingProps> = ({ title, description, accentColorClass, signupRole }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="grid gap-4">
          <button
            onClick={() => navigate(`/login?role=${signupRole}`)}
            className={`w-full ${accentColorClass} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity`}
          >
            Sign in as {title}
          </button>
          <Link
            to={`/signup?role=${signupRole}`}
            className="w-full text-center bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Create {title} account
          </Link>
          <Link
            to="/"
            className="w-full text-center text-blue-600 hover:text-blue-700 text-sm"
          >
            ← Back to main landing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleLanding;


