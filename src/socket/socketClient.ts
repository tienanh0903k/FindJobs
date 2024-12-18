
// 'use client';
// import { io, Socket } from 'socket.io-client';

// const SERVER_URL = 'http://localhost:3009';

// let socket: Socket;

// export const connectSocket = (): Socket => {
// 	if (socket) {
// 		return socket;
// 	}
// 	socket = io(SERVER_URL, {
// 		transports: ['websocket'],
// 		withCredentials: true,
// 		autoConnect: false,
// 	});

// 	return socket;
// };


// export {
//   socket
// }


'use client';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3009';

class SocketClient {
  private static instance: Socket;

  public static getInstance(): Socket {
    if (!SocketClient.instance) {
      SocketClient.instance = io(SERVER_URL, {
        transports: ['websocket'],
        withCredentials: true,
        autoConnect: false, // Không tự động kết nối
      });
    }
    return SocketClient.instance;
  }
}

export default SocketClient;
