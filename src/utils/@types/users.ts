import { Status } from "utils/enums/status";

export interface User {
  username: string,
  online?: boolean
}

export interface UsersState {
  users: User[];
  status: Status;
}