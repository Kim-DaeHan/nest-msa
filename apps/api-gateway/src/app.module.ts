import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
