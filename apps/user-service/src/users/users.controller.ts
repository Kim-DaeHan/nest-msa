import { CreateUserDto, UpdateUserDto } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() payload: { id: number; updateUserDto: UpdateUserDto }) {
    return this.usersService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
