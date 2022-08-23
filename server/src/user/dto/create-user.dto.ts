import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';
import { GetUserDto } from './get-user.dto';

export class CreateUserDto extends PickType(PartialType(GetUserDto), [
  'name',
  'email',
  'passwd',
  'callNum',
]) {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly passwd: string;

  @ApiProperty()
  @IsString()
  readonly callNum: string;
}
