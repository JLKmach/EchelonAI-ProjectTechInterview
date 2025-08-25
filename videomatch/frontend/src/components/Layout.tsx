import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileMenu from './MobileMenu';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { unreadCounts } = useChatStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalUnread = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);

  // Si no hay usuario, mostrar un mensaje de carga
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu */}
      <MobileMenu
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        user={user}
        onLogout={handleLogout}
        totalUnread={totalUnread}
      />

      {/* Sidebar for desktop */}
      <Sidebar
        user={user}
        onLogout={handleLogout}
        totalUnread={totalUnread}
        currentPath={location.pathname}
      />

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Header */}
        <Header
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          totalUnread={totalUnread}
        />

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
