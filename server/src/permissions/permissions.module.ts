import { forwardRef, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission, PermissionSchema } from './schemas/permission.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  
  ],
  providers: [PermissionsService],
  controllers: [PermissionsController],
  exports: [
    PermissionsService
  ]
})
export class PermissionsModule {}
