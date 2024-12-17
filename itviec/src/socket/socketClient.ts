import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3009';

const socket: Socket<any, any> = io(SERVER_URL, {
  transports: ['websocket'],
  withCredentials: true,    
});

export {
  socket
}