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

  async createJobPosting(createJobPostingDto: CreatePostDto): Promise<any> {
    try {
      const newJobPosting = await this.postsModel.create(createJobPostingDto);
      const indexedJobPosting = await this.esService.indexPost(newJobPosting);

      console.log('indexedJobPosting', indexedJobPosting);
      
      return indexedJobPosting;
    } catch (error) {
      console.error('Lỗi trong quá trình tạo bài đăng hoặc đồng bộ Elasticsearch:', error);
      
      throw new Error('Không thể tạo bài đăng hoặc đồng bộ với Elasticsearch.');
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
    // async searchPosts(query: any): Promise<any[]> {
    //   try {

    //     const {
    //       companyType,
    //       experience,
    //       jobType,
    //       location,
    //       position,
    //       salary,
    //     } = query;
    //     console.log('query', query);

    //     console.log('Parsed Query:', {
    //       companyType,
    //       experience,
    //       jobType,
    //       location,
    //       position,
    //       salary,
    //     });


    //     const matchQuery = {
    //       match: {
    //         "position": {
    //           "query": query,
    //           "fuzziness": "AUTO",  
    //           "prefix_length": 1  
    //         }
    //       }
    //     };
        
    //     const posts = await this.esService.search('posts_index', matchQuery, ['position', 'companyName', 'salary', 'companyId'], 10, 0);

    //     console.log(posts);

    //     return posts;
    //   } catch (error) {
    //     console.error('Lỗi tìm kiếm:', error);
    //     throw error;
    //   }
    // }

    async searchPosts(query: any): Promise<any[]> {
      try {
        const { companyType, experience, jobType, location, position, salary } = query;
    
        console.log('Parsed Query:', {
          companyType,
          experience,
          jobType,
          location,
          position,
          salary,
        });
    
        const esQuery: any = {
          bool: {
            must: [],  
            filter: [], 
          },
        };
    
        if (position) {
          esQuery.bool.must.push({
            match: {
              position: {
                query: position,
                fuzziness: 'AUTO',
                prefix_length: 1,  
              },
            },
          });
        }
    
        if (companyType) {
          esQuery.bool.filter.push({
            term: { companyType },
          });
        }
    
        if (experience) {
          esQuery.bool.filter.push({
            range: {
              experience: {
                gte: parseInt(experience, 10),
              },
            },
          });
        }
    
        if (jobType) {
          esQuery.bool.filter.push({
            term: { jobType },
          });
        }
    
        if (location) {
          esQuery.bool.filter.push({
            match: {
              location: {
                query: location,
                fuzziness: 'AUTO',
              },
            },
          });
        }
    
        if (salary) {
          esQuery.bool.filter.push({
            range: {
              salary: {
                gte: parseInt(salary, 10), 
              },
            },
          });
        }
    
        console.log('Elasticsearch Query:', JSON.stringify(esQuery, null, 2));
    
        const posts = await this.esService.search(
          'posts_index', 
          esQuery,
          ['position', 'companyName', 'salary', 'companyType', 'experience', 'location'], 
          10,
          0 
        );
    
        console.log('Search Results:', posts);
    
        return posts;
      } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        throw error;
      }
    }
    


}
