import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, ValidationPipe } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('grammar')
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

  @Get('units')
  async getUnits() {
    return this.grammarService.findAllUnits();
  }

  @Get('units/:id')
  async getUnit(@Param('id') id: string) {
    return this.grammarService.findUnitById(id);
  }

  @Get('lessons')
  async getLessons(@Query(new ValidationPipe({ transform: true })) query: PaginationDto & { level?: string; completed?: string }) {
    return this.grammarService.findLessons(query);
  }

  @Get('lessons/:id')
  async getLesson(@Param('id') id: string) {
    return this.grammarService.findLessonById(id);
  }

  @Post('lessons')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createLesson(@Body() body: Record<string, unknown>) {
    return this.grammarService.createLesson(body);
  }

  @Put('lessons/:id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateLesson(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.grammarService.updateLesson(id, body);
  }

  @Delete('lessons/:id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async deleteLesson(@Param('id') id: string) {
    await this.grammarService.deleteLesson(id);
    return { deleted: true };
  }
}
