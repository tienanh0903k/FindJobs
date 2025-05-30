// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   NotFoundException,
//   UseGuards,
//   Req,
//   UploadedFile,
//   UseInterceptors,
//   Query,
// } from '@nestjs/common';
// import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { AuthGuard } from '../auth/guards/auth.guard';
// import { Roles } from '../auth/decorator/roles.decorator';
// // import { RolesGuard } from '../auth/guards/roles.guard';
// import { PermissionsGuard } from '../auth/guards/permission.guard';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { CreateProjectDto } from './dto/general-dto';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   // ======================= GET APIs =======================

//   /**
//    * Lấy tất cả user theo role và status (tab user manager)
//    */
//   @Get('by-role')
//   async getUsersByRoleId(
//     @Query('roleId') roleId?: string,
//     @Query('status') status?: string,
//   ) {
//     return this.userService.findAllUsersByRoleId(roleId, status);
//   }

//   /**
//    * Lấy toàn bộ danh sách user (chỉ HR mới xem được)
//    */
//   @Get()
//   @Roles('HR')
//   @UseGuards(AuthGuard, PermissionsGuard)
//   findAll() {
//     return this.userService.findAll();
//   }

//   /**
//    * Lấy profile user hiện tại (token)
//    */
//   @Get('me')
//   @UseGuards(AuthGuard)
//   async getProfile(@Req() req: any) {
//     return this.userService.getProfile(req.user.sub);
//   }

//   /**
//    * Lấy user theo ID
//    */
//   @Get(':id')
//   async getUserById(@Param('id') id: string) {
//     const user = await this.userService.findOne(id);
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return user;
//   }

//   // ======================= POST APIs =======================

//   /**
//    * Tạo mới user
//    */
//   @Post()
//   async create(@Body() createUser: CreateUserDto) {
//     try {
//       return await this.userService.create(createUser);
//     } catch (error) {
//       console.error('Lỗi khi tạo người dùng:', error);
//       return {
//         message: error.message || 'Đã xảy ra lỗi khi tạo người dùng',
//       };
//     }
//   }

//   // ----------- Profile Section: Add Project ------------
//   /**
//    * Thêm dự án cho user profile
//    */
//   @Post(':userId/projects')
//   addProject(@Param('userId') userId: string, @Body() dto: CreateProjectDto) {
//     return this.userService.addProject(userId, dto);
//   }

//   // ======================= PATCH APIs =======================

//   /**
//    * Cập nhật trạng thái user (active/inactive)
//    */
//   @Patch(':id/status')
//   async updateStatus(
//     @Param('id') id: string,
//     @Body() body: { status: number },
//   ) {
//     return this.userService.updateStatus(id, body.status);
//   }

//   /**
//    * Cập nhật toàn bộ thông tin user (Admin/HR)
//    */
//   @Patch(':id')
//   async updateUser(
//     @Param('id') id: string,
//     @Body() updateUserDto: UpdateUserDto,
//   ) {
//     return this.userService.updateUserInfo(id, updateUserDto);
//   }

//   /**
//    * Cập nhật quyền (role) cho user
//    */
//   @Patch(':id/role')
//   async updateRole(@Param('id') id: string, @Body() body: { role: string }) {
//     return this.userService.updateRole(id, body.role);
//   }

//   /**
//    * Upload avatar user
//    */
//   @Post('/avatar/:id')
//   // @Roles('ADMIN')
//   // @UseGuards(AuthGuard, RolesGuard)
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadAvatar(
//     @Param('id') id: number,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     const avatarUrl = await this.userService.addAvatar(
//       id,
//       file.buffer,
//       file.originalname,
//     );
//     return {
//       message: 'Tải lên thành công',
//       avatarUrl,
//     };
//   }

//   /**
//    * Cập nhật thông tin user hiện tại (self update)
//    */
//   @Patch('me')
//   @UseGuards(AuthGuard)
//   update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
//     const userId = req.user.sub;
//     const isPermissions = req.userPermissions;

//     if (!isPermissions && !userId) {
//       throw new NotFoundException(
//         `Bạn không có quyền cập nhật thông tin người dùng`,
//       );
//     }
//     return this.userService.updateUserInfo(userId, updateUserDto);
//   }

//   // ======================= DELETE APIs =======================

//   /**
//    * Xóa user
//    */
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.userService.remove(+id);
//   }
// }

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
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
// import { RolesGuard } from '../auth/guards/roles.guard';
import { PermissionsGuard } from '../auth/guards/permission.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto } from './dto/general-dto';
// import { Roles } from '../auth/decorator/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // --------------------API GET--------------------------//

  //get for tab user manager
  // @Get('by-role')
  // async getUsersByRoleId(@Query('roleId') roleId?: string) {
  //   return this.userService.findAllUsersByRoleId(roleId);
  // }

  @Get('bookmark')
  @UseGuards(AuthGuard)
  async getBookmarks(@Req() req: any) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    console.log('getBookmarks userId:', userId); // Debug
    const bookmarks = await this.userService.getBookmarks(userId);
    return { bookmark: bookmarks };
  }



  
  @Get('by-role')
  async getUsersByRoleId(
    @Query('roleId') roleId?: string,
    @Query('status') status?: string,
  ) {
    return this.userService.findAllUsersByRoleId(roleId, status);
  }


  @Get('applicant')
  async getCandidates(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    // console.log('page', page);
    // console.log('limit', limit);
    return this.userService.getCandidates(Number(page), Number(limit));
  }

  @Get()
  @Roles('HR')
  @UseGuards(AuthGuard, PermissionsGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('balance/:id')
  async getBalance(@Param('id') id: string) {
    return this.userService.getBalance(id);
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

  // -------------------------------API POST--------------------------------------------//
  @Post()
  async create(@Body() createUser: CreateUserDto) {
    try {
      return await this.userService.create(createUser);
    } catch (error) {
      console.error('Lỗi khi tạo người dùng:', error);
      return {
        message: error.message || 'Đã xảy ra lỗi khi tạo người dùng',
      };
    }
  }

  //----------------------------- start add labels profile ----------------------------
  @Post(':userId/projects')
  addProject(@Param('userId') userId: string, @Body() dto: CreateProjectDto) {
    return this.userService.addProject(userId, dto);
  }

  // -----------------------------API Patch------------------------------------------//

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

    console.log('updateUserDto', updateUserDto);

    if (!isPermissions && !userId) {
      throw new NotFoundException(
        `Ban khong co quyen cap nhat thong tin nguoi dung`,
      );
    }
    return this.userService.updateUserInfo(userId, updateUserDto);
    // return '';
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: number },
  ) {
    return this.userService.updateStatus(id, body.status);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserInfo(id, updateUserDto);
  }

  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.userService.updateRole(id, body.role);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // xoa item
  @Delete(':userId/:arrayField/:itemId')
  async removeItemFromArrayField(
    @Param('userId') userId: string,
    @Param('arrayField') arrayField: string,
    @Param('itemId') itemId: string,
  ) {
    try {
      const updatedUser = await this.userService.removeItemFromArrayField(
        userId,
        arrayField,
        itemId,
      );
      return {
        message: 'Xóa phần tử thành công',
        data: updatedUser,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Có thể thêm xử lý lỗi khác ở đây
      throw new NotFoundException('Có lỗi khi xóa phần tử');
    }
  }



  // bookma


  @Post('bookmark/:postId')
  @UseGuards(AuthGuard)
  async addBookmarkPost(@Req() req: any, @Param('postId') postId: string) {
    const userId = req.user?.sub; // Sửa từ req.user._id thành req.user.sub
    if (!userId) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    if (!postId || !postId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException('Invalid Post ID', HttpStatus.BAD_REQUEST);
    }
    console.log('addBookmarkPost userId:', userId, 'postId:', postId); // Debug
    const user = await this.userService.addBookmarkPost(userId, postId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Đã bookmark bài viết',
      bookmark: user.bookmark || [],
    };
  }

  @Delete('bookmark/:postId')
  @UseGuards(AuthGuard)
  async removeBookmarkPost(@Req() req: any, @Param('postId') postId: string) {
    const userId = req.user?.sub; // Sửa từ req.user._id thành req.user.sub
    if (!userId) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    if (!postId || !postId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException('Invalid Post ID', HttpStatus.BAD_REQUEST);
    }
    console.log('removeBookmarkPost userId:', userId, 'postId:', postId); // Debug
    const user = await this.userService.removeBookmarkPost(userId, postId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Đã hủy bookmark bài viết',
      bookmark: user.bookmark || [],
    };
  }

}
