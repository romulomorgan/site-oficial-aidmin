
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/use-toast";
import AdminLayout from '@/components/admin/AdminLayout';
import Login from '@/pages/Admin/Login';
import NotFound from '@/pages/NotFound';
import { SidebarProvider } from '@/components/ui/sidebar';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Main Layout</div>,
      children: [
        { index: true, element: <div>Home Page</div> },
        { path: "about", element: <div>About Page</div> },
        { path: "contact", element: <div>Contact Page</div> },
        { path: "solutions", element: <div>Solutions Page</div> },
        { path: "embed", element: <div>Embed Page</div> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <SidebarProvider defaultOpen={true}>
          <AdminLayout />
        </SidebarProvider>
      ),
      children: [
        { index: true, element: <div>Dashboard Page</div> },
        { path: "login", element: <Login /> },
        { path: "site-settings", element: <div>Site Settings Page</div> },
        { path: "messages", element: <div>Messages Page</div> },
        { path: "templates", element: <div>Templates Page</div> },
        { path: "testimonials", element: <div>Testimonials Page</div> },
        { path: "faqs", element: <div>FAQs Page</div> },
      ],
    },
  ]);

  return (
    <SidebarProvider defaultOpen={true}>
      <RouterProvider router={router} />
      <Toaster />
    </SidebarProvider>
  );
}

export default App;
