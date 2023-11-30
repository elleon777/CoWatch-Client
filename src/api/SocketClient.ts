import { Socket, io } from 'socket.io-client';
import { WEB_SOCKET_HOST } from 'utils/config';

export default class SocketClient {
  socket: Socket | null;

  connect() {
    this.socket = io(WEB_SOCKET_HOST, { transports: ['websocket'] });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
  emit(eventName: string, data?: unknown) {
    if (this.socket) {
      if (data) {
        this.socket.emit(eventName, data);
      } else {
        this.socket.emit(eventName);
      }
    }
  }

  on(eventName: string, func: (arg?: any) => void) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
