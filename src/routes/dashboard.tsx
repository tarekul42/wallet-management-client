import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/pages/Dashboard/Admin/AdminDashboard";
import AgentDashboard from "@/pages/Dashboard/Agent/AgentDashboard";
import UserDashboard from "@/pages/Dashboard/User/UserDashboard";
import Profile from "@/pages/Dashboard/Profile";
import DepositPage from "@/pages/Dashboard/User/DepositPage";
import WithdrawPage from "@/pages/Dashboard/User/WithdrawPage";
import SendMoneyPage from "@/pages/Dashboard/User/SendMoneyPage";
import UserTransactionsPage from "@/pages/Dashboard/User/TransactionsPage";
import UpdatePasswordPage from "@/pages/Dashboard/User/UpdatePasswordPage";
import AgentAddMoneyPage from "@/pages/Dashboard/Agent/AddMoneyPage";
import AgentWithdrawMoneyPage from "@/pages/Dashboard/Agent/WithdrawMoneyPage";
import AgentTransactionsPage from "@/pages/Dashboard/Agent/TransactionsPage";
import CommissionHistoryPage from "@/pages/Dashboard/Agent/CommissionHistoryPage";
import ManageUsersPage from "@/pages/Dashboard/Admin/ManageUsersPage";
import ManageAgentsPage from "@/pages/Dashboard/Admin/ManageAgentsPage";
import ManageWalletsPage from "@/pages/Dashboard/Admin/ManageWalletsPage";
import AllTransactionsPage from "@/pages/Dashboard/Admin/AllTransactionsPage";
import SystemConfigPage from "@/pages/Dashboard/Admin/SystemConfigPage";
import CreateAdminPage from "@/pages/Dashboard/Admin/CreateAdminPage";
import { role } from "@/constants/role";
import withAuth from "@/utils/withAuth";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    Component: withAuth(DashboardLayout),
    children: [
      { path: "user", Component: UserDashboard, meta: { role: role.user } },
      { path: "user/deposit", Component: DepositPage, meta: { role: role.user } },
      { path: "user/withdraw", Component: WithdrawPage, meta: { role: role.user } },
      { path: "user/send-money", Component: SendMoneyPage, meta: { role: role.user } },
      { path: "user/transactions", Component: UserTransactionsPage, meta: { role: role.user } },
      { path: "user/profile", Component: Profile, meta: { role: role.user } },
      { path: "user/profile/security", Component: UpdatePasswordPage, meta: { role: role.user } },
      { path: "agent", Component: AgentDashboard, meta: { role: role.agent } },
      { path: "agent/add-money", Component: AgentAddMoneyPage, meta: { role: role.agent } },
      { path: "agent/withdraw-money", Component: AgentWithdrawMoneyPage, meta: { role: role.agent } },
      { path: "agent/transactions", Component: AgentTransactionsPage, meta: { role: role.agent } },
      { path: "agent/commissions", Component: CommissionHistoryPage, meta: { role: role.agent } },
      { path: "agent/profile", Component: Profile, meta: { role: role.agent } },
      { path: "agent/profile/security", Component: UpdatePasswordPage, meta: { role: role.agent } },
      { path: "admin", Component: AdminDashboard, meta: { role: role.admin } },
      { path: "admin/manage-users", Component: ManageUsersPage, meta: { role: role.admin } },
      { path: "admin/manage-agents", Component: ManageAgentsPage, meta: { role: role.admin } },
      { path: "admin/manage-wallets", Component: ManageWalletsPage, meta: { role: role.admin } },
      { path: "admin/all-transactions", Component: AllTransactionsPage, meta: { role: role.admin } },
      { path: "admin/system-config", Component: SystemConfigPage, meta: { role: role.admin } },
      { path: "admin/create-admin", Component: CreateAdminPage, meta: { role: role.admin } },
      { path: "admin/profile", Component: Profile, meta: { role: role.admin } },
      { path: "admin/profile/security", Component: UpdatePasswordPage, meta: { role: role.admin } },
    ],
  },
];
