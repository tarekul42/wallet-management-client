/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<any, void>({
      query: () => ({ url: "/agent/dashboard-summary" }),
    }),
    addMoneyToUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "/agent/add-money",
        method: "POST",
        data,
      }),
    }),
    withdrawMoneyFromUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "/agent/withdraw-money",
        method: "POST",
        data,
      }),
    }),
    getTransactionHistory: builder.query<any, any>({
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
