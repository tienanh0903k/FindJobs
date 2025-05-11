import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { createClient } from '@redis/client';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ["*"],
    credentials: true,
  },
  pingTimeout: 60000, 
  pingInterval: 25000,
})

export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private redisClient: any;
  private userSocketMap = new Map<number, string>();

  constructor() {
    this.redisClient = createClient({
      url: 'redis://localhost:6379',
    });

    this.redisClient.connect();
  }

  async onModuleInit() {
    await this.redisClient.subscribe(
      'applicationStatusChanged',
      (message: string) => {
        const data = JSON.parse(message);
        console.log('Received message from Redis:', data);
        if (data.userId) {
          this.sendNotificationToClient(data.userId, data);
        }
        // Received message from Redis: {
        //   applicationId: '675bf5036742fe9bd8350a40',
        //   notify: 'Trạng thái của đơn ứng tuyển đã được cập nhật thành:pending...'
        // }

        // this.server.emit('statusChanged', data);
      },
    );

    console.log('WebSocket Gateway Initialized and Redis client subscribed');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.userSocketMap.forEach((socketId, userId) => {
      if (socketId === client.id) {
        this.userSocketMap.delete(userId);
      }
    });
    //console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('addUser')
  handleAddUser(
    @MessageBody() data: { userId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { userId } = data;
    if (client && client.id) {
      this.userSocketMap.set(userId, client.id);
      console.log("dang luu userSocketMap: ", this.userSocketMap);
      console.log(this.userSocketMap);
      //console.log(`User ${userId} connected with socket ID ${client.id}`);
    } else {
      console.log('Client socket is undefined or missing ID');  
    }
  }

  @SubscribeMessage('send_message')
  handleSendMessage(
    @MessageBody()
    data: {
      sender_id: number;
      receive_id: number;
      message: string;
    },
  ) {
    const { sender_id, receive_id, message } = data;
    //console.log(this.userSocketMap);
    console.log(data);
    const receiverSocketId = this.userSocketMap.get(receive_id);
    console.log('nguoi nhan: ', receiverSocketId);

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



  //phat thong bao cho cloent by id
  private sendNotificationToClient(userId: any, data: any) {
    const clientSocketId = this.userSocketMap.get(userId);
    console.log('first', clientSocketId)
    if (clientSocketId) {
      this.server.to(clientSocketId).emit('statusChanged', data);
    } else {
      console.log(`User with ID ${userId} is not connected.`);
    }
  }

  
}
