import React from 'react';
import { User as UserIcon, Bell, Menu } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
  totalUnread: number;
}

const Header: React.FC<HeaderProps> = ({ user, onMenuClick, totalUnread }) => {

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden -m-2.5 p-2.5 text-gray-700"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Logo/Brand - hidden on mobile */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">VideoMatch</span>
          </div>
        </div>

        {/* Right side - notifications and user menu */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            {totalUnread > 0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            )}
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-3 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              {user?.profilePicture ? (
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user.profilePicture}
                  alt={user.name}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
              )}
              <span className="hidden md:block text-gray-700 font-medium">
                {user?.name || 'User'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
