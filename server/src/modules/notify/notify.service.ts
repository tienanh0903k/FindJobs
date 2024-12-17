import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notify } from './schemas/notify.schema';
import { Model } from 'mongoose';
import { NotifyDto } from './dto/create-notify.dto';

@Injectable()
export class NotifyService {
    constructor(
        @InjectModel(Notify.name) private notifyModel: Model<Notify>,
    ) {}



    //create notify
    async createNotify(notify: NotifyDto): Promise<Notify> {
        const newNotify = new this.notifyModel(notify);
        return newNotify.save();
    }


    //get notify by user id
    async getNotifyById(userId: string) {
        try {
            const data = await this.notifyModel.find({ userId }); 
            if (!data) {
                throw new Error('No notifications found for this user');
            }
            return data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error; 
        }
    }

}
