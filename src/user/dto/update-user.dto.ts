import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Ivam', description: 'First Name' })
  @IsOptional()
  @IsString({ message: 'String' })
  @Length(5, 256, { message: 'Min: 5, Max: 256' })
  readonly firstName?: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last Name' })
  @IsOptional()
  @IsString({ message: 'String' })
  @Length(5, 256, { message: 'Min: 5, Max: 256' })
  readonly lastName?: string;

  @ApiProperty({ example: 'avatar.png', description: 'Image' })
  @IsOptional()
  @IsString({ message: 'Image name' })
  readonly img?: string;

  @ApiProperty({ example: 'info.pdf', description: 'Pdf file' })
  @IsOptional()
  @IsString({ message: 'Pdf name' })
  readonly pdf?: string;
}
