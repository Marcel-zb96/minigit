import { z } from 'zod';
import { UserDtoSchema } from './user.schema';

export const ContributionDtoSchema = z.object({
  author: UserDtoSchema,
});

export type ContributionDto = z.infer<typeof ContributionDtoSchema>;
