import { Injectable } from '@nestjs/common';
import { PostsService } from './modules/posts/posts.service';

@Injectable()
export class AppService {
  constructor(private readonly postService: PostsService) {}

  // async onModuleInit() {
  //   console.log('Đang đồng bộ tất cả bài đăng từ MongoDB vào Elasticsearch...');
  //   await this.postService.syncAllPostsToElasticsearch();
  // }
}
