import { combineReducers, Reducer } from 'redux';
import { RootState } from 'utils/@types/store';
import authReducer from './auth/auth.slice';
import usersReducer from './users/users.slice';
import playerReducer from './player/player.slice';
import { usersApi } from 'api/usersApi';
import { roomsApi } from 'api/roomsApi';



export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  usersState: usersReducer,
  playerState: playerReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [roomsApi.reducerPath]: roomsApi.reducer,
});
