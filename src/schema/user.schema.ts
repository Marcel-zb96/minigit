import { z } from 'zod';

export const UserDtoSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string(),
  html_url: z.string(),
  type: z.string(),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
