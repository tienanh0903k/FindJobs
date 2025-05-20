import { Injectable } from '@nestjs/common';
import moment from 'moment';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../transaction/schemas/transiton.schema';
import { User } from '../user/schemas/user.schema';
import { Model, Types } from 'mongoose';

interface IOrder {
  app_id: string;
  app_trans_id: string;
  app_user: string;
  app_time: number;
  item: string;
  embed_data: string;
  amount: number;
  callback_url: string;
  description: string;
  bank_code: string;
  mac?: string;
}

@Injectable()
export class PaymentService {
  private readonly config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
  };

  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPayment(orderData: IOrder) {
    const transID = Math.floor(Math.random() * 1000000);
    const userId = orderData.app_user || 'user123';
    const amount = orderData.amount || 50000;

    const order: IOrder = {
      app_id: this.config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
      app_user: 'user123',
      app_time: Date.now(),
      // item: JSON.stringify([]), // Bạn có thể thêm sản phẩm vào đây
      item: JSON.stringify([
        {
          id: 'product1',
          name: 'Product 1',
        },
      ]),
      embed_data: JSON.stringify({
        redirecturl: 'http://localhost:3000/payment-success',
      }),
      amount,
      callback_url:
        'https://4ab1-2001-ee0-1a40-3f70-613f-da42-b0e2-dc9d.ngrok-free.app/api/payment/callback',
      description: `Mã giao dịch #${transID}`,
      bank_code: '',
    };

    const data = `${this.config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(data, this.config.key1).toString();

    await this.transactionModel.create({
      userId: userId,
      amount: amount,
      type: 'deposit',
      provider: 'zalopay',
      status: 'pending',
      orderId: order.app_trans_id,
      raw: order,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    try {
      const result = await axios.post(this.config.endpoint, null, {
        params: order,
      });
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error during payment creation');
    }
  }

  async handleCallback(requestBody: any) {
    let result = {};
    try {
      const { data: dataStr, mac: reqMac } = requestBody;

      // Không log dữ liệu nhạy cảm
      // console.log('dataStr =', dataStr);

      const mac = CryptoJS.HmacSHA256(dataStr, this.config.key2).toString();

      if (reqMac !== mac) {
        result = {
          return_code: -1,
          return_message: 'mac not equal',
        };
      } else {
        const dataJson = JSON.parse(dataStr);
        console.log(
          '[CALLBACK] Cập nhật trạng thái đơn hàng thành công cho app_trans_id =',
          dataJson['app_trans_id'],
        );

        // Tìm transaction đang pending
        const transaction = await this.transactionModel.findOne({
          orderId: dataJson['app_trans_id'],
          status: 'pending',
        });

        if (transaction) {
          transaction.status = 'success';
          transaction.updatedAt = new Date();
          await transaction.save();

          // Cộng tiền vào tài khoản người dùng
          const success = await this.increaseUserBalance(transaction.userId, transaction.amount);

          if (!success) {
            // Nếu lỗi cộng số dư, log hoặc xử lý theo nghiệp vụ của bạn
            console.error(`[CALLBACK][ERROR] Không thể cộng số dư cho user: ${transaction.userId}`);
          }
        } else {
          console.warn('[CALLBACK] Không tìm thấy transaction pending phù hợp');
        }

        result = {
          return_code: 1,
          return_message: 'success',
        };
      }
    } catch (ex) {
      console.log('Lỗi:', ex.message);
      result = {
        return_code: 0,
        return_message: ex.message,
      };
    }

    return result;
  }

  //others ser:
  async increaseUserBalance(userId: string, amount: number): Promise<boolean> {
    try {
      await this.userModel.updateOne(
        { _id: new Types.ObjectId(userId) },
        { $inc: { balance: amount } },
      );
      console.log(
        `[CALLBACK] Đã cộng số dư cho user: ${userId}, số tiền: ${amount}`,
      );
      return true;
    } catch (err) {
      console.error(
        `[CALLBACK][ERROR] Lỗi khi cộng số dư cho user: ${userId}. Error: ${err.message}`,
      );
      return false;
    }
  }
}



// async handleCallback(requestBody: any) {
  //   let result = {};
  //   console.log(requestBody);
  //   try {
  //     const { data: dataStr, mac: reqMac } = requestBody;

  //     // Tính toán MAC từ dữ liệu nhận được
  //     const mac = CryptoJS.HmacSHA256(dataStr, this.config.key2).toString();
  //     console.log('mac =', mac);

  //     if (reqMac !== mac) {
  //       result = {
  //         return_code: -1,
  //         return_message: 'mac not equal',
  //       };
  //     } else {
  //       const dataJson = JSON.parse(dataStr);
  //       console.log(
  //         'Cập nhật trạng thái đơn hàng thành công cho app_trans_id =',
  //         dataJson['app_trans_id'],
  //       );

  //       // Cập nhật trạng thái thanh toán thành công (ví dụ có thể lưu vào DB)
  //       result = {
  //         return_code: 1,
  //         return_message: 'success',
  //       };
  //     }
  //   } catch (ex) {
  //     console.log('Lỗi:', ex.message);
  //     result = {
  //       return_code: 0,
  //       return_message: ex.message,
  //     };
  //   }

  //   return result;
  // }