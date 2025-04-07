import { z } from 'zod';

const BaseUserDtoSchema = z.object({
  login: z.string(),
  avatar_url: z.string(),
  html_url: z.string(),
  type: z.string(),
});

export const GitUserDtoSchema = BaseUserDtoSchema.extend({
  id: z.number(),
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

export type UserDto = z.infer<typeof GitUserDtoSchema>;
export type ResponseUserDto = z.infer<typeof ResponseUserDtoSchema>;
export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
