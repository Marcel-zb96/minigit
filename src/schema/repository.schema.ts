import { z } from 'zod';
import { CreateUserDtoSchema, UserDtoSchema } from './user.schema';

export const BaseRepositoryDtoSchema = z.object({
  full_name: z.string(),
  description: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  stargazers_count: z.number().optional().nullable(),
});

export const GitRepositoryDtoSchema = BaseRepositoryDtoSchema.extend({
  id: z.number(),
  owner: UserDtoSchema,
  html_url: z.string().optional(),
  commits_url: z.string(),
});

export const ResponseRepositoryDtoSchema = BaseRepositoryDtoSchema.extend({
  id: z.number(),
  owner: z.object({
    id: z.number(),
    login: z.string(),
  }),
  _count: z
    .object({
      contributions: z.number(),
    })
    .default({ contributions: 0 }),
});

export const CreateRepositoryDtoSchema = BaseRepositoryDtoSchema.extend({
  owner: CreateUserDtoSchema,
}).required();

export const GitRepositoryPartialDtoSchema = GitRepositoryDtoSchema.partial();

export type GitRepositoryDto = z.infer<typeof GitRepositoryDtoSchema>;
export type GitRepositoryPartialDto = z.infer<typeof GitRepositoryPartialDtoSchema>;
export type ResponseRepositoryDto = z.infer<typeof ResponseRepositoryDtoSchema>;
export type CreateRepositoryDto = z.infer<typeof CreateRepositoryDtoSchema>;
