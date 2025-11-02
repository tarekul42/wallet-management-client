import { Monitor, Send, Receipt, Smartphone } from "lucide-react";

export const visualShowcase = [
  {
    title: "Dashboard Overview",
    description:
      "Get a clear view of your balance, stats, and recent activity.",
    icon: <Monitor className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Send Money",
    description: "Easily transfer funds to friends, family, or businesses.",
    icon: <Send className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Transaction History",
    description: "Keep track of every deposit, withdrawal, and transfer.",
    icon: <Receipt className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Mobile Friendly",
    description:
      "Access your wallet anytime, anywhere with full mobile support.",
    icon: <Smartphone className="w-8 h-8 text-pink-500" />,
  },
];
