import { Status } from "utils/enums/status";

export type User = {
  username: string;
  online?: boolean;
  currentTime: number | null;
}

export interface UsersState {
  users: User[];
  status: Status;
}