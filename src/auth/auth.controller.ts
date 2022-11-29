import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Cookies } from 'src/decorators/cookie.decorator';
import { JwtAuthGuard } from './jwt-token.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpPost(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const res = await this.authService.loginPost(loginUserDto);
    return res;
  }
}
