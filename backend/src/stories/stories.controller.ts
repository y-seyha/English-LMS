import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, ValidationPipe } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get()
  async getAll(@Query(new ValidationPipe({ transform: true })) query: PaginationDto & { level?: string }) {
    return this.storiesService.findAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.storiesService.findById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async create(@Body() body: Record<string, unknown>) {
    return this.storiesService.create(body as any);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.storiesService.update(id, body as any);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async delete(@Param('id') id: string) {
    await this.storiesService.delete(id);
    return { deleted: true };
  }
}
