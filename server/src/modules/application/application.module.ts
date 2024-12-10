import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadsModule } from '../uploads/uploads.module';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { PostsModule } from '../posts/posts.module';
import { Post, PostSchemas } from '../posts/schemas/post.schemas';
import { AuthModule } from '../auth/auth.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchemas }]),
    MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }]),
    UploadsModule,
    PostsModule,
    AuthModule,
    PermissionsModule
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
