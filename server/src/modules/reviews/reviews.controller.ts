import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Req() req: any) {
    const userId = req.user.sub;
    return this.reviewsService.create(createReviewDto, userId);
  }

 

  @Get('stats/:companyId')
  async getReviewStats(@Param('companyId') companyId: string) {
    return this.reviewsService.getReviewStats(companyId);
  }


  @Get('/:companyId')
  async getReviewsByCompany(@Param('companyId') companyId: string) {
    return this.reviewsService.getReviews(companyId);
  }
}
