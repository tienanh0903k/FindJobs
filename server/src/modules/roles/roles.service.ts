import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Roles } from './schemas/role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) private roleModel: Model<Roles>) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const newRole = await this.roleModel.create(createRoleDto);
    return {
      message: 'Thêm thành công',
      newRole,
    };
  }

  async getRoleById(roleId: string) {
    return this.roleModel.findById(roleId).populate('permissions');
  }

  //get role by id service
  async getRoleId(id: string) {
    try {
      const role = await this.roleModel.findOne({
        _id: id,
      });
      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
      return role;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while retrieving role: ${error.message}`,
      );
    }
  }

  async getRoleIdPer(id: string): Promise<Roles> {
    try {
      const role = await this.roleModel.findById(id).populate({
        path: 'permissions',
        model: 'Permission',
        select: 'name apiPath method module',
      });
      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
      console.log(role);
      return role;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while retrieving role: ${error.message}`,
      );
    }
  }

  async getAllRoles() {
    return this.roleModel.find();
  }


  //get name user 
  async findByName(name: string): Promise<Roles | null> {
    return this.roleModel.findOne({ name }).exec();
  }
}
