import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, IAdminSummary, IUserProfile, ITransaction, IWallet, ISystemConfig } from "@/types/api";

type QueryParams = Record<string, unknown>;

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatistics: builder.query<ApiResponse<IAdminSummary>, void>({
      query: () => ({ url: "/admin/summary" }),
    }),
    getUsers: builder.query<ApiResponse<IUserProfile[]>, QueryParams>({
      query: (params) => ({
        url: "/users",
        params,
      }),
    }),
    manageUser: builder.mutation<ApiResponse<unknown>, { userId: string; action: "block" | "unblock" }>({
      query: ({ userId, action }) => ({
        url: `/users/${userId}/${action}`,
        method: "PATCH",
      }),
    }),
    getAgents: builder.query<ApiResponse<IUserProfile[]>, QueryParams>({
      query: (params) => ({
        url: "/users",
        params: { ...params, role: "AGENT" },
      }),
    }),
    manageAgent: builder.mutation<ApiResponse<unknown>, { agentId: string; action: string; data?: Record<string, unknown> }>({
      query: ({ agentId, action, data }) => ({
        url: `/users/${agentId}/${action}`,
        method: "PATCH",
        data: action === "approval" ? { approvalStatus: data?.approvalStatus, commissionRate: data?.commissionRate } : { status: data?.status },
      }),
    }),
    getAllTransactions: builder.query<ApiResponse<ITransaction[]>, QueryParams>({
      query: (params) => ({
        url: "/transactions/history",
        params,
      }),
    }),
    createAdmin: builder.mutation<ApiResponse<unknown>, { name: string; email: string; password: string }>({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        data,
      }),
    }),
    getWallets: builder.query<ApiResponse<IWallet[]>, void>({
      query: () => ({ url: "/wallets" }),
    }),
    manageWallet: builder.mutation<ApiResponse<unknown>, { walletId: string; action: "block" | "unblock" }>({
      query: ({ walletId, action }) => ({
        url: `/wallets/${walletId}/${action}`,
        method: "PATCH",
      }),
    }),
    getSystemConfig: builder.query<ApiResponse<ISystemConfig>, void>({
      query: () => ({ url: "/system-config" }),
    }),
    updateSystemConfig: builder.mutation<ApiResponse<ISystemConfig>, Record<string, unknown>>({
      query: (data) => ({
        url: "/system-config",
        method: "PATCH",
        data,
      }),
    }),
  }),
});

export const {
  useGetDashboardStatisticsQuery,
  useGetUsersQuery,
  useManageUserMutation,
  useGetAgentsQuery,
  useManageAgentMutation,
  useGetAllTransactionsQuery,
  useCreateAdminMutation,
  useGetWalletsQuery,
  useManageWalletMutation,
  useGetSystemConfigQuery,
  useUpdateSystemConfigMutation,
} = adminApi;
