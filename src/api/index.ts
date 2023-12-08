import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WEB_SOCKET_HOST } from 'utils/config';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: WEB_SOCKET_HOST + '/api' }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getRooms: builder.query<any, void>({
      query: () => '/rooms',
    }),
    getRoomUsers: builder.query<any, string>({
      query: (id: string) => `/rooms/${id}`,
    }),
    getSourcesFromURL: builder.mutation({
      query: (url: string) => ({
        url: `/parser`,
        method: 'POST',
        body: url,
      }),
    }),
  }),
});

export const { useLazyGetRoomsQuery, useLazyGetRoomUsersQuery, useGetSourcesFromURLMutation } = api;
