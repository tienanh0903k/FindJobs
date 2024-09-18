import { CanActivate, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: any) {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    return true;
  }
}
