import { CreateUserDto, UpdateUserDto } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    console.info('createUserDto: ', createUserDto);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
