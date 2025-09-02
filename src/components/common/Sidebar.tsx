import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SidebarGroup } from '../../types';
import { Link } from 'react-router-dom';

interface SidebarProps {
  groups: SidebarGroup[];
  logo?: React.ReactNode;
  onFeatureSelect?: (featureId: string) => void;
  activeFeature?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ groups, logo, onFeatureSelect, activeFeature }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isDemoMode } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleItemClick = (itemId: string) => {
    if (itemId === 'dashboard') {
      // Handle dashboard navigation if needed
      return;
    }
    if (onFeatureSelect) {
      onFeatureSelect(itemId);
    }
    setIsOpen(false); // Close mobile sidebar
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-gray-200"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:block w-72
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo section */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {logo || (
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SG</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Sure Groups</span>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info */}
          {isDemoMode && (
            <div className="px-6 py-3 bg-amber-50 border-b border-amber-200">
              <p className="text-sm font-medium text-amber-800">Demo Mode</p>
              <p className="text-xs text-amber-600 capitalize">{user?.role?.replace('-', ' ')} Dashboard</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {groups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center space-x-3 px-6 py-2 text-sm transition-colors
                        ${item.active || activeFeature === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                // Handle logout - redirect to home
                localStorage.removeItem('sure-groups-user');
                localStorage.removeItem('sure-groups-demo');
                window.location.href = '/';
              }}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};