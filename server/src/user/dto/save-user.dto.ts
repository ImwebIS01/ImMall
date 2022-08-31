import { PartialType, PickType } from '@nestjs/swagger';
import {
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsOptional,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
export class SaveUserDto extends PickType(PartialType(CreateUserDto), [
  'name',
  'email',
  'passwd',
  'callnum',
] as const) {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  readonly passwd: string;
}
