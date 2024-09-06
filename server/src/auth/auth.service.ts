import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOneByName(username);
  //   if (user) {
  //     const isValid = await this.isValidPassword(
  //       pass,
  //       user.password,
  //     );
  //     if (isValid) {
  //       return user;
  //     }
  //   }
  //   return null;
  // }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOneByName(username);
  //   if (!user) {
  //     console.log('User not found:', username);
  //     return null;
  //   }

  //   console.log('User found:', user);

  //   const isValid = await this.isValidPassword(pass, user.password);
  //   if (!isValid) {
  //     console.log('Invalid password');
  //     return null;
  //   }

  //   console.log('Password is valid');
  //   return user;
  // }

  // async login(user: any) {
  //   const payload = { username: user.email, sub: user._id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  // async isValidPassword(password: string, hash: string): Promise<boolean> {
  //   return await bcrypt.compare(password, hash)
  // }

  async login(data: LoginDto) {
    const { username, password } = data;
    const user = await this.usersService.findOneByName(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValid = await this.isValidPassword(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Sai mat khau');
    }

    //create refresh token
    const refresh_token = await this.createRefreshToken({
      username: user.email,
      sub: user._id,
    });

    const payload = {
      username: user.email,
      sub: user._id,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      refresh_token,
      user: {
        _id: user._id,
        role: user.role,
        name: user.userName,
      },
    };
  }

  async handleRefreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      const user = await this.usersService.findUserById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('Người dùng không tồn tại');
      }

      const newPayload = {
        username: user.email,
        id: user._id,
        name: user.userName,
        role: user.role,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        expiresIn: '15m',
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });

      const refresh_token = await this.createRefreshToken(newPayload);

      // Cập nhật refresh token mới vào user trong database
      await this.usersService.updateUserRefreshToken(
        user._id.toString(),
        refresh_token,
      );

      return {
        access_token: newAccessToken,
        refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }

  async createRefreshToken(payload) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
    });
    return refreshToken;
  }

  async isValidPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
