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
  'callNum',
] as const) {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  readonly passwd: string;
}
