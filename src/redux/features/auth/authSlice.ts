
import { createSlice } from "@reduxjs/toolkit";

import type { IUser } from "@/types/user";

interface AuthState {
  token: string | null;
  user: IUser | null;
  globalLoader: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  globalLoader: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    setGlobalLoader: (state, action) => {
      state.globalLoader = action.payload;
    },
  },
});

export const { setCredentials, logout, setGlobalLoader } = authSlice.actions;

export default authSlice.reducer;
