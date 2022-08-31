import { PickType } from '@nestjs/swagger';
import { GetSiteDto } from './get-site.dto';

export class CreateSiteDto extends PickType(GetSiteDto, ['name']) {}
