import { z } from 'zod';
import { GitUserDtoSchema } from './user.schema';

export const GitCommitDtoSchema = z.object({
  url: z.string(),
  author: GitUserDtoSchema.nullable(),
});

export const ContributionDtoSchema = z.object({
  author: GitUserDtoSchema,
  stats: z.object({
    total: z.number(),
  }),
});

export const ResponseContributionDtoSchema = z.object({
  user: z.object({
    login: z.string(),
  }),
  line_count: z.number(),
});

export type GitCommitDto = z.infer<typeof GitCommitDtoSchema>;
export type ContributionDto = z.infer<typeof ContributionDtoSchema>;
export type ResponseContributionDto = z.infer<typeof ResponseContributionDtoSchema>;
