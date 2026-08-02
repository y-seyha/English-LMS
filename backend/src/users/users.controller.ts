import { Controller, Get, Put, Body, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { ClerkUser } from '../common/interfaces/user-request.interface';
import type { PaginationDto } from '../common/dto/pagination.dto';

@Controller('users')
@UseGuards(ClerkAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@CurrentUser() user: ClerkUser) {
    const dbUser = await this.usersService.findByClerkIdOrFail(user.userId);
    return { ...dbUser.toJSON(), userId: user.userId };
  }

  @Put('me')
  async updateProfile(
    @CurrentUser() user: ClerkUser,
    @Body() body: { name?: string },
  ) {
    const dbUser = await this.usersService.findByClerkIdOrFail(user.userId);
    if (body.name) dbUser.name = body.name;
    await dbUser.save();
    return dbUser;
  }
}
