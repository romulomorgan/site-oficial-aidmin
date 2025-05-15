
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminMobileMenu from './AdminMobileMenu';
import AdminMobileMenuButton from './AdminMobileMenuButton';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // Redirecionar para a página inicial após o logout
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar para desktop */}
      <AdminSidebar handleLogout={handleLogout} />

      {/* Botão de menu para mobile */}
      <AdminMobileMenuButton 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Menu mobile */}
      <AdminMobileMenu 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleLogout={handleLogout}
      />

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
