import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //send message
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.sendMessage(createMessageDto);
  }

  //get conversation
  @UseGuards(AuthGuard)
  @Get('me')
  async getMyConversations(@Request() req) {
    return this.messageService.getAllConversation(req.user.sub);
  }



   //get chat from id
   @Get('conversation')
   async getConversationsByID(
     @Query('sender_id') userSendId: string,
     @Query('receive_id') userReceivedId: string,
   ) {
     //console.log('Sender:', userSendId, 'Receiver:', userReceivedId);
     return this.messageService.getAllConversationById(
       userSendId,
       userReceivedId,
     );
   }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
