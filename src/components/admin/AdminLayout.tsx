
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Home, Settings, LogOut, FileText, MessageSquare } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div 
        className={`bg-white fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:w-64 shadow-md`}
      >
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#2D0A16] to-[#FF196E] text-white">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/5b8e380689abbb696f1a70d356bb34fb2c6e00d8?placeholderIfAbsent=true"
              alt="IAdmin Logo"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-xl font-semibold">IAdmin</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-5 px-4">
          <Link 
            to="/admin/dashboard" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors mb-1 ${
              isActiveRoute('/admin/dashboard') 
                ? 'bg-[#FF196E] text-white' 
                : 'text-gray-700 hover:bg-[#FF196E] hover:text-white'
            }`}
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <Link 
            to="/admin/editar-textos" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors mb-1 ${
              isActiveRoute('/admin/editar-textos') 
                ? 'bg-[#FF196E] text-white' 
                : 'text-gray-700 hover:bg-[#FF196E] hover:text-white'
            }`}
          >
            <Settings className="mr-3 h-5 w-5" />
            Editar Textos
          </Link>
          
          <Link 
            to="/admin/depoimentos" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors mb-1 ${
              isActiveRoute('/admin/depoimentos') 
                ? 'bg-[#FF196E] text-white' 
                : 'text-gray-700 hover:bg-[#FF196E] hover:text-white'
            }`}
          >
            <FileText className="mr-3 h-5 w-5" />
            Depoimentos
          </Link>
          
          <Link 
            to="/admin/faq" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors mb-1 ${
              isActiveRoute('/admin/faq') 
                ? 'bg-[#FF196E] text-white' 
                : 'text-gray-700 hover:bg-[#FF196E] hover:text-white'
            }`}
          >
            <Settings className="mr-3 h-5 w-5" />
            Perguntas FAQ
          </Link>
          
          <Link 
            to="/admin/mensagens" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors mb-1 ${
              isActiveRoute('/admin/mensagens') 
                ? 'bg-[#FF196E] text-white' 
                : 'text-gray-700 hover:bg-[#FF196E] hover:text-white'
            }`}
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            Mensagens
          </Link>

          <div className="mt-8 border-t pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-500 rounded-md transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sair
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu size={24} />
            </button>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Administrador</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
