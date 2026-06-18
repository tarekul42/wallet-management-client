import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact/Contact";
import FAQs from "@/pages/FAQ/FAQs";
import Features from "@/pages/Features/Features";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AuthCallback from "@/pages/AuthCallback";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import Explore from "@/pages/Explore";
import ServiceDetails from "@/pages/ServiceDetails";
import { createBrowserRouter } from "react-router";
import { dashboardRoutes } from "./dashboard";

import RootLayout from "@/components/layout/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: App,
        children: [
          { index: true, Component: Home },
          { path: "about", Component: About },
          { path: "features", Component: Features },
          { path: "contact", Component: Contact },
          { path: "faqs", Component: FAQs },
          { path: "explore", Component: Explore },
          { path: "explore/:id", Component: ServiceDetails },
        ],
      },
      ...dashboardRoutes,
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "/forgot-password", Component: ForgotPassword },
      { path: "/reset-password", Component: ResetPassword },
      { path: "/auth/callback", Component: AuthCallback },
      { path: "*", Component: NotFound },
    ],
  },
]);
