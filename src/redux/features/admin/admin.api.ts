/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatistics: builder.query<any, void>({
      query: () => ({ url: "/admin/dashboard-statistics" }),
    }),
    getUsers: builder.query<any, any>({
      query: (params) => ({
        url: "/admin/users",
        params,
      }),
    }),
    manageUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin/manage-user",
        method: "POST",
        data,
      }),
    }),
    getAgents: builder.query<any, any>({
      query: (params) => ({
        url: "/admin/agents",
        params,
      }),
    }),
    manageAgent: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin/manage-agent",
        method: "POST",
        data,
      }),
    }),
    getAllTransactions: builder.query<any, any>({
      query: (params) => ({
        url: "/admin/transactions",
        params,
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
} = adminApi;
