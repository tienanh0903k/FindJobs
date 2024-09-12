import { Body, Controller, Post } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';


@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @Post()
    async create(@Body() createPermissionDto: CreatePermissionDto) {
      return this.permissionsService.createPermission(createPermissionDto);
    }
   
}
