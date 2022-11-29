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
    try {
      const user = this._usersRepository.create(createUserDto).save();
      return user;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user: User | null = await this.findUserById(id);
      return this._usersRepository.save({
        ...user,
        ...updateUserDto,
      });
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeUserById(id: number) {
    try {
      await this.findUserById(id);
      await this._usersRepository.delete({
        id,
      });
      return { message: `User (id:${id}) has been deleted` };
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this._usersRepository.findOneBy({
        email,
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this._usersRepository.findOneBy({
        id,
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
