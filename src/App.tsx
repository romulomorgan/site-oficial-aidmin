
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { useFavicon } from '@/utils/updateFavicon';
import { SidebarProvider } from '@/components/ui/sidebar';
import Index from '@/pages/Index';
import Solucoes from '@/pages/Solucoes';
import Contato from '@/pages/Contato';
import NotFound from '@/pages/NotFound';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/pages/Admin/Dashboard';
import EditTexts from '@/pages/Admin/EditTexts';
import Testimonials from '@/pages/Admin/Testimonials';
import FAQ from '@/pages/Admin/FAQ';
import Messages from '@/pages/Admin/Messages';
import Login from '@/pages/Admin/Login';
import SiteSettings from '@/pages/Admin/SiteSettings';

function App() {
  // Use the custom favicon hook
  useFavicon();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <SidebarProvider defaultOpen={true}>
            <AdminLayout />
          </SidebarProvider>
        }>
          <Route index element={<Dashboard />} />
          <Route path="editar-textos" element={<EditTexts />} />
          <Route path="depoimentos" element={<Testimonials />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="mensagens" element={<Messages />} />
          <Route path="configuracoes" element={<SiteSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
