import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follower, FollowerDocument } from './schema/follower.schema';
import { Companies, CompaniesDocument } from '../companies/schemas/company.schema';
import { Model } from 'mongoose';

@Injectable()
export class FollowerService {
  constructor(
    @InjectModel(Follower.name) private followModel: Model<FollowerDocument>,
    @InjectModel(Companies.name) private companyModel: Model<CompaniesDocument>,
  ) {}

  /**
   * Follow a company.
   *
   * @param userId - The id of the user.
   * @param companyId - The id of the company.
   *
   * @throws {NotFoundException} - If the company is not found.
   *
   * @returns A Promise that resolves to the newly created follower document if the user is not already following the company, otherwise resolves to the existing follower document.
   */
  async followCompanyService(userId: string, companyId: string) {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new NotFoundException('Company not found');

    const existingFollower = await this.followModel.findOne({
      userId,
      companyId,
    });
    if (!existingFollower) {
      const follow = await this.followModel.create({ userId, companyId });
      await this.companyModel.updateOne(
        { _id: companyId },
        { $inc: { followers: 1 } },
      );
      return follow;
    }

    return existingFollower;
  }


  /**
   * Unfollow a company.
   *
   * @param userId - The id of the user.
   * @param companyId - The id of the company.
   *
   * @throws {NotFoundException} - If the company is not found.
   *
   * @returns A Promise that resolves to an object with a message indicating whether the user was following the company or not. If the user was not following the company, the message is 'User is not following this company'. If the user was following the company, the message is 'Unfollowed company successfully'.
   */
  async unFollowCompanyService(userId: string, companyId: string) {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new NotFoundException('Company not found');

    const existingFollower = await this.followModel.findOne({
      userId,
      companyId,
    });
    if (existingFollower) {
      await this.followModel.deleteOne({ _id: existingFollower._id });
      await this.companyModel.updateOne(
        { _id: companyId },
        { $inc: { followerCount: -1 } },
      );
      return { message: 'Unfollowed company successfully' };
    }

    return { message: 'User is not following this company' };
  }



  /**
   * Check if a user is following a company.
   *
   * @param userId - The id of the user.
   * @param companyId - The id of the company.
   *
   * @returns A Promise that resolves to a boolean indicating whether the user is following the company or not.
   */
  async isFollowingCompany(userId: string, companyId: string) {
    return !!await this.followModel.findOne({ userId, companyId });
  }




}
