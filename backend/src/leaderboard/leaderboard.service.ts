import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProgress, UserProgressDocument } from '../progress/schemas/user-progress.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(UserProgress.name) private progressModel: Model<UserProgressDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getTop(limit = 20, sortBy: 'score' | 'streak' | 'lessons' = 'score') {
    const allProgress = await this.progressModel.find().exec();
    const userIds = allProgress.map(p => p.userId);
    const users = await this.userModel.find({ clerkId: { $in: userIds }, role: 'student' }).exec();
    const userMap = new Map(users.map(u => [u.clerkId, u]));

    const scores = allProgress
      .filter(p => userMap.has(p.userId))
      .map(p => {
        const totalScore = Array.from(p.quizScores.values()).reduce((a, b) => a + b, 0);

        let sortValue = 0;
        if (sortBy === 'score') sortValue = totalScore;
        else if (sortBy === 'streak') sortValue = p.streakCount;
        else if (sortBy === 'lessons') sortValue = p.completedLessons.length;

        return {
          userId: p.userId,
          name: userMap.get(p.userId)?.name ?? 'Unknown',
          avatar: userMap.get(p.userId)?.avatar ?? '',
          totalScore,
          lessonsCompleted: p.completedLessons.length,
          storiesCompleted: p.completedStories.length,
          streakCount: p.streakCount,
          sortValue,
        };
      });

    scores.sort((a, b) => b.sortValue - a.sortValue);
    return scores.slice(0, limit).map((s, i) => ({ rank: i + 1, ...s }));
  }
}
