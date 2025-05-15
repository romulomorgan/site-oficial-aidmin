
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/hooks/use-toast";

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
        { path: "*", element: <div>Not Found Page</div> },
      ],
    },
    {
      path: "/admin",
      element: <div>Admin Layout</div>,
      children: [
        { index: true, element: <div>Dashboard Page</div> },
        { path: "login", element: <div>Login Page</div> },
        { path: "site-settings", element: <div>Site Settings Page</div> },
        { path: "messages", element: <div>Messages Page</div> },
        { path: "templates", element: <div>Templates Page</div> },
        { path: "testimonials", element: <div>Testimonials Page</div> },
        { path: "faqs", element: <div>FAQs Page</div> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
