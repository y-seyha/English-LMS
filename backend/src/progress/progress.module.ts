import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { UserProgress, UserProgressSchema } from './schemas/user-progress.schema';
import { QuizAttempt, QuizAttemptSchema } from './schemas/quiz-attempt.schema';
import { ReviewItem, ReviewItemSchema } from '../review/schemas/review-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserProgress.name, schema: UserProgressSchema },
      { name: QuizAttempt.name, schema: QuizAttemptSchema },
      { name: ReviewItem.name, schema: ReviewItemSchema },
    ]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
