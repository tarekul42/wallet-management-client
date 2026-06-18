import type { ISidebarItem } from "@/types";
import { LayoutDashboard, ArrowDownFromLine, ArrowUpFromLine, SendHorizontal, History, User } from "lucide-react";

export const userSidebarItems: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard/user",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    name: "Deposit",
    path: "/dashboard/user/deposit",
    icon: <ArrowDownFromLine className="h-4 w-4" />,
  },
  {
    name: "Withdraw",
    path: "/dashboard/user/withdraw",
    icon: <ArrowUpFromLine className="h-4 w-4" />,
  },
  {
    name: "Send Money",
    path: "/dashboard/user/send-money",
    icon: <SendHorizontal className="h-4 w-4" />,
  },
  {
    name: "Transactions",
    path: "/dashboard/user/transactions",
    icon: <History className="h-4 w-4" />,
  },
  {
    name: "Profile",
    path: "/dashboard/user/profile",
    icon: <User className="h-4 w-4" />,
  },
];
