import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, ValidationPipe } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('vocabulary')
@UseGuards(ClerkAuthGuard)
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Get()
  async getAll(@Query(new ValidationPipe({ transform: true })) query: PaginationDto & { category?: string; level?: string }) {
    return this.vocabularyService.findAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.vocabularyService.findById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async create(@Body() body: Record<string, unknown>) {
    return this.vocabularyService.create(body as any);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.vocabularyService.update(id, body as any);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async delete(@Param('id') id: string) {
    await this.vocabularyService.delete(id);
    return { deleted: true };
  }
}
