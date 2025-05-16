
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import DesktopSidebar from './layout/DesktopSidebar';
import MobileSidebar from './layout/MobileSidebar';
import { getMenuItems } from './layout/menuConfig';

const AdminLayout: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open: isOpen, setOpen: toggle } = useSidebar();
  
  const menuItems = getMenuItems();

  // Função auxiliar para verificar se um caminho está ativo
  const isActive = (path: string) => {
    return pathname === path || (path !== '/admin' && pathname.startsWith(path));
  };

  const handleLogout = () => {
    // Redirecionar para a página inicial após o logout
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar para desktop */}
      <DesktopSidebar
        isOpen={isOpen}
        toggle={toggle}
        menuItems={menuItems}
        activePathCheck={isActive}
        handleLogout={handleLogout}
        LogoutIcon={LogOut}
      />

      {/* Sidebar para mobile */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        menuItems={menuItems}
        activePathCheck={isActive}
        handleLogout={handleLogout}
        LogoutIcon={LogOut}
      />

      {/* Conteúdo principal com largura padronizada */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="py-6 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
