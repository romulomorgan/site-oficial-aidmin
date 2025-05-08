
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarProvider 
} from '@/components/ui/sidebar';
import { PenTool, MessageSquare, FileText, Settings, Home } from 'lucide-react';

export default function AdminLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b">
            <Link to="/admin" className="flex items-center gap-2 px-4 py-3">
              <span className="text-[#ff196e] text-2xl font-semibold">IAdmin</span>
            </Link>
          </SidebarHeader>

          <SidebarContent className="flex flex-col py-3">
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => 
                `px-4 py-2 flex gap-3 items-center ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`
              }
            >
              <Settings className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/admin/editar-textos" 
              className={({ isActive }) => 
                `px-4 py-2 flex gap-3 items-center ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`
              }
            >
              <PenTool className="h-5 w-5" />
              <span>Editar Textos</span>
            </NavLink>
            
            <NavLink 
              to="/admin/depoimentos" 
              className={({ isActive }) => 
                `px-4 py-2 flex gap-3 items-center ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`
              }
            >
              <FileText className="h-5 w-5" />
              <span>Depoimentos</span>
            </NavLink>
            
            <NavLink 
              to="/admin/faq" 
              className={({ isActive }) => 
                `px-4 py-2 flex gap-3 items-center ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`
              }
            >
              <Settings className="h-5 w-5" />
              <span>FAQ</span>
            </NavLink>
            
            <NavLink 
              to="/admin/mensagens" 
              className={({ isActive }) => 
                `px-4 py-2 flex gap-3 items-center ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`
              }
            >
              <MessageSquare className="h-5 w-5" />
              <span>Mensagens</span>
            </NavLink>
          </SidebarContent>

          <SidebarFooter className="border-t p-4 mt-auto">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center gap-2 text-sidebar-foreground hover:text-[#ff196e] transition-colors">
                <Home size={16} />
                <span>Ir para o Site</span>
              </Link>
              
              <Link to="/admin/login" className="text-sidebar-foreground hover:text-[#ff196e] transition-colors">
                Sair
              </Link>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-8 bg-[#F8F9FA] overflow-auto">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
