import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema({ timestamps: true, collection: 'bookmarks' })
export class Bookmark {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: ['lesson', 'story'] })
  targetType: string;

  @Prop({ required: true })
  targetId: string;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
BookmarkSchema.index({ userId: 1, targetType: 1, targetId: 1 }, { unique: true });
BookmarkSchema.index({ userId: 1 });
