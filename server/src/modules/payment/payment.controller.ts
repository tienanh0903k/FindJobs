import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('zalopay')
  async createPayment(@Body() orderData: any) {
    return this.paymentService.createPayment(orderData);
  }

  @Post('callback')
  async handleCallback(@Body() requestBody: any) {
    return this.paymentService.handleCallback(requestBody);
  }
}
