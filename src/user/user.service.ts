import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    const user: User | null = await this.findUserById(id);
    return this._usersRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async removeUserById(id: number) {
    await this.findUserById(id);
    await this._usersRepository.delete({
      id,
    });
    return { message: `User (id:${id}) has been deleted` };
  }

  async findUserByEmail(email: string) {
    const user = await this._usersRepository.findOneBy({
      email,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserById(id: number) {
    const user = await this._usersRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
