import { User } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLogin: (state, action: PayloadAction<User | null>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    setAuthLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuthLogin, setAuthLogout } = authSlice.actions;
export default authSlice.reducer;
