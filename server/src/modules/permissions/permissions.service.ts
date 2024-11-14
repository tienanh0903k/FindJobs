import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { Model } from 'mongoose';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { User } from '../user/schemas/user.schema';
import { Roles } from '../roles/schemas/role.schema';


@Injectable()
export class PermissionsService {
    constructor(
      @InjectModel(Permission.name) private permissionModels: Model<Permission>,
      @InjectModel(User.name) private userModel: Model<User>,
      @InjectModel(Roles.name) private roleModel: Model<Roles>

) {}

    async createPermission(createPermissionDto: CreatePermissionDto) {
        const permission = await this.permissionModels.create(createPermissionDto);
        return {
            message: 'Thêm thành công',
            permission
          };
    }

    async getAll() {
        return await this.permissionModels.find();
    }

    async getPermissionsByUser(id: string) {
      // // 1. Tìm user và chỉ populate trường 'role', không lấy toàn bộ trường của role
      // const user: any = await this.userModel
      //   .findOne({ _id: id })
      //   .populate({
      //     path: 'role', // Populate role
      //     select: 'name permissions' // Chỉ lấy trường 'name' và 'permissions' từ role
      //   })
      //   .exec();
  
      // if (!user || !user.role) {
      //   throw new Error('User or role not found');
      // }
  
      // // 2. Lấy role và chỉ populate các quyền (permissions), lấy thông tin cụ thể từ permissions
      // const role = await this.roleModel
      //   .findOne({ _id: user.role._id })
      //   .populate({
      //     path: 'permissions', // Populate permissions
      //     select: 'name apiPath method module' // Chỉ lấy các trường cần thiết từ permissions
      //   })
      //   .exec();
  
      // if (!role || !role.permissions) {
      //   throw new Error('Role or permissions not found');
      // }
  
      // // 3. Trả về danh sách quyền (permissions) của user
      // return role.permissions;
      const user: any = await this.userModel
      .findOne({ _id: id })   
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

      

    if (!user || !user.role) {
      throw new Error('User or role not found');
    }

    return user.role.permissions;
    }
    
    /**
     * PUT: Cập nhật quyền của ROLE
     * @param id
     * @param Array[] permissions
     * @returns {any}
     */

    async updateRolePermissions(id: string, permissions: any[]): Promise<any> {
      console.log('permissions', permissions);
      try {
        const updatedRole = await this.roleModel.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: {
              permissions: permissions.map((permission) => permission._id),
            },
          },
          {
            new: true,
          }
        )

        return updatedRole;
      } catch (error) {
        throw error;
      }
    }
}
