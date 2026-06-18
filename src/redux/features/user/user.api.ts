import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, IWallet, ITransaction } from "@/types/api";

type QueryParams = Record<string, unknown>;

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountBalance: builder.query<ApiResponse<IWallet>, void>({
      query: () => ({ url: "/wallets/me" }),
    }),
    getTransactionHistory: builder.query<ApiResponse<ITransaction[]>, QueryParams>({
      query: (params) => ({
        url: "/transactions/history",
        params,
      }),
    }),
    sendMoney: builder.mutation<ApiResponse<unknown>, QueryParams>({
      query: (data) => ({
        url: "/transactions/send-money",
        method: "POST",
        data,
      }),
    }),
    depositMoney: builder.mutation<ApiResponse<unknown>, QueryParams>({
      query: (data) => ({
        url: "/transactions/add-money",
        method: "POST",
        data,
      }),
    }),
    withdrawMoney: builder.mutation<ApiResponse<unknown>, QueryParams>({
      query: (data) => ({
        url: "/transactions/withdraw-money",
        method: "POST",
        data,
      }),
    }),
    updateProfile: builder.mutation<ApiResponse<unknown>, Record<string, unknown>>({
      query: (data) => ({
        url: "/users/me",
        method: "PATCH",
        data,
      }),
    }),
    getProfile: builder.query<ApiResponse<unknown>, void>({
      query: () => ({ url: "/users/me" }),
    }),
    updatePassword: builder.mutation<ApiResponse<unknown>, { oldPassword: string; newPassword: string; confirmPassword: string }>({
      query: (data) => ({
        url: "/users/me/update-password",
        method: "PATCH",
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
  useUpdateProfileMutation,
  useGetProfileQuery,
  useUpdatePasswordMutation,
} = userApi;
