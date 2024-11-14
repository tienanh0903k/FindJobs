import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';

import { GoogleStrategy } from './passport/google.strategy';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../roles/roles.module';
import { UserModule } from '../user/user.module';


@Module({
  controllers: [AuthController],
  imports: [
    PermissionsModule,
    RolesModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthGuard, GoogleStrategy],
  exports: [AuthService, AuthGuard, JwtModule],
})
export class AuthModule {}
