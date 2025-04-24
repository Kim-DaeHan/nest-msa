import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@app/shared';

@Controller('users')
export class UsersController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        clientId: 'api-gateway',
      },
    },
  })
  private readonly client: ClientKafka;

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.client.send('createUser', createUserDto);
  }

  @Get()
  findAll() {
    return this.client.send('findAllUsers', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneUser', +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.client.send('updateUser', { id: +id, updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeUser', +id);
  }
}
