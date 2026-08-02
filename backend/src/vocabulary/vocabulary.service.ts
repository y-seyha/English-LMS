import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VocabularyWord, VocabularyWordDocument } from './schemas/vocabulary-word.schema';
import type { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';

@Injectable()
export class VocabularyService {
  constructor(
    @InjectModel(VocabularyWord.name) private vocabModel: Model<VocabularyWordDocument>,
  ) {}

  async findAll(query: PaginationDto & { category?: string; level?: string }): Promise<PaginatedResult<VocabularyWordDocument>> {
    const { page = 1, pageSize = 50, search, category, level, sort = 'word', order = 'asc' } = query;

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) {
      filter.$or = [
        { word: { $regex: search, $options: 'i' } },
        { 'meaning.en': { $regex: search, $options: 'i' } },
        { 'meaning.km': { $regex: search, $options: 'i' } },
      ];
    }

    const total = await this.vocabModel.countDocuments(filter);
    const data = await this.vocabModel
      .find(filter)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * pageSize)
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

  async findById(id: string): Promise<VocabularyWordDocument> {
    const word = await this.vocabModel.findOne({ id }).exec();
    if (!word) throw new NotFoundException('Vocabulary word not found');
    return word;
  }

  async create(data: Partial<VocabularyWord>): Promise<VocabularyWordDocument> {
    return this.vocabModel.create(data);
  }

  async update(id: string, data: Partial<VocabularyWord>): Promise<VocabularyWordDocument> {
    const word = await this.vocabModel.findOneAndUpdate({ id }, data, { new: true }).exec();
    if (!word) throw new NotFoundException('Vocabulary word not found');
    return word;
  }

  async delete(id: string): Promise<void> {
    const result = await this.vocabModel.findOneAndDelete({ id }).exec();
    if (!result) throw new NotFoundException('Vocabulary word not found');
  }
}
