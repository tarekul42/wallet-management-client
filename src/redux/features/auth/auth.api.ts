import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
