
import React from 'react';
import { Menu } from 'lucide-react';
import MenuItem, { MenuItemProps } from './MenuItem';

type MobileSidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  menuItems: Omit<MenuItemProps, 'isOpen' | 'isActive'>[];
  activePathCheck: (path: string) => boolean;
  handleLogout: () => void;
  LogoutIcon: React.ElementType;
};

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  setIsOpen,
  menuItems,
  activePathCheck,
  handleLogout,
  LogoutIcon
}) => {
  return (
    <>
      {/* Botão de menu para mobile */}
      <div className="md:hidden fixed top-0 left-0 z-30 m-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white rounded-md shadow-md"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="bg-white w-64 h-full overflow-auto">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-800">Admin</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100"
                aria-label="Fechar menu"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <nav className="px-2 py-4">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    {...item}
                    isActive={activePathCheck(item.path)}
                    isOpen={true}
                  />
                ))}
                <li className="border-t border-gray-200 mt-4 pt-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-red-500 w-full"
                  >
                    <LogoutIcon size={20} className="mr-3" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
