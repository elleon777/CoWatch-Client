import { configureStore } from '@reduxjs/toolkit';
import SocketClient from '../api/SocketClient';
import { rootReducer } from './rootReducer';
import socketMiddleware from 'api/middleware/socketMiddleware';

const socket = new SocketClient();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(socket)),
});

export type AppDispatch = typeof store.dispatch;