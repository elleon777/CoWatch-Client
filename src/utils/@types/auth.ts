import { User } from './user';

export interface AuthState {
  // currentUser: User | null;
  currentUser: string | null;
  isAuth: boolean;
}
