import { combineReducers, Reducer } from 'redux';
import { RootState } from 'utils/@types/store';
import authReducer from './auth/auth.slice';
import usersReducer from './users/users.slice';



export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  usersState: usersReducer,
});
