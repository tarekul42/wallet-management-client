import { baseApi } from "@/redux/baseApi";

type QueryParams = Record<string, unknown>;
type ApiResponse = Record<string, unknown>;

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatistics: builder.query<ApiResponse, void>({
      query: () => ({ url: "/admin/dashboard-statistics" }),
    }),
    getUsers: builder.query<ApiResponse, QueryParams>({
      query: (params) => ({
        url: "/admin/users",
        params,
      }),
    }),
    manageUser: builder.mutation<ApiResponse, QueryParams>({
      query: (data) => ({
        url: "/admin/manage-user",
        method: "POST",
        data,
      }),
    }),
    getAgents: builder.query<ApiResponse, QueryParams>({
      query: (params) => ({
        url: "/admin/agents",
        params,
      }),
    }),
    manageAgent: builder.mutation<ApiResponse, QueryParams>({
      query: (data) => ({
        url: "/admin/manage-agent",
        method: "POST",
        data,
      }),
    }),
    getAllTransactions: builder.query<ApiResponse, QueryParams>({
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
