import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, IAgentSummary, ITransaction } from "@/types/api";

type QueryParams = Record<string, unknown>;

const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<ApiResponse<IAgentSummary>, void>({
      query: () => ({ url: "/agent/summary" }),
    }),
    addMoneyToUser: builder.mutation<ApiResponse<unknown>, QueryParams>({
      query: (data) => ({
        url: "/transactions/add-money",
        method: "POST",
        data,
      }),
    }),
    withdrawMoneyFromUser: builder.mutation<ApiResponse<unknown>, QueryParams>({
      query: (data) => ({
        url: "/transactions/withdraw-money",
        method: "POST",
        data,
      }),
    }),
    getTransactionHistory: builder.query<ApiResponse<ITransaction[]>, QueryParams>({
      query: (params) => ({
        url: "/transactions/history",
        params,
      }),
    }),
    getCommissionHistory: builder.query<ApiResponse<ITransaction[]>, QueryParams>({
      query: (params) => ({
        url: "/transactions/get-commission-history",
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
  useGetCommissionHistoryQuery,
} = agentApi;
