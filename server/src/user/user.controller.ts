import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PermissionsGuard } from 'src/auth/guards/permission.guard';

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
    return this.userService.create(createUser)
  }


  @Post('/avatar/:id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard) 
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    const avatarUrl = await this.userService.addAvatar(
      id,
      file.buffer,
      file.originalname,
    )

    return {
      message: 'Tai len thanh cong',
      avatarUrl,
    }

  }




  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
