
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings,
  Users, 
  LogOut, 
  ChevronRight, 
  MessageCircleQuestion,
  Layers,
  FileText
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: 'Seções da Home',
    path: '/admin/secoes',
    icon: <Layers size={20} />,
  },
  {
    name: 'Seções de Páginas',
    path: '/admin/paginas',
    icon: <FileText size={20} />,
  },
  {
    name: 'Depoimentos',
    path: '/admin/depoimentos',
    icon: <Users size={20} />,
  },
  {
    name: 'Perguntas Frequentes',
    path: '/admin/faq',
    icon: <MessageCircleQuestion size={20} />,
  },
  {
    name: 'Mensagens',
    path: '/admin/mensagens',
    icon: <MessageSquare size={20} />,
  },
  {
    name: 'Configurações',
    path: '/admin/configuracoes',
    icon: <Settings size={20} />,
  },
];

interface AdminSidebarProps {
  handleLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ handleLogout }) => {
  const { pathname } = useLocation();
  const { open: isOpen, setOpen: toggle } = useSidebar();

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
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path))
                        ? 'bg-primary-color bg-opacity-10 text-primary-color hover:bg-opacity-20'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-500 w-full"
          >
            <LogOut size={20} className="mr-3" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
