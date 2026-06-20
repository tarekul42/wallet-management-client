import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, IWallet } from "@/types/api";

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  location: string;
  price: string;
  date: string;
  reviews: ReviewItem[];
}

interface ReviewItem {
  _id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

interface PaginatedResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
  };
}

interface RelatedItem {
  _id: string;
  title: string;
  image: string;
}

export interface PurchaseItem {
  _id: string;
  amount: number;
  fee: number;
  type: "SERVICE_PURCHASE";
  status: string;
  referenceId: string;
  description: string;
  createdAt: string;
  service: {
    _id: string;
    title: string;
    image: string;
    price: string;
    category: string;
  } | null;
}

const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<PaginatedResponse<ServiceItem[]>, Record<string, unknown>>({
      query: (params) => ({ url: "/services", params }),
    }),
    getServiceById: builder.query<{ data: ServiceItem | null }, string>({
      query: (id) => ({ url: `/services/${id}` }),
    }),
    getRelatedServices: builder.query<{ data: RelatedItem[] }, string>({
      query: (id) => ({ url: `/services/${id}/related` }),
    }),
    getServiceCategories: builder.query<{ data: string[] }, void>({
      query: () => ({ url: "/services/categories" }),
    }),
    getMyPurchases: builder.query<ApiResponse<PurchaseItem[]>, void>({
      query: () => ({ url: "/services/my-purchases" }),
      providesTags: ["TRANSACTION"],
    }),
    buyService: builder.mutation<ApiResponse<{ balance: number }>, { serviceId: string; amount: number }>({
      query: ({ serviceId, amount }) => ({
        url: `/services/${serviceId}/purchase`,
        method: "POST",
        data: { amount },
      }),
      invalidatesTags: ["TRANSACTION"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          baseApi.util.updateQueryData<ApiResponse<IWallet>>("getAccountBalance", undefined, (draft) => {
            if (draft.data) draft.data.balance = data.data.balance;
          }),
        );
      },
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetRelatedServicesQuery,
  useGetServiceCategoriesQuery,
  useGetMyPurchasesQuery,
  useBuyServiceMutation,
} = servicesApi;
