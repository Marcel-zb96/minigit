import { z } from 'zod';

export const UserResponseSchema = z.object({
  login: z.string(),
  type: z.string(),
  avatar_url: z.string(),
});

export const CreateUserSchema = z.object({
  login: z.string().min(3, "Username is required with more than 3 characters"),
  type: z.enum(["User", "Organization"]),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
