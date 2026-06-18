import type { ISidebarItem } from "@/types";
import { LayoutDashboard, Users, UserCheck, Wallet, History, Settings, Shield, User } from "lucide-react";

export const adminSidebarItems: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    name: "Manage Users",
    path: "/dashboard/admin/manage-users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    name: "Manage Agents",
    path: "/dashboard/admin/manage-agents",
    icon: <UserCheck className="h-4 w-4" />,
  },
  {
    name: "Manage Wallets",
    path: "/dashboard/admin/manage-wallets",
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    name: "All Transactions",
    path: "/dashboard/admin/all-transactions",
    icon: <History className="h-4 w-4" />,
  },
  {
    name: "System Config",
    path: "/dashboard/admin/system-config",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    name: "Create Admin",
    path: "/dashboard/admin/create-admin",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    name: "Profile",
    path: "/dashboard/admin/profile",
    icon: <User className="h-4 w-4" />,
  },
];
