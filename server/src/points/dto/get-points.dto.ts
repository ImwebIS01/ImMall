import { CreatePointsDto } from './create-points.dto';
import { PartialType } from '@nestjs/swagger';

export class GetPointsDto extends PartialType(CreatePointsDto) {}
