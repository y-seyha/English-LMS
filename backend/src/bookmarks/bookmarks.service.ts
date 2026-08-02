import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, BookmarkDocument } from './schemas/bookmark.schema';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
  ) {}

  async findAll(userId: string): Promise<BookmarkDocument[]> {
    return this.bookmarkModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async add(userId: string, targetType: string, targetId: string): Promise<BookmarkDocument> {
    const existing = await this.bookmarkModel.findOne({ userId, targetType, targetId }).exec();
    if (existing) throw new ConflictException('Already bookmarked');

    return this.bookmarkModel.create({ userId, targetType, targetId });
  }

  async remove(userId: string, bookmarkId: string): Promise<void> {
    const result = await this.bookmarkModel.findOneAndDelete({ _id: bookmarkId, userId }).exec();
    if (!result) throw new NotFoundException('Bookmark not found');
  }
}
