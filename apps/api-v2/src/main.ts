import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ZodExceptionFilter } from './filters/zod-error.filter'
import { winstonLogger } from './config/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger
  });
  
  app.useGlobalFilters(new ZodExceptionFilter(new Logger()))

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
