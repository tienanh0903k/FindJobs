import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  //get transaction by me
  @UseGuards(AuthGuard)
  @Get('me')
  async getTransactionByMe(@Request() req: any) {
    const userId = req.user.sub;
    return this.transactionService.getTransactionByUserId(userId);
  }
}
