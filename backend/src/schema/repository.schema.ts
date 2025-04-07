import { z } from 'zod';
import { CreateUserDtoSchema, GitUserDtoSchema } from './user.schema';

export const BaseRepositoryDtoSchema = z.object({
  full_name: z.string(),
  description: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  stargazers_count: z.number().optional().nullable(),
});

export const GitRepositoryDtoSchema = BaseRepositoryDtoSchema.extend({
  id: z.number(),
  owner: GitUserDtoSchema,
  html_url: z.string(),
  commits_url: z.string(),
});

export const ResponseRepositoryDtoSchema = BaseRepositoryDtoSchema.extend({
  id: z.string(),
  owner: z.object({
    id: z.string(),
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

export const RepositoryQuerySchema = BaseRepositoryDtoSchema.extend({
  id: z.string(),
  ownerId: z.string(),
  html_url: z.string(),
  github_id: z.number(),
}).partial();

export const GitRepositoryPartialDtoSchema = GitRepositoryDtoSchema.partial();

export type GitRepositoryDto = z.infer<typeof GitRepositoryDtoSchema>;
export type GitRepositoryPartialDto = z.infer<typeof GitRepositoryPartialDtoSchema>;
export type ResponseRepositoryDto = z.infer<typeof ResponseRepositoryDtoSchema>;
export type CreateRepositoryDto = z.infer<typeof CreateRepositoryDtoSchema>;
