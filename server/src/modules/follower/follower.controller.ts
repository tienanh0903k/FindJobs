import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { ResponseMessage } from '../auth/decorator/response_message.decorator';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}


  @Get(':companyId/:userId')
  async isFollowingCompany(
    @Param('companyId') companyId: string,
    @Param('userId') userId: string
  ) {
    return await this.followerService.isFollowingCompany(userId, companyId);
  }



  @Post()
  @ResponseMessage('User has followed the company successfully')
  async followCompany(@Body('userId') userId: string, @Body('companyId') companyId: string) {
    return this.followerService.followCompanyService(userId, companyId);
  }
  
  
  @Delete()
  @ResponseMessage('User has unfollowed the company successfully')
  async unFollow(@Body('userId') userId: string, @Body('companyId') companyId: string) {
    return this.followerService.unFollowCompanyService(userId, companyId);
  }
  
}
