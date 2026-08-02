import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    first_name?: string;
    last_name?: string;
    image_url?: string;
    public_metadata?: Record<string, unknown>;
  };
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async handleWebhook(event: ClerkWebhookEvent): Promise<void> {
    const { type, data } = event;

    switch (type) {
      case 'user.created':
        await this.createUser(data);
        break;
      case 'user.updated':
        await this.updateUser(data);
        break;
      case 'user.deleted':
        await this.deleteUser(data.id);
        break;
      default:
        this.logger.warn(`Unknown webhook event type: ${type}`);
    }
  }

  private async createUser(data: ClerkWebhookEvent['data']): Promise<UserDocument> {
    const email = data.email_addresses?.[0]?.email_address ?? '';
    const name = `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim() || email;

    const created = await this.userModel.create({
      clerkId: data.id,
      email,
      name,
      avatar: data.image_url ?? '',
      role: data.public_metadata?.role === 'admin' ? 'admin' : 'student',
    });

    this.logger.log(`User created: ${data.id} (${email})`);
    return created;
  }

  private async updateUser(data: ClerkWebhookEvent['data']): Promise<void> {
    const email = data.email_addresses?.[0]?.email_address ?? '';
    const name = `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim() || email;

    await this.userModel.findOneAndUpdate(
      { clerkId: data.id },
      {
        email,
        name,
        avatar: data.image_url ?? '',
        role: data.public_metadata?.role === 'admin' ? 'admin' : 'student',
      },
    );

    this.logger.log(`User updated: ${data.id}`);
  }

  private async deleteUser(clerkId: string): Promise<void> {
    await this.userModel.findOneAndDelete({ clerkId });
    this.logger.log(`User deleted: ${clerkId}`);
  }
}
