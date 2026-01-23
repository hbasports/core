import 'dotenv/config';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import type { HttpAdapterHost as HttpAdapterHostType } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '@/app.module';
import { winstonLogger } from '@/config/logger';
import { PrismaClientExceptionFilter } from '@/filters/prisma-client-exception.filter';
import { API_PORT, WEBSITE_URL } from '@hbasports/lib/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
    cors: {
      credentials: true,
      origin: [WEBSITE_URL],
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const adapterHost = app.get<HttpAdapterHostType>(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(adapterHost.httpAdapter),
  );

  app.use(cookieParser());

  await app.listen(API_PORT || 3001);
}

void bootstrap();
