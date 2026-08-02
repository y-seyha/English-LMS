import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProgress, UserProgressDocument } from './schemas/user-progress.schema';
import { QuizAttempt, QuizAttemptDocument } from './schemas/quiz-attempt.schema';
import { ReviewItem, ReviewItemDocument } from '../review/schemas/review-item.schema';

const ACHIEVEMENTS = [
  { id: 'first-lesson', title: { en: 'First Steps', km: 'ជំហានដំបូង' }, description: { en: 'Complete your first lesson', km: 'បំពេញមេរៀនដំបូងរបស់អ្នក' }, icon: '🎯', condition: { type: 'lessons_completed' as const, count: 1 } },
  { id: '5-lessons', title: { en: 'Getting Started', km: 'កំពុងចាប់ផ្តើម' }, description: { en: 'Complete 5 lessons', km: 'បំពេញ ៥ មេរៀន' }, icon: '📚', condition: { type: 'lessons_completed' as const, count: 5 } },
  { id: '10-lessons', title: { en: 'Dedicated Learner', km: 'អ្នកសិក្សាឧស្សាហ៍' }, description: { en: 'Complete 10 lessons', km: 'បំពេញ ១០ មេរៀន' }, icon: '⭐', condition: { type: 'lessons_completed' as const, count: 10 } },
  { id: 'first-quiz', title: { en: 'Quiz Ace', km: 'ពូកែសំណួរ' }, description: { en: 'Pass your first quiz', km: 'ប្រលងជាប់ជាលើកដំបូង' }, icon: '🏆', condition: { type: 'quizzes_passed' as const, count: 1 } },
  { id: '3-streak', title: { en: '3-Day Streak', km: '៣ ថ្ងៃជាប់គ្នា' }, description: { en: 'Study for 3 days in a row', km: 'រៀន ៣ ថ្ងៃជាប់គ្នា' }, icon: '🔥', condition: { type: 'streak_days' as const, count: 3 } },
  { id: '7-streak', title: { en: 'Weekly Warrior', km: 'អ្នកចម្បាំងប្រចាំសប្តាហ៍' }, description: { en: 'Study for 7 days in a row', km: 'រៀន ៧ ថ្ងៃជាប់គ្នា' }, icon: '💪', condition: { type: 'streak_days' as const, count: 7 } },
  { id: '10-words', title: { en: 'Word Collector', km: 'អ្នកប្រមូលពាក្យ' }, description: { en: 'Learn 10 words', km: 'រៀន ១០ ពាក្យ' }, icon: '📝', condition: { type: 'words_learned' as const, count: 10 } },
  { id: 'first-story', title: { en: 'Story Time', km: 'ពេលអានរឿង' }, description: { en: 'Read your first story', km: 'អានរឿងដំបូងរបស់អ្នក' }, icon: '📖', condition: { type: 'stories_read' as const, count: 1 } },
];

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(UserProgress.name) private progressModel: Model<UserProgressDocument>,
    @InjectModel(QuizAttempt.name) private quizAttemptModel: Model<QuizAttemptDocument>,
    @InjectModel(ReviewItem.name) private reviewItemModel: Model<ReviewItemDocument>,
  ) {}

  private async getOrCreateProgress(userId: string): Promise<UserProgressDocument> {
    let progress = await this.progressModel.findOne({ userId }).exec();
    if (!progress) {
      progress = await this.progressModel.create({ userId });
    }
    return progress;
  }

  async getProgress(userId: string): Promise<UserProgressDocument> {
    return this.getOrCreateProgress(userId);
  }

  async completeLesson(userId: string, lessonId: string): Promise<{ progress: UserProgressDocument; newAchievements: string[] }> {
    const progress = await this.getOrCreateProgress(userId);

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    const today = new Date().toISOString().split('T')[0];
    progress.lastActiveDate = today;

    if (!progress.streakStart) {
      progress.streakStart = today;
      progress.streakCount = 1;
    } else {
      const lastDate = new Date(progress.lastActiveDate);
      const diffDays = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays <= 1) {
        if (lastDate.toISOString().split('T')[0] !== today) {
          progress.streakCount += 1;
        }
      } else {
        progress.streakStart = today;
        progress.streakCount = 1;
      }
    }

    await progress.save();
    const newAchievements = await this.checkAchievements(progress);

    return { progress, newAchievements };
  }

  async completeStory(userId: string, storyId: string): Promise<{ progress: UserProgressDocument; newAchievements: string[] }> {
    const progress = await this.getOrCreateProgress(userId);

    if (!progress.completedStories.includes(storyId)) {
      progress.completedStories.push(storyId);
    }

    await progress.save();
    const newAchievements = await this.checkAchievements(progress);

    return { progress, newAchievements };
  }

  async learnWord(userId: string, wordId: string): Promise<{ progress: UserProgressDocument; newAchievements: string[] }> {
    const progress = await this.getOrCreateProgress(userId);

    if (!progress.learnedWords.includes(wordId)) {
      progress.learnedWords.push(wordId);
    }

    await progress.save();
    const newAchievements = await this.checkAchievements(progress);

    return { progress, newAchievements };
  }

  async submitQuizAttempt(
    userId: string,
    lessonId: string,
    answers: { questionId: string; questionText: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }[],
  ): Promise<{
    score: number;
    total: number;
    attempt: QuizAttemptDocument;
    progress: UserProgressDocument;
    newAchievements: string[];
  }> {
    const total = answers.length;
    const correctCount = answers.filter(a => a.isCorrect).length;
    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    const attempt = await this.quizAttemptModel.create({
      userId,
      lessonId,
      score,
      total,
      answers,
      attemptedAt: new Date(),
    });

    const progress = await this.getOrCreateProgress(userId);

    const existing = progress.quizScores.get(lessonId) ?? 0;
    if (score > existing) {
      progress.quizScores.set(lessonId, score);
    }
    const prevAttempts = progress.quizAttempts.get(lessonId) ?? 0;
    progress.quizAttempts.set(lessonId, prevAttempts + 1);

    await progress.save();

    const wrongAnswers = answers.filter(a => !a.isCorrect);
    for (const wa of wrongAnswers) {
      const existingReview = await this.reviewItemModel.findOne({
        userId,
        lessonId,
        questionId: wa.questionId,
      }).exec();

      if (existingReview) {
        existingReview.reviewed = false;
        existingReview.reviewCount += 1;
        await existingReview.save();
      } else {
        await this.reviewItemModel.create({
          userId,
          lessonId,
          questionId: wa.questionId,
          questionText: wa.questionText,
          selectedAnswer: wa.selectedAnswer,
          correctAnswer: wa.correctAnswer,
          reviewed: false,
          reviewCount: 1,
        });
      }
    }

    const newAchievements = await this.checkAchievements(progress);

    return { score, total, attempt, progress, newAchievements };
  }

  async submitExercises(
    userId: string,
    lessonId: string,
    answers: { exerciseId: string; questionText: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }[],
  ): Promise<UserProgressDocument> {
    const progress = await this.getOrCreateProgress(userId);
    for (const a of answers) {
      progress.completedExercises.set(`${lessonId}:${a.exerciseId}`, true);
    }
    await progress.save();

    const wrongAnswers = answers.filter(a => !a.isCorrect);
    for (const wa of wrongAnswers) {
      const existingReview = await this.reviewItemModel.findOne({
        userId, lessonId, questionId: wa.exerciseId,
      }).exec();
      if (existingReview) {
        existingReview.reviewed = false;
        existingReview.reviewCount += 1;
        await existingReview.save();
      } else {
        await this.reviewItemModel.create({
          userId, lessonId, questionId: wa.exerciseId,
          questionText: wa.questionText,
          selectedAnswer: wa.selectedAnswer,
          correctAnswer: wa.correctAnswer,
          reviewed: false, reviewCount: 1,
        });
      }
    }

    return progress;
  }

  async completeHomework(userId: string, lessonId: string, taskIds: string[]): Promise<UserProgressDocument> {
    const progress = await this.getOrCreateProgress(userId);
    for (const tId of taskIds) {
      progress.completedHomework.set(`${lessonId}:${tId}`, true);
    }
    await progress.save();
    return progress;
  }

  async submitStoryQuizAttempt(
    userId: string,
    storyId: string,
    answers: { questionId: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }[],
  ): Promise<{ score: number; total: number; progress: UserProgressDocument }> {
    const total = answers.length;
    const correctCount = answers.filter(a => a.isCorrect).length;
    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    const wrongAnswers = answers.filter(a => !a.isCorrect);
    for (const wa of wrongAnswers) {
      const existingReview = await this.reviewItemModel.findOne({
        userId, lessonId: storyId, questionId: wa.questionId,
      }).exec();
      if (existingReview) {
        existingReview.reviewed = false;
        existingReview.reviewCount += 1;
        await existingReview.save();
      } else {
        await this.reviewItemModel.create({
          userId, lessonId: storyId, questionId: wa.questionId,
          questionText: '',
          selectedAnswer: wa.selectedAnswer,
          correctAnswer: wa.correctAnswer,
          reviewed: false, reviewCount: 1,
        });
      }
    }

    const progress = await this.getOrCreateProgress(userId);
    await progress.save();
    return { score, total, progress };
  }

  async getQuizAttempts(userId: string, lessonId?: string): Promise<QuizAttemptDocument[]> {
    const filter: Record<string, unknown> = { userId };
    if (lessonId) filter.lessonId = lessonId;
    return this.quizAttemptModel.find(filter).sort({ attemptedAt: -1 }).limit(20).exec();
  }

  async exportProgress(userId: string): Promise<Record<string, unknown>> {
    const progress = await this.getOrCreateProgress(userId);
    const attempts = await this.quizAttemptModel.find({ userId }).sort({ attemptedAt: -1 }).exec();

    return {
      exportedAt: new Date().toISOString(),
      progress: progress.toJSON(),
      quizAttempts: attempts.map(a => a.toJSON()),
    };
  }

  private async checkAchievements(progress: UserProgressDocument): Promise<string[]> {
    const unlocked: string[] = [];

    for (const ach of ACHIEVEMENTS) {
      if (progress.achievements.includes(ach.id)) continue;

      let earned = false;
      switch (ach.condition.type) {
        case 'lessons_completed':
          earned = progress.completedLessons.length >= ach.condition.count;
          break;
        case 'quizzes_passed':
          earned = Array.from(progress.quizScores.values()).filter(s => s >= 80).length >= ach.condition.count;
          break;
        case 'streak_days':
          earned = progress.streakCount >= ach.condition.count;
          break;
        case 'words_learned':
          earned = progress.learnedWords.length >= ach.condition.count;
          break;
        case 'stories_read':
          earned = progress.completedStories.length >= ach.condition.count;
          break;
      }

      if (earned) {
        progress.achievements.push(ach.id);
        await progress.save();
        unlocked.push(ach.id);
      }
    }

    return unlocked;
  }

  getAchievementDefinitions() {
    return ACHIEVEMENTS;
  }
}
