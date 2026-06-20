import App from "@/App";
import { lazyPage } from "@/utils/lazyLoad";
import { createBrowserRouter } from "react-router";
import { dashboardRoutes } from "./dashboard";

import RootLayout from "@/components/layout/RootLayout";

const About = lazyPage(() => import("@/pages/About"));
const Contact = lazyPage(() => import("@/pages/Contact/Contact"));
const FAQs = lazyPage(() => import("@/pages/FAQ/FAQs"));
const Features = lazyPage(() => import("@/pages/Features/Features"));
const Home = lazyPage(() => import("@/pages/Home/Home"));
const Login = lazyPage(() => import("@/pages/Login"));
const ForgotPassword = lazyPage(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazyPage(() => import("@/pages/ResetPassword"));
const AuthCallback = lazyPage(() => import("@/pages/AuthCallback"));
const NotFound = lazyPage(() => import("@/pages/NotFound"));
const Register = lazyPage(() => import("@/pages/Register"));
const Explore = lazyPage(() => import("@/pages/Explore"));
const ServiceDetails = lazyPage(() => import("@/pages/ServiceDetails"));
const CheckoutPage = lazyPage(() => import("@/pages/CheckoutPage"));
const Privacy = lazyPage(() => import("@/pages/Privacy"));
const Terms = lazyPage(() => import("@/pages/Terms"));
const Support = lazyPage(() => import("@/pages/Support"));

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
          { path: "checkout/:id", Component: CheckoutPage },
          { path: "privacy-policy", Component: Privacy },
          { path: "terms-of-service", Component: Terms },
          { path: "support", Component: Support },
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
