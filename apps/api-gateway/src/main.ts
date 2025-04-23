import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 전역 파이프 설정
  app.useGlobalPipes(new ValidationPipe());

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('User Service API Gateway')
    .setDescription('The User Service API Gateway description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
