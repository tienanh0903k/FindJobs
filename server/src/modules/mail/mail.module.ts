// import { Module } from '@nestjs/common';
// import { MailService } from './mail.service';
// import { MailController } from './mail.controller';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { ConfigService } from '@nestjs/config';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// //EMAIL
// // EMAIL_AUTH_PASS=ohok vmxx anrl atyo 
// // EMAIL_AUTH_USER=tienanh2003k@gmail.com
// // EMAIL_HOST=smtp.gmail.com

// @Module({
//   imports: [
//     MailerModule.forRootAsync({
//       useFactory: async (configService: ConfigService) => ({
//         transport: {
//           host: configService.get<string>('EMAIL_HOST'),
//           secure: false,
//           auth: {
//             user: configService.get<string>('EMAIL_AUTH_USER'),
//             pass:configService.get<string>('EMAIL_AUTH_PASS'),
//           },
//         }
//       }),
//       template: {
//         dir: __dirname + '/templates',
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//       inject: [ConfigService],
//     }),

//   ],
//   controllers: [MailController],
//   providers: [MailService],
// })
// export class MailModule {}


import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path'; // Để sử dụng đường dẫn thư mục templates

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_AUTH_USER'),
            pass: configService.get<string>('EMAIL_AUTH_PASS'),
          },
        },
        template: {
          dir: path.join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },

        // preview: true

      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
