
import React from 'react';
import { ChevronRight } from 'lucide-react';
import MenuItem, { MenuItemProps } from './MenuItem';

type DesktopSidebarProps = {
  isOpen: boolean;
  toggle: (value: boolean) => void;
  menuItems: Omit<MenuItemProps, 'isOpen' | 'isActive'>[];
  activePathCheck: (path: string) => boolean;
  handleLogout: () => void;
  LogoutIcon: React.ElementType;
};

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isOpen,
  toggle,
  menuItems,
  activePathCheck,
  handleLogout,
  LogoutIcon
}) => {
  return (
    <div 
      className={`bg-white border-r border-gray-200 hidden md:block transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {isOpen ? (
            <h1 className="text-xl font-semibold text-gray-800">Admin</h1>
          ) : (
            <span className="text-xl font-semibold mx-auto">A</span>
          )}
          <button 
            onClick={() => toggle(!isOpen)}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <ChevronRight
              size={20}
              className={`text-gray-500 transition-transform duration-300 ${
                !isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          <nav className="px-2 py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <MenuItem 
                  key={item.path} 
                  {...item} 
                  isActive={activePathCheck(item.path)} 
                  isOpen={isOpen} 
                />
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-500 w-full"
          >
            <LogoutIcon size={20} className="mr-3" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
