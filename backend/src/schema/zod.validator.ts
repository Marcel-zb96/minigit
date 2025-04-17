import { BadRequestException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod/lib';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown): unknown {
    const parsedValue = this.schema.safeParse(value);

    if (parsedValue.success) {
      return parsedValue.data;
    }

    throw new BadRequestException('Validation failed!');
  }
}
