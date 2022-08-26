import { isNumberString, IsString, MaxLength } from 'class-validator';

export class TokenDto {
  @IsString()
  @MaxLength(100)
  readonly token: string;

  @IsString()
  @MaxLength(10)
  readonly expiresIn: string;
}
