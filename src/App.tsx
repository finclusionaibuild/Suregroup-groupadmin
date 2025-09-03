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

const GroupAdminLanding = lazy(() => import('./components/user-types/GroupAdmin'));

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Group Admin only */}
      <Route
        path="/role/group-admin"
        element={
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <GroupAdminLanding />
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