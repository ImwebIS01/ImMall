import { PickType } from '@nestjs/swagger';
import { GetMembershipDto } from './get-membership.dto';

export class CreateMembershipDto extends PickType(GetMembershipDto, [
  'code',
  'level',
  'pointRage',
]) {}
