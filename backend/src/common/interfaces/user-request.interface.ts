import { Request } from 'express';

export interface ClerkUser {
  userId: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
}

export interface AuthenticatedRequest extends Request {
  user: ClerkUser;
}
