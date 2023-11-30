import { User, UsersState } from 'utils/@types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
    setOnlineUser: (state, { payload }: PayloadAction<User>) => {
        const newList: User[] = state.users.map((user: User) => {
          if (user.username === payload.username) {
            return { ...user, online: true };
          }
          return user;
        });

      state.users = newList;
    },
  },
});

export const { removeUser, addUser, setUsers, setOnlineUser } = usersSlice.actions;
export default usersSlice.reducer;
