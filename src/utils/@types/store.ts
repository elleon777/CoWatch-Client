import { AuthState } from "./auth";
import { UsersState } from "./users";

export interface RootState {
  authState: AuthState
  usersState: UsersState
}
