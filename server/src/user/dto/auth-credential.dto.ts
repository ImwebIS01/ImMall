import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthCredentialDto {
  @IsEmail()
  @ApiProperty({ description: '이메일(형식을 맞추어야 함)' })
  email: string;

  @IsString()
  @ApiProperty({ description: '비밀번호(4~20자)' })
  password: string;
}
