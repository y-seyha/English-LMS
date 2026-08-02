import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BilingualText } from '../../grammar/schemas/grammar-unit.schema';

export class StoryQuestion {
  @Prop({ required: true })
  id: string;

  @Prop({ type: BilingualText, required: true })
  question: BilingualText;

  @Prop({ required: true, enum: ['multiple-choice', 'true-false', 'fill-blank'] })
  type: string;

  @Prop({ type: [BilingualText], required: true })
  options: BilingualText[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ type: BilingualText, required: true })
  explanation: BilingualText;
}

export class VocabularyPractice {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, enum: ['match', 'fill', 'multiple-choice'] })
  type: string;

  @Prop({ type: BilingualText, required: true })
  prompt: BilingualText;

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ type: [BilingualText], default: [] })
  options: BilingualText[];

  @Prop({ type: BilingualText, required: true })
  explanation: BilingualText;
}

export type StoryDocument = Story & Document;

@Schema({ timestamps: true, collection: 'stories' })
export class Story {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ type: BilingualText, required: true })
  title: BilingualText;

  @Prop({ required: true, enum: ['A1', 'A2', 'B1'] })
  level: string;

  @Prop({ default: 5 })
  estimatedMinutes: number;

  @Prop({ type: [String], default: [] })
  vocabularyIds: string[];

  @Prop({ type: BilingualText, required: true })
  content: BilingualText;

  @Prop({ type: [StoryQuestion], default: [] })
  questions: StoryQuestion[];

  @Prop({ type: [VocabularyPractice], default: [] })
  vocabularyPractice: VocabularyPractice[];
}

export const StorySchema = SchemaFactory.createForClass(Story);
StorySchema.index({ level: 1 });
StorySchema.index({ 'title.en': 'text', 'title.km': 'text' });
