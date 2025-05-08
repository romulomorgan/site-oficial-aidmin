
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contato from "./pages/Contato";
import Solucoes from "./pages/Solucoes";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/Admin/Login";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import EditTexts from "./pages/Admin/EditTexts";
import Testimonials from "./pages/Admin/Testimonials";
import FAQ from "./pages/Admin/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/solucoes" element={<Solucoes />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="editar-textos" element={<EditTexts />} />
            <Route path="depoimentos" element={<Testimonials />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
