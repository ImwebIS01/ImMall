import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Response } from 'express';
import { json } from 'stream/consumers';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from './dto/get-user.dto';
import { GetUser } from 'src/custom.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('sign-in')
  async signIn(
    @Body() authCredentialDto: AuthCredentialDto,
    @Res() res: Response
  ) {
    const token = await this.userService.login(authCredentialDto);
    return res.cookie('token', token).json(true);
  }

  @Get()
  async getAll(@Query() query) {
    const { page, perPage } = query;
    return this.userService.getAll(+page, +perPage);
  }

  @Get(':idx')
  async getOne(@Param('idx') idx: number) {
    return this.userService.getOne(+idx);
  }

  @Get('code/:code')
  async getOneByCode(@Param('code') code: string) {
    return this.userService.getOneByCode(code);
  }

  @Get('email/:email')
  @UseGuards(AuthGuard())
  async getOneByEmail(@GetUser() user: User, @Param('email') email: string) {
    if (user.email === email) return this.userService.getOneByEmail(email);
    throw new UnauthorizedException();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.setOne(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
