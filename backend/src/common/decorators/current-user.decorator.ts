import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { ClerkUser } from '../interfaces/user-request.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof ClerkUser | undefined, ctx: ExecutionContext): ClerkUser | string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as ClerkUser;
    return data ? user?.[data] : user;
  },
);
