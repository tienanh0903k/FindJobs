import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';
// import { Request } from 'express';

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
  // async refreshToken(@Req() req: Request) {
  //   const rfToken = req.cookies["refreshToken"];
  //   console.log("Ma refresh token:-->",rfToken);
  //   return this.authService.handleRefreshToken(rfToken);
  // }
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    // Gọi service để xử lý refresh token
    //console.log(refreshToken);
    return this.authService.handleRefreshToken(refreshToken);
  }

  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  async googleLogin() {
    console.log('Google login route called');
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.oAuthLogin(req.user);
      res.redirect(`http://localhost:3000/oauth?token=${token.jwt}`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }

}
