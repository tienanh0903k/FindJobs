import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';


@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.createPermission(createPermissionDto);
  }

  /**
   * POST: /api/role/:id/permissions
   */
  @Put(':id/roles')
  async updatePermissionsToRole(
    @Param('id') roleId: string,
    @Body() req,
  ): Promise<any> {
    try {
      if (
        !req.permissions
      ) {
        return { message: `Role with ID ${roleId} not found` };
      }
      return this.permissionsService.updateRolePermissions(roleId, req.permissions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //get
  @Get()
  async findAll() {
    return this.permissionsService.getAll();
  }
}
