import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schemas/transiton.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async getTransactionByUserId(userId: string) {
    // filter: userId và status = 'success'
    console.log('--------------userId', userId);
    const filter = {
      userId,
      status: 'success',
    };
    return this.transactionModel.find(filter).sort({ createdAt: -1 }).exec();
  }
}
