import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const kafkaBroker = configService.get<string>('KAFKA_BROKER', 'localhost:9092');
  const clientId = configService.get<string>('KAFKA_CLIENT_ID', 'user-service');
  const consumerGroup = configService.get<string>('KAFKA_CONSUMER_GROUP', 'user-consumer');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [kafkaBroker],
        clientId,
      },
      consumer: {
        groupId: consumerGroup,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
