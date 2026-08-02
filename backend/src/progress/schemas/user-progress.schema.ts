import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserProgressDocument = UserProgress & Document;

@Schema({ timestamps: true, collection: 'user_progress' })
export class UserProgress {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ type: [String], default: [] })
  completedLessons: string[];

  @Prop({ type: [String], default: [] })
  completedStories: string[];

  @Prop({ type: Map, of: Number, default: {} })
  quizScores: Map<string, number>;

  @Prop({ type: Map, of: Number, default: {} })
  quizAttempts: Map<string, number>;

  @Prop({ type: String, default: null })
  streakStart: string | null;

  @Prop({ default: '' })
  lastActiveDate: string;

  @Prop({ default: 0 })
  streakCount: number;

  @Prop({ type: [String], default: [] })
  learnedWords: string[];

  @Prop({ type: [String], default: [] })
  achievements: string[];

  @Prop({ type: Map, of: Boolean, default: {} })
  completedHomework: Map<string, boolean>;

  @Prop({ type: Map, of: Boolean, default: {} })
  completedExercises: Map<string, boolean>;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);
