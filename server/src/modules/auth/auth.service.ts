import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private roleService: RolesService,
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
    const user: any = await this.usersService
      .findOneByName(username)
      .populate({
        path: 'companyId',
        model: 'Companies',
        select: 'name logo',
      })
      .populate({
        path: 'role',
        model: 'Roles',
        populate: {
          path: 'permissions',
          model: 'Permission',
          select: 'name apiPath method module',
        },
      })
      .exec();
    // console.log("--thong tin user:", user);
    // --thong tin user: {
    //   _id: new ObjectId('66d9e651527b266d82753ebd'),
    //   userName: 'ANH-HR',
    //   email: 'tienanh1@gmail.com',
    //   password: '$2b$10$ciHX/aw3qadRDMngUcHVV.v2NukN1ERZsT6zFqTZl8Zlv7rp4/vv6',
    //   role: {
    //     _id: new ObjectId('66e8410b7f7f221ba7a995b1'),
    //     name: 'HR',
    //     _id: new ObjectId('66e8410b7f7f221ba7a995b1'),
    //     _id: new ObjectId('66e8410b7f7f221ba7a995b1'),
    //     name: 'HR',
    //     isActive: true,
    //     permissions: [ [Object], [Object] ],
    //     createdAt: 2024-09-16T14:30:35.442Z,
    //     updatedAt: 2024-09-16T14:30:35.442Z,
    //     __v: 0
    //   },
    //   skills: [],
    //   create_at: 2024-09-05T17:11:45.042Z,
    //   update_at: 2024-09-05T17:11:45.043Z,
    //   education: [],
    //   workExperience: [],
    //   projects: [],
    //   certifications: [],
    //   awards: [],
    //   __v: 0,
    //   company: 'FPT Software',
    //   fullName: 'TIEN ANH NGUYEN',
    //   companyId: '671213dc92c1ab2b8b66493d'
    // }
    
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
      role: user.role.name,
    };

    const token = this.jwtService.sign(payload);

    // const role = await this.roleService.getRoleById(user.role);

    // Định dạng lại permissions theo yêu cầu
    // const permissions = role.permissions;

    return {
      access_token: token,
      refresh_token,
      user: {
        _id: user._id,
        role: user.role.name,
        name: user.userName,
      },
      company: user.companyId,
      permissions: user.role.permissions,
    };
  }

  async handleRefreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      const user = await this.usersService.findUserById(decoded.sub);
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

  //-------------oAuthLogin---------------------
  async oAuthLogin(user) {
    if (!user) {
      throw new Error('User not found!!!');
    }

    const payload = {
      email: user.email,
      name: user.name,
    };

    const jwt = await this.jwtService.sign(payload);

    return { jwt };
  }
}
