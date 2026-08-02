import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewItemDocument = ReviewItem & Document;

@Schema({ timestamps: true, collection: 'review_items' })
export class ReviewItem {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  lessonId: string;

  @Prop({ required: true })
  questionId: string;

  @Prop({ required: true })
  questionText: string;

  @Prop({ required: true })
  selectedAnswer: string;

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ default: false })
  reviewed: boolean;

  @Prop({ default: 0 })
  reviewCount: number;
}

export const ReviewItemSchema = SchemaFactory.createForClass(ReviewItem);
ReviewItemSchema.index({ userId: 1, reviewed: 1 });
ReviewItemSchema.index({ userId: 1, lessonId: 1, questionId: 1 }, { unique: true });
