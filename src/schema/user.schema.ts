import { z } from 'zod';

export const UserDtoSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string(),
  html_url: z.string(),
  type: z.string(),
});

export const ResponseUserDtoSchema = z.object({
  login: z.string(),
  type: z.string(),
  avatar_url: z.string(),
});

export const CreateUserDtoSchema = z.object({
  login: z.string(),
  type: z.string(),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
export type ResponseUserDto = z.infer<typeof ResponseUserDtoSchema>;
export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
