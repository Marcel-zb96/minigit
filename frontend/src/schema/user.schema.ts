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

export const createUserSchema = (t: (key: string) => string) => {
  return z.object({
    login: z.string().min(3, t("userNameLengthError")),
    type: z.enum([t("User"), t("Organization")]),
  })
};

export type UserResponse = z.infer<typeof UserResponseSchema>;
