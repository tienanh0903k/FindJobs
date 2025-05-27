import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { HashingUtil } from 'src/utils/bcrypt.util';
import { UploadsService } from '../uploads/uploads.service';
import { CreateProjectDto } from './dto/general-dto';
import { role } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModels: Model<User>,
    private readonly uploadsService: UploadsService,
  ) {}

  //get all user
  // async findAllUsersByRoleId(roleId?: string) {
  //   const filter: any = {};
  //   if (roleId) {
  //     filter.role = roleId;
  //   }
  //   console.log('filter', filter);

  //   return this.userModels.find(filter).populate('role').exec();
  // }

  async findAllUsersByRoleId(roleId?: string, status?: string | number) {
    const filter: any = {};

    if (roleId) {
      if (!Types.ObjectId.isValid(roleId)) {
        throw new Error('Invalid roleId');
      }
      filter.role = roleId;
    }

    if (status !== undefined && status !== null) {
      const statusNum =
        typeof status === 'string' ? parseInt(status, 10) : status;
      if (statusNum === 0 || statusNum === 1) {
        filter.status = statusNum;
      } else {
        throw new Error('Invalid status value, must be 0 or 1');
      }
    }

    //console.log('filter', filter);

    return this.userModels.find(filter).populate('role').exec();
  }

  async create(dataUser: CreateUserDto) {
    try {
      const existingUser = await this.userModels.findOne({
        email: dataUser.email,
      });
      if (existingUser) {
        throw new Error('Email này đã tồn tại!');
      }
      const hashed = await HashingUtil.hashPassword(dataUser.password);
      // const user = await this.userModels.create({
      //   userName: dataUser.userName,
      //   email: dataUser.email,
      //   password: hashed,
      //   role: dataUser.role,
      // });
      const user = await this.userModels.create({
        ...dataUser,
        password: hashed,
      });
      console.log(dataUser);
      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      console.error('Lỗi khi tạo người dùng:', error);
      throw new Error(error.message || 'Đã xảy ra lỗi khi tạo người dùng');
    }
  }

  //add avatar
  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatarUrl = await this.uploadsService.uploadFile('uploads/avatars', {
      file: {
        buffer: imageBuffer,
        mimetype: 'image/jpeg',
        size: imageBuffer.length,
      } as Express.Multer.File,

      fileName: filename,
    });
    const user = await this.userModels.findOne({
      _id: userId,
    });
    console.log(user);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userModels.updateOne(
      { _id: userId },
      { $set: { avatar: avatarUrl } },
    );

    return avatarUrl;
  }

  //----------------------------- start add labels profile -----------------------------

  async addProject(userId: string, dto: CreateProjectDto) {
    return this.userModels.findByIdAndUpdate(
      userId,
      { $push: { projects: dto } }, ///$push is used to add a new item to an array
      { new: true },
    );
  }

  //------------------------------end add labels profile ------------------------------

  async getProfile(userId: string): Promise<User> {
    return this.userModels.findById(userId).exec();
  }

  findAll() {
    const list = this.userModels.find();
    return list;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found user');
    }
    return this.userModels.findOne({
      _id: id,
    });
  }

  // /**
  //  * Update user
  //  * @param updateUserDto - Data to update
  //  * @returns Updated user
  //  */
  //     async updateUserInfo(id: string, updateUserDto: UpdateUserDto) {
  //       console.log('updateUserDto', updateUserDto);
  //       const updateFields = {};

  //       Object.keys(updateUserDto).forEach((key) => {
  //         if (updateUserDto[key] !== undefined && updateUserDto[key] !== null) {
  //           updateFields[key] = updateUserDto[key];
  //         }

  //       });

  //       const updated = await this.userModels
  //         .findOneAndUpdate(
  //           { _id: id },
  //           { $set: updateFields },
  //           {
  //             new: true,
  //             runValidators: true,
  //           },
  //         )
  //         .exec();

  //       return updated;
  //     }


  //get balance 
  async getBalance(userId: string): Promise<number> {
    const user = await this.userModels.findById(userId).select('balance');
    if (!user) throw new NotFoundException('User not found');
    return user.balance ?? 0;
  }






  async updateUserInfo(id: string, updateUserDto: UpdateUserDto) {
    const updateSetFields: Record<string, any> = {};
    const updatePushFields: Record<string, any> = {};

    // Các trường dạng mảng mà bạn muốn xử lý thêm phần tử
    const arrayFields = [
      'education',
      'workExperience',
      'skills',
      'projects',
      'certifications',
      'awards',
    ];

    Object.keys(updateUserDto).forEach((key) => {
      const value = updateUserDto[key];
      if (value !== undefined && value !== null) {
        if (arrayFields.includes(key) && Array.isArray(value)) {
          // Nếu trường là mảng, dùng $push với $each để thêm phần tử mới
          updatePushFields[key] = { $each: value };
        } else {
          updateSetFields[key] = value;
        }
      }
    });

    // Tạo object update cuối cùng
    const updateQuery: any = {};
    if (Object.keys(updateSetFields).length > 0) {
      updateQuery['$set'] = updateSetFields;
    }
    if (Object.keys(updatePushFields).length > 0) {
      updateQuery['$push'] = updatePushFields;
    }

    const updated = await this.userModels
      .findOneAndUpdate({ _id: id }, updateQuery, {
        new: true,
        runValidators: true,
      })
      .exec();

    return updated;
  }

  // xoa mang con
  async removeItemFromArrayField(
    userId: string,
    arrayField: string,
    itemId: string,
  ) {
    // Tạo điều kiện pull động
    const pullCondition = { [arrayField]: { _id: itemId } };

    // Cập nhật user, xóa phần tử trong mảng tương ứng
    const updatedUser = await this.userModels.findByIdAndUpdate(
      userId,
      { $pull: pullCondition },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User không tồn tại');
    }

    return updatedUser;
  }






  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findOneByName(username: string) {
    return this.userModels.findOne({ email: username });
  }

  //find user by token
  async findUserById(userId: string) {
    return this.userModels.findById(userId).exec();
  }

  //set token
  // Hàm cập nhật refresh token cho user
  async updateUserRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userModels.updateOne({ _id: userId }, { refreshToken }).exec();
  }

  // Tìm người dùng theo email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModels.findOne({ email }).exec();
  }

  //------------------- get permission by user id------------------------------
  // async getPermissionsByUserId(userId: string) {
  //   const user = await this.userModels.findById(userId).populate({
  //     path: 'roles',
  //     // Nếu cần thêm thông tin liên quan đến permissions trong roles
  //     // populate: { path: 'permissions' } // chỉ sử dụng nếu 'roles' cũng có tham chiếu tới 'permissions'
  //   })

  //   console.log(user);
  // }

  // Sửa status
  async updateStatus(id: string, status: number) {
    if (![0, 1].includes(status))
      throw new BadRequestException('Invalid status');
    const user = await this.userModels.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateRole(id: string, role: string) {
    console.log('role', role);
    if (!role) throw new BadRequestException('Role is required');
    const user = await this.userModels.findByIdAndUpdate(
      id,
      { role },
      { new: true },
    );
    if (!user) throw new NotFoundException('User not found');
    return user;
  }









  //=========================APPLICANT============================
  async getCandidates(page = 1, limit = 10) {

    const query = { role: role.USER}; 
    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      this.userModels.find(query).skip(skip).limit(limit).exec(),
      this.userModels.countDocuments(query)
    ]);

    return {
      results,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  
}
