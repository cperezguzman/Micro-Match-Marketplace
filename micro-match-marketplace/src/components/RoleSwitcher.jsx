// src/components/RoleSwitcher.jsx
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RoleSwitcher() {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleRoleSwitch = (role) => {
    switchRole(role);
  };

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-green-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            🌐 Role: {user.activeRole}
            <ChevronDownIcon className="w-5 h-5 ml-2 text-green-600" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {['Client', 'Contributor'].map((role) => (
                <Menu.Item key={role}>
                  {({ active }) => (
                    <button
                      onClick={() => handleRoleSwitch(role)}
                      className={`${
                        active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {role === user.activeRole ? '✔ ' : ''} {role}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigate('/settings')}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    ⚙ Settings
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'bg-red-100 text-red-600' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    🚪 Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
