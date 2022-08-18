import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

interface UserInterface {
  readonly idx: number;
  readonly code: string;
  readonly name: string;
  readonly email: string;
  readonly passwd: string;
  readonly jointime: Date;
  readonly callnum: string;
}

export class User implements UserInterface {
  readonly idx: number;
  readonly code: string;
  readonly name: string;
  readonly email: string;
  readonly passwd: string;
  readonly jointime: Date;
  readonly callnum: string;

  constructor(
    idx: number,
    code: string,
    name: string,
    email: string,
    passwd: string,
    jointime: Date,
    callnum: string
  ) {
    this.idx = idx;
    this.code = code;
    this.name = name;
    this.email = email;
    this.passwd = passwd;
    this.jointime = jointime;
    this.callnum = callnum;
  }
}
