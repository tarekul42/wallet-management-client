import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, IWallet, ITransaction } from "@/types/api";

type QueryParams = Record<string, unknown>;

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountBalance: builder.query<ApiResponse<IWallet>, void>({
      query: () => ({ url: "/wallets/me" }),
      providesTags: ["WALLET"],
    }),
    getTransactionHistory: builder.query<ApiResponse<ITransaction[]>, QueryParams>({
      query: (params) => ({
        url: "/transactions/history",
        params,
      }),
      providesTags: ["TRANSACTION"],
    }),
    sendMoney: builder.mutation<ApiResponse<unknown>, { receiverEmail: string; amount: number; description?: string }>({
      query: (data) => ({
        url: "/transactions/send-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    depositMoney: builder.mutation<ApiResponse<unknown>, { amount: number }>({
      query: (data) => ({
        url: "/transactions/add-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    withdrawMoney: builder.mutation<ApiResponse<unknown>, { amount: number }>({
      query: (data) => ({
        url: "/transactions/withdraw-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    updateProfile: builder.mutation<ApiResponse<unknown>, Record<string, unknown>>({
      query: (data) => ({
        url: "/users/me",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    getProfile: builder.query<ApiResponse<unknown>, void>({
      query: () => ({ url: "/users/me" }),
      providesTags: ["USER"],
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
