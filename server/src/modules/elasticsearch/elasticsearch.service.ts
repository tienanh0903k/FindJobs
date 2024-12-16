import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
// import { autocompleteAnalyzer, postMapping } from './mapping/search-mapping';

@Injectable()
export class ElasticSearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  private readonly ELASTICSEARCH_INDEX = 'posts_index';

  //   public async createIndex() {
  //     const index = this.ELASTICSEARCH_INDEX;
  //     const checkIndex = await this.esService.indices.exists({ index });
  //     if (!checkIndex) {
  //       await this.esService.indices.create({
  //         index,
  //         body: {
  //           mappings: postMapping,
  //           settings: autocompleteAnalyzer,
  //         },
  //       });
  //     }
  //   }

  public async createIndex() {
    const index = 'users_index';
    const checkIndex = await this.esService.indices.exists({ index });

    // Nếu index chưa tồn tại, tạo mới index
    if (!checkIndex) {
      await this.esService.indices.create({
        index,
        body: {
          settings: {
            number_of_shards: 1,
            number_of_replicas: 1,
          },
          mappings: {
            properties: {
              name: { type: 'text' },
              age: { type: 'integer' },
            },
          },
        },
      });
    }
  }

  // public async createIndex() {
  //   const index = this.ELASTICSEARCH_INDEX;
  //   const checkIndex = await this.esService.indices.exists({ index });

  //   if (!checkIndex) {
  //     await this.esService.indices.create({
  //       index: 'posts_index',
  //       body: {
  //         settings: {
  //           number_of_shards: 1,
  //           number_of_replicas: 1,
  //         },
  //         mappings: {
  //           properties: {
  //             position: { type: 'text' },
  //             description: { type: 'text' },
  //             requirements: { type: 'text' },
  //             companyName: { type: 'text' },
  //             location: { type: 'text' },
  //             salary: { type: 'text' },
  //             workingHours: { type: 'text' },
  //             deadline: { type: 'date' },
  //             contactInfo: { type: 'text' },
  //             status: { type: 'text' },
  //             postedDate: { type: 'date' },
  //             experience: { type: 'text' },
  //             numberOfPositions: { type: 'integer' },
  //             tags: {
  //               type: 'text',
  //               fields: {
  //                 keyword: {
  //                   type: 'keyword',
  //                   ignore_above: 256,
  //                 },
  //               },
  //             },
  //             isHot: { type: 'boolean' },
  //             companyId: { type: 'keyword' },
  //             userId: { type: 'keyword' },
  //           },
  //         },
  //       },
  //     });
  //   }
  // }

  async indexPost(post) {
    try {
      const postData = post.toObject ? post.toObject() : post;
      const { _id, ...postBody } =postData
      const result = await this.esService.index({
        index: this.ELASTICSEARCH_INDEX,
        id: _id.toString(),
        body: postBody,
      });
      return {
        id: result._id,
        index: result._index,
        version: result._version,
      }
    } catch (error) {
      console.error('Error indexing post:', error);
    }
  }

  public async seedUserData() {
    const userData = {
      name: 'Nguyễn Văn A',
      age: 25,
    };

    const index = 'users_index';
    const response = await this.esService.index({
      index,
      body: userData,
    });

    console.log('User data indexed successfully:', response);
  }

  // async search(index: string, query: any) {
  //   const { body } = await this.elasticsearchService.search({
  //     index,
  //     body: {
  //       query,
  //     },
  //   });
  //   return body.hits.hits;
  // }

  async search(
    index: string,
    query: any,
    fields: string[] = [],
    size: number = 10,
    from: number = 0,
  ) {
    try {
      const response = await this.esService.search({
        index,
        body: {
          query,
          _source: fields.length > 0 ? fields : [],
          size,
          from,
        },
      });

      const results = response.hits.hits.map((post: any) => ({
        id: post._id,
        ...post._source,
      }));

      return results;
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
      return [];
    }
  }
}
  
