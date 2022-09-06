import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RefundService } from './refund.service';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { GetRefundDto } from './dto/get-refund.dto';

@Controller('refund')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Post(':site_code')
  async create(
    @Param('site_code') site_code: string,
    @Body() createRefundDto: CreateRefundDto
  ) {
    createRefundDto.fk_site_code = site_code;
    return this.refundService.create(createRefundDto);
  }

  @Get(':site_code')
  async getAllBySite(
    @Param('site_code') site_code: string,
    @Query() query
  ): Promise<GetRefundDto[] | object> {
    const { perPage, code } = query;
    return this.refundService.findAll(+perPage, code, site_code);
  }

  @Get('code/:code')
  async findOne(@Param('code') code: string) {
    return this.refundService.findOne(code);
  }

  @Patch(':code')
  async update(
    @Param('code') code: string,
    @Body() updateRefundDto: UpdateRefundDto
  ) {
    return this.refundService.update(code, updateRefundDto);
  }

  @Delete(':code')
  async remove(@Param('code') code: string) {
    return this.refundService.remove(code);
  }
}
