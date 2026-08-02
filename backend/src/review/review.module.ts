import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewItem, ReviewItemSchema } from './schemas/review-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ReviewItem.name, schema: ReviewItemSchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
