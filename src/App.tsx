import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/pages/LandingPage';
import { SignUpForm } from './components/auth/SignUpForm';
import { LoginForm } from './components/auth/LoginForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { EmailVerificationPage } from './components/auth/EmailVerificationPage';
import { DemoRoleSelection } from './components/auth/DemoRoleSelection';
import { DashboardRouter } from './components/common/DashboardRouter';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Suspense, lazy } from 'react';

const SuperAdminLanding = lazy(() => import('./components/user-types/SuperAdmin'));
const ProductAdminLanding = lazy(() => import('./components/user-types/ProductAdmin'));
const GroupAdminLanding = lazy(() => import('./components/user-types/GroupAdmin'));
const MemberLanding = lazy(() => import('./components/user-types/Member'));
const VendorLanding = lazy(() => import('./components/user-types/Vendor'));
const DeveloperLanding = lazy(() => import('./components/user-types/Developer'));

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/role/super-admin"
        element={
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <SuperAdminLanding />
          </Suspense>
        }
      />
      <Route
        path="/role/product-admin"
        element={
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <ProductAdminLanding />
          </Suspense>
        }
      />
      <Route
        path="/role/group-admin"
        element={
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <GroupAdminLanding />
          </Suspense>
        }
      />
      <Route
        path="/role/member"
        element={
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <MemberLanding />
          </Suspense>
        }
      />
      <Route
        path="/role/vendor"
        element={
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <VendorLanding />
          </Suspense>
        }
      />
      <Route
        path="/role/developer"
        element={
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <DeveloperLanding />
          </Suspense>
        }
      />
      <Route 
        path="/signup" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUpForm />
        } 
      />
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          <ProtectedRoute>
            <EmailVerificationPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/verify-email" 
        element={
          <ProtectedRoute>
            <EmailVerificationPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/demo" 
        element={
          <DemoRoleSelection />
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;