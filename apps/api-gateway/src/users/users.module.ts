import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [configService.get<string>('KAFKA_BROKER', 'localhost:9092')],
              clientId: configService.get<string>('KAFKA_CLIENT_ID', 'api-gateway'),
            },
            consumer: {
              groupId: configService.get<string>('KAFKA_CONSUMER_GROUP', 'api-gateway-consumer'),
              allowAutoTopicCreation: true,
            },
            producer: {
              allowAutoTopicCreation: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
