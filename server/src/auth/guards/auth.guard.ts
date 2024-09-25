import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PermissionsService } from 'src/permissions/permissions.service';
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
      throw new UnauthorizedException();
    }
    try {
    const secret = this.configService.get<string>('JWT_SECRET_KEY');
      const payload = await this.jwtService.verifyAsync(token, {
        secret
      });

      //get permission from role
      // const permission = await this.permissionService.getPermissionsByUserId(payload.role);
      // console.log(permission);
      const permission = await this.permissionService.getPermissionsByUser(payload.sub);
      console.log("--", permission);
      
      

      request['user'] = payload;
      request['userPermissions'] = permission;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
