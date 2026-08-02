import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { ClerkUser } from '../common/interfaces/user-request.interface';

@Controller('notes')
@UseGuards(ClerkAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getByLesson(
    @CurrentUser() user: ClerkUser,
    @Query('lessonId') lessonId: string,
  ) {
    if (!lessonId) return [];
    return this.notesService.findByLesson(user.userId, lessonId);
  }

  @Post()
  async create(
    @CurrentUser() user: ClerkUser,
    @Body() body: { lessonId: string; content: string },
  ) {
    return this.notesService.create(user.userId, body.lessonId, body.content);
  }

  @Put(':id')
  async update(
    @CurrentUser() user: ClerkUser,
    @Param('id') id: string,
    @Body() body: { content: string },
  ) {
    return this.notesService.update(user.userId, id, body.content);
  }

  @Delete(':id')
  async delete(@CurrentUser() user: ClerkUser, @Param('id') id: string) {
    await this.notesService.delete(user.userId, id);
    return { deleted: true };
  }
}
