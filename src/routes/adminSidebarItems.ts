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
    name: "All Transactions",
    path: "/dashboard/admin/all-transactions",
  },
  {
    name: "Profile",
    path: "/dashboard/admin/profile",
  },
];
