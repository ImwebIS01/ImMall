import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class GetUserDto extends PickType(CreateUserDto, [
  'name',
  'email',
  'passwd',
  'callNum',
]) {}
