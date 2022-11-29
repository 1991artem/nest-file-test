import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'User123!', description: 'Password' })
  @IsString({ message: 'Password' })
  @Length(8, 256, { message: 'Min: 8, Max: 256' })
  readonly password: string;
}
