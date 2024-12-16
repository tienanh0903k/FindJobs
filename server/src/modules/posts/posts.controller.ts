import { Controller, Get, Post, Body, Req, Param, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
// import { AuthGuard } from '../auth/guards/auth.guard';
import { ElasticSearchService } from '../elasticsearch/elasticsearch.service';
import { ResponseMessage } from '../auth/decorator/response_message.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly elasticsearchDataService: ElasticSearchService,
  ) {}

  @Post('seed-user')
  async seedUserData() {
    await this.elasticsearchDataService.seedUserData();
    return { message: 'User data seeded successfully!' };
  }

  //---------------------------------------POST---------------------------------------------
  /**
   *
   * POST: api/posts/
   */
  @Post()
  @ResponseMessage("Create post successfully")
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createJobPosting(createPostDto);
  }
  //---------------------------------------GET---------------------------------------------
  /**
   * GET: api/posts/me
   * @param req
   * @returns
   */
  @Get('me')
  @UseGuards(AuthGuard)
  async getMyPost(@Req() req: any) {
    //console.log("----",req.header);
    return this.postsService.findOne(req.user.sub);
  }

  // @Get()
  // getAllPost() {
  //   return this.postsService.findAll();
  // }

  /**
   * GET: api/posts
   * get post preview in home page
   */
  @Get('home')
  getPostForHome() {
    return this.postsService.getPost();
  }

  /**
   * GET: api/posts/:id
   * get post detail
   */
  @Get(':id')
  async getPost(@Param('id') id: string) {
    const post = await this.postsService.findById(id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  /**
   * POST: api/posts/search
   */
  @Post('search')
  async search(@Query('query') query: any) {
    try {
      const result = await this.postsService.searchPosts(query);
      console.log(query);
      return result;
    } catch (error) {
      console.error('Lỗi tìm kiếm bài đăng:', error);
      throw error;
    }
  }
}
