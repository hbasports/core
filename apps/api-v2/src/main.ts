import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { winstonLogger } from './config/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
