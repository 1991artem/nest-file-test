import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private _usersRepository: Repository<User>,
  ) {}

  async createUserPost(createUserDto: CreateUserDto) {
    const user = this._usersRepository.create(createUserDto).save();
    return user;
  }

  findAll() {
    return `This action returns all user`;
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

  async findUserByEmail(email: string) {
    return this._usersRepository.findOneBy({
      email,
    });
  }

  async findUserById(id: number) {
    return this._usersRepository.findOneBy({
      id,
    });
  }
}
