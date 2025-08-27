import { Briefcase, Wallet } from "lucide-react";

export const roleOptions = [
  {
    value: "user",
    title: "Personal User",
    description: "Send money, pay bills, and manage finances",
    icon: <Wallet className="w-8 h-8 text-blue-600" />,
    features: [
      "Send & receive money",
      "Pay bills",
      "Transaction history",
      "Mobile top-up",
    ],
    popular: true,
  },
  {
    value: "agent",
    title: "Business Agent",
    description: "Provide cash-in/out services and earn commissions",
    icon: <Briefcase className="w-8 h-8 text-green-600" />,
    features: [
      "Cash-in/out services",
      "Earn commissions",
      "Business dashboard",
      "Customer management",
    ],
    popular: false,
  },
];
