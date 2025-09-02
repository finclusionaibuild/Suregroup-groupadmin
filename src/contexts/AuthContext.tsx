import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, UserRole } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (fullName: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  startDemo: (role: UserRole) => void;
  setUser: (user: User | null) => void;
  resetPassword: (token: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isDemoMode: false,
  });

  useEffect(() => {
    // Check for stored authentication on mount
    const storedUser = localStorage.getItem('sure-groups-user');
    const storedDemo = localStorage.getItem('sure-groups-demo');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        isDemoMode: false,
      });
    } else if (storedDemo) {
      const demoUser = JSON.parse(storedDemo);
      setAuthState({
        user: demoUser,
        isAuthenticated: true,
        isLoading: false,
        isDemoMode: true,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine role based on email for demo purposes
      let role: UserRole = 'member';
      if (email.includes('product-admin')) role = 'product-admin';
      else if (email.includes('group-admin')) role = 'group-admin';
      else if (email.includes('super-admin')) role = 'super-admin';
      else if (email.includes('vendor')) role = 'vendor';
      else if (email.includes('developer')) role = 'developer';

      const mockUser: User = {
        id: Date.now().toString(),
        fullName: 'John Doe',
        email,
        role,
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('sure-groups-user', JSON.stringify(mockUser));
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        isDemoMode: false,
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const signup = async (fullName: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        fullName,
        email,
        role,
        isEmailVerified: false,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('sure-groups-user', JSON.stringify(mockUser));
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        isDemoMode: false,
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('sure-groups-user');
    localStorage.removeItem('sure-groups-demo');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isDemoMode: false,
    });
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      return false;
    }
  };

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      return false;
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (authState.user) {
        const updatedUser = { ...authState.user, isEmailVerified: true };
        localStorage.setItem('sure-groups-user', JSON.stringify(updatedUser));
        setAuthState(prev => ({ ...prev, user: updatedUser }));
      }
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const startDemo = (role: UserRole) => {
    const demoUser: User = {
      id: 'demo-' + role,
      fullName: 'Demo User',
      email: `demo-${role}@suregroups.com`,
      role,
      isEmailVerified: true,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('sure-groups-demo', JSON.stringify(demoUser));
    setAuthState({
      user: demoUser,
      isAuthenticated: true,
      isLoading: false,
      isDemoMode: true,
    });
  };

  const setUser = (user: User | null) => {
    setAuthState(prev => ({ ...prev, user }));
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    forgotPassword,
    verifyEmail,
    resetPassword,
    startDemo,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};