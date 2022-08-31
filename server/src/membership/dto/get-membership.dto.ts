import { IsNumber, IsString } from 'class-validator';

export class GetMembershipDto {
  idx: number;

  code: string;

  level: number;

  point_rage: number;
}
