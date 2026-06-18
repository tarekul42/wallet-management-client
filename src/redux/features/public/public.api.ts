import { baseApi } from "@/redux/baseApi";

interface PlatformStats {
  totalUsers: number;
  totalTransactions: number;
  totalVolume: number;
  thisYearVolume: number;
  activeUsers: number;
  transactionsDaily: number;
  countriesServed: number;
  securityRating: string;
  uptime: string;
}

const publicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlatformStats: builder.query<{ data: PlatformStats }, void>({
      query: () => ({ url: "/public/stats" }),
    }),
  }),
});

export const { useGetPlatformStatsQuery } = publicApi;
