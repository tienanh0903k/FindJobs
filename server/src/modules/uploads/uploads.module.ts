import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
  imports: [ConfigModule] 
})
export class UploadsModule {}
