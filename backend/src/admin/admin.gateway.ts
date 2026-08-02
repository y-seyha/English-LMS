import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { AdminService } from './admin.service';

@Injectable()
@WebSocketGateway({
  namespace: '/admin',
  cors: {
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true,
  },
})
export class AdminGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(AdminGateway.name);
  private interval: ReturnType<typeof setInterval> | null = null;

  @WebSocketServer()
  server!: Server;

  constructor(private readonly adminService: AdminService) {}

  afterInit() {
    this.logger.log('Admin WebSocket gateway initialized');
    this.interval = setInterval(() => this.broadcastUpdates(), 30_000);
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Admin client connected: ${client.id}`);
    try {
      const [stats, activity] = await Promise.all([
        this.adminService.getDashboardStats(),
        this.adminService.getActivityData(30),
      ]);
      client.emit('admin:stats', stats);
      client.emit('admin:activity', activity);
    } catch (err) {
      this.logger.error('Failed to send initial data to admin client', err);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Admin client disconnected: ${client.id}`);
  }

  private async broadcastUpdates() {
    try {
      const [stats, activity] = await Promise.all([
        this.adminService.getDashboardStats(),
        this.adminService.getActivityData(30),
      ]);
      this.server.emit('admin:stats-update', stats);
      this.server.emit('admin:activity-update', activity);
    } catch (err) {
      this.logger.error('Failed to broadcast admin updates', err);
    }
  }

  async onModuleDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
