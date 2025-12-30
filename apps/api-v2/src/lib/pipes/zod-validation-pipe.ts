import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodType } from 'zod';
import { ZodSchema } from 'zod/v3';

@Injectable()
export class ZodValidationPipe<
  T extends ZodType<any>,
> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (err) {
      if (err instanceof ZodError) {
        throw err;
      }

      return err;
    }
  }
}
