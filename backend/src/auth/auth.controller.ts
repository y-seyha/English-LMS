import { Controller, Post, Headers, Req, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
    @Req() req: any,
  ) {
    const secret = this.configService.get<string>('CLERK_WEBHOOK_SECRET');
    if (!secret) {
      this.logger.warn('CLERK_WEBHOOK_SECRET not configured, skipping webhook verification');
    }

    const payload = (req as any).rawBody ?? (req as any).body;
    const event = typeof payload === 'string' ? JSON.parse(payload) : payload;

    if (event?.type) {
      await this.authService.handleWebhook(event);
    }

    return { received: true };
  }
}
