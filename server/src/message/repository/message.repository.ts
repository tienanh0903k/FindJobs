import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schemas/message.schema';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private messageModels: Model<Message>,
  ) {}

  async getChatByIdRepository(userSendId: string, receiveId: string) {
    return this.messageModels.aggregate([
        {
          $match: {
            $or: [
              { sender_id: userSendId, receive_id: receiveId },
              { sender_id: receiveId, receive_id: userSendId }
            ]
          }
        },
        {
          $addFields: {
            receive_id: { $toObjectId: "$receive_id" } 
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'receive_id', 
            foreignField: '_id',
            as: 'receiver'
          }
        },
        { 
            $unwind: '$receiver'
        },
        {
          $sort: { timestamp: 1 }     
        },
        {
          $project: {
            _id: 1,
            sender_id: 1,
            receive_id: 1,
            userName: '$receiver.userName',
            message: 1,
            timestamp: 1,
          }     
        }
      ]);
  }
}
