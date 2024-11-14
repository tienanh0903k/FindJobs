import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { MessageModule } from './modules/message/message.module';
import { GoogleStrategy } from './modules/auth/passport/google.strategy';
import { PostsModule } from './modules/posts/posts.module';
import { ResumeModule } from './modules/resume/resume.module';
import { ApplicationModule } from './modules/application/application.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CompaniesModule,
    AuthModule,
    PermissionsModule,
    RolesModule,
    UploadsModule,
    MessageModule,
    PostsModule,
    ResumeModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
