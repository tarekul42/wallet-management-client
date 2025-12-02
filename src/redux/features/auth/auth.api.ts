import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendEmailOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/send-email-otp",
        method: "POST",
        data,
      }),
    }),
    verifyEmailOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email-otp",
        method: "POST",
        data,
      }),
    }),
    sendPhoneOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/send-phone-otp",
        method: "POST",
        data,
      }),
    }),
    verifyPhoneOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-phone-otp",
        method: "POST",
        data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
  useRegisterMutation,
  useLoginMutation,
} = authApi;
