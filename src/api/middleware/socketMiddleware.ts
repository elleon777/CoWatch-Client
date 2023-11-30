import { Dispatch } from '@reduxjs/toolkit';
import { setOnlineUser, setUsers } from 'store/users/users.slice';
import { User } from 'utils/@types/users';

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
        // socket.on('new user added', ({ users, newUser }: { users: User[]; newUser: User }) => {
        //   dispatch(setUsers(users));
        //   dispatch(setOnlineUser(newUser));
        // });
        socket.on('connect', () => {
          console.log();
        });
        socket.emit('new login', payload);
        break;
      }
      case 'auth/logout': {
        socket.removeAllListeners();
        socket.disconnect();
        break;
      }
    }

    return next(action);
  };
}
