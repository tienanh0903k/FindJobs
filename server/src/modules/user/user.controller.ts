import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PermissionsGuard } from '../auth/guards/permission.guard';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Roles } from '../auth/decorator/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // --------------------API GET--------------------------//

  @Get()
  @Roles('HR')
  @UseGuards(AuthGuard, PermissionsGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: any) {
    return this.userService.getProfile(req.user.sub);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // --------------------API POST--------------------------//
  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Post('/avatar/:id')
  // @Roles('ADMIN')
  // @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatarUrl = await this.userService.addAvatar(
      id,
      file.buffer,
      file.originalname,
    );

    return {
      message: 'Tai len thanh cong',
      avatarUrl,
    };
  }



  /**
   * Update user information
   * @param req - Request
   * @param updateUserDto - Data to update
   * @returns Updated user
   */
  @Patch('me')
  @UseGuards(AuthGuard)
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.sub;
    const isPermissions = req.userPermissions;

    if (!isPermissions && !userId) {
      throw new NotFoundException(
        `Ban khong co quyen cap nhat thong tin nguoi dung`,
      );
    }
    return this.userService.updateUserInfo(userId, updateUserDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
