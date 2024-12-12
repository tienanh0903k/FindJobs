import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Follower, FollowerSchema } from './schema/follower.schema';
import { Companies, CompaniesSchema } from '../companies/schemas/company.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Follower.name, schema: FollowerSchema },
    ]),
    MongooseModule.forFeature([
      { name: Companies.name, schema: CompaniesSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
