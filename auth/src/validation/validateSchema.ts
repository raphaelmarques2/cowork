import { BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export function validateSchema(data: any, schema: ZodSchema) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const msg = result.error.errors[0].message;
    throw new BadRequestException(`Invalid data [${msg}]`);
  }
}
