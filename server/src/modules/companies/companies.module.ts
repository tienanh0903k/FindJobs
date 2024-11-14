import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesSchema } from './schemas/company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadsService } from '../uploads/uploads.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Companies', schema: CompaniesSchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, UploadsService],
})
export class CompaniesModule {}
