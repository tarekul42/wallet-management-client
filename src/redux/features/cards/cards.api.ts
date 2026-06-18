import { baseApi } from "@/redux/baseApi";

interface CardItem {
  _id: string;
  lastFourDigits: string;
  cardholderName: string;
  expiryDate: string;
  type: "VIRTUAL" | "PHYSICAL";
  status: "ACTIVE" | "BLOCKED" | "EXPIRED";
}

const cardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCards: builder.query<{ data: CardItem[] }, void>({
      query: () => ({ url: "/cards" }),
    }),
  }),
});

export const { useGetMyCardsQuery } = cardsApi;
