import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe, VersioningType } from '@nestjs/common';

if (process.env.NODE_ENV === 'local') {
  config({ path: 'src/environment/.env.local' });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,

    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT);
}
bootstrap();
