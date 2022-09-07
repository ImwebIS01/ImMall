import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { GetUserDto } from './get-user.dto';
import { Optional } from '@nestjs/common';

export class CreateUserDto extends PickType(PartialType(GetUserDto), [
  'name',
  'email',
  'passwd',
  'callnum',
  'fk_site_code',
  'fk_membership_code',
]) {}
