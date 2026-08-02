import { Controller, Get, Post, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { ClerkUser } from '../common/interfaces/user-request.interface';

@Controller('progress')
@UseGuards(ClerkAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  async getProgress(@CurrentUser() user: ClerkUser) {
    const progress = await this.progressService.getProgress(user.userId);
    const achievements = this.progressService.getAchievementDefinitions();
    return { progress, achievements };
  }

  @Post('lessons/:id/complete')
  async completeLesson(@CurrentUser() user: ClerkUser, @Param('id') id: string) {
    return this.progressService.completeLesson(user.userId, id);
  }

  @Post('stories/:id/complete')
  async completeStory(@CurrentUser() user: ClerkUser, @Param('id') id: string) {
    return this.progressService.completeStory(user.userId, id);
  }

  @Post('lessons/:id/exercises')
  async submitExercises(
    @CurrentUser() user: ClerkUser,
    @Param('id') lessonId: string,
    @Body() body: { answers: { exerciseId: string; questionText: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }[] },
  ) {
    return this.progressService.submitExercises(user.userId, lessonId, body.answers);
  }

  @Post('lessons/:id/homework')
  async completeHomework(
    @CurrentUser() user: ClerkUser,
    @Param('id') lessonId: string,
    @Body() body: { taskIds: string[] },
  ) {
    return this.progressService.completeHomework(user.userId, lessonId, body.taskIds);
  }

  @Post('stories/:id/quiz-attempt')
  async submitStoryQuiz(
    @CurrentUser() user: ClerkUser,
    @Param('id') storyId: string,
    @Body() body: { answers: { questionId: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }[] },
  ) {
    return this.progressService.submitStoryQuizAttempt(user.userId, storyId, body.answers);
  }

  @Post('words/:id/learn')
  async learnWord(@CurrentUser() user: ClerkUser, @Param('id') id: string) {
    return this.progressService.learnWord(user.userId, id);
  }

  @Post('quiz/:id/attempt')
  async submitQuiz(
    @CurrentUser() user: ClerkUser,
    @Param('id') lessonId: string,
    @Body() body: { answers: { questionId: string; questionText: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }[] },
  ) {
    return this.progressService.submitQuizAttempt(user.userId, lessonId, body.answers);
  }

  @Get('quiz-attempts')
  async getAttempts(
    @CurrentUser() user: ClerkUser,
    @Query('lessonId') lessonId?: string,
  ) {
    return this.progressService.getQuizAttempts(user.userId, lessonId);
  }

  @Get('export')
  async exportProgress(@CurrentUser() user: ClerkUser) {
    return this.progressService.exportProgress(user.userId);
  }
}
