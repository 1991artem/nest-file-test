import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-token.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create user' })
  @Post()
  createUser(createUserDto: CreateUserDto) {
    return this.userService.createUserPost(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by id' })
  @Post(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':id')
  removeUserById(@Param('id') id: string) {
    return this.userService.removeUserById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user  email' })
  @Get()
  findUserByEmail(email: string) {
    return this.userService.findUserByEmail(email);
  }
}
