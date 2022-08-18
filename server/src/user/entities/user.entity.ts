import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class User {
  @ApiProperty({
    description: '고유 id',
  })
  readonly id: number;

  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description: '닉네임(4~20자, 영문 대소문자, 한글, 숫자만 가능)',
  })
  readonly username: string;

  @IsEmail()
  @ApiProperty({ description: '이메일' })
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: '비밀번호(4~20자)' })
  readonly password: string;
}
