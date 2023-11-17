export interface User {
  username: string,
  online?: boolean
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  // onlineUsersByUsername: string[];
  // typingUsers: string[];
}