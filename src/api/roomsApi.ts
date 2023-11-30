import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WEB_SOCKET_HOST } from 'utils/config';

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  baseQuery: fetchBaseQuery({ baseUrl: WEB_SOCKET_HOST + '/api' }),
  endpoints: (builder) => ({
    getRooms: builder.query<any, void>({
      query: () => '/rooms'
    }),
  }),
});

export const { useGetRoomsQuery } = roomsApi;
