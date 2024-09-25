import { CanActivate, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IPermission } from 'src/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}


  async canActivate(context: any) {
    const request: Request = context.switchToHttp().getRequest();

    const userPermissions: IPermission[] = request['userPermissions'];
    //const user = request['user'];

    // Lấy path và method từ request
    const targetPath = request.route?.path;
    const targetMethod = request.method;
    console.log("target: ", targetPath, "-", targetMethod);
    //console.log(userPermissions);
    // Kiểm tra xem user có quyền truy cập vào API này không
    // const hasPermission = userPermissions.some(permission => 
    //   permission.apiPath === targetPath && permission.method === targetMethod
    // );
    //if userPermissions null 
    console.log(request);
    const listPermissions = userPermissions ?? []; //?? null hoac undefine thi moi lay []

    const hasPermission = listPermissions.find(permission => {
      return permission.apiPath === targetPath && permission.method === targetMethod
    })

    console.log('---hasPermission: ', hasPermission)

    if (!hasPermission) {
      console.log('Permission denied for user');
      return false;
    }


    return true;
  }
}
