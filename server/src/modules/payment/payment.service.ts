import { Injectable } from '@nestjs/common';
import moment from 'moment';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';

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

  async createPayment(orderData: IOrder) {
    const transID = Math.floor(Math.random() * 1000000);
    const order: IOrder = {
      app_id: this.config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
      app_user: 'user123',
      app_time: Date.now(),
      item: JSON.stringify([]), // Bạn có thể thêm sản phẩm vào đây
      embed_data: JSON.stringify({ redirecturl: 'http://localhost:3000/payment-success' }),
      amount: 50000,
      callback_url: 'https://ea3c-113-185-48-229.ngrok-free.app/api/payment/callback',
      description: `Lazada - Payment for the order #${transID}`,
      bank_code: '',
    };

    const data = `${this.config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(data, this.config.key1).toString();

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
    console.log(requestBody);
    try {
      const { data: dataStr, mac: reqMac } = requestBody;

      // Tính toán MAC từ dữ liệu nhận được
      const mac = CryptoJS.HmacSHA256(dataStr, this.config.key2).toString();
      console.log('mac =', mac);

      if (reqMac !== mac) {
        result = {
          return_code: -1,
          return_message: 'mac not equal',
        };
      } else {
        const dataJson = JSON.parse(dataStr);
        console.log(
          'Cập nhật trạng thái đơn hàng thành công cho app_trans_id =',
          dataJson['app_trans_id'],
        );

        // Cập nhật trạng thái thanh toán thành công (ví dụ có thể lưu vào DB)
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
}
