import { User } from "./users";

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
}
