
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
import HomePageSections from '@/pages/Admin/HomePageSections';
import EmbedComponent from '@/components/EmbedComponent';
import Footer from '@/components/Footer';
import AnimationsLoader from '@/utils/animationsLoader';

function App() {
  // Use the custom favicon hook
  useFavicon();
  
  return (
    <Router>
      <AnimationsLoader />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
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
              <Route path="secoes" element={<HomePageSections />} />
              <Route path="depoimentos" element={<Testimonials />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="mensagens" element={<Messages />} />
              <Route path="configuracoes" element={<SiteSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        
        {/* Rodapé padrão para todas as páginas, exceto para páginas administrativas */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="/admin/login" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
      <Toaster position="bottom-right" />
      <EmbedComponent />
    </Router>
  );
}

export default App;
