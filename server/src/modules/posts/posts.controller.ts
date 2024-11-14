import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
// import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

//---------------------------------------POST---------------------------------------------
  /**
   * 
   * POST: api/posts/
   */
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
//---------------------------------------GET---------------------------------------------
  /**
   * GET: api/posts/me
   * @param req 
   * @returns 
   */
  @Get('me')
  // @UseGuards(AuthGuard)
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

}
