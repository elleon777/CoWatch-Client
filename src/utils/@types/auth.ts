import { User } from './users';

export interface AuthState {
  currentUser: User | null;
  isAuth: boolean;
}
