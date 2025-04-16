import { z } from 'zod';

export const UserResponseSchema = z.object({
  login: z.string(),
  type: z.string(),
  avatar_url: z.string(),
});

export const CreateUserSchema = z.object({
  login: z.string(),
  type: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
