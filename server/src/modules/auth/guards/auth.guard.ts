// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { ConfigService } from '@nestjs/config';
// import { PermissionsService } from 'src/modules/permissions/permissions.service';
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private configService: ConfigService,
//     private permissionService: PermissionsService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     console.log('token', token);
//     try {
//       const secret = this.configService.get<string>('JWT_SECRET_KEY');
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret,
//       });

//       //get permission from role
//       // const permission = await this.permissionService.getPermissionsByUserId(payload.role);
//       // console.log(permission);
//       const permission = await this.permissionService.getPermissionsByUser(
//         payload.sub,
//       );
//       //console.log("--", permission);

//       request['user'] = payload;
//       request['userPermissions'] = permission;
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   // async canActivate(context: ExecutionContext): Promise<boolean> {
//   //   const request = context.switchToHttp().getRequest();

//   //   // Lấy token từ cookie
//   //   const sessionTokenFromCookie = this.extractTokenFromCookie(request.headers.cookie);
//   //   // Lấy token từ header
//   //   const sessionTokenFromHeader = this.extractTokenFromHeader(request);

//   //   // Sử dụng token từ cookie nếu có, nếu không thì sử dụng token từ header
//   //   const sessionToken = sessionTokenFromHeader || sessionTokenFromCookie;

//   //   console.log('sessionToken', request.headers.cookie); //null???


//   //   if (!sessionToken) {
//   //     throw new UnauthorizedException();
//   //   }

//   //   console.log('sessionToken', sessionToken);

//   //   try {
//   //     const secret = this.configService.get<string>('JWT_SECRET_KEY');
//   //     const payload = await this.jwtService.verifyAsync(sessionToken, {
//   //       secret,
//   //     });

//   //     // Lấy quyền từ user
//   //     const permission = await this.permissionService.getPermissionsByUser(
//   //       payload.sub,
//   //     );

//   //     request['user'] = payload;
//   //     request['userPermissions'] = permission;
//   //   } catch {
//   //     throw new UnauthorizedException();
//   //   }

//   //   return true;
//   // }

//   private extractTokenFromCookie(cookies: string | undefined): string | null {
//     if (!cookies) {
//         return null;
//     }
    
//     const cookieArray = cookies.split(';');
//     const sessionToken = cookieArray.find(cookie => cookie.trim().startsWith('sessionToken='));
//     return sessionToken ? sessionToken.split('=')[1] : null; // Trả về giá trị token
// }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }


import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PermissionsService } from 'src/modules/permissions/permissions.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private permissionService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET_KEY');
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });

      // Lấy quyền từ user
      const permissions = await this.permissionService.getPermissionsByUser(payload.sub);

      request['user'] = payload;
      request['userPermissions'] = permissions;

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // Token hết hạn
        throw new UnauthorizedException('Token has expired');
      }
      
      // Các lỗi khác, ví dụ: token không hợp lệ
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
