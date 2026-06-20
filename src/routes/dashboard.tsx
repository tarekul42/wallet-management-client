import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardIndex from "@/components/modules/Dashboard/DashboardIndex";
import { lazyPage } from "@/utils/lazyLoad";
import withAuth from "@/utils/withAuth";

const AdminDashboard = lazyPage(() => import("@/pages/Dashboard/Admin/AdminDashboard"));
const AgentDashboard = lazyPage(() => import("@/pages/Dashboard/Agent/AgentDashboard"));
const UserDashboard = lazyPage(() => import("@/pages/Dashboard/User/UserDashboard"));
const Profile = lazyPage(() => import("@/pages/Dashboard/Profile"));
const DepositPage = lazyPage(() => import("@/pages/Dashboard/User/DepositPage"));
const WithdrawPage = lazyPage(() => import("@/pages/Dashboard/User/WithdrawPage"));
const SendMoneyPage = lazyPage(() => import("@/pages/Dashboard/User/SendMoneyPage"));
const UserTransactionsPage = lazyPage(() => import("@/pages/Dashboard/User/TransactionsPage"));
const UpdatePasswordPage = lazyPage(() => import("@/pages/Dashboard/User/UpdatePasswordPage"));
const AgentAddMoneyPage = lazyPage(() => import("@/pages/Dashboard/Agent/AddMoneyPage"));
const AgentWithdrawMoneyPage = lazyPage(() => import("@/pages/Dashboard/Agent/WithdrawMoneyPage"));
const AgentTransactionsPage = lazyPage(() => import("@/pages/Dashboard/Agent/TransactionsPage"));
const CommissionHistoryPage = lazyPage(() => import("@/pages/Dashboard/Agent/CommissionHistoryPage"));
const ManageUsersPage = lazyPage(() => import("@/pages/Dashboard/Admin/ManageUsersPage"));
const ManageAgentsPage = lazyPage(() => import("@/pages/Dashboard/Admin/ManageAgentsPage"));
const ManageWalletsPage = lazyPage(() => import("@/pages/Dashboard/Admin/ManageWalletsPage"));
const AllTransactionsPage = lazyPage(() => import("@/pages/Dashboard/Admin/AllTransactionsPage"));
const SystemConfigPage = lazyPage(() => import("@/pages/Dashboard/Admin/SystemConfigPage"));
const CreateAdminPage = lazyPage(() => import("@/pages/Dashboard/Admin/CreateAdminPage"));

export const dashboardRoutes = [
  {
    path: "/dashboard",
    Component: withAuth(DashboardLayout),
    children: [
      { index: true, Component: DashboardIndex },
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
