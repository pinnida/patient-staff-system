import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export function getSocket(basePath = '/api/socket'): Socket {
  if (socketInstance && socketInstance.connected) return socketInstance;

  socketInstance = io('', {
    path: basePath,
    transports: ['websocket'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  return socketInstance;
}

export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}


