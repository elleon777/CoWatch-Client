import { Dispatch } from '@reduxjs/toolkit';
import { addUser } from 'store/users/users.slice';
import { RootState } from 'utils/@types/store';
import { User } from 'utils/@types/users';

interface SocketMiddlewareParams {
  dispatch: Dispatch;
  getState: () => RootState;
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;
    console.log('middleware', type);
    switch (type) {
      case 'users/login': {
        socket.connect();

        socket.on('new user added', (user: User) => {
          dispatch(addUser(user));
        });
        socket.emit('new login', payload);
        break;
      }
      case 'users/logout': {
        socket.disconnect();
        break;
      }
    }

    return next(action);
  };
}
