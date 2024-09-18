import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { Model } from 'mongoose';
import { CreatePermissionDto } from './dto/create-permission.dto';


@Injectable()
export class PermissionsService {
    constructor(@InjectModel(Permission.name) private permissionModels: Model<Permission>) {}

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
}
