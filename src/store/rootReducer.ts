import { combineReducers, Reducer } from 'redux';
import { RootState } from 'utils/@types/store';
import userReducer from './user/user.slice';
import { api } from 'api';

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  userState: userReducer,
  [api.reducerPath]: api.reducer,
});
