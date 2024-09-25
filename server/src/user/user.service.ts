import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { HashingUtil } from 'src/utils/bcrypt.util';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModels: Model<User>,
    private readonly uploadsService: UploadsService
) {}
  
  async create(dataUser: CreateUserDto) {
    const hashed = await HashingUtil.hashPassword(dataUser.password);
    const user = await this.userModels.create({
      userName: dataUser.userName,
      email: dataUser.email,
      password: hashed,
      role: dataUser.role
    })
    console.log(dataUser);
    return {
      message: 'User created successfully',
      user
    };
  }


  //add avatar
  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatarUrl = await this.uploadsService.uploadFile(
      'uploads/avatars',
      {
        file: {
          buffer: imageBuffer,
          mimetype: 'image/jpeg',
          size: imageBuffer.length,
        } as Express.Multer.File,

        fileName: filename
      }
    )
    const user = await this.userModels.findOne({
      _id: userId
    });
    console.log(user);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userModels.updateOne(
      { _id: userId },
      { $set: { avatar: avatarUrl } }
    );
  
    return avatarUrl;
  }


  async getProfile(userId: string): Promise<User> {
    return this.userModels.findById(userId).exec();
  }

  findAll() {
    const list = this.userModels.find()
    return list
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found user')
    }
    return this.userModels.findOne({
      _id: id
    })
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModels.updateOne({_id: updateUserDto._id}, {
      ...updateUserDto
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }



  findOneByName(username: string) {
    return this.userModels.findOne(
      { email: username }
    )
  }

  //find user by token
  async findUserById(userId: string) {
    return this.userModels.findById(userId).exec();
  }

  //set token
   // Hàm cập nhật refresh token cho user
   async updateUserRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userModels.updateOne({ _id: userId }, { refreshToken }).exec();
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
}
