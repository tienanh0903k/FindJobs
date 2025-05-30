import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UploadsModule } from '../uploads/uploads.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    PermissionsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    UploadsModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
})
export class UserModule {}
