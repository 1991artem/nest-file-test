import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'First Name' })
  @IsString({ message: 'String' })
  @Length(1, 256, { message: 'Min: 1, Max: 256' })
  readonly firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last Name' })
  @IsString({ message: 'String' })
  @Length(1, 256, { message: 'Min: 1, Max: 256' })
  readonly lastName: string;

  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'User123!', description: 'Password' })
  @IsString({ message: 'Password' })
  @Length(5, 256, { message: 'Min: 5, Max: 256' })
  readonly password: string;
}
