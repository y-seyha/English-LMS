import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { UserProgress, UserProgressDocument } from '../progress/schemas/user-progress.schema';
import { QuizAttempt, QuizAttemptDocument } from '../progress/schemas/quiz-attempt.schema';
import { GrammarUnit, GrammarUnitDocument } from '../grammar/schemas/grammar-unit.schema';
import { Story, StoryDocument } from '../stories/schemas/story.schema';
import { VocabularyWord, VocabularyWordDocument } from '../vocabulary/schemas/vocabulary-word.schema';
import { Bookmark, BookmarkDocument } from '../bookmarks/schemas/bookmark.schema';
import { Note, NoteDocument } from '../notes/schemas/note.schema';
import { ReviewItem, ReviewItemDocument } from '../review/schemas/review-item.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserProgress.name) private progressModel: Model<UserProgressDocument>,
    @InjectModel(QuizAttempt.name) private quizAttemptModel: Model<QuizAttemptDocument>,
    @InjectModel(GrammarUnit.name) private grammarUnitModel: Model<GrammarUnitDocument>,
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
    @InjectModel(VocabularyWord.name) private vocabModel: Model<VocabularyWordDocument>,
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    @InjectModel(ReviewItem.name) private reviewItemModel: Model<ReviewItemDocument>,
  ) {}

  async findAllUsers(query: { page?: number; pageSize?: number; search?: string; sort?: string; order?: string }) {
    const { page = 1, pageSize = 20, search, sort = 'createdAt', order = 'desc' } = query;
    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const total = await this.userModel.countDocuments(filter);
    const data = await this.userModel
      .find(filter)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async getDashboardStats() {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString();

    const [
      totalUsers, newUsersToday, newUsersThisWeek, newUsersThisMonth, totalAdmins,
      totalLessons, totalStories, totalVocab, totalUnits, bookmarksCount, notesCount, reviewItemsCount,
      allProgress, allAttempts, scoreBuckets, progressBuckets, streakBuckets, topUsersAgg,
      lessonsByLevel, vocabByLevel, storiesByLevel,
    ] = await Promise.all([
      this.userModel.countDocuments({ role: 'student' }),
      this.userModel.countDocuments({ role: 'student', createdAt: { $gte: new Date(today) } }),
      this.userModel.countDocuments({ role: 'student', createdAt: { $gte: new Date(weekAgo) } }),
      this.userModel.countDocuments({ role: 'student', createdAt: { $gte: new Date(monthAgo) } }),
      this.userModel.countDocuments({ role: 'admin' }),
      this.grammarUnitModel.aggregate([
        { $project: { count: { $size: { $reduce: { input: '$chapters', initialValue: [], in: { $concatArrays: ['$$value', '$$this.lessons'] } } } } } },
        { $group: { _id: null, total: { $sum: '$count' } } },
      ]),
      this.storyModel.countDocuments(),
      this.vocabModel.countDocuments(),
      this.grammarUnitModel.countDocuments(),
      this.bookmarkModel.countDocuments(),
      this.noteModel.countDocuments(),
      this.reviewItemModel.countDocuments({ reviewed: false }),
      this.progressModel.find().lean().exec(),
      this.quizAttemptModel.find().lean().exec(),
      this.quizAttemptModel.aggregate([
        {
          $bucket: {
            groupBy: '$score',
            boundaries: [0, 20, 40, 60, 80, 101],
            default: '0-20',
            output: { count: { $sum: 1 } },
          },
        },
      ]),
      this.progressModel.aggregate([
        {
          $bucket: {
            groupBy: { $size: { $ifNull: ['$completedLessons', []] } },
            boundaries: [0, 1, 6, 11, 21, 1000000],
            default: '0',
            output: { count: { $sum: 1 } },
          },
        },
      ]),
      this.progressModel.aggregate([
        {
          $bucket: {
            groupBy: { $ifNull: ['$streakCount', 0] },
            boundaries: [0, 1, 4, 8, 15, 31, 1000000],
            default: '0',
            output: { count: { $sum: 1 } },
          },
        },
      ]),
      this.progressModel.aggregate([
        {
          $addFields: { completedCount: { $size: { $ifNull: ['$completedLessons', []] } } },
        },
        { $sort: { completedCount: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: 'clerkId',
            as: 'user',
          },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            userId: 1,
            completedCount: 1,
            name: { $ifNull: ['$user.name', 'Unknown'] },
            email: { $ifNull: ['$user.email', ''] },
          },
        },
      ]),
      this.grammarUnitModel.aggregate([
        { $unwind: '$chapters' },
        { $unwind: '$chapters.lessons' },
        { $group: { _id: '$chapters.lessons.level', count: { $sum: 1 } } },
      ]),
      this.vocabModel.aggregate([
        { $group: { _id: '$level', count: { $sum: 1 } } },
      ]),
      this.storyModel.aggregate([
        { $group: { _id: '$level', count: { $sum: 1 } } },
      ]),
    ]);

    const totalUnitsCount = totalUnits;
    let totalChapters = 0;
    let totalExercises = 0;
    let totalQuizQuestions = 0;
    const unitsWithCounts = await this.grammarUnitModel.find().lean().exec();
    for (const unit of unitsWithCounts) {
      for (const ch of (unit as any).chapters || []) {
        totalChapters++;
        for (const lesson of ch.lessons || []) {
          totalExercises += (lesson as any).exercises?.length ?? 0;
          totalQuizQuestions += (lesson as any).quiz?.length ?? 0;
        }
      }
    }

    const totalLessonsCompleted = allProgress.reduce((sum: number, p: any) => sum + (p.completedLessons?.length ?? 0), 0);
    const totalStoriesCompleted = allProgress.reduce((sum: number, p: any) => sum + (p.completedStories?.length ?? 0), 0);
    const totalQuizAttempts = allAttempts.length;
    const avgQuizScore = allAttempts.length > 0
      ? Math.round(allAttempts.reduce((sum: number, a: any) => sum + (a.score ?? 0), 0) / allAttempts.length)
      : 0;
    const activeToday = allProgress.filter((p: any) => p.lastActiveDate === today).length;
    const activeThisWeek = allProgress.filter((p: any) => p.lastActiveDate && p.lastActiveDate >= weekAgo.split('T')[0]).length;
    const activeThisMonth = allProgress.filter((p: any) => p.lastActiveDate && p.lastActiveDate >= monthAgo.split('T')[0]).length;

    const toMap = (agg: any[], key = '_id') => {
      const map: Record<string, number> = {};
      for (const item of agg) map[String(item[key])] = item.count;
      return map;
    };

    const recentUsers = await this.userModel.find({ role: 'student' }).sort({ createdAt: -1 }).limit(10).exec();

    const recentCompletions = await this.quizAttemptModel
      .find()
      .sort({ attemptedAt: -1 })
      .limit(10)
      .populate('userId')
      .lean()
      .exec();

    return {
      totalUsers, newUsersToday, newUsersThisWeek, newUsersThisMonth, totalAdmins,
      totalLessons: totalLessons[0]?.total ?? 0,
      totalStories, totalVocab, totalUnits: totalUnitsCount, totalChapters,
      totalExercises, totalQuizQuestions,
      totalLessonsCompleted, totalStoriesCompleted,
      totalQuizAttempts, avgQuizScore,
      activeToday, activeThisWeek, activeThisMonth,
      totalBookmarks: bookmarksCount,
      totalNotes: notesCount,
      pendingReviewItems: reviewItemsCount,
      lessonsByLevel: toMap(lessonsByLevel),
      vocabByLevel: toMap(vocabByLevel),
      storiesByLevel: toMap(storiesByLevel),
      scoreDistribution: scoreBuckets.map((b: any) => ({ range: b._id, count: b.count })),
      progressDistribution: progressBuckets.map((b: any) => ({ range: b._id, count: b.count })),
      streakDistribution: streakBuckets.map((b: any) => ({ range: b._id, count: b.count })),
      topUsers: topUsersAgg,
      recentUsers,
      recentCompletions,
    };
  }

  async getActivityData(days = 30) {
    const since = new Date(Date.now() - days * 86400000);

    const datePipeline = (field: string) => [
      { $match: { [field]: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: field === 'lastActiveDate' ? { $dateFromString: { dateString: `$${field}` } } : `$${field}` } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ];

    const [
      userResults,
      quizResults,
      bookmarkResults,
      noteResults,
      reviewResults,
    ] = await Promise.all([
      this.userModel.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      this.quizAttemptModel.aggregate([
        { $match: { attemptedAt: { $gte: since } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$attemptedAt' } },
            attempts: { $sum: 1 },
            avgScore: { $avg: '$score' },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      this.bookmarkModel.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      this.noteModel.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      this.reviewItemModel.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const allProgress = await this.progressModel.find({ lastActiveDate: { $gte: since.toISOString().split('T')[0] } }).select('lastActiveDate').lean().exec();
    const activeMap: Record<string, number> = {};
    for (const p of allProgress as any[]) {
      if (p.lastActiveDate) {
        activeMap[p.lastActiveDate] = (activeMap[p.lastActiveDate] ?? 0) + 1;
      }
    }
    const activeUsers = Object.entries(activeMap)
      .filter(([date]) => date >= since.toISOString().split('T')[0])
      .map(([date, count]) => ({ _id: date, count }))
      .sort((a, b) => a._id.localeCompare(b._id));

    const fillDays = (data: { _id: string }[], key: string) => {
      const map: Record<string, any> = {};
      for (const item of data) map[item._id] = item;
      const result: any[] = [];
      for (let i = 0; i <= days; i++) {
        const d = new Date(since.getTime() + i * 86400000);
        const dateStr = d.toISOString().split('T')[0];
        result.push(map[dateStr] ?? { _id: dateStr, [key]: 0 });
      }
      return result;
    };

    return {
      newUsers: fillDays(userResults, 'count'),
      activeUsers: fillDays(activeUsers, 'count'),
      quizActivity: fillDays(quizResults, 'attempts'),
      bookmarks: fillDays(bookmarkResults, 'count'),
      notes: fillDays(noteResults, 'count'),
      reviewItems: fillDays(reviewResults, 'count'),
    };
  }

  async getTopUsers(limit = 10) {
    return this.progressModel.aggregate([
      {
        $addFields: {
          completedCount: { $size: { $ifNull: ['$completedLessons', []] } },
          storyCount: { $size: { $ifNull: ['$completedStories', []] } },
          wordCount: { $size: { $ifNull: ['$learnedWords', []] } },
          quizCount: { $size: { $objectToArray: { $ifNull: ['$quizScores', {}] } } },
        },
      },
      { $sort: { completedCount: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'clerkId',
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          userId: 1,
          completedLessons: { $ifNull: ['$completedCount', 0] },
          completedStories: { $ifNull: ['$storyCount', 0] },
          learnedWords: { $ifNull: ['$wordCount', 0] },
          quizAttempts: { $ifNull: ['$quizCount', 0] },
          streakCount: { $ifNull: ['$streakCount', 0] },
          name: { $ifNull: ['$user.name', 'Unknown'] },
          email: { $ifNull: ['$user.email', ''] },
        },
      },
    ]);
  }

  async getAllReviewItems(query: { page?: number; pageSize?: number }) {
    const { page = 1, pageSize = 50 } = query;
    const filter = {};
    const total = await this.reviewItemModel.countDocuments(filter);
    const data = await this.reviewItemModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()
      .exec();
    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async getUserAnalytics(userId: string) {
    const user = await this.userModel.findOne({ clerkId: userId }).lean().exec();
    const progress = await this.progressModel.findOne({ userId }).lean().exec();
    const attempts = await this.quizAttemptModel.find({ userId }).sort({ attemptedAt: -1 }).lean().exec();
    const bookmarks = await this.bookmarkModel.countDocuments({ userId });
    const notes = await this.noteModel.countDocuments({ userId });
    const reviewItems = await this.reviewItemModel.countDocuments({ userId, reviewed: false });

    const avgScore = attempts.length > 0
      ? Math.round(attempts.reduce((s: number, a: any) => s + a.score, 0) / attempts.length)
      : 0;

    return {
      user,
      progress: progress
        ? {
            completedLessons: progress.completedLessons?.length ?? 0,
            completedStories: progress.completedStories?.length ?? 0,
            learnedWords: progress.learnedWords?.length ?? 0,
            quizScores: progress.quizScores,
            streakCount: progress.streakCount ?? 0,
            lastActiveDate: progress.lastActiveDate,
          }
        : null,
      quizHistory: attempts.map((a: any) => ({
        lessonId: a.lessonId,
        score: a.score,
        total: a.total,
        attemptedAt: a.attemptedAt,
      })),
      avgQuizScore: avgScore,
      bookmarks,
      notes,
      pendingReviewItems: reviewItems,
    };
  }
}
