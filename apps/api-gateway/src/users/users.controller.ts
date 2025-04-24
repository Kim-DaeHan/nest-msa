import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@app/shared';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientKafka) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userClient.send('create_user', createUserDto);
  }

  @Get()
  findAll() {
    return this.userClient.send('findAllUsers', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userClient.send('findOneUser', +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userClient.send('updateUser', { id: +id, updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userClient.send('removeUser', +id);
  }
}
