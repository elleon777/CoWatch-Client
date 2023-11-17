import { User, UsersState } from 'utils/@types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users.push(payload);
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { setUsers, addUser, setLoading, setLoadingComplete } = usersSlice.actions;
export default usersSlice.reducer;
