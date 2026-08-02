import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { createClerkClient, verifyToken } from '@clerk/backend';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import type { ClerkUser } from '../interfaces/user-request.interface';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuard.name);
  private clerkClient: ReturnType<typeof createClerkClient>;
  private secretKey: string;

  constructor(
    configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    this.secretKey = configService.get<string>('CLERK_SECRET_KEY') ?? '';
    this.clerkClient = createClerkClient({ secretKey: this.secretKey });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = await verifyToken(token, {
        secretKey: this.secretKey,
      });

      const clerkUser = await this.clerkClient.users.getUser(payload.sub);

      const email = clerkUser.emailAddresses[0]?.emailAddress ?? '';
      const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ').trim() || email;

      let role: 'admin' | 'student' = (clerkUser.publicMetadata?.role as string) === 'admin' ? 'admin' : 'student';

      if (role !== 'admin') {
        const dbUser = await this.userModel.findOne({ clerkId: clerkUser.id }).lean();
        if (dbUser?.role === 'admin') role = 'admin';
      }

      const user: ClerkUser = {
        userId: clerkUser.id,
        email,
        name,
        role,
      };

      await this.syncUser(clerkUser.id, email, name, role);

      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private async syncUser(clerkId: string, email: string, name: string, role: string): Promise<void> {
    try {
      await this.userModel.findOneAndUpdate(
        { clerkId },
        { $set: { email, name, role, lastActiveAt: new Date() } },
        { upsert: true },
      );
    } catch (err) {
      this.logger.error(`Failed to sync user ${clerkId}: ${err}`);
    }
  }
}
