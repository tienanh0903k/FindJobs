import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas/review.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>
  ) { }


  async create(createReviewDto: CreateReviewDto, userId: string) {
    try {
      const review = new this.reviewModel({
        ...createReviewDto,
        userId,
      });
      return await review.save();
    } catch (error) {
      if (error.code === 11000) { 
        throw new BadRequestException('Bạn chỉ được đánh giá 1 lần cho mục này.');
      }
      throw error;
    }
  }





  //get stats review
  async getReviewStats(targetId: string) {
    const result = await this.reviewModel.aggregate([
      { $match: { companyId: targetId } },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 },
        },
      },
    ]);
    console.log('result', result);

    // Tổng số đánh giá
    const totalReviews = result.reduce((sum, r) => sum + r.count, 0);

    // Mảng count theo sao 1-5
//     (10*1) + (5*2) + (20*3) + (30*4) + (35*5) 
// = 10 + 10 + 60 + 120 + 175 = 375
    const counts = [1, 2, 3, 4, 5].map((star) => {
      const found = result.find((r) => r._id === star);
      return found ? found.count : 0;
    });

    // Tính điểm trung bình
    const average =
      counts.reduce((sum, count, idx) => sum + count * (idx + 1), 0) / totalReviews || 0;

    return {
      totalReviews,
      counts,
      average: Number(average.toFixed(1)),
    };
  }



  //get reviews
  async getReviews(targetId: string) {
    const result = await this.reviewModel
      .find({ companyId: targetId })
      .sort({ createdAt: -1 })
      .populate(
        {
          path: 'userId',
          model: 'User',
          select: 'name avatar',
        }
      )
      .lean();
    return result;
  }












  

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
