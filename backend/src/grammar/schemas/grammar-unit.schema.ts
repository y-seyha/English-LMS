import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class BilingualText {
  @Prop({ required: true })
  en: string;

  @Prop({ required: true })
  km: string;
}

export class GrammarFormGroup {
  @Prop({ required: true })
  structure: string;

  @Prop({ type: [{ en: String, km: String }], default: [] })
  examples: { en: string; km: string }[];
}

export class CommonMistake {
  @Prop({ required: true })
  mistake: string;

  @Prop({ required: true })
  correction: string;

  @Prop({ type: BilingualText, required: true })
  reason: BilingualText;
}

export class Exercise {
  @Prop({ required: true })
  id: string;

  @Prop({ type: BilingualText, required: true })
  question: BilingualText;

  @Prop({ required: true, enum: ['multiple-choice', 'true-false', 'fill-blank'] })
  type: string;

  @Prop({ type: [BilingualText], default: [] })
  options: BilingualText[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ type: BilingualText, required: true })
  explanation: BilingualText;
}

export class QuizQuestion {
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

export class HomeworkTask {
  @Prop({ required: true })
  id: string;

  @Prop({ type: BilingualText, required: true })
  instruction: BilingualText;

  @Prop({ type: [String], default: [] })
  items: string[];
}

export class GrammarLesson {
  @Prop({ required: true })
  id: string;

  @Prop({ type: BilingualText, required: true })
  title: BilingualText;

  @Prop({ required: true, enum: ['beginner', 'intermediate'] })
  level: string;

  @Prop({ required: true })
  unitId: string;

  @Prop({ required: true })
  chapterId: string;

  @Prop({ required: true })
  order: number;

  @Prop({ default: 10 })
  estimatedMinutes: number;

  @Prop({ type: BilingualText, required: true })
  definition: BilingualText;

  @Prop({ type: { affirmative: GrammarFormGroup, negative: GrammarFormGroup, question: GrammarFormGroup }, required: true })
  forms: { affirmative: GrammarFormGroup; negative: GrammarFormGroup; question: GrammarFormGroup };

  @Prop({ type: [CommonMistake], default: [] })
  commonMistakes: CommonMistake[];

  @Prop({ type: [Exercise], default: [] })
  exercises: Exercise[];

  @Prop({ type: [HomeworkTask], default: [] })
  homework: HomeworkTask[];

  @Prop({ type: [QuizQuestion], default: [] })
  quiz: QuizQuestion[];

  @Prop({ type: [String], default: [] })
  vocabularyIds: string[];
}

export class GrammarChapter {
  @Prop({ required: true })
  id: string;

  @Prop({ type: BilingualText, required: true })
  title: BilingualText;

  @Prop({ type: [GrammarLesson], default: [] })
  lessons: GrammarLesson[];
}

export type GrammarUnitDocument = GrammarUnit & Document;

@Schema({ timestamps: true, collection: 'grammar_units' })
export class GrammarUnit {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ type: BilingualText, required: true })
  title: BilingualText;

  @Prop({ required: true, enum: ['beginner', 'intermediate'] })
  level: string;

  @Prop({ required: true })
  order: number;

  @Prop({ type: [GrammarChapter], default: [] })
  chapters: GrammarChapter[];
}

export const GrammarUnitSchema = SchemaFactory.createForClass(GrammarUnit);
GrammarUnitSchema.index({ level: 1 });
GrammarUnitSchema.index({ order: 1 });
GrammarUnitSchema.index({ 'chapters.lessons.id': 1 });
