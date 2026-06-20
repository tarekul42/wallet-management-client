export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface IWallet {
  _id: string;
  owner: string;
  balance: number;
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
  updatedAt: string;
}

export interface ITransaction {
  _id: string;
  walletId: string;
  sender?: string;
  receiver?: string;
  amount: number;
  fee: number;
  commission?: number;
  type: "SEND_MONEY" | "WITHDRAW" | "CASH_IN" | "CASH_OUT" | "COMMISSION" | "SERVICE_PURCHASE";
  status: "PENDING" | "SUCCESSFUL" | "FAILED" | "REVERSED";
  referenceId: string;
  description?: string;
  createdAt: string;
}

export interface IAgentSummary {
  currentBalance: number;
  totalCommission: number;
  activeCustomers: number;
  successRate: number;
}

export interface IAdminSummary {
  totalUsers: number;
  activeAgents: number;
  totalVolume: number;
  pendingReports: number;
  newUsersThisWeek: number;
  userDistribution: {
    users: number;
    agents: number;
    admins: number;
  };
}

export interface IUserProfile extends Omit<import("./user").IUser, "role" | "status"> {
  role: string;
  isActive: string;
  isVerified: boolean;
  approvalStatus?: string;
  commissionRate?: number;
  wallet?: string;
}

export interface ISystemConfig {
  _id: string;
  sendMoneyFee: number;
  cashInFee: number;
  withdrawFee: number;
  dailyLimit: number;
}
