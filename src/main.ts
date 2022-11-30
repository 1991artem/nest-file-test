import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const PORT = config.get<number>('PORT') || 4500;

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TEST_NESTJS_PSQL')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('upload files')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/v1/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

bootstrap();
