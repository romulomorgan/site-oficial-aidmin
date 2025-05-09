
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileEdit, 
  MessageSquare, 
  Settings,
  Users, 
  LogOut, 
  ChevronRight, 
  Menu,
  LayoutTemplate,
  MessageCircleQuestion,
  Layers
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const AdminLayout: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open: isOpen, setOpen: toggle } = useSidebar();
  
  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Editar Textos',
      path: '/admin/editar-textos',
      icon: <FileEdit size={20} />,
    },
    {
      name: 'Seções da Página',
      path: '/admin/secoes',
      icon: <Layers size={20} />,
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

  const handleLogout = () => {
    // Implementar lógica de logout se necessário
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar para desktop */}
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
                        pathname === item.path
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

      {/* Botão de menu para mobile */}
      <div className="md:hidden fixed top-0 left-0 z-30 m-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-md shadow-md"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
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
                        pathname === item.path
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
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="py-6 px-4 sm:px-6 lg:px-8 min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
