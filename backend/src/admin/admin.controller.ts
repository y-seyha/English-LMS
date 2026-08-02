import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ClerkAuthGuard } from '../common/guards/clerk-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  async getUsers(@Query() query: Record<string, unknown>) {
    return this.adminService.findAllUsers(query as any);
  }

  @Get('activity')
  async getActivity(@Query('days') days?: string) {
    return this.adminService.getActivityData(days ? parseInt(days, 10) : 30);
  }

  @Get('top-users')
  async getTopUsers(@Query('limit') limit?: string) {
    return this.adminService.getTopUsers(limit ? parseInt(limit, 10) : 10);
  }

  @Get('review-items')
  async getReviewItems(@Query() query: Record<string, unknown>) {
    return this.adminService.getAllReviewItems(query as any);
  }

  @Get('user/:userId')
  async getUserAnalytics(@Param('userId') userId: string) {
    return this.adminService.getUserAnalytics(userId);
  }
}
