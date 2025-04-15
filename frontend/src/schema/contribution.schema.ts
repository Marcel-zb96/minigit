import { z } from 'zod';

export const ContributionResponseSchema = z.object({
  user: z.object({
    login: z.string(),
  }),
  line_count: z.number(),
});

export type ContributionResponse = z.infer<typeof ContributionResponseSchema>;
