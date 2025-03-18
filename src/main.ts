import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import { appConfig } from './application/configs/app.config';

const getLoggerConfig = (logLevel: string): LogLevel[] => {
  switch (logLevel) {
    case 'error':
      return ['error'];
    case 'warn':
      return ['error', 'warn'];
    case 'info':
      return ['error', 'warn', 'log'];
    case 'debug':
      return ['error', 'warn', 'log', 'debug'];
    case 'verbose':
      return ['error', 'warn', 'log', 'debug', 'verbose'];
    default:
      return ['error', 'warn', 'log'];
  }
};

async function startApiServer(port: number) {
  const app = await NestFactory.create(AppModule, {
    logger: getLoggerConfig(appConfig.LOG_LEVEL),
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );

  await app.listen(port).then(() => {
    const logger = new Logger();
    logger.log(`Service is listening port ${port}`);
  });
}

async function bootstrap() {
  const port = appConfig.PORT || 3000;
  await startApiServer(port);
}

bootstrap();
