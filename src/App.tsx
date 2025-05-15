import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import i18n from './i18n'; // Importe a configuração do i18next
import { routes } from './routes';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Solutions from '@/pages/Solutions';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Admin/Login';
import Dashboard from '@/pages/Admin/Dashboard';
import SiteSettings from '@/pages/Admin/SiteSettings';
import Messages from '@/pages/Admin/Messages';
import Templates from '@/pages/Admin/Templates';
import Testimonials from '@/pages/Admin/Testimonials';
import Faqs from '@/pages/Admin/Faqs';
import Embed from '@/pages/Embed';

// Atualize a importação do Toaster
import { Toaster } from "@/hooks/use-toast";

function App() {
  useEffect(() => {
    // Defina o idioma inicial com base no i18n
    document.documentElement.lang = i18n.language;
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "solutions", element: <Solutions /> },
        { path: "embed", element: <Embed /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "login", element: <Login /> },
        { path: "site-settings", element: <SiteSettings /> },
        { path: "messages", element: <Messages /> },
        { path: "templates", element: <Templates /> },
        { path: "testimonials", element: <Testimonials /> },
        { path: "faqs", element: <Faqs /> },
      ],
    },
  ]);

  // Na função App onde o Toaster é renderizado:
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
