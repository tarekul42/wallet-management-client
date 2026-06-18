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
import withAuth from "@/utils/withAuth";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    Component: withAuth(DashboardLayout),
    children: [
      { path: "user", Component: UserDashboard },
      { path: "user/deposit", Component: DepositPage },
      { path: "user/withdraw", Component: WithdrawPage },
      { path: "user/send-money", Component: SendMoneyPage },
      { path: "user/transactions", Component: UserTransactionsPage },
      { path: "user/profile", Component: Profile },
      { path: "user/profile/security", Component: UpdatePasswordPage },
      { path: "agent", Component: AgentDashboard },
      { path: "agent/add-money", Component: AgentAddMoneyPage },
      { path: "agent/withdraw-money", Component: AgentWithdrawMoneyPage },
      { path: "agent/transactions", Component: AgentTransactionsPage },
      { path: "agent/commissions", Component: CommissionHistoryPage },
      { path: "agent/profile", Component: Profile },
      { path: "agent/profile/security", Component: UpdatePasswordPage },
      { path: "admin", Component: AdminDashboard },
      { path: "admin/manage-users", Component: ManageUsersPage },
      { path: "admin/manage-agents", Component: ManageAgentsPage },
      { path: "admin/manage-wallets", Component: ManageWalletsPage },
      { path: "admin/all-transactions", Component: AllTransactionsPage },
      { path: "admin/system-config", Component: SystemConfigPage },
      { path: "admin/create-admin", Component: CreateAdminPage },
      { path: "admin/profile", Component: Profile },
      { path: "admin/profile/security", Component: UpdatePasswordPage },
    ],
  },
];
