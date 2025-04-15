import { z } from 'zod';
/* import { CreateUserDtoSchema } from './user.schema'; */

export const BaseRepositorySchema = z.object({
  full_name: z.string(),
  description: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  stargazers_count: z.number().optional().nullable(),
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

/* export const CreateRepositoryDtoSchema = BaseRepositoryDtoSchema.extend({
  owner: CreateUserDtoSchema,
}).required();
 */

export type RepositoryResponse = z.infer<typeof RepositoryResponseSchema>;
/* export type CreateRepositoryDto = z.infer<typeof CreateRepositoryDtoSchema>; */
