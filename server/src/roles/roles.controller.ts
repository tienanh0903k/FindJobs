import { Body, Controller, Get, InternalServerErrorException, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }
  //get by id
  @Get(':id')
  async getOne(@Param('id') id: string) {
    try {
      const role = await this.rolesService.getRoleId(id);
      return role;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch role: ${error.message}`);    
    }
  }

  @Get()
  async getAllRoles() {
    return await this.rolesService.getAllRoles();
  }
}
