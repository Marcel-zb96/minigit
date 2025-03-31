import { z } from 'zod';

export const UserDtoSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string(),
  html_url: z.string(),
  type: z.string(),
});

export const ContributionDtoSchema = z.object({
  author: UserDtoSchema,
});

export const RepositoryDtoSchema = z.object({
  id: z.number(),
  owner: UserDtoSchema,
  full_name: z.string(),
  description: z.string(),
  html_url: z.string(),
  language: z.string(),
  stargazers_count: z.number(),
  commits_url: z.string(),
});

export const RepositoryPartialDtoSchema = RepositoryDtoSchema.partial();

export type UserDto = z.infer<typeof UserDtoSchema>;
export type ContributionDto = z.infer<typeof ContributionDtoSchema>;
export type RepositoryDto = z.infer<typeof RepositoryDtoSchema>;
export type RepositoryPartialDto = z.infer<typeof RepositoryPartialDtoSchema>;
