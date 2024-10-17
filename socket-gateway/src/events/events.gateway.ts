import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';;
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
  },
})
@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSocketMap = new Map<number, string>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.userSocketMap.forEach((socketId, userId) => {
      if (socketId === client.id) {
        this.userSocketMap.delete(userId);
      }
    });
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('addUser')
  handleAddUser(@MessageBody() data: { userId: number }, @ConnectedSocket() client: Socket) {
    const { userId } = data;
    if (client && client.id) {
      this.userSocketMap.set(userId, client.id);
      console.log(this.userSocketMap);
      console.log(`User ${userId} connected with socket ID ${client.id}`);
    } else {
      console.log('Client socket is undefined or missing ID');
    }
  }

  @SubscribeMessage('send_message')
  handleSendMessage(@MessageBody() data: { sender_id: number; receive_id: number; message: string }) {
    const { sender_id, receive_id, message } = data;
    const receiverSocketId = this.userSocketMap.get(receive_id);

    if (receiverSocketId) {
      // Gửi tin nhắn đến người nhận thông qua socketId
      this.server.to(receiverSocketId).emit('receive_message', {
        sender_id,
        message,
        timestamp: new Date().toISOString(),
      });
      console.log(`Message sent from ${sender_id} to ${receive_id}`);
    } else {
      console.log(`User ${receive_id} is not connected.`);
    }
  }
}