import { Controller, Get, Param } from '@nestjs/common';
import { NotifyService } from './notify.service';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  //controller get by id
  @Get(':id')
  async getAllNotify(@Param('id') id: string): Promise<any> {
    if (!id) {
      return
    } 
    return await this.notifyService.getNotifyById(id);
  }
}
