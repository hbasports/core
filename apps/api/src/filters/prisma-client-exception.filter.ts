import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

import { Prisma } from '@hbasports/prisma/client';
import { ApiErrorResponse, normalizeConflictFields } from '../lib/error.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // TODO: Return custom error message

    switch (exception.code) {
      case 'P2002': {
        const statusCode = HttpStatus.CONFLICT;

        const conflicts: Record<string, string> = exception.meta?.target
          ? normalizeConflictFields(exception.meta.target as string | string[])
          : {};

        const payload: ApiErrorResponse = {
          errorCode: statusCode,
          message: `The information you entered is already associated with another account.`,
          issues: conflicts,
          timestamp: new Date(),
        };
        response.status(statusCode).json(payload);
        break;
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
