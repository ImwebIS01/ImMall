import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class GetUserDto {
  @Exclude() private _idx: number;
  @Exclude() private _name: string;
  @Exclude() private _email: string;
  @Exclude() private _passwd: string;
  @Exclude() private _callNum: string;
  @Exclude() private _createdAt: Date;
  @Exclude() private _updatedAt: Date;

  @ApiProperty()
  @Expose()
  @IsString()
  get name(): string {
    return this._name;
  }

  set name(val: string) {
    this._name = val;
  }

  @ApiProperty()
  @Expose()
  @IsEmail()
  get email(): string {
    return this._email;
  }

  set email(val: string) {
    this._email = val;
  }

  @ApiProperty()
  @Expose()
  @IsString()
  get passwd(): string {
    return this._passwd;
  }

  set passwd(val: string) {
    this._passwd = val;
  }

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  get callNum(): string {
    return this._callNum;
  }

  set callNum(val: string) {
    this._callNum = val;
  }
}
