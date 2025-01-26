import { z } from 'zod';

export class UserValidator {
  static readonly REGISTER = z
    .object({
      username: z
        .string()
        .min(3, 'Username is too short, min 3 characters')
        .max(50, 'Username is too long, max 50 characters'),
      email: z
        .string()
        .email('Invalid email format')
        .max(100, 'Email is too long, max 100 characters'),
      password: z
        .string()
        .min(8, 'Password is too short, min 8 characters')
        .max(30, 'Password is too long, max 30 characters'),
    })
    .strict();
}
