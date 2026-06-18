import { baseApi } from "@/redux/baseApi";

type QueryParams = Record<string, unknown>;
type ApiResponse = Record<string, unknown>;

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountBalance: builder.query<ApiResponse, void>({
      query: () => ({ url: "/user/balance" }),
    }),
    getTransactionHistory: builder.query<ApiResponse, QueryParams>({
      query: (params) => ({
        url: "/user/transactions",
        params,
      }),
    }),
    sendMoney: builder.mutation<ApiResponse, QueryParams>({
      query: (data) => ({
        url: "/user/send-money",
        method: "POST",
        data,
      }),
    }),
    depositMoney: builder.mutation<ApiResponse, QueryParams>({
      query: (data) => ({
        url: "/user/deposit",
        method: "POST",
        data,
      }),
    }),
    withdrawMoney: builder.mutation<ApiResponse, QueryParams>({
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
