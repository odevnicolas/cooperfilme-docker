import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { PORT_APP } from './core/constants/environments';
import { AllExceptionsFilter } from './core/middleware/error.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(PORT_APP || 8080, () => {
    console.log('Running in port: ', PORT_APP || 8080);
  });
}
bootstrap();
