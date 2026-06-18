import { baseApi } from "@/redux/baseApi";

interface SpendingDataPoint {
  name: string;
  income: number;
  expenses: number;
}

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpendingOverview: builder.query<{ data: SpendingDataPoint[] }, void>({
      query: () => ({ url: "/dashboard/spending-overview" }),
    }),
  }),
});

export const { useGetSpendingOverviewQuery } = dashboardApi;
