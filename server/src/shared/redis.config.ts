import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { IoAdapter } from '@nestjs/platform-socket.io';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: any;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      // url: 'redis://localhost:6379',
      url: 'redis://redis:6379', // Adjust this URL as needed
    });

    const subClient = pubClient.duplicate(); 
 
    try {
      await pubClient.connect();  
      await subClient.connect();
      
      console.log('Kết nối Redis thành công!');
      
      this.adapterConstructor = createAdapter(pubClient, subClient);
    } catch (err) {
      console.error('Lỗi kết nối Redis:', err);
    }
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor); 
    return server;
  }

  bindClientConnect(server: any, callback: any): any {
    server.on('connection', (client: any) => {
      console.log(`Client connected: ${client.id}`);
      callback(client);
    });
  }
}
