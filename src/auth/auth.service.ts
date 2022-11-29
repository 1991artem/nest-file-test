import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { FastifyReply } from 'fastify/types/reply';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUpPost(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const condidate = await this.userService.findUserByEmail(email); // check user in DB
    if (condidate) {
      throw new HttpException(
        'User with this email address already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const hashedPassword = await hash(password as string, 12); // hash password
    const user = await this.userService.createUserPost({
      ...createUserDto,
      password: hashedPassword,
    }); // create new user
    return user;
  }

  async loginPost(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    const token = await this.generateToken(user);

    return token;
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userService.findUserByEmail(email);
    const passwordEquals: boolean = await compare(password, user?.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Authentification failed. Check your email/password.',
    });
  }
}
