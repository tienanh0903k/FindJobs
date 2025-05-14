import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchemas } from './schemas/post.schemas';
import { PermissionsModule } from '../permissions/permissions.module';
import { AuthModule } from '../auth/auth.module';
// import { ElasticSearchService } from '../elasticsearch/elasticsearch.service';
// import { ElasticSearchModule } from '../elasticsearch/elasticsearch.module';
// import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchemas }]),
    PermissionsModule,
    AuthModule,
    // ElasticSearchModule
    // CompaniesModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
