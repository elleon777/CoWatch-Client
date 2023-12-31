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
      query: (roomId: string) => `/rooms/${roomId}/users`,
    }),
    getSourcesFromRoom: builder.query({
      query: (roomId: string) => `/rooms/${roomId}/sources`,
    }),
    getSourcesFromURL: builder.query({
      query: (args: { roomId: string; url: string }) => {
        const { roomId, url } = args;
        return {
          url: `/parser`,
          params: { roomId, url },
        };
      },
    }),
  }),
});

export const {
  useLazyGetRoomsQuery,
  useLazyGetRoomUsersQuery,
  useLazyGetSourcesFromRoomQuery,
  useLazyGetSourcesFromURLQuery,
} = api;
