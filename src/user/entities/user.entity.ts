import { ApiProperty } from '@nestjs/swagger';

import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Entity,
} from 'typeorm';

@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @ApiProperty({ example: '1', description: 'User id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'User123!', description: 'Password' })
  @Column()
  password: string;

  @ApiProperty({ example: 'Ivan', description: 'First Name' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last Name' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'avatar.png', description: 'Image name' })
  @Column()
  image: string;

  @ApiProperty({ example: 'info.pdf', description: 'Pdf file' })
  @Column({ type: 'binary' })
  pdf: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
