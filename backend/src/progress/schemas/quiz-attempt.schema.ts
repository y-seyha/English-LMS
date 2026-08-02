import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class AnswerRecord {
  @Prop({ required: true })
  questionId: string;

  @Prop({ required: true })
  selectedAnswer: string;

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ required: true })
  isCorrect: boolean;
}

export type QuizAttemptDocument = QuizAttempt & Document;

@Schema({ timestamps: true, collection: 'quiz_attempts' })
export class QuizAttempt {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  lessonId: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  total: number;

  @Prop({ type: [AnswerRecord], default: [] })
  answers: AnswerRecord[];

  @Prop({ default: Date.now })
  attemptedAt: Date;
}

export const QuizAttemptSchema = SchemaFactory.createForClass(QuizAttempt);
QuizAttemptSchema.index({ userId: 1, lessonId: 1 });
QuizAttemptSchema.index({ userId: 1, attemptedAt: -1 });
