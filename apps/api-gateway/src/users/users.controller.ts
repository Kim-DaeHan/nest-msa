import { CreateUserDto, UpdateUserDto } from '@app/shared';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientKafka) {
    // 응답 토픽 구독 설정
    this.userClient.subscribeToResponseOf('createUser');
    this.userClient.subscribeToResponseOf('findAllUsers');
    this.userClient.subscribeToResponseOf('findOneUser');
    this.userClient.subscribeToResponseOf('updateUser');
    this.userClient.subscribeToResponseOf('removeUser');
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userClient.send('createUser', createUserDto);
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
