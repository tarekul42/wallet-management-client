import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, IWallet, ITransaction, IUserProfile } from "@/types/api";

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
    sendMoney: builder.mutation<ApiResponse<{ balance: number }>, { receiverEmail: string; amount: number; description?: string }>({
      query: (data) => ({
        url: "/transactions/send-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["TRANSACTION"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          userApi.util.updateQueryData("getAccountBalance", undefined, (draft) => {
            if (draft.data) draft.data.balance = data.data.balance;
          }),
        );
      },
    }),
    depositMoney: builder.mutation<ApiResponse<{ balance: number }>, { amount: number }>({
      query: (data) => ({
        url: "/transactions/add-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["TRANSACTION"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          userApi.util.updateQueryData("getAccountBalance", undefined, (draft) => {
            if (draft.data) draft.data.balance = data.data.balance;
          }),
        );
      },
    }),
    withdrawMoney: builder.mutation<ApiResponse<{ balance: number }>, { amount: number }>({
      query: (data) => ({
        url: "/transactions/withdraw-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["TRANSACTION"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          userApi.util.updateQueryData("getAccountBalance", undefined, (draft) => {
            if (draft.data) draft.data.balance = data.data.balance;
          }),
        );
      },
    }),
    updateProfile: builder.mutation<ApiResponse<IUserProfile>, Partial<IUserProfile>>({
      query: (data) => ({
        url: "/users/me",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    getProfile: builder.query<ApiResponse<IUserProfile>, void>({
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
