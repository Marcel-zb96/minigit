import { z } from 'zod';
import { UserDtoSchema } from './user.schema';

export const BaseRepositoryDto = z.object({
  id: z.number(),
  full_name: z.string(),
  description: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  stargazers_count: z.number().optional().nullable(),
});

export const GitRepositoryDtoSchema = BaseRepositoryDto.extend({
  owner: UserDtoSchema,
  html_url: z.string().optional(),
  commits_url: z.string(),
});

export const ResponseRepositoryDtoSchema = BaseRepositoryDto.extend({
  owner: z.object({
    id: z.number(),
    login: z.string(),
  }),
  _count: z.object({
    contributions: z.number(),
  }),
});

export const GitRepositoryPartialDtoSchema = GitRepositoryDtoSchema.partial();

export type GitRepositoryDto = z.infer<typeof GitRepositoryDtoSchema>;
export type GitRepositoryPartialDto = z.infer<typeof GitRepositoryPartialDtoSchema>;
export type ResponseRepositoryDto = z.infer<typeof ResponseRepositoryDtoSchema>;
