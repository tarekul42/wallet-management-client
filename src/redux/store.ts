import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "@/redux/features/registrationSlice";
import authReducer from "@/redux/features/auth/authSlice";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
