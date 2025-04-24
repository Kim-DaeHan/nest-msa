import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as path from 'path';

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

  // Kafka 클라이언트 설정
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        clientId: 'api-gateway',
      },
      consumer: {
        groupId: 'api-gateway-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
