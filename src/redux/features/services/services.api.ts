import { baseApi } from "@/redux/baseApi";

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
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetRelatedServicesQuery,
  useGetServiceCategoriesQuery,
} = servicesApi;
