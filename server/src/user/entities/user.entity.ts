import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

interface UserInterface {
  readonly idx: number;
  readonly code: string;
  readonly name: string;
  readonly email: string;
  readonly passwd: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly callNum: string;
}

export class User implements UserInterface {
  readonly idx: number;
  readonly code: string;
  readonly name: string;
  readonly email: string;
  readonly passwd: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly callNum: string;

  constructor(
    idx: number,
    code: string,
    name: string,
    email: string,
    passwd: string,
    createdAt: Date,
    updatedAt: Date,
    callNum: string
  ) {
    this.idx = idx;
    this.code = code;
    this.name = name;
    this.email = email;
    this.passwd = passwd;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.callNum = callNum;
  }
}
