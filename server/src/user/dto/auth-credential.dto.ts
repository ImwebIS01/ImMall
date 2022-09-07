import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { GetUserDto } from './get-user.dto';

export class AuthCredentialDto extends PickType(GetUserDto, [
  'email',
  'passwd',
  'fk_site_code',
]) {}
