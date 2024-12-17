import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notify, NotifySchema } from './schemas/notify.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Notify.name, schema: NotifySchema }]),],
  controllers: [NotifyController],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
