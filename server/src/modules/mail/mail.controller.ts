import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from './dto/mail.dto';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  async sendMail() {
    await this.mailerService.sendMail({
      to: 'tienanh09032003k@gmail.com',
      from: 'admin@gmail.com',
      subject: 'Chúc mừng bạn đã ứng tuyển thành công, chúc mừng!',
      template: 'applied',
    });

    console.log('running through here');
  }

  @Post('send')
  async sendMailByEmail(@Body() sendMailDto: SendMailDto) {
    const { to, subject, name, message } = sendMailDto;

    try {
      await this.mailerService.sendMail({
        to, 
        subject, 
        template: 'applied', 
        context: {
          name,
          message,
        },
      });

      return { message: 'Gui email thanhcog ' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'Failed to send email', error };
    }
  }
}
