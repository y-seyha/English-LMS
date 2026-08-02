import { Controller, Get, Post, Param, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { ClerkUser } from '../common/interfaces/user-request.interface';

@Controller('review')
@UseGuards(ClerkAuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getPending(
    @CurrentUser() user: ClerkUser,
    @Query(new ValidationPipe({ transform: true })) query: PaginationDto,
  ) {
    return this.reviewService.findPending(user.userId, query);
  }

  @Post(':id/complete')
  async markReviewed(@CurrentUser() user: ClerkUser, @Param('id') id: string) {
    await this.reviewService.markReviewed(user.userId, id);
    return { reviewed: true };
  }
}
