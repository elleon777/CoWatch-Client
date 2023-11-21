import { Dispatch } from '@reduxjs/toolkit';
import { addUser, removeUser } from 'store/users/users.slice';
import { RootState } from 'utils/@types/store';
import { User } from 'utils/@types/users';
import { useAppSelector } from 'utils/hooks/store';

interface SocketMiddlewareParams {
  dispatch: Dispatch;
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;
    switch (type) {
      case 'auth/login': {
        socket.connect();
        socket.on('new user added', (user: User) => {
          dispatch(addUser(user));
        });
        socket.emit('new login', payload);
        break;
      }
      case 'auth/logout': {
        const { currentUser } = useAppSelector((state: RootState) => state.authState);
        currentUser && dispatch(removeUser(currentUser));

        socket.disconnect();
        break;
      }
    }

    return next(action);
  };
}
