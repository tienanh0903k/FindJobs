import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  async sendMail() {
    await this.mailerService.sendMail({
      to: 'khoa69021@gmail.com',
      from: 'admin@gmail.com',
      subject: 'Chúc mừng bạn đã ứng tuyển thành công, chúc mừng!',
      template: 'applied',
    });

    console.log('running through here');
  }
}
