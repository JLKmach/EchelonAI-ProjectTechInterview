import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  User, 
  Heart, 
  MessageCircle, 
  Video, 
  Shield, 
  LogOut,
  Home,
  Settings
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface SidebarProps {
  user: any;
  onLogout: () => void;
  totalUnread: number;
  currentPath: string;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Video Upload', href: '/video-upload', icon: Video },
  { name: 'Matches', href: '/matches', icon: Heart },
  { name: 'Chat', href: '/chat', icon: MessageCircle },
  { name: 'Verification', href: '/verification', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, totalUnread, currentPath }) => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="ml-2 text-xl font-semibold text-gray-900">VideoMatch</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          ${isActive
                            ? 'bg-purple-50 text-purple-600'
                            : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                        {item.name === 'Chat' && totalUnread > 0 && (
                          <span className="ml-auto inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            {totalUnread}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* User profile section */}
            <li className="mt-auto">
              <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-gray-900">
                {user?.profilePicture ? (
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.profilePicture}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">{user?.name || 'User'}</span>
              </div>
              
              {/* Logout button */}
              <button
                onClick={onLogout}
                className="group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-600" aria-hidden="true" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
