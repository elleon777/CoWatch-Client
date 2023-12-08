import { Dispatch } from '@reduxjs/toolkit';

interface SocketMiddlewareParams {
  dispatch: Dispatch;
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;
    switch (type) {
      case 'user/login': {
        socket.connect();
        socket.on('connect', () => {
          const updatedAction = {
            ...action,
            payload: {
              id: socket.socket.id,
              username: payload.username,
              currentTime: null,
              currentRoomId: null,
            },
          };
          socket.emit('auth:login', updatedAction.payload);
          return next(updatedAction);
        });
        return;
      }
      case 'user/logout': {
        socket.removeAllListeners();
        socket.disconnect();
        break;
      }
    }

    return next(action);
  };
}
