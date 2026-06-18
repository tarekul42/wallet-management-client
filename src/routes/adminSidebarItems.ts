import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
  },
  {
    name: "Manage Users",
    path: "/dashboard/admin/manage-users",
  },
  {
    name: "Manage Agents",
    path: "/dashboard/admin/manage-agents",
  },
  {
    name: "Manage Wallets",
    path: "/dashboard/admin/manage-wallets",
  },
  {
    name: "All Transactions",
    path: "/dashboard/admin/all-transactions",
  },
  {
    name: "System Config",
    path: "/dashboard/admin/system-config",
  },
  {
    name: "Create Admin",
    path: "/dashboard/admin/create-admin",
  },
  {
    name: "Profile",
    path: "/dashboard/admin/profile",
  },
];
