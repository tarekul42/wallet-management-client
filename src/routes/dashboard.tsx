import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/pages/Dashboard/Admin/AdminDashboard";
import AgentDashboard from "@/pages/Dashboard/Agent/AgentDashboard";
import UserDashboard from "@/pages/Dashboard/User/UserDashboard";
import { role } from "@/constants/role";
import withAuth from "@/utils/withAuth";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    Component: withAuth(DashboardLayout),
    children: [
      {
        path: "user",
        Component: UserDashboard,
        meta: {
          role: role.user,
        },
      },
      {
        path: "agent",
        Component: AgentDashboard,
        meta: {
          role: role.agent,
        },
      },
      {
        path: "admin",
        Component: AdminDashboard,
        meta: {
          role: role.admin,
        },
      },
    ],
  },
];
