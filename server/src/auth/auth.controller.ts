import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  //refresh token
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  //message decorator
  async refreshToken(@Req() req: Request) {
    const rfToken = req.cookies["refreshToken"];
    return this.authService.handleRefreshToken(rfToken);
  }

}
