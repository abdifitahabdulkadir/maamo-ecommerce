import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: config.get<string>('WEB_ORIGIN'),
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap()
  .then(() => void 0)
  .catch(() => void 0);
