import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { RedisIoAdapter } from './config/redis.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const redisIoAdapter = new RedisIoAdapter();
  // await redisIoAdapter.connectToRedis();
  
  // app.useWebSocketAdapter(redisIoAdapter);
  app.enableCors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,})

  await app.listen(3009); 
  console.log('Application is running on PORT 8080');

}
bootstrap();
 