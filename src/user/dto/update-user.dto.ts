import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Ivam', description: 'First Name' })
  @IsString({ message: 'String' })
  @Length(5, 256, { message: 'Min: 5, Max: 256' })
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last Name' })
  @IsString({ message: 'String' })
  @Length(5, 256, { message: 'Min: 5, Max: 256' })
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'User123!', description: 'Password' })
  @IsString({ message: 'Password' })
  @Length(8, 256, { message: 'Min: 8, Max: 256' })
  readonly password: string;

  @ApiProperty({ example: 'avatar.png', description: 'Image' })
  @IsString({ message: 'Image name' })
  readonly img: string;
}
