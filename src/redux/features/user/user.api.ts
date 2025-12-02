/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountBalance: builder.query<any, void>({
      query: () => ({ url: "/user/balance" }),
    }),
    getTransactionHistory: builder.query<any, any>({
      query: (params) => ({
        url: "/user/transactions",
        params,
      }),
    }),
    sendMoney: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user/send-money",
        method: "POST",
        data,
      }),
    }),
    depositMoney: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user/deposit",
        method: "POST",
        data,
      }),
    }),
    withdrawMoney: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user/withdraw",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useGetAccountBalanceQuery,
  useGetTransactionHistoryQuery,
  useSendMoneyMutation,
  useDepositMoneyMutation,
  useWithdrawMoneyMutation,
} = userApi;
