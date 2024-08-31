import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
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

    const payload = {
      username: user.email,
      sub: user._id,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        _id: user._id,
        role: "admin"
      }
    };
  }

  


  async isValidPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
