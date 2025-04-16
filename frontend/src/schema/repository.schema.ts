import { z } from 'zod';
import { CreateUserSchema } from './user.schema';

export const BaseRepositorySchema = z.object({
  full_name: z.string().min(1, "Repository name is required"),
  description: z.string().min(1, "Repository description is required"),
  language: z.string(),
  stargazers_count: z.number().default(0),
});

export const RepositoryResponseSchema = BaseRepositorySchema.extend({
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

export const CreateRepositorySchema = BaseRepositorySchema.extend({
  owner: CreateUserSchema,
}).required();


export type RepositoryResponse = z.infer<typeof RepositoryResponseSchema>;
export type CreateRepository = z.infer<typeof CreateRepositorySchema>;
