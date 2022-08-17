import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

interface UserInterface {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export class User implements UserInterface {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly password: string;

  constructor(id: number, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
