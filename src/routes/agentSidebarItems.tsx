import type { ISidebarItem } from "@/types";
import { LayoutDashboard, ArrowDownFromLine, ArrowUpFromLine, History, DollarSign, User } from "lucide-react";

export const agentSidebarItems: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard/agent",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    name: "Add Money to User",
    path: "/dashboard/agent/add-money",
    icon: <ArrowDownFromLine className="h-4 w-4" />,
  },
  {
    name: "Withdraw from User",
    path: "/dashboard/agent/withdraw-money",
    icon: <ArrowUpFromLine className="h-4 w-4" />,
  },
  {
    name: "Transactions",
    path: "/dashboard/agent/transactions",
    icon: <History className="h-4 w-4" />,
  },
  {
    name: "Commission History",
    path: "/dashboard/agent/commissions",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    name: "Profile",
    path: "/dashboard/agent/profile",
    icon: <User className="h-4 w-4" />,
  },
];
