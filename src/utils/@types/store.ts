import { PlayerState } from 'utils/@types/player';
import { AuthState } from "./auth";
import { UsersState } from "./users";

export interface RootState {
  authState: AuthState;
  usersState: UsersState;
  playerState: PlayerState;
  usersApi: any;
}
