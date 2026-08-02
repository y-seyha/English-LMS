import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewItem, ReviewItemDocument } from './schemas/review-item.schema';
import type { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewItem.name) private reviewModel: Model<ReviewItemDocument>,
  ) {}

  async findPending(userId: string, query: PaginationDto): Promise<PaginatedResult<ReviewItemDocument>> {
    const { page = 1, pageSize = 20 } = query;

    const filter = { userId, reviewed: false };
    const total = await this.reviewModel.countDocuments(filter);
    const data = await this.reviewModel
      .find(filter)
      .sort({ reviewCount: -1, createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async markReviewed(userId: string, itemId: string): Promise<void> {
    await this.reviewModel.findOneAndUpdate(
      { _id: itemId, userId },
      { reviewed: true },
    ).exec();
  }
}
