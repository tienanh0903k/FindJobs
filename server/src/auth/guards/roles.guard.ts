// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
        throw new ForbiddenException('User or roles not defined');
      }
    // const userFromDb = await this.userService.findOne(user.id);
    //console.log(user);

    // return requiredRoles.some((role) => user.roles.split(',').include(role));
    //console.log(requiredRoles.some((role) => user.role?.includes(role)));
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
