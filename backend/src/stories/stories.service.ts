import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Story, StoryDocument } from './schemas/story.schema';
import type {
  PaginationDto,
  PaginatedResult,
} from '../common/dto/pagination.dto';

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
  ) {}

  async findAll(
    query: PaginationDto & { level?: string },
  ): Promise<PaginatedResult<StoryDocument>> {
    // Ensure types are numbers (prevents string coercion bugs)
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 12;
    const { search, level, sort = 'level', order = 'asc' } = query;

    const filter: Record<string, unknown> = {};
    if (level) filter.level = level;
    if (search) {
      filter.$or = [
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.km': { $regex: search, $options: 'i' } },
      ];
    }

    const total = await this.storyModel.countDocuments(filter);
    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (page - 1) * pageSize; // (2 - 1) * 12 = 12

    const data = await this.storyModel
      .find(filter)
      .sort({ [sort]: sortOrder, id: 1 })
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findById(id: string): Promise<StoryDocument> {
    const story = await this.storyModel.findOne({ id }).exec();
    if (!story) throw new NotFoundException('Story not found');
    return story;
  }

  async create(data: Partial<Story>): Promise<StoryDocument> {
    return this.storyModel.create(data);
  }

  async update(id: string, data: Partial<Story>): Promise<StoryDocument> {
    const story = await this.storyModel
      .findOneAndUpdate({ id }, data, { new: true })
      .exec();
    if (!story) throw new NotFoundException('Story not found');
    return story;
  }

  async delete(id: string): Promise<void> {
    const result = await this.storyModel.findOneAndDelete({ id }).exec();
    if (!result) throw new NotFoundException('Story not found');
  }
}
