import { User, UsersState } from 'utils/@types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './users.action';
import { Status } from 'utils/enums/status';

const initialState: UsersState = {
  users: [],
  status: Status.LOADING,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeUser: (state, { payload }: PayloadAction<User>) => {
      state.users = state.users.filter((user) => user.username !== payload.username);
    },
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users = [...state.users, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = Status.LOADING;
      state.users = [];
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCESS;
      state.users = payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = Status.ERROR;
      state.users = [];
    });
  },
});

export const { removeUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;
