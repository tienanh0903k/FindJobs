import { Module } from '@nestjs/common';
import { ElasticsearchController } from './elasticsearch.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticSearchService } from './elasticsearch.service';


@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        //node: 'http://localhost:9200'
        node: 'http://160.191.244.41:9200'
      }),
    }), 
  ],
  controllers: [ElasticsearchController],
  providers: [ElasticSearchService],
  exports: [
    ElasticSearchService
  ]
})
export class ElasticSearchModule {}
