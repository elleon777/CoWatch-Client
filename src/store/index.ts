import { configureStore } from '@reduxjs/toolkit';
import SocketClient from '../api/SocketClient';
import { rootReducer } from './rootReducer';
import socketMiddleware from 'api/middleware/socketMiddleware';
import { api } from 'api';

export const socket = new SocketClient();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) =>
    gDM().concat(socketMiddleware(socket), api.middleware),
});

export type AppDispatch = typeof store.dispatch;