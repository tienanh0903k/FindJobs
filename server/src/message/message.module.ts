import {  Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { MessageRepository } from './repository/message.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),  
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    AuthModule,
    PermissionsModule
  ],
  controllers: [MessageController],
  //quan lys tiem inject providers
  providers: [MessageService, MessageRepository],
  exports: [
    MessageRepository
  ]
})
export class MessageModule {}
