import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

interface UserInterface {
  readonly idx: number;
  readonly name: string;
  readonly email: string;
  readonly passwd: string;
  readonly callNum: string;
  readonly created_time: Date;
}

export class User implements UserInterface {
  readonly idx: number;
  readonly name: string;
  readonly email: string;
  readonly passwd: string;
  readonly callNum: string;
  readonly created_time: Date;

  constructor(
    idx: number,
    name: string,
    email: string,
    passwd: string,
    callNum: string
  ) {
    this.idx = idx;
    this.name = name;
    this.email = email;
    this.passwd = passwd;
    this.callNum = callNum;
    0;
  }
}
