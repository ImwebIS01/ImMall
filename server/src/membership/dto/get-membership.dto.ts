import { IsNumber, IsString } from 'class-validator';

export class GetMembershipDto {
  @IsNumber()
  idx: number;

  @IsString()
  code: string;

  @IsNumber()
  level: number;

  @IsNumber()
  pointRage: number;
}
