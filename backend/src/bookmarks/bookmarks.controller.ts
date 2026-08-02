import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { ClerkUser } from '../common/interfaces/user-request.interface';

@Controller('bookmarks')
@UseGuards(ClerkAuthGuard)
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  async getAll(@CurrentUser() user: ClerkUser) {
    return this.bookmarksService.findAll(user.userId);
  }

  @Post()
  async add(
    @CurrentUser() user: ClerkUser,
    @Body() body: { targetType: string; targetId: string },
  ) {
    return this.bookmarksService.add(user.userId, body.targetType, body.targetId);
  }

  @Delete(':id')
  async remove(@CurrentUser() user: ClerkUser, @Param('id') id: string) {
    await this.bookmarksService.remove(user.userId, id);
    return { deleted: true };
  }
}
