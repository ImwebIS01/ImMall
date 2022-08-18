import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly passwd: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly callNum: string;
}
