import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserState } from 'utils/@types/user';

const initialState: UserState = {
  currentUser: null,
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<any>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },
    logout: () => initialState,
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer