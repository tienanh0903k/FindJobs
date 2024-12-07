import { Controller } from '@nestjs/common';
import { ElasticSearchService } from './elasticsearch.service';

@Controller('elasticsearch')
export class ElasticsearchController {
  constructor(private readonly elasticsearchService: ElasticSearchService) {}
}
