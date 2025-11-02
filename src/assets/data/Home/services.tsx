import { CreditCard, SendHorizontal, Wallet } from "lucide-react";

export const services = [
  {
    icon: <Wallet className="w-12 h-12 text-primary" />,
    title: "Personal Wallet",
    description:
      "Manage your daily expenses, save money, and track spending with powerful analytics.",
    features: [
      "Expense tracking",
      "Savings goals",
      "Bill reminders",
      "Budget insights",
    ],
  },
  {
    icon: <SendHorizontal className="w-12 h-12 text-primary" />,
    title: "Money Transfer",
    description:
      "Send money to friends, family, or businesses instantly with just their phone number.",
    features: [
      "Instant transfers",
      "QR code payments",
      "Split bills",
      "Payment requests",
    ],
  },
  {
    icon: <CreditCard className="w-12 h-12 text-primary" />,
    title: "Agent Network",
    description:
      "Cash in and cash out through our extensive network of verified agents nationwide.",
    features: [
      "Nationwide coverage",
      "24/7 availability",
      "Verified agents",
      "Competitive rates",
    ],
  },
];
