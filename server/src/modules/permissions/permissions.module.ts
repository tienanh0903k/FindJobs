import { forwardRef, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission, PermissionSchema } from './schemas/permission.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Roles, RolesSchema } from '../roles/schemas/role.schema';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }])

  ],
  providers: [PermissionsService],
  controllers: [PermissionsController],
  exports: [
    PermissionsService
  ]
})
export class PermissionsModule {}
