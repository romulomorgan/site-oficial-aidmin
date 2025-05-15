
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { menuItems } from './AdminSidebar';

interface AdminMobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

const AdminMobileMenu: React.FC<AdminMobileMenuProps> = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  handleLogout 
}) => {
  const { pathname } = useLocation();

  if (!isMobileMenuOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="bg-white w-64 h-full overflow-auto">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Admin</h1>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Fechar menu"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path))
                      ? 'bg-primary-color bg-opacity-10 text-primary-color'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-200 mt-4 pt-4">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-red-500 w-full"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminMobileMenu;
