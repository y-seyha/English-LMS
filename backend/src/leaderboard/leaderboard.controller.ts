import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';

@Controller('leaderboard')
@UseGuards(ClerkAuthGuard)
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async getLeaderboard(
    @Query('limit') limit?: string,
    @Query('sort') sort?: 'score' | 'streak' | 'lessons',
  ) {
    return this.leaderboardService.getTop(
      limit ? parseInt(limit, 10) : 20,
      sort ?? 'score',
    );
  }
}
