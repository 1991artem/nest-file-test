import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ example: 'i@i.com', description: 'User email' })
  @IsOptional()
  readonly email: string;
}
