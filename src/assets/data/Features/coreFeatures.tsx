import {
  Activity,
  BellRing,
  Cpu,
  CreditCard,
  DollarSign,
  Gauge,
  History,
  LineChart,
  Lock,
  Rocket,
  ScanLine,
  SendHorizontal,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
  Users,
  Wallet,
} from "lucide-react";

export const coreFeatures = [
  // General (public)
  {
    id: "secure-auth",
    title: "Secure Auth (JWT + bcrypt)",
    description:
      "Login, registration with role selection, and persisted sessions for seamless returning users.",
    icon: <ShieldCheck className="size-5" />,
    tags: ["Auth", "JWT", "Security"],
    role: "general",
    isKey: true,
  },
  {
    id: "responsive-ui",
    title: "Responsive, Polished UI",
    description:
      "Tailwind-powered layouts, skeleton loaders, and smooth page transitions across devices.",
    icon: <Smartphone className="size-5" />,
    tags: ["UX", "Responsive"],
    role: "general",
  },
  {
    id: "api-state",
    title: "RTK Query API State",
    description:
      "Robust caching, loading/error states, and optimistic updates for snappy interactions.",
    icon: <Cpu className="size-5" />,
    tags: ["RTK Query", "Performance"],
    role: "general",
  },
  {
    id: "toast-notifications",
    title: "Toast Notifications",
    description:
      "Immediate feedback on success and failures using a lightweight toast system.",
    icon: <BellRing className="size-5" />,
    tags: ["Feedback"],
    role: "general",
  },
  {
    id: "guided-tour",
    title: "Guided Product Tour",
    description:
      "A 5+ step walkthrough highlights nav, stats cards, charts, filters, and theme toggle.",
    icon: <Rocket className="size-5" />,
    tags: ["Onboarding", "Joyride"],
    role: "general",
  },

  // User
  {
    id: "user-balance",
    title: "Wallet Overview",
    description:
      "See balance, quick actions, and recent transactions at a glance.",
    icon: <Wallet className="size-5" />,
    tags: ["Dashboard", "Cards"],
    role: "user",
    isKey: true,
  },
  {
    id: "user-deposit",
    title: "Deposit (Cash-in via Agent)",
    description:
      "Add money to your wallet through approved agents with instant confirmation.",
    icon: <DollarSign className="size-5" />,
    tags: ["Deposit", "Agent"],
    role: "user",
  },
  {
    id: "user-withdraw",
    title: "Withdraw",
    description:
      "Pull cash from your wallet to cash-out points with secure PIN confirmation.",
    icon: <ScanLine className="size-5" />,
    tags: ["Withdraw"],
    role: "user",
  },
  {
    id: "user-send-money",
    title: "Send Money",
    description:
      "Transfer to any user by phone/email with memo, fees preview, and receipts.",
    icon: <SendHorizontal className="size-5" />,
    tags: ["P2P", "Transfer"],
    role: "user",
  },
  {
    id: "user-history",
    title: "Transaction History",
    description: "Paginated & filterable by type/date with export-ready table.",
    icon: <History className="size-5" />,
    tags: ["Tables", "Filters", "Pagination"],
    role: "user",
  },

  // Agent
  {
    id: "agent-overview",
    title: "Agent Overview",
    description: "Track cash-in/out summaries and recent handled activity.",
    icon: <Gauge className="size-5" />,
    tags: ["Dashboard"],
    role: "agent",
    isKey: true,
  },
  {
    id: "agent-cashin",
    title: "Add Money to Users",
    description:
      "Top-up user wallets with validation, receipts, and commissions.",
    icon: <CreditCard className="size-5" />,
    tags: ["Top-up", "Commission"],
    role: "agent",
  },
  {
    id: "agent-withdraw",
    title: "Process Withdrawals",
    description:
      "Securely cash-out user funds with confirmation and audit trail.",
    icon: <Lock className="size-5" />,
    tags: ["Cash-out", "Security"],
    role: "agent",
  },
  {
    id: "agent-transactions",
    title: "Agent Transactions",
    description:
      "View every transaction you've processed with advanced filters.",
    icon: <Activity className="size-5" />,
    tags: ["Filters", "Tables"],
    role: "agent",
  },

  // Admin
  {
    id: "admin-overview",
    title: "Admin Overview",
    description:
      "Totals across users, agents, transactions, and volume with visual insights.",
    icon: <LineChart className="size-5" />,
    tags: ["Analytics", "Charts"],
    role: "admin",
    isKey: true,
  },
  {
    id: "admin-manage-users",
    title: "Manage Users",
    description:
      "View, block/unblock accounts; search and paginate large lists.",
    icon: <Users className="size-5" />,
    tags: ["Admin", "Moderation"],
    role: "admin",
  },
  {
    id: "admin-manage-agents",
    title: "Manage Agents",
    description: "Approve new agents, suspend violators, and audit activity.",
    icon: <UserRoundCheck className="size-5" />,
    tags: ["KYC", "Compliance"],
    role: "admin",
  },
  {
    id: "admin-fees-limits",
    title: "Adjust Fees & Limits",
    description:
      "Fine-tune system fees and transaction limits (with safeguards).",
    icon: <Gauge className="size-5" />,
    tags: ["Config", "Policy"],
    role: "admin",
  },
];
