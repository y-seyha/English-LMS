import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BilingualText } from '../../grammar/schemas/grammar-unit.schema';

export type VocabularyWordDocument = VocabularyWord & Document;

@Schema({ timestamps: true, collection: 'vocabulary_words' })
export class VocabularyWord {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  word: string;

  @Prop({ default: '' })
  pronunciation: string;

  @Prop({ default: '' })
  partOfSpeech: string;

  @Prop({ type: BilingualText, required: true })
  meaning: BilingualText;

  @Prop({ type: BilingualText, required: true })
  example: BilingualText;

  @Prop({ default: 'general' })
  category: string;

  @Prop({ required: true, enum: ['beginner', 'intermediate'] })
  level: string;
}

export const VocabularyWordSchema = SchemaFactory.createForClass(VocabularyWord);
VocabularyWordSchema.index({ category: 1 });
VocabularyWordSchema.index({ level: 1 });
VocabularyWordSchema.index({ word: 'text' });
