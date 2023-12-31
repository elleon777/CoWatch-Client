export type User = {
  id: string;
  username: string;
  currentTime: number | null;
  currentRoomId: string | null;
  readyPlay: boolean;
};

export interface UserState {
  currentUser: User | null;
  isAuth: boolean;
}