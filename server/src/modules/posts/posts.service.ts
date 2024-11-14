import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './schemas/post.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { AnyObject, Model } from 'mongoose';
import { Companies } from '../companies/schemas/company.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postsModel: Model<Post>,
  ) {}

  //---------------------------------------POST-------------------------------------------------
  /**
   * Them tin moi
   * @param createJobPostingDto
   * @returns
   */
  async create(createJobPostingDto: CreatePostDto): Promise<any> {
    return await this.postsModel.create(createJobPostingDto);
  }

  //---------------------------------------GET---------------------------------------------
  /**
   * Get by id
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<any[]> {
    const jobPosting = await this.postsModel.find({
      userId: id,
    });
    return jobPosting;
  }

  /**
   * Get by id onclick detail post
   */
  async findById(id: string): Promise<AnyObject> {
    const jobPosting = await this.postsModel.findOne({
      _id: id,
    });

    return jobPosting;
  }

  /**
   * Get posts for home page
   */
  async getPost(): Promise<any[]> {
    try {
      const posts = await this.postsModel
      .find()
      .select('position location salary')
      .populate({
        path: 'companyId',
        model: 'Companies',
        select: 'logo name',
      });
      //console.log('posts', posts);
      return posts;
    } catch (error) {
      console.error('⛔️ Lỗi: ', error);
    }
  }
}
