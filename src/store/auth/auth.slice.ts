import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from 'utils/@types/auth';

const initialState: AuthState = {
  currentUser: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<any>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
