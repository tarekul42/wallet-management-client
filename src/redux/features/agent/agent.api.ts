import { baseApi } from "@/redux/baseApi";

type QueryParams = Record<string, unknown>;
type ApiResponse = Record<string, unknown>;

const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<ApiResponse, void>({
      query: () => ({ url: "/agent/dashboard-summary" }),
    }),
    addMoneyToUser: builder.mutation<ApiResponse, QueryParams>({
      query: (data) => ({
        url: "/agent/add-money",
        method: "POST",
        data,
      }),
    }),
    withdrawMoneyFromUser: builder.mutation<ApiResponse, QueryParams>({
      query: (data) => ({
        url: "/agent/withdraw-money",
        method: "POST",
        data,
      }),
    }),
    getTransactionHistory: builder.query<ApiResponse, QueryParams>({
      query: (params) => ({
        url: "/agent/transactions",
        params,
      }),
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useAddMoneyToUserMutation,
  useWithdrawMoneyFromUserMutation,
  useGetTransactionHistoryQuery: useGetAgentTransactionHistoryQuery,
} = agentApi;
