import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User as UserType } from '../types';
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

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: UserType;
  onLogout: () => void;
  totalUnread: number;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Profile', href: '/app/profile', icon: User },
  { name: 'Video Upload', href: '/app/video-upload', icon: Video },
  { name: 'Matches', href: '/app/matches', icon: Heart },
  { name: 'Chat', href: '/app/chat', icon: MessageCircle },
  { name: 'Verification', href: '/app/verification', icon: Shield },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ open, setOpen, user, onLogout, totalUnread }) => {
  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <X className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
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
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              onClick={() => setOpen(false)}
                              className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-purple-600"
                                aria-hidden="true"
                              />
                              {item.name}
                              {item.name === 'Chat' && totalUnread > 0 && (
                                <span className="ml-auto inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                  {totalUnread}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
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
                        onClick={handleLogout}
                        className="group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-600" aria-hidden="true" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMenu;
