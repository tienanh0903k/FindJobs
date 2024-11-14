import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchemas } from './schemas/post.schemas';
import { PermissionsModule } from '../permissions/permissions.module';
import { AuthModule } from '../auth/auth.module';
// import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchemas }]),
    PermissionsModule,
    AuthModule,
    // CompaniesModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
