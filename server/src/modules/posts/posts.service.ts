import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './schemas/post.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { AnyObject, Model } from 'mongoose';
import { ElasticSearchService } from '../elasticsearch/elasticsearch.service';

@Injectable()
export class PostsService implements OnModuleInit {
  constructor(
    @InjectModel(Post.name) private postsModel: Model<Post>,
    private readonly esService: ElasticSearchService,
  ) {}


  //--------------------------------------SYNC BY CHANGE STREAM---------------------------------------
  async onModuleInit() {
    await this.syncExistingData();

    const changeStream = this.postsModel.watch();
    changeStream.on('change', async (change) => {
      const { operationType, fullDocument } = change;
      switch (operationType) {
        case 'insert':
          await this.esService.indexPost(fullDocument);
          break;
      }
    })
  }

  async syncExistingData() {
    const posts = await this.postsModel.find().exec();
    for (const post of posts) {
      await this.esService.indexPost(post);
    }
  }


  //---------------------------------------POST-------------------------------------------------
  /**
   * Them tin moi
   * @param createJobPostingDto
   * @returns
   */
  // async create(createJobPostingDto: CreatePostDto): Promise<any> {
  //   await this.esService.indexPost(createJobPostingDto);

  //   return await this.postsModel.create(createJobPostingDto);
  // }

  async create(createJobPostingDto: CreatePostDto): Promise<any> {
    // const createdPost = await this.postsModel.create(createJobPostingDto);

    try {
      const createdPost = await this.esService.indexPost(createJobPostingDto);
      return createdPost;
    } catch (error) {
      console.error('Elasticsearch sync failed', error);
    }
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



  /**
   * Search job postings using Elasticsearch
   * 
   * @param {string} query - The search query
   * @returns {Promise<any[]>} - The search results
   */
    async searchPosts(query: string): Promise<any[]> {
      try {


        const matchQuery = {
          match: {
            "position": {
              "query": query,
              "fuzziness": "AUTO",  
              "prefix_length": 1  
            }
          }
        };

        
        const posts = await this.esService.search('posts_index', matchQuery, ['position', 'companyName', 'salary'], 10, 0);

        console.log(posts);

        return posts;
      } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        throw error;
      }
    }


}
