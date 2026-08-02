import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GrammarUnit, GrammarUnitDocument } from './schemas/grammar-unit.schema';
import type { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';

@Injectable()
export class GrammarService {
  constructor(
    @InjectModel(GrammarUnit.name) private grammarUnitModel: Model<GrammarUnitDocument>,
  ) {}

  async findAllUnits(): Promise<GrammarUnitDocument[]> {
    return this.grammarUnitModel.find({} as any).sort({ order: 1 } as any).exec();
  }

  async findUnitById(id: string): Promise<GrammarUnitDocument> {
    const unit = await this.grammarUnitModel.findOne({ id } as any).exec();
    if (!unit) throw new NotFoundException('Grammar unit not found');
    return unit;
  }

  async findLessons(query: PaginationDto & { level?: string; completed?: string }): Promise<PaginatedResult<Record<string, unknown>>> {
    const { page = 1, pageSize = 20, search, level, sort = 'order', order = 'asc' } = query;

    const unitFilter: Record<string, unknown> = {};
    if (level) unitFilter.level = level;

    const units = await this.grammarUnitModel.find(unitFilter).sort({ order: 1 } as any).exec();

    let allLessons: Record<string, unknown>[] = [];
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        for (const lesson of chapter.lessons) {
          const lessonData: Record<string, unknown> = {
            id: lesson.id,
            title: lesson.title,
            level: lesson.level,
            unitId: lesson.unitId,
            chapterId: lesson.chapterId,
            order: lesson.order,
            estimatedMinutes: lesson.estimatedMinutes,
            unitTitle: unit.title,
            chapterTitle: chapter.title,
          };
          allLessons.push(lessonData);
        }
      }
    }

    if (search) {
      const s = search.toLowerCase();
      allLessons = allLessons.filter(
        (l: any) =>
          l.title?.en?.toLowerCase().includes(s) ||
          l.title?.km?.includes(s),
      );
    }

    const total = allLessons.length;

    const sortKey = sort === 'title' ? 'title.en' : sort;
    allLessons.sort((a: any, b: any) => {
      const aVal = sortKey.split('.').reduce((o, k) => o?.[k], a) ?? '';
      const bVal = sortKey.split('.').reduce((o, k) => o?.[k], b) ?? '';
      const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
      return order === 'asc' ? cmp : -cmp;
    });

    const data = allLessons.slice((page - 1) * pageSize, page * pageSize);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async findLessonById(lessonId: string): Promise<Record<string, unknown>> {
    const units = await this.grammarUnitModel.find({} as any).exec();
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        const lesson = chapter.lessons.find(l => l.id === lessonId);
        if (lesson) {
          return {
            ...lesson,
            unitTitle: unit.title,
            chapterTitle: chapter.title,
          } as unknown as Record<string, unknown>;
        }
      }
    }
    throw new NotFoundException('Lesson not found');
  }

  async createLesson(data: Record<string, unknown>): Promise<GrammarUnitDocument> {
    const unit = await this.grammarUnitModel.findOne({ id: data.unitId as string } as any).exec();
    if (!unit) throw new NotFoundException('Unit not found');

    const chapter = unit.chapters.find(c => c.id === data.chapterId);
    if (!chapter) throw new NotFoundException('Chapter not found');

    chapter.lessons.push(data as any);
    await unit.save();
    return unit;
  }

  async updateLesson(lessonId: string, data: Record<string, unknown>): Promise<GrammarUnitDocument> {
    const units = await this.grammarUnitModel.find({} as any).exec();
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        const idx = chapter.lessons.findIndex(l => l.id === lessonId);
        if (idx !== -1) {
          Object.assign(chapter.lessons[idx], data);
          await unit.save();
          return unit;
        }
      }
    }
    throw new NotFoundException('Lesson not found');
  }

  async deleteLesson(lessonId: string): Promise<void> {
    const units = await this.grammarUnitModel.find({} as any).exec();
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        const idx = chapter.lessons.findIndex(l => l.id === lessonId);
        if (idx !== -1) {
          chapter.lessons.splice(idx, 1);
          await unit.save();
          return;
        }
      }
    }
    throw new NotFoundException('Lesson not found');
  }
}
