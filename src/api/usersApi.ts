import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUsers } from 'store/users/users.slice';
import { User } from 'utils/@types/users';
import { WEB_SOCKET_HOST } from 'utils/config';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: WEB_SOCKET_HOST + '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    // addUser: builder.query({}),
  }),
});

export const { useGetUsersQuery } = usersApi;
