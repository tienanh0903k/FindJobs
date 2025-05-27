import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Query,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
// import { AuthGuard } from '../auth/guards/auth.guard';
// import { ElasticSearchService } from '../elasticsearch/elasticsearch.service';
import { ResponseMessage } from '../auth/decorator/response_message.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    // private readonly elasticsearchDataService: ElasticSearchService,
  ) {}

  // @Post('seed-user')
  // async seedUserData() {
  //   await this.elasticsearchDataService.seedUserData();
  //   return { message: 'User data seeded successfully!' };
  // }

  //---------------------------------------POST---------------------------------------------
  /**
   *
   * POST: api/posts/
   */
  @Post()
  @ResponseMessage('Create post successfully')
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
  // @Get()
  // async getPosts(
  //   @Query('categoryId') categoryId?: string,
  //   @Query('location') location?: string
  // ) {
  //   return this.postsService.getPost({ categoryId, location });
  // }


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




  //======================== UPDATE POST =========================
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, updatePostDto);
  }



  /**
   * POST: api/posts/search
   */
  @Post('search')
  async search(@Query() query: Record<string, any>) {
    try {
      //console.log('Original Query Params:', query);

      if (query.query && query.query.includes('=')) {
        const parsedParams = query.query.split('&').reduce(
          (acc, param) => {
            const [key, value] = param.split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
          },
          {} as Record<string, string>,
        );

        query = { ...query, ...parsedParams };
        delete query.query;
      }

      //console.log('Parsed Query Params:', query);

      // Gọi service xử lý
      const results = await this.postsService.searchPosts(query);
      return results;
    } catch (error) {
      console.error('Error during search:', error);
      throw error;
    }
  }


  /**
   * DELETE: api/posts/delete/:id
   * 
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
