import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { User } from 'src/user/schemas/user.schema';
import { MessageRepository } from './repository/message.repository';
import * as _ from 'lodash';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModels: Model<Message>,
    @InjectModel(User.name) private userModels: Model<User>,
    private readonly messageRepository: MessageRepository,
  ) {}
  sendMessage(createMessageDto: CreateMessageDto) {
    return this.messageModels.create(createMessageDto);
  }

  //get user ma ngdung nhan tin
  async getAllConversation(senderId: string) {
    //   const conversations = await this.messageModels
    //   .find({ sender_id: senderId })
    //   .populate('receive_id', 'userName') // Sử dụng populate để lấy userName
    //   .select({ _id: 0, receive_id: 1, 'user_info.userName': 1 }) // Chọn trường cần thiết
    //   .exec();

    // return convers    //convert senderId from string to ObjectId
    const conversations = await this.messageModels.aggregate([
      {
        $match: { sender_id: senderId },
      },
      {
        $addFields: {
          receive_id: { $toObjectId: '$receive_id' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'receive_id',
          foreignField: '_id',
          as: 'user_info',
        },
      },
      {
        $unwind: '$user_info',
      },
      {
        $project: {
          _id: 0, // Bỏ trường _id
          receive_id: '$receive_id', // Lấy receive_id
          userName: '$user_info.userName', // Lấy userName từ user_info
        },
      },
    ]);

    const uniqueConversations = _.uniqBy(
      conversations.map(item => ({
        receive_id: item.receive_id.toString(), // Chuyển ObjectId thành chuỗi
        userName: item.userName
      })),
      'receive_id' 
    );

    console.log(uniqueConversations);
    return uniqueConversations;
  }

  //get: conversation cho nguoi fgui va nduoi nhan
  async getAllConversationById(userSendId: string, receiveId: string) {
    return this.messageRepository.getChatByIdRepository(userSendId, receiveId);
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
